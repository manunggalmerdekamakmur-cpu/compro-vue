import { createApp, defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Lazy load dengan skeleton loading
const Home = defineAsyncComponent({
  loader: () => import('./pages/Home.vue'),
  loadingComponent: {
    template: `
      <div class="page-skeleton">
        <div class="skeleton-header"></div>
        <div class="skeleton-content"></div>
      </div>
    `
  },
  delay: 100
})

const ManunggalLestari = defineAsyncComponent({
  loader: () => import('./pages/manunggal-lestari.vue'),
  loadingComponent: {
    template: '<div class="product-skeleton"></div>'
  },
  delay: 100
})

const TriobionikList = defineAsyncComponent({
  loader: () => import('./pages/triobionik-list.vue'),
  loadingComponent: {
    template: '<div class="list-skeleton"></div>'
  },
  delay: 100
})

// Route configuration dengan preload strategy
const routes = [
  {
    path: '/',
    component: Home,
    meta: { 
      title: 'Beranda',
      preload: true
    }
  },
  {
    path: '/manunggal-lestari',
    component: ManunggalLestari,
    meta: { 
      title: 'Manunggal Lestari',
      preload: false
    }
  },
  {
    path: '/triobionik',
    component: TriobionikList,
    meta: { 
      title: 'Varian Triobionik',
      preload: false
    }
  },
  {
    path: '/triobionik/:id',
    component: () => import('./components/sections/ProductDetail.vue'),
    meta: { 
      title: 'Detail Triobionik',
      preload: false
    }
  },
  {
    path: '/ptorca',
    component: () => import('./pages/ptorca.vue'),
    meta: { 
      title: 'PTORCA',
      preload: false
    }
  },
  {
    path: '/manunggal-makmur',
    component: () => import('./pages/manunggal-makmur.vue'),
    meta: { 
      title: 'Manunggal Makmur',
      preload: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { 
        el: to.hash, 
        behavior: 'smooth', 
        top: 80 
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { 
      top: 0,
      behavior: 'instant'
    }
  }
})

// Route prefetching untuk mobile
router.beforeEach((to, from, next) => {
  // Update title
  const title = to.meta.title || 'PT. Manunggal Merdeka Makmur'
  document.title = `${title} - PT. Manunggal Merdeka Makmur`
  
  // Prefetch next route jika mobile
  if ('connection' in navigator && navigator.connection.saveData) {
    // Data saver mode - jangan prefetch
  } else if (window.innerWidth < 768) {
    // Mobile - prefetch dengan delay
    setTimeout(() => {
      const nextRoute = router.getRoutes().find(r => 
        r.path !== to.path && r.meta?.preload
      )
      if (nextRoute && nextRoute.component) {
        if (typeof nextRoute.component === 'function') {
          nextRoute.component()
        }
      }
    }, 1000)
  }
  
  next()
})

const app = createApp(App)
app.use(router)

// Custom directive untuk lazy loading images
app.directive('lazy', {
  mounted(el, binding) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = el.tagName === 'IMG' ? el : el.querySelector('img')
          if (img && img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
          }
          observer.unobserve(el)
        }
      })
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    })
    
    observer.observe(el)
  }
})

app.mount('#app')

// Dispatch event untuk menghapus minimal hero
window.dispatchEvent(new Event('app-mounted'))

// Performance monitoring
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // Send performance metrics
    const perfData = performance.getEntriesByType('navigation')[0]
    if (perfData) {
      const metrics = {
        fcp: perfData.domContentLoadedEventStart,
        lcp: performance.getEntriesByName('largest-contentful-paint')[0]?.startTime,
        fid: performance.getEntriesByName('first-input-delay')[0]?.processingStart
      }
      
      // Log metrics untuk debugging
      console.log('Performance Metrics:', metrics)
    }
  }, { once: true })
}