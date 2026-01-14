<template>
  <div class="product-detail-page">
    <section class="breadcrumb">
      <div class="container">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><router-link to="/">Beranda</router-link></li>
            <li v-if="product.productId === 'php-triobionik'">
              <router-link to="/triobionik">Tribionik</router-link>
            </li>
            <li v-else>
              <a href="#products" @click.prevent="scrollToProducts">Produk</a>
            </li>
            <li class="current">{{ product.title }}</li>
          </ol>
        </nav>
      </div>
    </section>

    <section class="product-detail-page">
      <div class="container">
        <div class="product-detail-container">
          <div class="product-images">
            <div class="main-image-container" @click="openImageModal">
              <img :src="currentImage" :alt="product.title" class="main-image">
            </div>
            <div class="thumbnail-gallery">
              <div 
                v-for="(image, index) in product.images" 
                :key="index"
                :class="['thumbnail-item', { active: currentImageIndex === index }]"
                @click="changeImage(index)"
              >
                <img :src="image" :alt="`${product.title} ${index + 1}`" loading="lazy">
              </div>
            </div>
            
            <div class="product-brochure" v-if="product.brochure">
              <embed 
                  :src="product.brochure"
                  type="application/pdf"
                  style="width:100%; height:450px; border:1px solid #ddd; border-radius:8px;" 
                />
            </div>

            <div class="product-stats-detail">
              <div class="product-stat-item">
                <i class="fas fa-certificate"></i>
                <h4>Berizin</h4>
                <p>{{ product.certificate }}</p>
              </div>
              <div class="product-stat-item">
                <i class="fas fa-flask"></i>
                <h4>Teruji</h4>
                <p>Laboratorium Terakreditasi</p>
              </div>
              <div class="product-stat-item">
                <i class="fas fa-leaf"></i>
                <h4 v-if="isTriobionik">Hayati</h4>
                <h4 v-else-if="isManunggalLestari">Hayati</h4>
                <h4 v-else>Organik</h4>
                <p>100% Ramah Lingkungan</p>
              </div>
            </div>
          </div>

          <div class="product-info">
            <div class="product-header">
              <h1>{{ product.title }}</h1>
              <div :class="['product-badge', product.status === 'approved' ? 'badge-approved' : 'badge-coming']">
                {{ product.badge }}
              </div>
              <div class="certificate-badge">
                <i class="fas fa-certificate"></i>
                <span>Izin Edar No: {{ product.certificate }}</span>
              </div>
            </div>
            
            <p class="product-description">{{ product.description }}</p>
            
            <!-- Judul Dinamis Berdasarkan Produk -->
            <div class="product-specs">
              <h3><i class="fas fa-clipboard-list"></i> {{ specsTitle }}</h3>
              <ul>
                <li v-for="(spec, index) in product.specs" :key="`spec-${index}`">{{ spec }}</li>
              </ul>
            </div>

            <!-- Hanya tampilkan benefits jika ada data -->
            <div class="product-benefits" v-if="product.benefits && product.benefits.length > 0">
              <h3><i class="fas fa-check-circle"></i> {{ benefitsTitle }}</h3>
              <ul>
                <li v-for="(benefit, index) in product.benefits" :key="`benefit-${index}`">{{ benefit }}</li>
              </ul>
            </div>
            
            <!-- Hanya tampilkan features jika ada data -->
            <div class="product-features" v-if="product.features && product.features.length > 0">
              <h3><i class="fas fa-star"></i> {{ featuresTitle }}</h3>
              <ul>
                <li v-for="(feature, index) in product.features" :key="`feature-${index}`">{{ feature }}</li>
              </ul>
            </div>
            
            <div class="product-actions">
              <a href="#contact" class="btn btn-primary" @click.prevent="scrollToContact">
                <i class="fab fa-whatsapp"></i> Pesan Sekarang
              </a>
              <router-link v-if="isTriobionik" to="/triobionik" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Lihat Varian Lain
              </router-link>
              <router-link v-else to="/#products" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Lihat Produk Lain
              </router-link>
            </div>
          </div>
        </div>

        <section class="related-products">
          <div class="section-title">
            <h2>Produk Lainnya</h2>
            <p>Telusuri produk berkualitas lainnya dari PT. Manunggal Merdeka Makmur</p>
          </div>
          <div class="related-products-grid">
            <!-- Tampilkan produk terkait berdasarkan jenis produk -->
            <div class="related-product-card" v-if="!isTriobionik">
              <div class="related-product-img">
                <img src="/assets/img/triobionik/triobionik-25gr.webp" alt="PHP Triobionik" loading="lazy">
              </div>
              <div class="related-product-info">
                <h4>PHP Triobionik</h4>
                <p>Pupuk Hayati Padat dengan tiga manfaat utama untuk berbagai jenis tanaman.</p>
                <router-link to="/triobionik" class="related-product-link">
                  Lihat Varian <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
            
            <div class="related-product-card" v-if="!isManunggalLestari">
              <div class="related-product-img">
                <img src="/assets/img/manunggal-lestari/manunggal-lestari.webp" alt="Manunggal Lestari" loading="lazy">
              </div>
              <div class="related-product-info">
                <h4>Manunggal Lestari</h4>
                <p>Pupuk hayati cair untuk tanaman pangan, hortikultura, dan perkebunan.</p>
                <router-link to="/manunggal-lestari" class="related-product-link">
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
  name: 'ProductDetail',
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {
      currentImageIndex: 0,
      showModal: false,
      modalImage: ''
    }
  },
  computed: {
    currentImage() {
      return this.product.images ? this.product.images[this.currentImageIndex] : ''
    },
    // Cek tipe produk
    isTriobionik() {
      return this.product.id.includes('triobionik') || this.product.productId === 'php-triobionik'
    },
    isManunggalLestari() {
      return this.product.id === 'phc-manunggal-lestari'
    },
    // Judul dinamis berdasarkan produk
    specsTitle() {
      if (this.isManunggalLestari) {
        return 'Deskripsi PHC Manunggal Lestari'
      } else if (this.isTriobionik) {
        return 'Deskripsi PHP TRIOBIONIK'
      } else if (this.product.id === 'manunggal-makmur') {
        return 'Deskripsi Pupuk Organik Remah Manunggal Makmur'
      } else if (this.product.id === 'ptorca') {
        return 'Deskripsi PTORCA'
      }
      return 'Spesifikasi Produk'
    },
    featuresTitle() {
      if (this.isManunggalLestari) {
        return 'Spesifikasi PHC Manunggal Lestari'
      } else if (this.isTriobionik) {
        return 'Spesifikasi PHP TRIOBIONIK'
      }
      return 'Spesifikasi'
    },
    benefitsTitle() {
      if (this.isManunggalLestari) {
        return 'Manfaat PHC Manunggal Lestari'
      } else if (this.isTriobionik) {
        return 'Manfaat PHP TRIOBIONIK'
      }
      return 'Manfaat Produk'
    }
  },
  mounted() {
    this.updateYear()
    this.initBackToTop()
    
    // Set judul halaman
    if (this.product.title) {
      document.title = `${this.product.title} - PT. Manunggal Merdeka Makmur`
    }
  },
  methods: {
    changeImage(index) {
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