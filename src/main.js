import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  { 
    path: '/', 
    component: () => import('./pages/Home.vue'),
    meta: { title: 'Beranda' }
  },
  { 
    path: '/triobionik', 
    component: () => import('./pages/triobionik-list.vue'),
    meta: { title: 'Triobionik' }
  },
  { 
    path: '/triobionik/:id', 
    component: () => import('./pages/triobionik-detail.vue'),
    meta: { title: 'Detail Triobionik' }
  },
  { 
    path: '/manunggal-lestari', 
    component: () => import('./pages/manunggal-lestari.vue'),
    meta: { title: 'Manunggal Lestari' }
  },
  { 
    path: '/manunggal-makmur', 
    component: () => import('./pages/manunggal-makmur.vue'),
    meta: { title: 'Manunggal Makmur' }
  },
  { 
    path: '/ptorca', 
    component: () => import('./pages/ptorca.vue'),
    meta: { title: 'PTORCA' }
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
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title || 'Produk'
  document.title = `${title} - PT. Manunggal Merdeka Makmur`
  next()
})

const lazyDirective = {
  mounted(el) {
    const imgs = el.tagName === 'IMG' ? [el] : el.querySelectorAll('img[data-src]')
    
    imgs.forEach(img => {
      if (!img.src || img.src === '' || img.src.startsWith('data:')) {
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PC9zdmc+'
      }
      
      if (window.App && window.App.lazyLoader) {
        window.App.lazyLoader.observe(img)
      }
    })
  },
  
  updated(el) {
    const imgs = el.tagName === 'IMG' ? [el] : el.querySelectorAll('img[data-src]')
    
    imgs.forEach(img => {
      if (window.App && window.App.lazyLoader) {
        window.App.lazyLoader.observe(img)
      }
    })
  }
}

const waitForCriticalAssets = () => {
  return new Promise((resolve) => {
    const checkAssets = () => {
      const stylesLoaded = Array.from(document.styleSheets).every(sheet => {
        try {
          return sheet.cssRules || sheet.rules
        } catch (e) {
          return false
        }
      })
      
      if (stylesLoaded) resolve()
      else setTimeout(checkAssets, 100)
    }
    
    checkAssets()
  })
}

const preloadAllCriticalImages = () => {
  const heroImages = [
    'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461104/menyemprot_a4hkac.webp',
    'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461076/logo_xipkza.webp',
    'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461077/logo-stiesia_raywzt.webp'
  ]
  
  const productImages = [
    'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461076/logo_xipkza.webp',
    'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461076/manunggal-lestari_yw7uim.webp',
    'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461076/manunggal-makmur_w5z3ex.webp',
    'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461076/ptorca_ps9pno.webp'
  ]
  
  return Promise.all(
    [...heroImages, ...productImages].map(src => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = resolve
        img.src = src
      })
    })
  )
}

const initApp = async () => {
  const loadingEl = document.getElementById('app-loading')
  
  try {
    if (document.readyState !== 'complete') {
      await new Promise(resolve => {
        if (document.readyState === 'complete') resolve()
        window.addEventListener('load', resolve, { once: true })
      })
    }
    
    await Promise.race([
      Promise.all([waitForCriticalAssets(), preloadAllCriticalImages()]),
      new Promise(resolve => setTimeout(resolve, 4000))
    ])
    
    const app = createApp(App)
    app.directive('lazy', lazyDirective)
    app.use(router)
    
    await router.isReady()
    
    app.mount('#app')
    
    if (window.App && window.App.afterVueMount) {
      window.App.afterVueMount()
    }
    
    document.body.classList.remove('loading')
    
    const checkHeroImages = () => {
      const heroImages = document.querySelectorAll('.hero img, .hero-logo img')
      if (heroImages.length === 0) return Promise.resolve()
      
      return new Promise(resolve => {
        let loaded = 0
        heroImages.forEach(img => {
          if (img.complete) loaded++
          else {
            img.addEventListener('load', () => {
              loaded++
              if (loaded === heroImages.length) resolve()
            })
            img.addEventListener('error', () => {
              loaded++
              if (loaded === heroImages.length) resolve()
            })
          }
        })
        
        if (loaded === heroImages.length) resolve()
      })
    }
    
    await checkHeroImages()
    
    if (loadingEl) {
      loadingEl.style.opacity = '0'
      loadingEl.style.pointerEvents = 'none'
      
      setTimeout(() => {
        loadingEl.style.display = 'none'
        
        setTimeout(() => {
          if (window.App && window.App.lazyLoader) {
            window.App.lazyLoader.scan()
          }
        }, 500)
      }, 600)
    }
    
  } catch (error) {
    console.error('Application initialization failed:', error)
    
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
      loadingEl.style.opacity = '1'
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp)
} else {
  initApp()
}