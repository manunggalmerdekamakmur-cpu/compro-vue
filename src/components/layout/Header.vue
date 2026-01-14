<template>
  <header :class="{ scrolled: isScrolled, 'at-top': isAtTop }">
    <div class="container header-container">
      <router-link to="/" class="logo">
        <img src="/assets/img/logo-stiesia.webp" width="35" height="35" alt="Logo STIESIA" loading="eager" />
        <img src="/assets/img/logo.webp" width="35" height="35" alt="Logo PT. Manunggal Merdeka Makmur" loading="eager" />
        <div class="logo-text">
          <h1>PT. Manunggal Merdeka Makmur</h1>
          <p>Produsen Pupuk Organik dan Agen Hayati Berkualitas</p>
        </div>
      </router-link>
      <nav>
        <button class="hamburger" @click="toggleMenu" :aria-expanded="menuOpen.toString()">
          <i :class="menuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
        <ul class="nav-menu" :class="{ active: menuOpen }">
          <li><a href="/" class="nav-link" :class="{ active: $route.path === '/' }" @click="handleNavClick($event, '/')">Beranda</a></li>
          <li><a href="#about" class="nav-link" @click="handleNavClick($event, '#about')">Tentang Kami</a></li>
          <li><a href="#visi-misi" class="nav-link" @click="handleNavClick($event, '#visi-misi')">Visi & Misi</a></li>
          <li><a href="#products" class="nav-link" @click="handleNavClick($event, '#products')">Produk Kami</a></li>
          <li><a href="#certifications" class="nav-link" @click="handleNavClick($event, '#certifications')">Sertifikasi</a></li>
          <li><a href="#contact" class="nav-link" @click="handleNavClick($event, '#contact')">Kontak</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isScrolled: false,
      isAtTop: true,
      menuOpen: false
    }
  },
  mounted() {
    this.handleScroll()
    window.addEventListener("scroll", this.handleScroll, { passive: true })
    window.addEventListener("resize", this.handleResize, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
    window.removeEventListener("resize", this.handleResize)
  },
  methods: {
    handleScroll() {
      const scrollY = window.scrollY
      this.isScrolled = scrollY > 60
      this.isAtTop = scrollY < 10
    },
    handleResize() {
      if (window.innerWidth > 768 && this.menuOpen) {
        this.menuOpen = false
        document.body.style.overflow = ""
      }
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen
      document.body.style.overflow = this.menuOpen ? "hidden" : ""
    },
    handleNavClick(event, target) {
      event.preventDefault()
      if (this.menuOpen) {
        this.menuOpen = false
        document.body.style.overflow = ""
      }
      if (target === "/") {
        this.$router.push("/")
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else if (target.startsWith("#")) {
        const element = document.querySelector(target)
        if (element) {
          const headerHeight = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight
          window.scrollTo({ top: offsetPosition, behavior: "smooth" })
        }
      }
    }
  }
}
</script>