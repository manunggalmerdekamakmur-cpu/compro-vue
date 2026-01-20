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
        'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768890938/menyemprot_tlcghj_20_mm1irt.webp',
        'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768807981/visi-misi-bg_w1tk8e_drwylj.webp',
        'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461076/logo_xipkza.webp',
        'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461077/logo-stiesia_raywzt.webp'
      ]
    }
  },
  { 
    path: '/triobionik', 
    component: () => import('./pages/triobionik-list.vue'),
    meta: { 
      title: 'Triobionik',
      layout: true
    }
  },
  { 
    path: '/triobionik/:id', 
    component: () => import('./pages/triobionik-detail.vue'),
    meta: { 
      title: 'Detail Triobionik',
      layout: true
    }
  },
  { 
    path: '/manunggal-lestari', 
    component: () => import('./pages/manunggal-lestari.vue'),
    meta: { 
      title: 'Manunggal Lestari',
      layout: true
    }
  },
  { 
    path: '/manunggal-lestari-dekomposer', 
    component: () => import('./pages/manunggal-lestari-dekomposer.vue'),
    meta: { 
      title: 'Manunggal Lestari Dekomposer',
      layout: true
    }
  },
  { 
    path: '/manunggal-makmur', 
    component: () => import('./pages/manunggal-makmur.vue'),
    meta: { 
      title: 'Manunggal Makmur',
      layout: true
    }
  },
  { 
    path: '/ptorca', 
    component: () => import('./pages/ptorca.vue'),
    meta: { 
      title: 'PTORCA',
      layout: true
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
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition)
        } else if (to.hash) {
          resolve({ 
            el: to.hash, 
            behavior: 'smooth', 
            top: 80 
          })
        } else {
          resolve({ top: 0, behavior: 'smooth' })
        }
      }, 100)
    })
  }
})

const preloadImages = (urls) => {
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
      const stylesheets = Array.from(document.styleSheets)
      const loaded = stylesheets.every(sheet => {
        try {
          return sheet.cssRules || sheet.rules
        } catch {
          return false
        }
      })
      if (loaded || stylesheets.length === 0) {
        resolve()
      } else {
        setTimeout(checkCSS, 50)
      }
    }
    checkCSS()
  })
}

router.beforeEach((to, from, next) => {
  const title = to.meta.title || 'Produk'
  document.title = `${title} - PT. Manunggal Merdeka Makmur`
  
  const loadingEl = document.getElementById('app-loading')
  if (loadingEl && from.name !== to.name) {
    loadingEl.style.display = 'flex'
    loadingEl.style.opacity = '1'
  }
  
  next()
})

router.afterEach(() => {
  setTimeout(() => {
    if (window.App && window.App.lazyLoader) {
      window.App.lazyLoader.scan()
    }
  }, 200)
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
      await Promise.race([
        preloadImages(currentRoute.meta.preloadImages),
        new Promise(resolve => setTimeout(resolve, 1000))
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

    setTimeout(() => {
      if (window.App && window.App.afterVueMount) {
        window.App.afterVueMount()
      }

      document.body.classList.remove('loading')
      if (loadingEl) {
        loadingEl.style.opacity = '0'
        loadingEl.style.pointerEvents = 'none'
        setTimeout(() => {
          loadingEl.style.display = 'none'
        }, 500)
      }
      
      setTimeout(() => {
        if (window.App && window.App.lazyLoader) {
          window.App.lazyLoader.scan()
        }
      }, 150)
      
    }, 300)

  } catch (error) {
    console.error('App initialization failed:', error)
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