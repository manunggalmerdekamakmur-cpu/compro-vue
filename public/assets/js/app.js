(function() {
  'use strict'
  
  const CONFIG = {
    debounceDelay: 100,
    throttleLimit: 150,
    scrollThreshold: 300,
    imageOffset: 100
  }
  
  const perf = {
    marks: new Map(),
    
    mark(name) {
      this.marks.set(name, performance.now())
    },
    
    measure(name, start, end) {
      const s = this.marks.get(start)
      const e = this.marks.get(end)
      if (s && e) {
        const duration = e - s
        console.log(`${name}: ${duration.toFixed(2)}ms`)
        return duration
      }
    }
  }
  
  const debounce = (fn, delay) => {
    let timer
    return function(...args) {
      clearTimeout(timer)
      timer = setTimeout(() => fn.apply(this, args), delay)
    }
  }
  
  const throttle = (fn, limit) => {
    let inThrottle
    let lastFn
    let lastTime
    
    return function(...args) {
      if (!inThrottle) {
        fn.apply(this, args)
        lastTime = Date.now()
        inThrottle = true
      } else {
        clearTimeout(lastFn)
        lastFn = setTimeout(() => {
          if (Date.now() - lastTime >= limit) {
            fn.apply(this, args)
            lastTime = Date.now()
          }
        }, Math.max(limit - (Date.now() - lastTime), 0))
      }
    }
  }
  
  class LayoutManager {
    constructor() {
      this.elements = new WeakMap()
      this.observer = null
      this.init()
    }
    
    init() {
      this.observer = new ResizeObserver(
        debounce(entries => {
          entries.forEach(entry => {
            const data = this.elements.get(entry.target)
            if (data) {
              const height = Math.max(entry.contentRect.height, data.minHeight || 0)
              entry.target.style.setProperty('--element-height', `${height}px`)
            }
          })
        }, 50)
      )
    }
    
    observe(element, minHeight = 0) {
      if (!element || this.elements.has(element)) return
      
      const rect = element.getBoundingClientRect()
      const height = Math.max(rect.height, minHeight)
      
      this.elements.set(element, { minHeight })
      element.style.setProperty('--element-height', `${height}px`)
      element.style.minHeight = `${height}px`
      
      this.observer.observe(element)
    }
    
    unobserve(element) {
      if (this.elements.has(element)) {
        this.observer.unobserve(element)
        this.elements.delete(element)
      }
    }
  }
  
  class LazyLoader {
    constructor() {
      this.observer = null
      this.images = new Set()
      this.init()
    }
    
    init() {
      this.observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadImage(entry.target)
              this.observer.unobserve(entry.target)
              this.images.delete(entry.target)
            }
          })
        },
        {
          root: null,
          rootMargin: `${CONFIG.imageOffset}px`,
          threshold: 0.01
        }
      )
      
      this.scan()
    }
    
    scan() {
      document.querySelectorAll('img[data-src]').forEach(img => {
        this.images.add(img)
        this.observer.observe(img)
      })
    }
    
    loadImage(img) {
      const src = img.dataset.src
      if (src) {
        img.src = src
        delete img.dataset.src
        img.classList.add('loaded')
      }
    }
    
    add(img) {
      if (img && img.dataset.src) {
        this.images.add(img)
        this.observer.observe(img)
      }
    }
    
    destroy() {
      this.observer.disconnect()
      this.images.clear()
    }
  }
  
  class ScrollManager {
    constructor() {
      this.isScrolling = false
      this.positions = new Map()
    }
    
    save() {
      const path = window.location.pathname
      this.positions.set(path, {
        x: window.pageXOffset,
        y: window.pageYOffset,
        time: Date.now()
      })
    }
    
    restore() {
      const path = window.location.pathname
      const pos = this.positions.get(path)
      
      if (pos && Date.now() - pos.time < 30000) {
        requestAnimationFrame(() => {
          window.scrollTo(pos.x, pos.y)
        })
      }
    }
    
    toTop() {
      if (this.isScrolling) return
      
      this.isScrolling = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
      setTimeout(() => {
        this.isScrolling = false
      }, 500)
    }
    
    toElement(element, offset = 80) {
      if (this.isScrolling || !element) return
      
      this.isScrolling = true
      const rect = element.getBoundingClientRect()
      const top = rect.top + window.pageYOffset - offset
      
      window.scrollTo({ top, behavior: 'smooth' })
      
      setTimeout(() => {
        this.isScrolling = false
      }, 500)
    }
  }
  
  class Application {
    constructor() {
      this.layout = new LayoutManager()
      this.lazy = new LazyLoader()
      this.scroll = new ScrollManager()
      this.initialized = false
    }
    
    async init() {
      if (this.initialized) return
      
      perf.mark('app-init-start')
      
      await this.waitForDOM()
      
      this.setupScroll()
      this.setupBackToTop()
      this.observeLayouts()
      
      window.addEventListener('beforeunload', () => this.scroll.save())
      window.addEventListener('load', () => this.scroll.restore())
      
      this.initialized = true
      
      perf.mark('app-init-end')
      perf.measure('App Init', 'app-init-start', 'app-init-end')
    }
    
    waitForDOM() {
      if (document.readyState === 'complete') {
        return Promise.resolve()
      }
      return new Promise(resolve => {
        window.addEventListener('load', resolve, { once: true })
      })
    }
    
    setupScroll() {
      document.addEventListener(
        'click',
        debounce(e => {
          const link = e.target.closest('a[href^="#"]')
          if (link) {
            e.preventDefault()
            const id = link.getAttribute('href').substring(1)
            const el = document.getElementById(id)
            if (el) this.scroll.toElement(el)
          }
        }, CONFIG.debounceDelay)
      )
    }
    
    setupBackToTop() {
      const btn = document.querySelector('.back-to-top')
      if (!btn) return
      
      const handleScroll = throttle(() => {
        const show = window.pageYOffset > CONFIG.scrollThreshold
        btn.classList.toggle('visible', show)
      }, CONFIG.throttleLimit)
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      btn.addEventListener('click', () => this.scroll.toTop())
      
      handleScroll()
    }
    
    observeLayouts() {
      const selectors = [
        '.site-header',
        '.site-footer',
        '.hero',
        '.product-detail-page',
        '.product-gallery'
      ]
      
      const observer = new MutationObserver(
        debounce(() => {
          selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
              const minHeight = parseInt(getComputedStyle(el).minHeight) || 0
              this.layout.observe(el, minHeight)
            })
          })
        }, 100)
      )
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
      
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          const minHeight = parseInt(getComputedStyle(el).minHeight) || 0
          this.layout.observe(el, minHeight)
        })
      })
    }
  }
  
  const app = new Application()
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init())
  } else {
    app.init()
  }
  
  window.App = {
    scrollToTop: () => app.scroll.toTop(),
    scrollToElement: (id, offset) => {
      const el = document.getElementById(id)
      if (el) app.scroll.toElement(el, offset)
    },
    lazy: app.lazy,
    layout: app.layout
  }
})()