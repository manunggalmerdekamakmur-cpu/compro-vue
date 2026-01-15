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
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'instant' }
  }
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title || 'Produk'
  document.title = `${title} - PT. Manunggal Merdeka Makmur`
  next()
})

const waitForDOM = () => {
  if (document.readyState === 'complete') {
    return Promise.resolve()
  }
  return new Promise(resolve => {
    window.addEventListener('load', resolve, { once: true })
  })
}

const preloadCriticalImages = () => {
  const criticalImages = [
    'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461104/menyemprot_a4hkac.webp'
  ]
  
  criticalImages.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    link.fetchPriority = 'high'
    document.head.appendChild(link)
  })
}

const initApp = async () => {
  await waitForDOM()
  
  preloadCriticalImages()
  
  const app = createApp(App)
  
  app.directive('lazy', {
    mounted(el) {
      const img = el.tagName === 'IMG' ? el : el.querySelector('img')
      if (!img?.dataset?.src) return
      
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
            observer.disconnect()
          }
        },
        { rootMargin: '100px' }
      )
      
      observer.observe(img)
    }
  })
  
  app.use(router)
  
  await router.isReady()
  
  app.mount('#app')
  
  const loader = document.getElementById('app-loading')
  if (loader) {
    loader.style.opacity = '0'
    setTimeout(() => loader.remove(), 300)
  }
  
  document.documentElement.removeAttribute('data-loading')
}

initApp().catch(console.error)