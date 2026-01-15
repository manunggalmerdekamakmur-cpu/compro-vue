<template>
  <header :class="{ scrolled: isScrolled }">
    <div class="container header-container">
      <router-link to="/" class="logo">
        <img src="https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461077/logo-stiesia_raywzt.webp" width="35" height="35" alt="Logo STIESIA" loading="eager" />
        <img src="https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461076/logo_xipkza.webp" width="35" height="35" alt="Logo PT. Manunggal Merdeka Makmur" loading="eager" />
        <div class="logo-text">
          <h1>PT. Manunggal Merdeka Makmur</h1>
          <p>Produsen Pupuk Organik dan Agen Hayati Berkualitas</p>
        </div>
      </router-link>
      <nav>
        <button class="hamburger" aria-expanded="false" aria-label="Toggle menu">
          <i class="fas fa-bars"></i>
        </button>
        <ul class="nav-menu">
          <li><router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">Beranda</router-link></li>
          <li><a href="#about" class="nav-link">Tentang Kami</a></li>
          <li><a href="#visi-misi" class="nav-link">Visi & Misi</a></li>
          <li><a href="#products" class="nav-link">Produk Kami</a></li>
          <li><a href="#certifications" class="nav-link">Sertifikasi</a></li>
          <li><a href="#contact" class="nav-link">Kontak</a></li>
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
      isScrolled: false
    }
  },
  mounted() {
    this.handleScroll()
    window.addEventListener("scroll", this.handleScroll, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 60
    }
  }
}
</script>