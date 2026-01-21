<template>
  <section class="products section-bg no-gap-section" id="products">
    <div class="container">
      <div class="section-title">
        <h2>Produk Unggulan Kami</h2>
        <p>Produk pupuk hayati dan organik berkualitas untuk mendukung pertanian berkelanjutan</p>
      </div>
      
      <div class="product-filter">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          :class="['filter-btn', { active: activeFilter === filter.value }]"
          @click="setFilter(filter.value)"
        >
          <i :class="filter.icon"></i> {{ filter.label }}
        </button>
      </div>
      
      <div v-if="isLoading" class="products-grid">
        <div v-for="n in 4" :key="`skeleton-${n}`" class="product-card product-skeleton">
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
      
      <div v-else class="products-grid">
        <router-link 
          v-for="product in visibleProducts" 
          :key="product.id" 
          :to="getProductLink(product)" 
          class="product-card"
        >
          <div class="product-img">
            <div class="image-placeholder">
              <div class="image-spinner"></div>
            </div>
            <img 
              :src="getPlaceholder()" 
              :data-src="getProductImage(product)" 
              :alt="product.title" 
              width="300"
              height="200"
              loading="lazy"
              decoding="async"
            />
            <span :class="['product-badge', product.status === 'approved' ? 'badge-approved' : 'badge-coming']">
              {{ product.badge }}
            </span>
          </div>
          <div class="product-info">
            <h3>{{ product.title }}</h3>
            <p>{{ truncateDescription(product.description) }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { getAllProducts } from '@/data/product.js'

export default {
  name: 'ProductsSection',
  
  data() {
    return {
      products: [],
      activeFilter: 'all',
      isLoading: true,
      filters: [
        { value: 'all', label: 'Semua Produk', icon: 'fas fa-boxes' },
        { value: 'approved', label: 'Berizin', icon: 'fas fa-certificate' },
        { value: 'coming-soon', label: 'Segera Hadir', icon: 'fas fa-clock' }
      ]
    }
  },
  
  computed: {
    visibleProducts() {
      if (this.activeFilter === 'all') return this.products
      return this.products.filter(p => p.status === this.activeFilter)
    }
  },
  
  async beforeMount() {
    await this.loadProducts()
  },
  
  mounted() {
    this.initializeLazyLoad()
  },
  
  beforeUnmount() {
    this.products = []
  },
  
  methods: {
    async loadProducts() {
      try {
        this.products = getAllProducts()
        await this.preloadFirstImages()
        this.isLoading = false
      } catch (error) {
        console.error('Error loading products:', error)
        this.isLoading = false
      }
    },
    
    async preloadFirstImages() {
      const firstProducts = this.products.slice(0, 2)
      const promises = firstProducts.map(product => {
        const imgSrc = this.getProductImage(product)
        if (!imgSrc) return Promise.resolve()
        
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = resolve
          img.src = imgSrc
          setTimeout(resolve, 1000)
        })
      })
      
      await Promise.race([
        Promise.all(promises),
        new Promise(resolve => setTimeout(resolve, 800))
      ])
    },
    
    initializeLazyLoad() {
      this.$nextTick(() => {
        setTimeout(() => {
          if (window.App && window.App.lazyLoader) {
            window.App.lazyLoader.scan()
            
            const images = this.$el.querySelectorAll('img[data-src]')
            images.forEach(img => {
              const rect = img.getBoundingClientRect()
              if (rect.top < window.innerHeight + 300) {
                window.App.lazyLoader.loadImage(img)
              }
            })
          }
        }, 100)
      })
    },
    
    setFilter(value) {
      this.activeFilter = value
    },
    
    getPlaceholder() {
      return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect fill="%23f5f5f5" width="300" height="200"/%3E%3C/svg%3E'
    },
    
    getProductImage(product) {
      return product.images?.[0] || product.image || ''
    },
    
    truncateDescription(desc) {
      if (!desc) return ''
      return desc.length > 100 ? desc.substring(0, 100) + '...' : desc
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
    }
  }
}
</script>