import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/css/style.css'
import './assets/css/product.css'
import './assets/js/app.js'
import '@fortawesome/fontawesome-free/css/all.min.css'

const routes = [
  { 
    path: '/', 
    component: () => import('./pages/Home.vue'),
    meta: { 
      title: 'Beranda',
      layout: true,
      preloadImages: [
        'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768890938/menyecut_20_mm1irt.webp',
        'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768807981/visi-misi-bg_w1tk8e_drwylj.webp',
        'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461076/logo_xipkza.webp',
        'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461077/logo-stiesia_raywzt.webp'
      ],
      priority: 'high'
    }
  },
  { 
    path: '/triobionik', 
    component: () => import('./pages/triobionik-list.vue'),
    meta: { 
      title: 'Triobionik',
      layout: true,
      priority: 'low'
    }
  },
  { 
    path: '/triobionik/:id', 
    component: () => import('./pages/triobionik-detail.vue'),
    meta: { 
      title: 'Detail Triobionik',
      layout: true,
      priority: 'low'
    }
  },
  { 
    path: '/manunggal-lestari', 
    component: () => import('./pages/manunggal-lestari.vue'),
    meta: { 
      title: 'Manunggal Lestari',
      layout: true,
      priority: 'low'
    }
  },
  { 
    path: '/manunggal-lestari-dekomposer', 
    component: () => import('./pages/manunggal-lestari-dekomposer.vue'),
    meta: { 
      title: 'Manunggal Lestari Dekomposer',
      layout: true,
      priority: 'low'
    }
  },
  { 
    path: '/manunggal-makmur', 
    component: () => import('./pages/manunggal-makmur.vue'),
    meta: { 
      title: 'Manunggal Makmur',
      layout: true,
      priority: 'low'
    }
  },
  { 
    path: '/ptorca', 
    component: () => import('./pages/ptorca.vue'),
    meta: { 
      title: 'PTORCA',
      layout: true,
      priority: 'low'
    }
  },
  { 
    path: '/:pathMatch(.*)*', 
    redirect: '/' 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { 
        el: to.hash, 
        behavior: 'smooth', 
        top: 80 
      }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

const preloadImages = (urls, priority = 'low') => {
  if (priority === 'low') {
    return new Promise(resolve => {
      setTimeout(() => {
        Promise.all(
          urls.map(url => {
            if (!url) return Promise.resolve()
            return new Promise(resolve => {
              const img = new Image()
              img.onload = resolve
              img.onerror = resolve
              img.src = url
              setTimeout(resolve, 800)
            })
          })
        ).then(resolve)
      }, 500)
    })
  }
  
  return Promise.all(
    urls.map(url => {
      return new Promise((resolve) => {
        if (!url) return resolve()
        const img = new Image()
        img.onload = resolve
        img.onerror = resolve
        img.src = url
        setTimeout(resolve, 800)
      })
    })
  )
}

const waitForCriticalCSS = () => {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') return resolve()
    
    const checkCSS = () => {
      const criticalSheets = ['style.css', 'product.css']
      const loaded = Array.from(document.styleSheets).every(sheet => {
        try {
          // Check if critical stylesheets are loaded
          const href = sheet.href || ''
          return criticalSheets.some(name => href.includes(name)) 
            ? (sheet.cssRules || sheet.rules)
            : true
        } catch {
          return true
        }
      })
      if (loaded) {
        resolve()
      } else {
        setTimeout(checkCSS, 20)
      }
    }
    checkCSS()
  })
}

const hideLoadingScreen = () => {
  const loadingEl = document.getElementById('app-loading')
  if (loadingEl) {
    loadingEl.style.opacity = '0'
    loadingEl.style.pointerEvents = 'none'
    loadingEl.style.transition = 'opacity 300ms ease-out'
    setTimeout(() => {
      loadingEl.style.display = 'none'
    }, 300)
  }
  document.body.classList.remove('loading')
  document.body.classList.add('loaded')
}

const initLazyLoader = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
            img.classList.add('image-loaded')
          }
          observer.unobserve(img)
        }
      })
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    })

    const lazyImages = document.querySelectorAll('img[data-src]')
    lazyImages.forEach(img => imageObserver.observe(img))
    
    window.App = window.App || {}
    window.App.lazyLoader = {
      observe: (el) => {
        if (el.tagName === 'IMG') {
          imageObserver.observe(el)
        }
      },
      scan: () => {
        const newImages = document.querySelectorAll('img[data-src]')
        newImages.forEach(img => imageObserver.observe(img))
      }
    }
  }
}

router.beforeEach((to, from, next) => {
  const title = to.meta.title || 'Produk'
  document.title = `${title} - PT. Manunggal Merdeka Makmur`
  
  const loadingEl = document.getElementById('app-loading')
  if (loadingEl && from.name !== null && to.name !== from.name) {
    loadingEl.style.display = 'flex'
    loadingEl.style.opacity = '1'
  }
  
  next()
})

router.afterEach(() => {
  const schedule = window.requestIdleCallback || function(cb) {
    return setTimeout(cb, 100)
  }
  
  schedule(() => {
    if (window.App && window.App.lazyLoader) {
      window.App.lazyLoader.scan()
    }
    
    schedule(() => {
    }, 500)
  })
})

const initApp = async () => {
  const loadingEl = document.getElementById('app-loading')
  
  try {
    await Promise.race([
      Promise.all([
        new Promise(resolve => {
          if (document.readyState === 'complete') resolve()
          else window.addEventListener('load', resolve, { once: true })
        }),
        waitForCriticalCSS()
      ]),
      new Promise(resolve => setTimeout(resolve, 1500))
    ])

    const currentRoute = router.currentRoute.value
    if (currentRoute.meta?.preloadImages) {
      const priority = currentRoute.meta.priority || 'low'
      await Promise.race([
        preloadImages(currentRoute.meta.preloadImages, priority),
        new Promise(resolve => setTimeout(resolve, 800))
      ])
    }

    const app = createApp(App)
    
    app.directive('lazy', {
      mounted(el) {
        if (window.App && window.App.lazyLoader) {
          window.App.lazyLoader.observe(el)
        }
      }
    })
    
    app.use(router)

    await router.isReady()

    app.mount('#app')
    
    initLazyLoader()

    setTimeout(() => {
      hideLoadingScreen()
      
      setTimeout(() => {
        if (window.App && window.App.lazyLoader) {
          window.App.lazyLoader.scan()
        }
      }, 100)
    }, 100)

  } catch (error) {
    console.error('App initialization failed:', error)
    setTimeout(hideLoadingScreen, 500)
    
    if (loadingEl) {
      loadingEl.innerHTML = `
        <div style="text-align:center;padding:2rem;color:#666;">
          <p>Gagal memuat aplikasi. Silakan refresh halaman.</p>
          <button onclick="window.location.reload()" style="
            padding:0.75rem 1.5rem;
            background:#1a7d3e;
            color:white;
            border:none;
            border-radius:25px;
            cursor:pointer;
            margin-top:1rem;
          ">Coba Lagi</button>
        </div>
      `
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp)
} else {
  initApp()
}

if ('fonts' in document) {
  document.fonts.ready.then(() => {
    document.documentElement.classList.add('fonts-loaded')
  })
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
  }
})

