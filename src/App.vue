<template>
  <div id="app">
    <Header />
    <div class="header-spacer"></div>
    
    <main id="main-content">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in" @before-enter="beforeEnter" @after-leave="afterLeave">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </main>
    
    <Footer />
    
    <button
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
  components: {
    Header,
    Footer
  },
  
  data() {
    return {
      showBackToTop: false,
      scrollTimer: null
    }
  },
  
  mounted() {
    this.handleScroll = this.debounce(this.onScroll, 100)
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    this.setViewportHeight()
    window.addEventListener('resize', this.debounce(this.setViewportHeight, 150), { passive: true })
  },
  
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.setViewportHeight)
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer)
    }
  },
  
  methods: {
    debounce(fn, delay) {
      let timer
      return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => fn.apply(this, args), delay)
      }
    },
    
    onScroll() {
      this.showBackToTop = window.scrollY > 300
    },
    
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    
    setViewportHeight() {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    },
    
    beforeEnter() {
      document.body.style.minHeight = `${document.body.scrollHeight}px`
    },
    
    afterLeave() {
      this.scrollTimer = setTimeout(() => {
        document.body.style.minHeight = ''
      }, 50)
    }
  }
}
</script>