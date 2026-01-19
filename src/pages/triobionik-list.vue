<template>
  <div class="product-detail-page">
    <div v-if="loading" class="triobionik-list-skeleton">
      <div class="container">
        <div class="skeleton-breadcrumb">
          <div class="skeleton-breadcrumb-item"></div>
          <div class="skeleton-breadcrumb-item"></div>
          <div class="skeleton-breadcrumb-item short"></div>
        </div>
        
        <div class="skeleton-header">
          <div class="skeleton-title"></div>
          <div class="skeleton-subtitle"></div>
        </div>
        
        <div class="skeleton-variants-grid">
          <div v-for="n in 6" :key="n" class="skeleton-variant-card">
            <div class="skeleton-variant-img">
              <div class="image-spinner"></div>
            </div>
            <div class="skeleton-variant-content">
              <div class="skeleton-title"></div>
              <div class="skeleton-text"></div>
              <div class="skeleton-text short"></div>
            </div>
          </div>
        </div>
        
        <div class="skeleton-related-section">
          <div class="skeleton-section-title">
            <div class="skeleton-title"></div>
            <div class="skeleton-subtitle"></div>
          </div>
          
          <div class="skeleton-related-grid">
            <div v-for="n in 3" :key="n" class="skeleton-related-card">
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
              <li class="current">Triobionik</li>
            </ol>
          </nav>
        </div>
      </section>

      <section class="product-detail-page">
        <div class="container">
          <div class="section-title">
            <h1>Produk Triobionik</h1>
            <p>Berbagai varian pupuk hayati berkualitas untuk pertanian dan perkebunan</p>
          </div>

          <div class="related-products-grid">
            <div v-if="variantsLoading" class="variants-loading">
              <div v-for="n in 6" :key="n" class="related-product-card related-product-skeleton">
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
            
            <router-link
              v-for="variant in variants"
              :key="variant.id"
              :to="`/triobionik/${variant.id}`"
              class="related-product-card"
            >
              <div class="related-product-img">
                <div class="image-placeholder">
                  <div class="image-spinner"></div>
                </div>
                <img
                  :src="getPlaceholder()"
                  :data-src="variant.image"
                  :alt="variant.name"
                  width="300"
                  height="200"
                  loading="lazy"
                  decoding="async"
                  @load="handleVariantImageLoad(variant)"
                  @error="handleVariantImageError(variant)"
                />
                <span v-if="variant.badge" class="product-badge badge-approved">{{ variant.badge }}</span>
              </div>
              <div class="related-product-info">
                <h4>{{ variant.name }}</h4>
                <p>{{ variant.shortDesc }}</p>
                <span class="related-product-link">
                  Lihat Detail <i class="fas fa-arrow-right"></i>
                </span>
              </div>
            </router-link>
          </div>

          <section class="related-products">
            <div class="section-title">
              <h2>Produk Lainnya</h2>
              <p>Telusuri produk berkualitas lainnya dari PT. Manunggal Merdeka Makmur</p>
            </div>
            <div class="related-products-grid">
              <div v-if="relatedLoading" class="related-loading">
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
              
              <router-link
                v-for="product in relatedProducts"
                :key="product.id"
                :to="getProductLink(product)"
                class="related-product-card"
              >
                <div class="related-product-img">
                  <div class="image-placeholder">
                    <div class="image-spinner"></div>
                  </div>
                  <img
                    :src="getPlaceholder()"
                    :data-src="product.images[0]"
                    :alt="product.title"
                    width="300"
                    height="200"
                    loading="lazy"
                    @load="handleRelatedImageLoad(product)"
                    @error="handleRelatedImageError(product)"
                  />
                </div>
                <div class="related-product-info">
                  <h4>{{ product.title }}</h4>
                  <p>{{ truncateDescription(product.description) }}</p>
                  <span class="related-product-link">
                    Lihat Detail <i class="fas fa-arrow-right"></i>
                  </span>
                </div>
              </router-link>
            </div>
          </section>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import { getTriobionikVariants, getApprovedProducts } from '@/data/product.js'

export default {
  name: 'TriobionikList',
  
  data() {
    return {
      variants: [],
      relatedProducts: [],
      loading: true,
      variantsLoading: true,
      relatedLoading: true,
      variantImagesLoaded: {},
      relatedImagesLoaded: {}
    }
  },
  
  async beforeMount() {
    await this.loadData()
  },
  
  mounted() {
    document.title = 'Triobionik - PT. Manunggal Merdeka Makmur'
    this.initializeLazyLoad()
  },
  
  methods: {
    async loadData() {
      this.loading = true
      this.variantsLoading = true
      this.relatedLoading = true
      
      this.variants = getTriobionikVariants()
      this.relatedProducts = getApprovedProducts().slice(0, 3)
      
      await Promise.race([
        this.preloadImages(),
        new Promise(resolve => setTimeout(resolve, 600))
      ])
      
      this.loading = false
      this.variantsLoading = false
      this.relatedLoading = false
    },
    
    async preloadImages() {
      const imagesToLoad = [
        ...this.variants.slice(0, 3).map(v => v.image),
        ...this.relatedProducts.slice(0, 2).map(p => p.images[0])
      ].filter(src => src)
      
      const promises = imagesToLoad.map(src => {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = resolve
          img.src = src
          setTimeout(resolve, 1000)
        })
      })
      
      await Promise.all(promises)
    },
    
    initializeLazyLoad() {
      this.$nextTick(() => {
        setTimeout(() => {
          if (window.App && window.App.lazyLoader) {
            window.App.lazyLoader.scan()
          }
        }, 150)
      })
    },
    
    getPlaceholder() {
      return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E'
    },
    
    getProductLink(product) {
      const routes = {
        'phc-manunggal-lestari': '/manunggal-lestari',
        'phc-manunggal-lestari-dekomposer': '/manunggal-lestari-dekomposer',
        'php-triobionik': '/triobionik',
        'manunggal-makmur': '/manunggal-makmur',
        'ptorca': '/ptorca'
      }
      return routes[product.id] || '/'
    },
    
    truncateDescription(desc) {
      if (!desc) return ''
      return desc.length > 100 ? desc.substring(0, 100) + '...' : desc
    },
    
    handleVariantImageLoad(variant) {
      this.$set(this.variantImagesLoaded, variant.id, true)
      const cards = this.$el.querySelectorAll('.related-product-card')
      cards.forEach(card => {
        const img = card.querySelector('img')
        if (img && img.dataset.src === variant.image) {
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
    
    handleVariantImageError(variant) {
      this.$set(this.variantImagesLoaded, variant.id, true)
      const cards = this.$el.querySelectorAll('.related-product-card')
      cards.forEach(card => {
        const img = card.querySelector('img')
        if (img && img.dataset.src === variant.image) {
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
    },
    
    handleRelatedImageLoad(product) {
      this.$set(this.relatedImagesLoaded, product.id, true)
      const cards = this.$el.querySelectorAll('.related-product-card')
      cards.forEach(card => {
        const img = card.querySelector('img')
        if (img && img.dataset.src === product.images[0]) {
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
    
    handleRelatedImageError(product) {
      this.$set(this.relatedImagesLoaded, product.id, true)
      const cards = this.$el.querySelectorAll('.related-product-card')
      cards.forEach(card => {
        const img = card.querySelector('img')
        if (img && img.dataset.src === product.images[0]) {
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