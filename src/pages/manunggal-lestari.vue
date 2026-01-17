<template>
  <div class="product-detail-page">
    <section class="breadcrumb">
      <div class="container">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><router-link to="/">Beranda</router-link></li>
            <li><a href="/#products" @click.prevent="scrollToProducts">Produk</a></li>
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
              <div class="image-placeholder">
                <div class="image-spinner"></div>
              </div>
              <img 
                :src="getPlaceholder()" 
                :data-src="currentImage" 
                :alt="product.title" 
                class="main-image"
                loading="eager"
                decoding="async"
                @load="onImageLoad"
              />
            </div>
            <div class="thumbnail-gallery" v-if="product.images && product.images.length > 1">
              <div 
                v-for="(image, index) in product.images" 
                :key="index"
                :class="['thumbnail-item', { active: currentImageIndex === index }]"
                @click="changeImage(image, index)"
              >
                <div class="image-placeholder">
                  <div class="image-spinner"></div>
                </div>
                <img 
                  :src="getPlaceholder()" 
                  :data-src="image" 
                  :alt="`${product.title} ${index + 1}`" 
                  loading="lazy"
                />
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
              <h3><i class="fas fa-clipboard-list"></i> Deskripsi PHC Manunggal Lestari</h3>
              <ul>
                <li v-for="(spec, index) in product.specs" :key="`spec-${index}`">{{ spec }}</li>
              </ul>
            </div>
            
            <div class="product-benefits">
              <h3><i class="fas fa-check-circle"></i> Manfaat PHC Manunggal Lestari</h3>
              <ul>
                <li v-for="(benefit, index) in product.benefits" :key="`benefit-${index}`">{{ benefit }}</li>
              </ul>
            </div>
                        
            <div class="product-features">
              <h3><i class="fas fa-star"></i> Spesifikasi PHC Manunggal Lestari</h3>
              <ul>
                <li v-for="(feature, index) in product.features" :key="`feature-${index}`">{{ feature }}</li>
              </ul>
            </div>
            
            <div class="product-actions">
              <a href="/#contact" class="btn btn-primary" @click.prevent="scrollToContact">
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
          <div class="related-products-grid">
            <div class="related-product-card">
              <div class="related-product-img">
                <div class="image-placeholder">
                  <div class="image-spinner"></div>
                </div>
                <img 
                  src="https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461388/triobionik_c1jaie.webp" 
                  alt="PHP Triobionik" 
                  loading="lazy"
                />
              </div>
              <div class="related-product-info">
                <h4>PHP Triobionik</h4>
                <p>Pupuk Hayati Padat dengan tiga manfaat utama untuk berbagai jenis tanaman.</p>
                <router-link to="/triobionik" class="related-product-link">
                  Lihat Detail <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
            <div class="related-product-card">
              <div class="related-product-img">
                <div class="image-placeholder">
                  <div class="image-spinner"></div>
                </div>
                <img 
                  src="https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461343/manunggal-makmur_l37kqf.webp" 
                  alt="Manunggal Makmur" 
                  loading="lazy"
                />
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
                <div class="image-placeholder">
                  <div class="image-spinner"></div>
                </div>
                <img 
                  src="https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461354/ptorca_nxre0r.webp" 
                  alt="PTORCA" 
                  loading="lazy"
                />
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
import { getProductById } from '@/data/product.js'

export default {
  name: 'ManunggalLestari',
  
  data() {
    return {
      currentImageIndex: 0,
      showModal: false,
      modalImage: '',
      product: {},
      isLoading: true
    }
  },
  
  computed: {
    currentImage() {
      return this.product.images ? this.product.images[this.currentImageIndex] : ''
    }
  },
  
  async mounted() {
    await this.loadProduct()
    
    this.isLoading = false
    
    setTimeout(() => {
      if (window.App && window.App.lazyLoader) {
        window.App.lazyLoader.scan(this.$el)
        
        const images = this.$el.querySelectorAll('img[data-src]')
        images.forEach(img => {
          const rect = img.getBoundingClientRect()
          if (rect.top < window.innerHeight + 500) {
            window.App.lazyLoader.loadImage(img)
          }
        })
      }
    }, 300)
  },
  
  methods: {
    async loadProduct() {
      this.product = getProductById('phc-manunggal-lestari') || {}
      document.title = `${this.product.title} - PT. Manunggal Merdeka Makmur`
      
      if (this.product.images && this.product.images[0]) {
        const img = new Image()
        img.onload = () => {
          console.log('Manunggal Lestari image preloaded')
        }
        img.src = this.product.images[0]
      }
    },
    
    getPlaceholder() {
      return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"%3E%3Crect fill="%23f5f5f5" width="600" height="400"/%3E%3C/svg%3E'
    },
    
    onImageLoad(e) {
      const img = e.target
      img.classList.add('image-loaded')
      const placeholder = img.parentElement.querySelector('.image-placeholder')
      if (placeholder) {
        placeholder.style.opacity = '0'
        setTimeout(() => {
          placeholder.style.display = 'none'
        }, 300)
      }
    },
    
    changeImage(image, index) {
      this.currentImageIndex = index
      
      const mainImg = document.querySelector('.main-image')
      if (mainImg) {
        mainImg.classList.remove('image-loaded')
        mainImg.src = this.getPlaceholder()
        mainImg.dataset.src = image
        
        const placeholder = mainImg.parentElement.querySelector('.image-placeholder')
        if (placeholder) {
          placeholder.style.display = 'flex'
          placeholder.style.opacity = '1'
        }
        
        setTimeout(() => {
          if (window.App && window.App.lazyLoader) {
            window.App.lazyLoader.loadImage(mainImg)
          }
        }, 50)
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
    }
  }
}
</script>