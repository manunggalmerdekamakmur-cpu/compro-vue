import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import Home from './pages/Home.vue'
import ManunggalLestari from './pages/manunggal-lestari.vue'
import Triobionik from './pages/triobionik.vue'
import Ptorca from './pages/ptorca.vue'
import ManunggalMakmur from './pages/manunggal-makmur.vue'

const routes = [
    { 
        path: '/', 
        component: Home,
        meta: { title: 'Beranda' }
    },
    { 
        path: '/manunggal-lestari', 
        component: ManunggalLestari,
        meta: { title: 'Manunggal Lestari' }
    },
    { 
        path: '/triobionik', 
        component: Triobionik,
        meta: { title: 'Triobionik' }
    },
    { 
        path: '/ptorca', 
        component: Ptorca,
        meta: { title: 'PTORCA' }
    },
    { 
        path: '/manunggal-makmur', 
        component: ManunggalMakmur,
        meta: { title: 'Manunggal Makmur' }
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
                top: 100
            }
        }
        return savedPosition || { top: 0 }
    }
})

// Global after navigation handler
router.afterEach((to, from) => {
    // Set page title
    document.title = to.meta.title 
        ? `${to.meta.title} - PT. Manunggal Merdeka Makmur`
        : 'PT. Manunggal Merdeka Makmur'
    
    // Fade in animation for hero elements
    setTimeout(() => {
        const logoTextH1 = document.querySelector('.logo-text h1')
        const heroH1 = document.querySelector('.hero h1')
        const heroP = document.querySelector('.hero p')
        
        if (logoTextH1) logoTextH1.style.opacity = '1'
        if (heroH1) heroH1.style.opacity = '1'
        if (heroP) heroP.style.opacity = '1'
    }, 100)
    
    // Update year in footer
    const yearElement = document.querySelector('#year')
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear()
    }
})

createApp(App).use(router).mount('#app')