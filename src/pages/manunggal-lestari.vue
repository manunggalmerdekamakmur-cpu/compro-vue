<template>
  <div class="product-detail-page">
    <!-- Breadcrumb -->
    <section class="breadcrumb">
      <div class="container">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><router-link to="/">Beranda</router-link></li>
            <li><router-link to="/#products">Produk</router-link></li>
            <li class="current">PHC Manunggal Lestari</li>
          </ol>
        </nav>
      </div>
    </section>

    <!-- Product Detail -->
    <section class="product-detail-page">
      <div class="container">
        <div class="product-detail-container">
          <!-- Product Images -->
          <div class="product-images">
            <div class="main-image-container">
              <img 
                id="mainProductImage" 
                :src="currentImage" 
                :alt="product.title" 
                class="main-image" 
                @click="openImageModal"
                loading="eager"
              >
            </div>
            <div class="thumbnail-gallery" id="thumbnailGallery">
              <div 
                v-for="(image, index) in product.images" 
                :key="index"
                :class="['thumbnail-item', { active: currentImageIndex === index }]"
                @click="changeImage(image, index)"
              >
                <img :src="image" :alt="`${product.title} ${index + 1}`" loading="lazy">
              </div>
            </div>
            
            <div class="product-stats-detail">
              <div class="product-stat-item">
                <i class="fas fa-certificate"></i>
                <h4>Berizin</h4>
                <p>No. 03.03.2025.89</p>
              </div>
              <div class="product-stat-item">
                <i class="fas fa-flask"></i>
                <h4>Teruji</h4>
                <p>Laboratorium Terakreditasi</p>
              </div>
              <div class="product-stat-item">
                <i class="fas fa-leaf"></i>
                <h4>Organik</h4>
                <p>100% Ramah Lingkungan</p>
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="product-info">
            <div class="product-header">
              <h1 id="productTitle">{{ product.title }}</h1>
              <div id="productBadge" class="product-badge badge-approved">{{ product.badge }}</div>
              <div class="certificate-badge">
                <i class="fas fa-certificate"></i>
                <span>Izin Edar No: {{ product.certificate }}</span>
              </div>
            </div>
            
            <p class="product-description" id="productDescription">{{ product.description }}</p>
            
            <div class="product-specs">
              <h3><i class="fas fa-clipboard-list"></i> Spesifikasi Produk</h3>
              <ul id="productSpecs">
                <li v-for="(spec, index) in product.specs" :key="`spec-${index}`">
                  <span class="list-icon">✓</span> {{ spec }}
                </li>
              </ul>
            </div>
            
            <div class="product-features">
              <h3><i class="fas fa-star"></i> Keunggulan</h3>
              <ul id="productFeatures">
                <li v-for="(feature, index) in product.features" :key="`feature-${index}`">
                  <span class="list-icon">✓</span> {{ feature }}
                </li>
              </ul>
            </div>
            
            <div class="product-benefits">
              <h3><i class="fas fa-check-circle"></i> Manfaat</h3>
              <ul id="productBenefits">
                <li v-for="(benefit, index) in product.benefits" :key="`benefit-${index}`">
                  <span class="list-icon">✓</span> {{ benefit }}
                </li>
              </ul>
            </div>
            
            <div class="product-actions">
              <a href="#contact" class="btn btn-primary" @click.prevent="scrollToContact">
                <i class="fas fa-whatsapp"></i> Pesan Sekarang
              </a>
              <router-link to="/#products" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Lihat Produk Lain
              </router-link>
              <button class="btn btn-secondary" @click="printPage">
                <i class="fas fa-print"></i> Cetak Halaman
              </button>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <section class="related-products">
          <div class="section-title">
            <h2>Produk Lainnya</h2>
            <p>Telusuri produk berkualitas lainnya dari PT. Manunggal Merdeka Makmur</p>
          </div>
          <div class="related-products-grid">
            <div class="related-product-card">
              <div class="related-product-img">
                <img src="/assets/img/triobionik/triobionik.webp" alt="PHP Tribionik" loading="lazy">
              </div>
              <div class="related-product-info">
                <h4>PHP Tribionik</h4>
                <p>Pupuk Hayati Padat dengan tiga manfaat utama untuk berbagai jenis tanaman.</p>
                <router-link to="/tribionik" class="related-product-link">
                  Lihat Detail <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
            <div class="related-product-card">
              <div class="related-product-img">
                <img src="/assets/img/manunggal-makmur/manunggal-makmur.webp" alt="Manunggal Makmur" loading="lazy">
              </div>
              <div class="related-product-info">
                <h4>Manunggal Makmur</h4>
                <p>Pupuk organik remah untuk pertanian berkelanjutan.</p>
                <router-link to="/manunggal-makmur" class="related-product-link">
                  Lihat Detail <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
            <div class="related-product-card">
              <div class="related-product-img">
                <img src="/assets/img/ptorca/ptorca.webp" alt="PTORCA" loading="lazy">
              </div>
              <div class="related-product-info">
                <h4>PTORCA</h4>
                <p>Pupuk organik cair untuk tanaman pangan dan hortikultura.</p>
                <router-link to="/ptorca" class="related-product-link">
                  Lihat Detail <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>

    <!-- Image Modal -->
    <div :class="['modal', { active: showModal }]" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">&times;</button>
        <div class="modal-main-image">
          <img :src="modalImage" :alt="product.title">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManunggalLestari',
  data() {
    return {
      currentImageIndex: 0,
      showModal: false,
      modalImage: '',
      product: {
        title: 'PHC Manunggal Lestari',
        description: 'Pupuk Hayati Cair unggulan untuk tanaman pangan dan hortikultura yang mengandung mikroorganisme menguntungkan untuk meningkatkan kesuburan tanah dan pertumbuhan tanaman. Formula khusus yang dikembangkan untuk memberikan nutrisi optimal bagi tanaman.',
        specs: [
          'Kemasan: 1L, 5L',
          'Kandungan: Mikroorganisme bermanfaat > 10^9 CFU/ml',
          'pH: 6.5 - 7.5',
          'Warna: Coklat kehitaman',
          'Bau: Khas fermentasi',
          'Manfaat: Meningkatkan kesuburan tanah, pertumbuhan tanaman, dan hasil panen',
          'Aplikasi: Semprot atau siram pada tanah dengan dosis 5-10 ml per liter air',
          'Izin Edar: No. 03.03.2025.89',
          'Tanggal Izin: 17 Februari 2025'
        ],
        features: [
          'Mengandung mikroorganisme menguntungkan (PGPR)',
          'Meningkatkan ketersediaan unsur hara',
          'Memperbaiki struktur tanah',
          'Meningkatkan daya tahan tanaman terhadap penyakit',
          'Ramah lingkungan dan mudah terurai'
        ],
        benefits: [
          'Meningkatkan hasil panen hingga 30%',
          'Mengurangi penggunaan pupuk kimia',
          'Memperbaiki kualitas tanah secara berkelanjutan',
          'Meningkatkan daya tahan tanaman terhadap stres lingkungan',
          'Cocok untuk sistem pertanian organik'
        ],
        images: [
          '/assets/img/manunggal-lestari/manunggal-lestari.webp',
          '/assets/img/manunggal-lestari/phc-manunggal-lestari-1lbiru.webp',
          '/assets/img/manunggal-lestari/dekomposer-5l.webp',
          '/assets/img/manunggal-lestari/phc-manunggal-lestari-1l.webp',
          '/assets/img/manunggal-lestari/phc-manunggal-lestari.webp'
        ],
        badge: 'Berizin',
        certificate: '03.03.2025.89'
      }
    }
  },
  computed: {
    currentImage() {
      return this.product.images ? this.product.images[this.currentImageIndex] : ''
    }
  },
  mounted() {
    document.title = `${this.product.title} - PT. Manunggal Merdeka Makmur`
    this.updateYear()
    this.initBackToTop()
  },
  methods: {
    changeImage(image, index) {
      this.currentImageIndex = index
    },
    openImageModal() {
      this.modalImage = this.currentImage
      this.showModal = true
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.showModal = false
      document.body.style.overflow = ''
    },
    scrollToContact() {
      if (this.$route.path === '/') {
        this.scrollToSection('contact')
      } else {
        this.$router.push('/#contact')
      }
    },
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerHeight = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      }
    },
    printPage() {
      window.print()
    },
    updateYear() {
      const yearElement = document.querySelector('#year')
      if (yearElement) {
        yearElement.textContent = new Date().getFullYear()
      }
    },
    initBackToTop() {
      const backToTop = document.getElementById('backToTop')
      if (backToTop) {
        window.addEventListener('scroll', () => {
          if (window.pageYOffset > 300) {
            backToTop.classList.add('visible')
          } else {
            backToTop.classList.remove('visible')
          }
        })
        
        backToTop.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        })
      }
    }
  }
}
</script>