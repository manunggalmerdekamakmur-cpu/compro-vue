import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  { 
    path: '/', 
    component: () => import('./pages/Home.vue'), 
    meta: { title: 'Beranda', showLayout: true } 
  },
  { 
    path: '/triobionik', 
    component: () => import('./pages/triobionik-list.vue'),
    meta: { title: 'Triobionik', showLayout: true }
  },
  { 
    path: '/triobionik/:id', 
    component: () => import('./pages/triobionik-detail.vue'),
    meta: { title: 'Detail Triobionik', showLayout: true }
  },
  { 
    path: '/manunggal-lestari', 
    component: () => import('./pages/manunggal-lestari.vue'),
    meta: { title: 'Manunggal Lestari', showLayout: true }
  },
  { 
    path: '/manunggal-makmur', 
    component: () => import('./pages/manunggal-makmur.vue'),
    meta: { title: 'Manunggal Makmur', showLayout: true }
  },
  { 
    path: '/ptorca', 
    component: () => import('./pages/ptorca.vue'),
    meta: { title: 'PTORCA', showLayout: true }
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
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title || 'Produk'
  document.title = `${title} - PT. Manunggal Merdeka Makmur`
  next()
})

const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

const waitForDOM = () => {
  if (document.readyState === 'complete') return Promise.resolve()
  return new Promise(resolve => {
    window.addEventListener('load', resolve, { once: true })
  })
}

const preloadCriticalImages = () => {
  const criticalImages = [
    'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461104/menyemprot_a4hkac.webp'
  ]
  
  return Promise.all(
    criticalImages.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = reject
        img.src = src
      })
    })
  )
}

const waitForFonts = () => {
  if ('fonts' in document) {
    return Promise.all([
      document.fonts.load('1rem "Segoe UI"'),
      document.fonts.load('600 1rem "Segoe UI"'),
      document.fonts.load('700 1rem "Segoe UI"')
    ])
  }
  return Promise.resolve()
}

class ImageLoader {
  constructor() {
    this.loadedImages = new Set()
    this.pendingImages = new Set()
    this.observer = null
  }
  
  init() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target
            this.loadImage(img)
          }
        })
      },
      { rootMargin: '100px' }
    )
  }
  
  loadImage(img) {
    if (this.loadedImages.has(img) || this.pendingImages.has(img)) return
    
    const src = img.dataset.src
    if (!src) return
    
    this.pendingImages.add(img)
    
    // Tambah class loading
    img.classList.add('image-loading')
    
    const tempImg = new Image()
    tempImg.onload = () => {
      img.src = src
      img.removeAttribute('data-src')
      img.classList.remove('image-loading')
      img.classList.add('image-loaded')
      this.loadedImages.add(img)
      this.pendingImages.delete(img)
      
      // Trigger custom event
      img.dispatchEvent(new Event('imageloaded'))
    }
    
    tempImg.onerror = () => {
      img.classList.remove('image-loading')
      this.pendingImages.delete(img)
      console.warn(`Failed to load image: ${src}`)
    }
    
    tempImg.src = src
  }
  
  observe(img) {
    if (img.dataset.src) {
      this.observer.observe(img)
    }
  }
  
  waitForAll() {
    if (this.pendingImages.size === 0) return Promise.resolve()
    
    return new Promise(resolve => {
      const checkInterval = setInterval(() => {
        if (this.pendingImages.size === 0) {
          clearInterval(checkInterval)
          resolve()
        }
      }, 100)
    })
  }
}

const initApp = async () => {
  const loadingEl = document.getElementById('app-loading')
  
  try {
    // Step 1: Tunggu DOM siap
    await waitForDOM()
    
    // Step 2: Preload critical images
    await preloadCriticalImages()
    
    // Step 3: Tunggu fonts
    await waitForFonts()
    
    // Step 4: Inisialisasi Vue App
    const app = createApp(App)
    const imageLoader = new ImageLoader()
    imageLoader.init()
    
    // Custom directive untuk lazy loading
    app.directive('lazy', {
      mounted(el) {
        const imgs = el.tagName === 'IMG' ? [el] : el.querySelectorAll('img[data-src]')
        imgs.forEach(img => {
          // Tambah placeholder untuk gambar
          if (!img.hasAttribute('src')) {
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PC9zdmc+'
          }
          imageLoader.observe(img)
        })
      },
      updated(el) {
        const imgs = el.tagName === 'IMG' ? [el] : el.querySelectorAll('img[data-src]')
        imgs.forEach(img => imageLoader.observe(img))
      }
    })
    
    app.use(router)
    
    // Step 5: Tunggu router ready
    await router.isReady()
    
    // Step 6: Mount Vue app
    app.mount('#app')
    
    // Step 7: Hapus loading state dari body
    document.body.classList.remove('loading')
    
    // Step 8: Fade out loading overlay
    if (loadingEl) {
      loadingEl.style.opacity = '0'
      loadingEl.style.pointerEvents = 'none'
      
      // Tunggu sedikit untuk gambar-gambar lazy load
      setTimeout(async () => {
        // Tunggu semua gambar selesai loading
        await imageLoader.waitForAll()
        
        // Hilangkan loading overlay setelah transisi
        setTimeout(() => {
          loadingEl.style.display = 'none'
        }, 300)
      }, 500)
    }
    
  } catch (error) {
    console.error('Application initialization failed:', error)
    if (loadingEl) {
      loadingEl.innerHTML = `
        <div class="error-state">
          <p>Gagal memuat aplikasi. Silakan refresh halaman.</p>
          <button onclick="window.location.reload()" class="btn btn-primary">Coba Lagi</button>
        </div>
      `
      loadingEl.style.opacity = '1'
    }
  }
}

// Start the application
initApp()