<template>
  <div class="product-detail-page">
    <div v-if="loading" class="product-detail-skeleton">
      <div class="container">
        <div class="skeleton-breadcrumb">
          <div class="skeleton-breadcrumb-item"></div>
          <div class="skeleton-breadcrumb-item"></div>
          <div class="skeleton-breadcrumb-item short"></div>
        </div>
        
        <div class="product-detail-skeleton-container">
          <div class="skeleton-images">
            <div class="skeleton-main-image">
              <div class="image-spinner"></div>
            </div>
            <div class="skeleton-thumbnails">
              <div v-for="n in 4" :key="n" class="skeleton-thumbnail"></div>
            </div>
            <div class="skeleton-stats">
              <div v-for="n in 3" :key="n" class="skeleton-stat-item">
                <div class="skeleton-stat-icon"></div>
                <div class="skeleton-stat-text"></div>
                <div class="skeleton-stat-text short"></div>
              </div>
            </div>
          </div>
          
          <div class="skeleton-info">
            <div class="skeleton-header">
              <div class="skeleton-title"></div>
              <div class="skeleton-badge"></div>
              <div class="skeleton-badge"></div>
            </div>
            
            <div class="skeleton-description">
              <div class="skeleton-text"></div>
              <div class="skeleton-text"></div>
              <div class="skeleton-text"></div>
              <div class="skeleton-text short"></div>
            </div>
            
            <div class="skeleton-specs">
              <div class="skeleton-subtitle"></div>
              <div v-for="n in 5" :key="n" class="skeleton-spec-item">
                <div class="skeleton-spec-text"></div>
              </div>
            </div>
            
            <div class="skeleton-features">
              <div class="skeleton-subtitle"></div>
              <div v-for="n in 3" :key="n" class="skeleton-feature-item">
                <div class="skeleton-feature-text"></div>
              </div>
            </div>
            
            <div class="skeleton-buttons">
              <div class="skeleton-button"></div>
              <div class="skeleton-button"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <template v-else>
      <section class="breadcrumb">
        <div class="container">
          <nav aria-label="Breadcrumb">
            <ol>
              <li><router-link to="/">Beranda</router-link></li>
              <li><router-link to="/#products">Produk</router-link></li>
              <li v-if="breadcrumbParent">
                <router-link :to="breadcrumbParent.to">{{ breadcrumbParent.name }}</router-link>
              </li>
              <li class="current">{{ product.title || product.name }}</li>
            </ol>
          </nav>
        </div>
      </section>

      <section class="product-detail">
        <div class="container">
          <div class="product-detail-container">
            <div class="product-images">
