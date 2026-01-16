(function() {
  const CONFIG = {
    debounceDelay: 150,
    throttleLimit: 200,
    scrollThreshold: 300,
    imageOffset: 200
  }
  
  const debounce = (fn, delay) => {
    let timeoutId
    return function(...args) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn.apply(this, args), delay)
    }
  }
  
  const throttle = (fn, limit) => {
    let inThrottle, lastTime
    return function(...args) {
      const now = Date.now()
      if (!inThrottle) {
        fn.apply(this, args)
        lastTime = now
        inThrottle = true
      } else if (now - lastTime >= limit) {
        fn.apply(this, args)
        lastTime = now
      }
    }
  }
  
  class PerformanceMonitor {
    constructor() {
      this.marks = new Map()
    }
    
    mark(name) {
      this.marks.set(name, performance.now())
    }
    
    measure(name, start, end) {
      const s = this.marks.get(start)
      const e = this.marks.get(end)
      if (s && e) {
        const duration = e - s
        if (duration > 100) {
          console.log(`Performance: ${name} - ${duration.toFixed(2)}ms`)
        }
        return duration
      }
    }
  }
  
  class LazyLoader {
    constructor() {
      this.observer = null
      this.loadedImages = new Set()
      this.pendingImages = new WeakMap()
      this.imageSizes = new WeakMap()
      this.init()
    }
    
    init() {
      const config = {
        root: null,
        rootMargin: `${CONFIG.imageOffset}px 0px`,
        threshold: 0.01
      }
      
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target)
          }
        })
      }, config)
    }
    
    observe(img) {
      if (!img || !img.dataset.src || this.loadedImages.has(img) || this.pendingImages.has(img)) return
      
      img.classList.add('image-loading')
      
      this.setImageDimensions(img)
      
      if (!img.src || img.src.startsWith('data:')) {
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PC9zdmc+'
      }
      
      this.pendingImages.set(img, true)
      this.observer.observe(img)
      
      setTimeout(() => {
        if (this.pendingImages.has(img)) {
          const rect = img.getBoundingClientRect()
          if (rect.top < window.innerHeight + 100) {
            this.loadImage(img)
          }
        }
      }, 300)
    }
    
    setImageDimensions(img) {
      if (img.width && img.height) return
      
      const parent = img.parentElement
      if (parent) {
        const style = window.getComputedStyle(parent)
        const width = parseInt(style.width) || 300
        const height = parseInt(style.height) || 200
        img.width = width
        img.height = height
        this.imageSizes.set(img, { width, height })
      }
    }
    
    loadImage(img) {
      if (!img.dataset.src) return
      
      const src = img.dataset.src
      
      if (img.src === src) {
        this.onImageLoad(img)
        return
      }
      
      const loader = new Image()
      loader.src = src
      
      loader.onload = () => {
        img.src = src
        img.removeAttribute('data-src')
        this.onImageLoad(img)
      }
      
      loader.onerror = () => {
        img.classList.remove('image-loading')
        img.classList.add('image-error')
        this.pendingImages.delete(img)
        this.observer.unobserve(img)
      }
    }
    
    onImageLoad(img) {
      img.classList.remove('image-loading')
      img.classList.add('image-loaded')
      this.loadedImages.add(img)
      this.pendingImages.delete(img)
      this.observer.unobserve(img)
      
      const event = new CustomEvent('imageloaded', { detail: { img } })
      img.dispatchEvent(event)
    }
    
    scan(container = document) {
      const images = container.querySelectorAll('img[data-src]')
      images.forEach(img => this.observe(img))
    }
    
    scanAndWait() {
      return new Promise(resolve => {
        this.scan()
        setTimeout(() => {
          const pending = Array.from(document.querySelectorAll('img.image-loading'))
          if (pending.length === 0) {
            resolve()
            return
          }
          
          let loadedCount = 0
          pending.forEach(img => {
            img.addEventListener('imageloaded', () => {
              loadedCount++
              if (loadedCount === pending.length) resolve()
            }, { once: true })
          })
        }, 100)
      })
    }
    
    destroy() {
      if (this.observer) this.observer.disconnect()
      this.loadedImages.clear()
      this.pendingImages = new WeakMap()
      this.imageSizes = new WeakMap()
    }
  }
  
  class ScrollManager {
    constructor() {
      this.isScrolling = false
      this.positions = new Map()
    }
    
    savePosition() {
      const path = window.location.pathname
      this.positions.set(path, {
        x: window.pageXOffset,
        y: window.pageYOffset,
        time: Date.now()
      })
    }
    
    restorePosition() {
      const path = window.location.pathname
      const pos = this.positions.get(path)
      
      if (pos && Date.now() - pos.time < 30000) {
        requestAnimationFrame(() => {
          window.scrollTo(pos.x, pos.y)
        })
      }
    }
    
    scrollToTop(smooth = true) {
      if (this.isScrolling) return
      
      this.isScrolling = true
      const options = { top: 0 }
      if (smooth) options.behavior = 'smooth'
      
      window.scrollTo(options)
      
      setTimeout(() => {
        this.isScrolling = false
      }, 500)
    }
    
    scrollToElement(element, offset = 80, smooth = true) {
      if (this.isScrolling || !element) return
      
      this.isScrolling = true
      const rect = element.getBoundingClientRect()
      const top = rect.top + window.pageYOffset - offset
      
      const options = { top }
      if (smooth) options.behavior = 'smooth'
      
      window.scrollTo(options)
      
      setTimeout(() => {
        this.isScrolling = false
      }, 500)
    }
  }
  
  class LayoutManager {
    constructor() {
      this.observer = null
      this.elements = new WeakMap()
      this.init()
    }
    
    init() {
      this.observer = new ResizeObserver(
        debounce((entries) => {
          entries.forEach(entry => {
            const target = entry.target
            const cachedHeight = this.elements.get(target)
            const newHeight = entry.contentRect.height
            
            if (!cachedHeight || Math.abs(cachedHeight - newHeight) > 5) {
              this.elements.set(target, newHeight)
              target.style.setProperty('--dynamic-height', `${newHeight}px`)
            }
          })
        }, 100)
      )
    }
    
    observe(element) {
      if (!element || this.elements.has(element)) return
      
      const rect = element.getBoundingClientRect()
      this.elements.set(element, rect.height)
      element.style.setProperty('--dynamic-height', `${rect.height}px`)
      
      this.observer.observe(element)
    }
    
    unobserve(element) {
      if (this.elements.has(element)) {
        this.observer.unobserve(element)
        this.elements.delete(element)
      }
    }
    
    destroy() {
      this.observer.disconnect()
      this.elements = new WeakMap()
    }
  }
  
  class Application {
    constructor() {
      this.perf = new PerformanceMonitor()
      this.lazyLoader = new LazyLoader()
      this.scrollManager = new ScrollManager()
      this.layoutManager = new LayoutManager()
      this.isInitialized = false
      this.scrollHandler = null
    }
    
    async init() {
      if (this.isInitialized) return
      
      this.perf.mark('app-init-start')
      
      await this.waitForDOM()
      
      this.setupEventListeners()
      this.setupSmoothScrolling()
      this.setupBackToTop()
      
      this.lazyLoader.init()
      
      this.isInitialized = true
      
      this.perf.mark('app-init-end')
      this.perf.measure('App Initialization', 'app-init-start', 'app-init-end')
    }
    
    waitForDOM() {
      if (document.readyState === 'complete') return Promise.resolve()
      
      return new Promise(resolve => {
        const checkReady = () => {
          if (document.readyState === 'complete') resolve()
          else setTimeout(checkReady, 100)
        }
        checkReady()
      })
    }
    
    setupEventListeners() {
      this.scrollHandler = throttle(() => {
        this.scrollManager.savePosition()
      }, 100)
      
      window.addEventListener('scroll', this.scrollHandler, { passive: true })
      window.addEventListener('beforeunload', () => this.scrollManager.savePosition())
    }
    
    setupSmoothScrolling() {
      document.addEventListener('click', debounce((e) => {
        const link = e.target.closest('a[href^="#"]')
        if (link) {
          e.preventDefault()
          const id = link.getAttribute('href').substring(1)
          const element = document.getElementById(id)
          if (element) this.scrollManager.scrollToElement(element)
        }
      }, CONFIG.debounceDelay))
    }
    
    setupBackToTop() {
      const btn = document.querySelector('.back-to-top')
      if (!btn) return
      
      const updateButton = throttle(() => {
        const show = window.scrollY > CONFIG.scrollThreshold
        btn.classList.toggle('visible', show)
      }, CONFIG.throttleLimit)
      
      window.addEventListener('scroll', updateButton, { passive: true })
      btn.addEventListener('click', () => this.scrollManager.scrollToTop())
      
      updateButton()
    }
    
    afterVueMount() {
      setTimeout(() => {
        this.scrollManager.restorePosition()
      }, 100)
      
      this.setupVueLazyLoading()
    }
    
    setupVueLazyLoading() {
      this.lazyLoader.scan()
      
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === 1) {
                const images = node.querySelectorAll ? node.querySelectorAll('img[data-src]') : []
                if (node.tagName === 'IMG' && node.dataset.src) this.lazyLoader.observe(node)
                images.forEach(img => this.lazyLoader.observe(img))
              }
            })
          }
        })
      })
      
      observer.observe(document.body, { childList: true, subtree: true })
    }
    
    waitForAllImages() {
      return this.lazyLoader.scanAndWait()
    }
    
    destroy() {
      if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler)
      this.lazyLoader.destroy()
      this.layoutManager.destroy()
      this.isInitialized = false
    }
  }
  
  const app = new Application()
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init())
  } else {
    app.init()
  }
  
  window.App = {
    scrollToTop: () => app.scrollManager.scrollToTop(),
    scrollToElement: (id, offset) => {
      const el = document.getElementById(id)
      if (el) app.scrollManager.scrollToElement(el, offset)
    },
    lazyLoader: app.lazyLoader,
    afterVueMount: () => app.afterVueMount(),
    waitForAllImages: () => app.waitForAllImages(),
    destroy: () => app.destroy()
  }
})()