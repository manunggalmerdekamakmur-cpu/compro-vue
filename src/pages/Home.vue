<template>
  <div class="home-page">
    <section class="hero" id="home">
      <div class="container">
        <div class="hero-logo">
          <img 
            src="https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461077/logo-stiesia_raywzt.webp" 
            width="85" 
            height="85" 
            alt="Logo STIESIA" 
            loading="eager"
            fetchpriority="high"
          />
          <img 
            src="https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461076/logo_xipkza.webp" 
            width="85" 
            height="85" 
            alt="Logo PT. Manunggal Merdeka Makmur" 
            loading="eager"
            fetchpriority="high"
          />
        </div>
        <h1>PT. Manunggal Merdeka Makmur</h1>
        <p>Produsen berbagai produk pendukung sektor Pertanian, Perkebunan, Perikanan, dan Peternakan dengan komitmen menghasilkan produk berkualitas tinggi untuk kemajuan agrobisnis Indonesia.</p>
        <div class="hero-buttons">
          <a href="#products" class="btn btn-primary">
            <i class="fas fa-seedling"></i> Lihat Produk Kami
          </a>
          <a href="#contact" class="btn btn-secondary">
            <i class="fas fa-phone-alt"></i> Hubungi Kami
          </a>
        </div>
      </div>
    </section>
    
    <AboutSection />
    <VisionMission />
    <ProductStats />
    <ProductsSection />
    <CertificationsSection />
    <PrinciplesSection />
    <CompanyShowcaseSection />
    <ContactSection />
  </div>
</template>

<script>
import AboutSection from '@/components/sections/AboutSection.vue'
import VisionMission from '@/components/sections/VisionMission.vue'
import ProductStats from '@/components/sections/ProductStats.vue'
import ProductsSection from '@/components/sections/ProductsSection.vue'
import CertificationsSection from '@/components/sections/CertificationsSection.vue'
import PrinciplesSection from '@/components/sections/PrinciplesSection.vue'
import CompanyShowcaseSection from '@/components/sections/CompanyShowcaseSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

export default {
  name: 'Home',
  
  components: {
    AboutSection,
    VisionMission,
    ProductStats,
    ProductsSection,
    CertificationsSection,
    PrinciplesSection,
    CompanyShowcaseSection,
    ContactSection
  },
  
  mounted() {
    this.updateDocumentTitle()
    this.handleHashNavigation()
  },
  
  methods: {
    updateDocumentTitle() {
      document.title = 'Beranda - PT. Manunggal Merdeka Makmur'
    },
    
    handleHashNavigation() {
      if (this.$route.hash) {
        this.$nextTick(() => {
          const element = document.querySelector(this.$route.hash)
          if (element) {
            const headerHeight = 80
            const top = element.offsetTop - headerHeight
            window.scrollTo({ top, behavior: 'smooth' })
          }
        })
      }
    }
  }
}
</script>