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
    path: '/manunggal-lestari',
    component: () => import('./pages/manunggal-lestari.vue'),
    meta: { title: 'Manunggal Lestari' }
  },
  {
    path: '/triobionik',
    component: () => import('./pages/triobionik-list.vue'),
    meta: { title: 'Varian Triobionik' }
  },
  {
    path: '/triobionik/:id',
    component: () => import('./components/sections/ProductDetail.vue'),
    meta: { title: 'Detail Triobionik' }
  },
  {
    path: '/ptorca',
    component: () => import('./pages/ptorca.vue'),
    meta: { title: 'PTORCA' }
  },
  {
    path: '/manunggal-makmur',
    component: () => import('./pages/manunggal-makmur.vue'),
    meta: { title: 'Manunggal Makmur' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 100 }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const baseTitle = 'PT. Manunggal Merdeka Makmur'
  document.title = to.meta.title ? `${to.meta.title} - ${baseTitle}` : baseTitle
  
  window.scrollTo({ top: 0, behavior: 'instant' })
  
  const logoTextH1 = document.querySelector('.logo-text h1')
  const heroH1 = document.querySelector('.hero h1')
  const heroP = document.querySelector('.hero p')
  
  if (logoTextH1) logoTextH1.style.opacity = '1'
  if (heroH1) heroH1.style.opacity = '1'
  if (heroP) heroP.style.opacity = '1'
  
  const yearElement = document.querySelector('#year')
  if (yearElement) yearElement.textContent = new Date().getFullYear()
})

const app = createApp(App)
app.use(router)
app.mount('#app')