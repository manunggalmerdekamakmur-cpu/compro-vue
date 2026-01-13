<template>
  <div class="product-detail-page">
    <!-- Breadcrumb -->
    <section class="breadcrumb">
      <div class="container">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><router-link to="/">Beranda</router-link></li>
            <li><a href="#products" @click.prevent="scrollToProducts">Produk</a></li>
            <li class="current">{{ product.title }}</li>
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
                :src="currentImage" 
                :alt="product.title" 
                class="main-image" 
                @click="openImageModal"
              >
            </div>
            <div class="thumbnail-gallery">
              <div 
                v-for="(image, index) in product.images" 
                :key="index"
                :class="['thumbnail-item', { active: currentImageIndex === index }]"
                @click="changeImage(image, index)"
              >
                <img :src="image" :alt="`${product.title} ${index + 1}`" loading="lazy">
              </div>
            </div>
            
            <!-- Product Stats -->
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
              <h1>{{ product.title }}</h1>
              <div class="product-badge badge-approved">{{ product.badge }}</div>
              <div class="certificate-badge">
                <i class="fas fa-certificate"></i>
                <span>Izin Edar No: {{ product.certificate }}</span>
              </div>
            </div>
            
            <p class="product-description">{{ product.description }}</p>
            
            <div class="product-specs">
              <h3><i class="fas fa-clipboard-list"></i> Spesifikasi Produk</h3>
              <ul>
                <li v-for="(spec, index) in product.specs" :key="`spec-${index}`">{{ spec }}</li>
              </ul>
            </div>
            
            <div class="product-features">
              <h3><i class="fas fa-star"></i> Keunggulan</h3>
              <ul>
                <li v-for="(feature, index) in product.features" :key="`feature-${index}`">{{ feature }}</li>
              </ul>
            </div>
            
            <div class="product-benefits">
              <h3><i class="fas fa-check-circle"></i> Manfaat</h3>
              <ul>
                <li v-for="(benefit, index) in product.benefits" :key="`benefit-${index}`">{{ benefit }}</li>
              </ul>
            </div>
            
            <div class="product-actions">
              <a href="#contact" class="btn btn-primary" @click.prevent="scrollToContact">
                <i class="fas fa-whatsapp"></i> Pesan Sekarang
              </a>
              <router-link to="/#products" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Lihat Produk Lain
              </router-link>
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
                <img src="/assets/img/manunggal-lestari/manunggal-lestari.webp" alt="Manunggal Lestari">
              </div>
              <div class="related-product-info">
                <h4>Manunggal Lestari</h4>
                <p>Pupuk organik cair untuk tanaman pangan, hortikultura, dan perkebunan.</p>
                <router-link to="/manunggal-lestari" class="related-product-link">
                  Lihat Detail <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
            <div class="related-product-card">
              <div class="related-product-img">
                <img src="/assets/img/triobionik/triobionik.webp" alt="PHP Tribionik">
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
                <img src="/assets/img/ptorca/ptorca.webp" alt="PTORCA">
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
import { getProductById } from '@/data/product.js'

export default {
  name: 'ManunggalMakmur',
  data() {
    return {
      currentImageIndex: 0,
      showModal: false,
      modalImage: '',
      product: getProductById('manunggal-makmur') || {
        title: 'Manunggal Makmur',
        badge: 'Disetujui Kementan',
        certificate: '03.03.2025.90',
        description: 'Pupuk organik padat yang memperbaiki struktur tanah dan menyediakan nutrisi lengkap untuk tanaman pertanian, perkebunan, dan hortikultura.',
        images: [
          '/assets/img/manunggal-makmur/manunggal-makmur.webp'
        ],
        specs: [
          'Bentuk: Padat (Remah)',
          'Warna: Coklat tua kehitaman',
          'Konsistensi: Remah homogen',
          'pH: 6.5 - 7.5',
          'Kandungan bahan organik: ≥ 40%',
          'Kadar air: ≤ 25%',
          'C-Organik: ≥ 20%',
          'N total: ≥ 1.5%',
          'P2O5: ≥ 1.0%',
          'K2O: ≥ 1.0%',
          'C/N Ratio: ≤ 20'
        ],
        features: [
          'Terbuat dari bahan organik pilihan',
          'Proses produksi terkontrol',
          'Tanpa bahan kimia berbahaya',
          'Ramah lingkungan dan mikroorganisme tanah',
          'Meningkatkan kapasitas tukar kation tanah'
        ],
        benefits: [
          'Memperbaiki struktur tanah menjadi lebih gembur',
          'Meningkatkan kandungan bahan organik tanah',
          'Menyediakan unsur hara makro dan mikro lengkap',
          'Meningkatkan daya serap air tanah',
          'Mengaktifkan mikroorganisme menguntungkan',
          'Meningkatkan produktivitas tanaman',
          'Mengurangi ketergantungan pada pupuk kimia'
        ]
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
    scrollToProducts() {
      if (this.$route.path === '/') {
        const element = document.getElementById('products')
        if (element) {
          const headerHeight = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
        }
      } else {
        this.$router.push('/#products')
      }
    },
    scrollToContact() {
      if (this.$route.path === '/') {
        const element = document.getElementById('contact')
        if (element) {
          const headerHeight = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
        }
      } else {
        this.$router.push('/#contact')
      }
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