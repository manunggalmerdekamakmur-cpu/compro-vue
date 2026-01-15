<template>
  <div class="product-detail-page">
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

    <section class="product-detail">
      <div class="container">
        <div class="product-detail-container">
          <div class="product-images">
            <div class="main-image-container" @click="openImageModal">
              <img 
                :src="currentImage" 
                :alt="product.title" 
                class="main-image"
                :loading="imageIndex === 0 ? 'eager' : 'lazy'"
                :fetchpriority="imageIndex === 0 ? 'high' : 'auto'"
              />
            </div>
            
            <div v-if="product.images && product.images.length > 1" class="thumbnail-gallery">
              <button 
                v-for="(image, index) in product.images" 
                :key="index"
                :class="['thumbnail-item', { active: currentImageIndex === index }]"
                @click="changeImage(image, index)"
                :aria-label="`Lihat gambar ${index + 1}`"
              >
                <img :src="image" :alt="`${product.title} ${index + 1}`" loading="lazy" />
              </button>
            </div>
            
            <div v-if="product.brochure" class="product-brochure">
              <embed 
                :src="product.brochure"
                type="application/pdf"
              />
            </div>

            <div class="product-stats-detail">
              <div 
                v-for="(stat, index) in productStats" 
                :key="index" 
                class="product-stat-item"
              >
                <i :class="stat.icon"></i>
                <h4>{{ stat.title }}</h4>
                <p>{{ stat.value }}</p>
              </div>
            </div>
          </div>

          <div class="product-info">
            <div class="product-header">
              <h1>{{ product.title }}</h1>
              <div class="product-badge badge-approved">{{ product.badge }}</div>
              <div v-if="product.certificate" class="certificate-badge">
                <i class="fas fa-certificate"></i>
                <span>Izin Edar No: {{ product.certificate }}</span>
              </div>
            </div>
            
            <p class="product-description">{{ product.description }}</p>
            
            <div v-if="product.specs && product.specs.length" class="product-specs">
              <h3>
                <i class="fas fa-clipboard-list"></i> 
                {{ specsTitle }}
              </h3>
              <ul>
                <li v-for="(spec, index) in product.specs" :key="`spec-${index}`">
                  {{ spec }}
                </li>
              </ul>
            </div>
            
            <div v-if="product.features && product.features.length" class="product-features">
              <h3>
                <i class="fas fa-star"></i> 
                {{ featuresTitle }}
              </h3>
              <ul>
                <li v-for="(feature, index) in product.features" :key="`feature-${index}`">
                  {{ feature }}
                </li>
              </ul>
            </div>
            
            <div v-if="product.benefits && product.benefits.length" class="product-benefits">
              <h3>
                <i class="fas fa-check-circle"></i> 
                {{ benefitsTitle }}
              </h3>
              <ul>
                <li v-for="(benefit, index) in product.benefits" :key="`benefit-${index}`">
                  {{ benefit }}
                </li>
              </ul>
            </div>
            
            <div class="product-actions">
              <a href="#contact" class="btn btn-primary" @click.prevent="scrollToContact">
                <i class="fab fa-whatsapp"></i> Pesan Sekarang
              </a>
              <router-link to="/#products" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Lihat Produk Lain
              </router-link>
            </div>
          </div>
        </div>

        <section v-if="relatedProducts.length" class="related-products">
          <div class="section-title">
            <h2>Produk Lainnya</h2>
            <p>Telusuri produk berkualitas lainnya dari PT. Manunggal Merdeka Makmur</p>
          </div>
          <div class="related-products-grid">
            <router-link
              v-for="related in relatedProducts"
              :key="related.id"
              :to="related.to"
              class="related-product-card"
            >
              <div class="related-product-img">
                <img 
                  :src="getPlaceholder()" 
                  :data-src="related.image" 
                  :alt="related.title" 
                  v-lazy
                  loading="lazy"
                />
              </div>
              <div class="related-product-info">
                <h4>{{ related.title }}</h4>
                <p>{{ related.description }}</p>
                <span class="related-product-link">
                  Lihat Detail <i class="fas fa-arrow-right"></i>
                </span>
              </div>
            </router-link>
          </div>
        </section>
      </div>
    </section>

    <div :class="['modal', { active: showModal }]" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal" aria-label="Tutup">&times;</button>
        <div class="modal-main-image">
          <img :src="modalImage" :alt="product.title" />
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
      required: true
    },
    productStats: {
      type: Array,
      default: () => []
    },
    relatedProducts: {
      type: Array,
      default: () => []
    },
    specsTitle: {
      type: String,
      default: 'Spesifikasi Produk'
    },
    featuresTitle: {
      type: String,
      default: 'Keunggulan'
    },
    benefitsTitle: {
      type: String,
      default: 'Manfaat'
    }
  },
  
  data() {
    return {
      currentImageIndex: 0,
      imageIndex: 0,
      showModal: false,
      modalImage: '',
      imageTransitioning: false
    }
  },
  
  computed: {
    currentImage() {
      return this.product.images?.[this.currentImageIndex] || this.product.image || ''
    }
  },
  
  watch: {
    product: {
      handler() {
        this.currentImageIndex = 0
        this.updateDocumentTitle()
      },
      immediate: true
    }
  },
  
  mounted() {
    this.updateDocumentTitle()
  },
  
  methods: {
    changeImage(image, index) {
      if (this.imageTransitioning || this.currentImageIndex === index) return
      
      this.imageTransitioning = true
      this.imageIndex = index
      const mainImg = document.querySelector('.main-image')
      
      if (mainImg) {
        mainImg.style.opacity = '0'
        setTimeout(() => {
          this.currentImageIndex = index
          mainImg.style.opacity = '1'
          this.imageTransitioning = false
        }, 200)
      } else {
        this.currentImageIndex = index
        this.imageTransitioning = false
      }
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
      this.$router.push('/#products')
    },
    
    scrollToContact() {
      this.$router.push('/#contact')
    },
    
    updateDocumentTitle() {
      if (this.product?.title) {
        document.title = `${this.product.title} - PT. Manunggal Merdeka Makmur`
      }
    },
    
    getPlaceholder() {
      return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E'
    }
  }
}
</script>