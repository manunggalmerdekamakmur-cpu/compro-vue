<template>
  <div v-if="product" class="product-detail-page">
    <section class="breadcrumb">
      <div class="container">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><router-link to="/">Beranda</router-link></li>
            <li><a href="/#products" @click.prevent="scrollToProducts">Produk</a></li>
            <li><router-link to="/triobionik">Triobionik</router-link></li>
            <li class="current">{{ product.name }}</li>
          </ol>
        </nav>
      </div>
    </section>

    <section class="product-detail-page">
      <div class="container">
        <div class="product-detail-container">
          <div class="product-images">
            <div class="main-image-container" @click="openImageModal">
              <img
                :src="getPlaceholder()"
                :data-src="currentImageSrc"
                :alt="product.name"
                class="main-image"
                width="600"
                height="400"
                v-lazy
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
            </div>
            
            <div class="thumbnail-gallery" v-if="product.images && product.images.length > 1">
              <div 
                v-for="(image, index) in product.images" 
                :key="index"
                :class="['thumbnail-item', { active: currentImageIndex === index }]"
                @click="changeImage(image, index)"
              >
                <img
                  :src="getPlaceholder()"
                  :data-src="image"
                  :alt="`${product.name} ${index + 1}`"
                  width="80"
                  height="80"
                  v-lazy
                  loading="lazy"
                />
              </div>
            </div>
            
            <div class="product-brochure" v-if="product.brochure">
              <embed 
                :src="product.brochure"
                type="application/pdf"
                class="product-pdf-embed"
              />
            </div>

            <div class="product-stats-detail">
              <div class="product-stat-item">
                <i class="fas fa-certificate"></i>
                <h4>Berizin</h4>
                <p>{{ product.certificate || 'Terdaftar' }}</p>
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

          <div class="product-info">
            <div class="product-header">
              <h1>{{ product.title || product.name }}</h1>
              <div class="product-badge badge-approved" v-if="product.badge">{{ product.badge }}</div>
              <div class="certificate-badge" v-if="product.certificate">
                <i class="fas fa-certificate"></i>
                <span>Izin Edar No: {{ product.certificate }}</span>
              </div>
            </div>
            
            <p class="product-description">{{ product.description }}</p>
            
            <div class="product-specs" v-if="product.specs">
              <h3><i class="fas fa-clipboard-list"></i> Spesifikasi Produk</h3>
              <ul>
                <li v-for="(spec, index) in product.specs" :key="`spec-${index}`">{{ spec }}</li>
              </ul>
            </div>
            
            <div class="product-features" v-if="product.features">
              <h3><i class="fas fa-star"></i> Kandungan Mikroorganisme</h3>
              <ul>
                <li v-for="(feature, index) in product.features" :key="`feature-${index}`">{{ feature }}</li>
              </ul>
            </div>
            
            <div class="product-benefits" v-if="product.benefits">
              <h3><i class="fas fa-check-circle"></i> Manfaat</h3>
              <ul>
                <li v-for="(benefit, index) in product.benefits" :key="`benefit-${index}`">{{ benefit }}</li>
              </ul>
            </div>
            
            <div class="product-actions">
              <a href="/#contact" class="btn btn-primary" @click.prevent="scrollToContact">
                <i class="fab fa-whatsapp"></i> Pesan Sekarang
              </a>
              <router-link to="/triobionik" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Lihat Produk Lain
              </router-link>
            </div>
          </div>
        </div>

        <section class="related-products">
          <div class="section-title">
            <h2>Produk Triobionik Lainnya</h2>
            <p>Telusuri produk berkualitas lainnya dari PT. Manunggal Merdeka Makmur</p>
          </div>
          <div class="related-products-grid">
            <router-link
              v-for="related in relatedProducts"
              :key="related.id"
              :to="`/triobionik/${related.id}`"
              class="related-product-card"
            >
              <div class="related-product-img">
                <img
                  :src="getPlaceholder()"
                  :data-src="related.image"
                  :alt="related.name"
                  width="300"
                  height="200"
                  v-lazy
                  loading="lazy"
                />
              </div>
              <div class="related-product-info">
                <h4>{{ related.name }}</h4>
                <p>{{ related.shortDesc }}</p>
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
        <button class="modal-close" @click="closeModal">&times;</button>
        <div class="modal-main-image">
          <img :src="modalImage" :alt="product.name">
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="loading-state">
    <div class="spinner"></div>
  </div>