<div class="main-image-container" @click="openImageModal">
              <div class="image-placeholder" aria-hidden="true"></div>
              <img
                :src="currentImage"            
                :alt="product.title || product.name"
                class="main-image"
                :loading="currentImageIndex === 0 ? 'eager' : 'lazy'"
                fetchpriority="high"           
                @load="handleImageLoad"
                @error="handleImageError"
                width="900" height="600"        
                style="aspect-ratio: 3 / 2; width:100%; height:auto; max-height:500px; object-fit:contain; display:block; background:#f5f5f5;"
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
                  <div class="image-placeholder">
                    <div class="image-spinner"></div>
                  </div>
                  <img 
                    :src="getPlaceholder()" 
                    :data-src="image" 
                    :alt="`${product.title || product.name} ${index + 1}`" 
                    loading="lazy"
                    @load="handleThumbnailLoad(index)"
                    @error="handleThumbnailError(index)"
                  />
                </button>
              </div>
              
              <div v-if="product.brochure" class="product-brochure">
                <embed 
                  :src="product.brochure"
                  type="application/pdf"
                  class="product-pdf-embed"
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
  <h1>{{ product.title || product.name }}</h1>

  <div
    :class="[
      'product-badge',
      product.status === 'approved' ? 'badge-approved' : 'badge-coming'
    ]"
  >
    {{ product.badge }}
  </div>
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
                <a href="https://wa.me/6285199265858"
                  target="_blank"
                  rel="noopener"
                  class="btn btn-primary"
                  @click="openWhatsApp">
                  <i class="fab fa-whatsapp"></i> Pesan Sekarang
                </a>
                <router-link to="/#products" class="btn btn-secondary">
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
            
            <div v-if="relatedLoading" class="related-products-grid">
              <div v-for="n in 3" :key="n" class="related-product-card related-product-skeleton">
                <div class="skeleton-img">
                  <div class="image-spinner"></div>
                </div>
                <div class="skeleton-content">
                  <div class="skeleton-title"></div>
                  <div class="skeleton-text"></div>
                  <div class="skeleton-text short"></div>
                </div>
              </div>
            </div>
            
            <div v-else class="related-products-grid">
              <router-link
                v-for="related in relatedProducts"
                :key="related.id"
                :to="getRelatedLink(related)"
                class="related-product-card"
              >
                <div class="related-product-img">
                  <div class="image-placeholder">
                    <div class="image-spinner"></div>
                  </div>
                  <img 
                    :src="getPlaceholder()" 
                    :data-src="getRelatedImage(related)" 
                    :alt="related.title || related.name" 
                    loading="lazy"
                    @load="handleRelatedImageLoad(related)"
                    @error="handleRelatedImageError(related)"
                  />
                </div>
                <div class="related-product-info">
                  <h4>{{ related.title || related.name }}</h4>
                  <p>{{ truncateDescription(related.description || related.shortDesc) }}</p>
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
            <img :src="modalImage" :alt="product.title || product.name" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { getRelatedProducts } from '@/data/product.js'

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
    },
    breadcrumbParent: {
      type: Object,
      default: null
    }
  },
  
  data() {
    return {
      currentImageIndex: 0,
      showModal: false,
      modalImage: '',
      imageTransitioning: false,
      loading: false,
      relatedProducts: [],
      relatedLoading: true,
      imagesLoaded: {},
      thumbnailsLoaded: {},
      relatedImagesLoaded: {}
    }
  },
  
  computed: {
    currentImage() {
      return this.product.images?.[this.currentImageIndex] || this.product.image || ''
    }
  },
  
  watch: {
    product: {
      handler(newVal) {
        if (newVal && newVal.id) {
          this.currentImageIndex = 0
          this.updateDocumentTitle()
          this.loadRelatedProducts()
        }
      },
      immediate: true
    }
  },
  
  async mounted() {
    await this.loadProductData()
    this.updateDocumentTitle()
    this.initializeLazyLoad()
  },
  
  methods: {
    async loadProductData() {
      this.loading = true
      
      await Promise.race([
        this.preloadMainImage(),
        new Promise(resolve => setTimeout(resolve, 500))
      ])
      
      this.loading = false
    },
    
    async loadRelatedProducts() {
      this.relatedLoading = true
      
      await new Promise(resolve => setTimeout(resolve, 300))
      
      this.relatedProducts = getRelatedProducts(this.product.id, 3)
      this.relatedLoading = false
      
      this.$nextTick(() => {
        if (window.App && window.App.lazyLoader) {
          window.App.lazyLoader.scan()
        }
      })
    },
    
    async preloadMainImage() {
      if (!this.currentImage) return
      
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = resolve
        img.src = this.currentImage
        setTimeout(resolve, 800)
      })
    },
    
    initializeLazyLoad() {
      this.$nextTick(() => {
        setTimeout(() => {
          if (window.App && window.App.lazyLoader) {
            window.App.lazyLoader.scan()
            
            const mainImg = this.$el.querySelector('.main-image')
            if (mainImg && mainImg.dataset.src) {
              window.App.lazyLoader.loadImage(mainImg)
            }
          }
        }, 150)
      })
    },
    
    changeImage(image, index) {
      if (this.imageTransitioning || this.currentImageIndex === index) return
      
      this.imageTransitioning = true
      const mainImg = this.$el.querySelector('.main-image')
      
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
    
    getRelatedLink(related) {
      const routeMap = {
        'phc-manunggal-lestari': '/manunggal-lestari',
        'phc-manunggal-lestari-dekomposer': '/manunggal-lestari-dekomposer',
        'php-triobionik': '/triobionik',
        'manunggal-makmur': '/manunggal-makmur',
        'ptorca': '/ptorca'
      }
      
      if (routeMap[related.id]) {
        return routeMap[related.id]
      }
      
      if (related.id && related.id.includes('triobionik')) {
        return `/triobionik/${related.id}`
      }
      
      return '/'
    },
    
    getRelatedImage(related) {
      return related.images?.[0] || related.image || ''
    },
    
    truncateDescription(desc) {
      if (!desc) return ''
      return desc.length > 100 ? desc.substring(0, 100) + '...' : desc
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
    
    updateDocumentTitle() {
      if (this.product?.title || this.product?.name) {
        const title = this.product.title || this.product.name
        document.title = `${title} - PT. Manunggal Merdeka Makmur`
      }
    },
    
    getPlaceholder() {
      return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E'
    },
    
    openWhatsApp() {
      window.open("https://wa.me/6285199265858", "_blank")
    },
    
    handleImageLoad(event) {
      const img = event.target
      img.classList.add('image-loaded')
      const placeholder = img.previousElementSibling
      if (placeholder && placeholder.classList.contains('image-placeholder')) {
        placeholder.style.opacity = '0'
        setTimeout(() => {
          placeholder.style.display = 'none'
        }, 300)
      }
    },
    
    handleImageError(event) {
      const img = event.target
      img.classList.add('image-error')
      const placeholder = img.previousElementSibling
      if (placeholder && placeholder.classList.contains('image-placeholder')) {
        placeholder.style.opacity = '0'
        setTimeout(() => {
          placeholder.style.display = 'none'
        }, 300)
      }
    },
    
    handleThumbnailLoad(index) {
      const thumbnails = this.$el.querySelectorAll('.thumbnail-item img')
      if (thumbnails[index]) {
        thumbnails[index].classList.add('image-loaded')
        const placeholder = thumbnails[index].previousElementSibling
        if (placeholder && placeholder.classList.contains('image-placeholder')) {
          placeholder.style.opacity = '0'
          setTimeout(() => {
            placeholder.style.display = 'none'
          }, 300)
        }
      }
    },
    
    handleThumbnailError(index) {
      const thumbnails = this.$el.querySelectorAll('.thumbnail-item img')
      if (thumbnails[index]) {
        thumbnails[index].classList.add('image-error')
        const placeholder = thumbnails[index].previousElementSibling
        if (placeholder && placeholder.classList.contains('image-placeholder')) {
          placeholder.style.opacity = '0'
          setTimeout(() => {
            placeholder.style.display = 'none'
          }, 300)
        }
      }
    },
    
    handleRelatedImageLoad(related) {
      this.relatedImagesLoaded[related.id] = true
      const cards = this.$el.querySelectorAll('.related-product-card')
      cards.forEach(card => {
        const img = card.querySelector('img')
        if (img && img.dataset.src === this.getRelatedImage(related)) {
          img.classList.add('image-loaded')
          const placeholder = img.previousElementSibling
          if (placeholder && placeholder.classList.contains('image-placeholder')) {
            placeholder.style.opacity = '0'
            setTimeout(() => {
              placeholder.style.display = 'none'
            }, 300)
          }
        }
      })
    },
    
    handleRelatedImageError(related) {
      this.relatedImagesLoaded[related.id] = true
      const cards = this.$el.querySelectorAll('.related-product-card')
      cards.forEach(card => {
        const img = card.querySelector('img')
        if (img && img.dataset.src === this.getRelatedImage(related)) {
          img.classList.add('image-error')
          const placeholder = img.previousElementSibling
          if (placeholder && placeholder.classList.contains('image-placeholder')) {
            placeholder.style.opacity = '0'
            setTimeout(() => {
              placeholder.style.display = 'none'
            }, 300)
          }
        }
      })
    }
  }
}
</script>