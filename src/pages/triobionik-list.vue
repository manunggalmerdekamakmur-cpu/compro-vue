<template>
  <div class="product-detail-page">
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
          <router-link
            v-for="variant in variants"
            :key="variant.id"
            :to="`/triobionik/${variant.id}`"
            class="related-product-card"
          >
            <div class="related-product-img">
              <img
                :src="getPlaceholder()"
                :data-src="variant.image"
                :alt="variant.name"
                width="300"
                height="200"
                loading="lazy"
                decoding="async"
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
            <router-link
              v-for="product in relatedProducts"
              :key="product.id"
              :to="getProductLink(product)"
              class="related-product-card"
            >
              <div class="related-product-img">
                <img
                  :src="getPlaceholder()"
                  :data-src="product.images[0]"
                  :alt="product.title"
                  width="300"
                  height="200"
                  loading="lazy"
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
  </div>
</template>

<script>
import { getTriobionikVariants, getApprovedProducts } from '@/data/product.js'

export default {
  name: 'TriobionikList',
  
  data() {
    return {
      variants: [],
      relatedProducts: []
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
      this.variants = getTriobionikVariants()
      this.relatedProducts = getApprovedProducts().slice(0, 3)
      
      await this.preloadFirstImages()
    },
    
    async preloadFirstImages() {
      const firstTwo = this.variants.slice(0, 2)
      const promises = firstTwo.map(variant => {
        if (!variant.image) return Promise.resolve()
        
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = resolve
          img.src = variant.image
          setTimeout(resolve, 1000)
        })
      })
      
      await Promise.race([
        Promise.all(promises),
        new Promise(resolve => setTimeout(resolve, 600))
      ])
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
    }
  }
}
</script>