</template>

<script>
import { getTriobionikVariantById, getTriobionikVariants } from '../data/product.js'

export default {
  name: 'TriobionikDetail',
  
  data() {
    return {
      product: null,
      currentImage: '',
      currentImageIndex: 0,
      relatedProducts: [],
      showModal: false,
      modalImage: '',
      imageTransitioning: false,
      isLoading: true,
      preloadedImages: []
    }
  },
  
  computed: {
    currentImageSrc() {
      return this.product?.images?.[this.currentImageIndex] || this.currentImage
    }
  },
  
  async beforeMount() {
    await this.preloadAllImages()
    await this.loadProduct()
  },
  
  mounted() {
    this.debounceUpdate = this.debounce(() => {
      this.isLoading = false
      setTimeout(() => {
        if (window.App && window.App.lazyLoader) {
          window.App.lazyLoader.scan()
        }
      }, 200)
    }, 300)
    this.debounceUpdate()
  },
  
  watch: {
    '$route.params.id': {
      async handler() {
        await this.preloadAllImages()
        await this.loadProduct()
      }
    }
  },
  
  methods: {
    debounce(fn, delay) {
      let timer
      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn(...args), delay)
      }
    },
    
    async preloadAllImages() {
      const images = []
      
      const id = this.$route.params.id
      const current = getTriobionikVariantById(id)
      if (current) {
        if (current.image) images.push(current.image)
        if (current.images && current.images.length > 0) {
          images.push(...current.images)
        }
      }
      
      const all = getTriobionikVariants()
      all.forEach(variant => {
        if (variant.id !== id) {
          if (variant.image) images.push(variant.image)
        }
      })
      
      await Promise.all(
        images.map(src => {
          return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
              this.preloadedImages.push(src)
              resolve()
            }
            img.onerror = resolve
            img.src = src
          })
        })
      )
    },
    
    async loadProduct() {
      await new Promise(resolve => setTimeout(resolve, 100))
      const id = this.$route.params.id
      this.product = getTriobionikVariantById(id)
      
      if (this.product) {
        this.currentImage = this.product.image || this.product.images?.[0] || ''
        this.currentImageIndex = 0
        document.title = `${this.product.name} - PT. Manunggal Merdeka Makmur`
        await this.loadRelatedProducts()
      }
    },
    
    async loadRelatedProducts() {
      await new Promise(resolve => setTimeout(resolve, 100))
      const all = getTriobionikVariants()
      this.relatedProducts = all
        .filter(v => v.id !== this.product.id)
        .slice(0, 3)
    },
    
    changeImage(image, index) {
      if (this.imageTransitioning || this.currentImageIndex === index) return
      
      this.imageTransitioning = true
      const mainImg = document.querySelector('.main-image')
      
      if (mainImg) {
        mainImg.style.opacity = '0'
        setTimeout(() => {
          this.currentImageIndex = index
          this.currentImage = image
          mainImg.style.opacity = '1'
          this.imageTransitioning = false
        }, 200)
      } else {
        this.currentImageIndex = index
        this.currentImage = image
        this.imageTransitioning = false
      }
    },
    
    openImageModal() {
      this.modalImage = this.currentImageSrc
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
    
    getPlaceholder() {
      return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"%3E%3Crect fill="%23f0f0f0" width="300" height="300"/%3E%3C/svg%3E'
    }
  }
}
</script>