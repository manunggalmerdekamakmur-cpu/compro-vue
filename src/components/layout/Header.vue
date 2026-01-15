<template>
  <header :class="{ scrolled: isScrolled }">
    <div class="container header-container">
      <router-link to="/" class="logo">
        <img 
          src="https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461077/logo-stiesia_raywzt.webp" 
          width="35" 
          height="35" 
          alt="Logo STIESIA" 
          loading="eager"
          fetchpriority="high"
        />
        <img 
          src="https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461076/logo_xipkza.webp" 
          width="35" 
          height="35" 
          alt="Logo PT. Manunggal Merdeka Makmur" 
          loading="eager"
          fetchpriority="high"
        />
        <div class="logo-text">
          <h1>PT. Manunggal Merdeka Makmur</h1>
          <p>Produsen Pupuk Organik dan Agen Hayati Berkualitas</p>
        </div>
      </router-link>
      
      <nav>
        <button 
          class="hamburger" 
          :aria-expanded="menuOpen.toString()"
          aria-label="Toggle menu"
          @click="toggleMenu"
        >
          <i :class="menuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
        
        <ul class="nav-menu" :class="{ active: menuOpen }">
          <li>
            <router-link 
              to="/" 
              class="nav-link" 
              :class="{ active: $route.path === '/' }"
              @click="closeMenu"
            >
              Beranda
            </router-link>
          </li>
          <li>
            <a 
              href="#about" 
              class="nav-link"
              @click="handleHashClick('#about')"
            >
              Tentang Kami
            </a>
          </li>
          <li>
            <a 
              href="#visi-misi" 
              class="nav-link"
              @click="handleHashClick('#visi-misi')"
            >
              Visi & Misi
            </a>
          </li>
          <li>
            <a 
              href="#products" 
              class="nav-link"
              @click="handleHashClick('#products')"
            >
              Produk Kami
            </a>
          </li>
          <li>
            <a 
              href="#certifications" 
              class="nav-link"
              @click="handleHashClick('#certifications')"
            >
              Sertifikasi
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              class="nav-link"
              @click="handleHashClick('#contact')"
            >
              Kontak
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  
  data() {
    return {
      isScrolled: false,
      menuOpen: false,
      resizeTimer: null
    }
  },
  
  mounted() {
    this.handleScroll()
    this.debouncedScroll = this.debounce(this.handleScroll, 100)
    this.debouncedResize = this.debounce(this.handleResize, 150)
    
    window.addEventListener('scroll', this.debouncedScroll, { passive: true })
    window.addEventListener('resize', this.debouncedResize, { passive: true })
  },
  
  beforeUnmount() {
    window.removeEventListener('scroll', this.debouncedScroll)
    window.removeEventListener('resize', this.debouncedResize)
    
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer)
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
    
    handleScroll() {
      this.isScrolled = window.scrollY > 60
    },
    
    toggleMenu() {
      this.menuOpen = !this.menuOpen
      document.body.style.overflow = this.menuOpen ? 'hidden' : ''
    },
    
    closeMenu() {
      this.menuOpen = false
      document.body.style.overflow = ''
    },
    
    handleResize() {
      if (window.innerWidth > 768 && this.menuOpen) {
        this.closeMenu()
      }
    },
    
    handleHashClick(hash) {
      this.closeMenu()
      
      if (this.$route.path !== '/') {
        this.$router.push('/' + hash)
      } else {
        const element = document.querySelector(hash)
        if (element) {
          const headerHeight = 80
          const top = element.offsetTop - headerHeight
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }
    }
  }
}
</script>