import { createApp, defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// HANYA LOAD YANG DIBUTUHKAN
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: defineAsyncComponent(() => 
                import('./pages/Home.vue').then(m => m.default || m)
            ),
            meta: { title: 'Beranda' }
        },
        {
            path: '/manunggal-lestari',
            component: defineAsyncComponent(() => 
                import('./pages/manunggal-lestari.vue').then(m => m.default || m)
            ),
            meta: { title: 'Manunggal Lestari' }
        },
        {
            path: '/triobionik',
            component: defineAsyncComponent(() => 
                import('./pages/triobionik-list.vue').then(m => m.default || m)
            ),
            meta: { title: 'Varian Triobionik' }
        },
        {
            path: '/triobionik/:id',
            component: defineAsyncComponent(() => 
                import('./components/sections/ProductDetail.vue').then(m => m.default || m)
            ),
            meta: { title: 'Detail Triobionik' }
        },
        {
            path: '/ptorca',
            component: defineAsyncComponent(() => 
                import('./pages/ptorca.vue').then(m => m.default || m)
            ),
            meta: { title: 'PTORCA' }
        },
        {
            path: '/manunggal-makmur',
            component: defineAsyncComponent(() => 
                import('./pages/manunggal-makmur.vue').then(m => m.default || m)
            ),
            meta: { title: 'Manunggal Makmur' }
        }
    ],
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
        return { top: 0 }
    }
})

// SIMPLE DIRECTIVE
const app = createApp(App)
app.directive('lazy', {
    mounted(el) {
        const img = el.tagName === 'IMG' ? el : el.querySelector('img')
        if (img && img.dataset.src) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        img.src = img.dataset.src
                        img.removeAttribute('data-src')
                        observer.unobserve(el)
                    }
                })
            })
            observer.observe(el)
        }
    }
})

// MOUNT SEKARANG JUGA
app.use(router)
app.mount('#app')

// REPLACE HERO SECTION DENGAN VUE COMPONENT
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero')
    if (heroSection && heroSection.parentNode) {
        heroSection.parentNode.removeChild(heroSection)
    }
})