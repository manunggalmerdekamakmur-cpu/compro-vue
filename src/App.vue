<template>
    <div id="app">
        <Header />
        <main>
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>
        <Footer />
        <button id="backToTop" class="back-to-top" @click="scrollToTop" :class="{ visible: showBackToTop }" aria-label="Kembali ke atas">
            <i class="fas fa-chevron-up"></i>
        </button>
    </div>
</template>

<script>
import Header from "./components/layout/Header.vue"
import Footer from "./components/layout/Footer.vue"

// Debounce untuk scroll events
function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export default {
    name: "App",
    components: { Header, Footer },
    data() {
        return {
            showBackToTop: false,
            scrollListener: null
        }
    },
    mounted() {
        // Debounced scroll handler
        this.scrollListener = debounce(this.handleScroll, 100)
        window.addEventListener('scroll', this.scrollListener, { passive: true })
        
        // Preload critical components
        this.preloadCriticalComponents()
    },
    beforeUnmount() {
        if (this.scrollListener) {
            window.removeEventListener('scroll', this.scrollListener)
        }
    },
    methods: {
        handleScroll() {
            this.showBackToTop = window.pageYOffset > 300
        },
        scrollToTop() {
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth',
                block: 'start'
            })
        },
        preloadCriticalComponents() {
            // Preload components that might be needed soon
            if (this.$route.path === '/') {
                import('./pages/manunggal-lestari.vue').catch(() => {})
                import('./pages/triobionik-list.vue').catch(() => {})
            }
        }
    }
}
</script>