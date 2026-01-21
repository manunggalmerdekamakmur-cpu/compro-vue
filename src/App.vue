<template>
  <div id="app">
    <Header :class="{ hidden: !showLayout }" />
    <div class="header-spacer" aria-hidden="true"></div>
    
      <main id="main-content" class="bg-gray-50 min-h-screen">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" @before-enter="beforeEnter" @after-leave="afterLeave">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </main>
    
    <Footer :class="{ hidden: !showLayout }" />
    
    <button
      v-if="showLayout"
      class="back-to-top"
      :class="{ visible: showBackToTop }"
      @click="scrollToTop"
      aria-label="Kembali ke atas"
    >
      ▲
    </button>
  </div>
</template>

<script>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'

export default {
  name: 'App',
  components: { Header, Footer },
  
  data() {
    return {
      showBackToTop: false,
      scrollTimer: null,
      showLayout: true,
      resizeDebounce: null
    }
  },
  
  watch: {
    '$route'(to) {
      this.showLayout = to.meta.layout !== false
    }
  },
  
  mounted() {
    this.showLayout = this.$route.meta.layout !== false
    this.setupEventListeners()
    this.setViewportHeight()
  },
  
  beforeUnmount() {
    this.cleanupEventListeners()
    if (this.scrollTimer) clearTimeout(this.scrollTimer)
  },
  
  methods: {
    setupEventListeners() {
      this.onScroll = this.debounce(this.handleScroll, 100)
      this.resizeDebounce = this.debounce(this.setViewportHeight, 150)
      
      window.addEventListener('scroll', this.onScroll, { passive: true })
      window.addEventListener('resize', this.resizeDebounce, { passive: true })
    },
    
    cleanupEventListeners() {
      window.removeEventListener('scroll', this.onScroll)
      window.removeEventListener('resize', this.resizeDebounce)
    },
    
    debounce(fn, delay) {
      let timer
      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn.apply(this, args), delay)
      }
    },
    
    handleScroll() {
      this.showBackToTop = window.scrollY > 300
    },
    
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    
    setViewportHeight() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    },
    
    afterLeave() {
    }
  }
}
</script>