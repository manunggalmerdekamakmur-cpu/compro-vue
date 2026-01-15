<template>
  <div v-if="product" class="product-detail-page">
    <section class="product-hero">
      <div class="container">
        <div class="breadcrumb">
          <router-link to="/">Beranda</router-link>
          <span>/</span>
          <router-link to="/triobionik">Triobionik</router-link>
          <span>/</span>
          <span>{{ product.name }}</span>
        </div>
      </div>
    </section>
    
    <section class="product-detail">
      <div class="container">
        <div class="product-layout">
          <div class="product-gallery">
            <div class="main-image-container">
              <img
                :src="currentImage"
                :alt="product.name"
                class="main-image"
                loading="eager"
                decoding="sync"
                fetchpriority="high"
              />
            </div>
            
            <div v-if="product.images && product.images.length > 1" class="thumbnails">
              <button
                v-for="(img, index) in product.images"
                :key="index"
                class="thumbnail-item"
                :class="{ active: currentImage === img }"
                @click="selectImage(img)"
                :aria-label="`Lihat gambar ${index + 1}`"
              >
                <img :src="img" :alt="`${product.name} - gambar ${index + 1}`" loading="lazy" />
              </button>
            </div>
          </div>
          
          <div class="product-info">
            <div class="product-header">
              <h1>{{ product.title }}</h1>
              <span v-if="product.badge" class="status-badge">{{ product.badge }}</span>
            </div>
            
            <p class="product-description">{{ product.description }}</p>
            
            <div v-if="product.specs" class="specs-section">
              <h3>Spesifikasi</h3>
              <ul>
                <li v-for="(spec, index) in product.specs" :key="index">{{ spec }}</li>
              </ul>
            </div>
            
            <div v-if="product.features" class="features-section">
              <h3>Kandungan Mikroorganisme</h3>
              <ul>
                <li v-for="(feature, index) in product.features" :key="index">{{ feature }}</li>
              </ul>
            </div>
            
            <div v-if="product.benefits" class="benefits-section">
              <h3>Manfaat</h3>
              <ul>
                <li v-for="(benefit, index) in product.benefits" :key="index">{{ benefit }}</li>
              </ul>
            </div>
            
            <div v-if="product.brochure" class="actions">
              <a :href="product.brochure" download class="btn btn-primary">
                <i class="fas fa-download"></i> Unduh Brosur
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="related-products">
      <div class="container">
        <h2>Produk Triobionik Lainnya</h2>
        <div class="grid">
          <router-link
            v-for="related in relatedProducts"
            :key="related.id"
            :to="`/triobionik/${related.id}`"
            class="product-card-small"
          >
            <img
              v-if="related.image"
              :src="getPlaceholder()"
              :data-src="related.image"
              :alt="related.name"
              v-lazy
              loading="lazy"
            />
            <h4>{{ related.name }}</h4>
          </router-link>
        </div>
      </div>
    </section>
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
      relatedProducts: [],
      imageTransitioning: false
    }
  },
  
  created() {
    this.loadProduct()
  },
  
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct()
      },
      immediate: false
    }
  },
  
  methods: {
    loadProduct() {
      const id = this.$route.params.id
      this.product = getTriobionikVariantById(id)
      
      if (this.product) {
        this.currentImage = this.product.image || this.product.images?.[0] || ''
        this.loadRelatedProducts()
      }
    },
    
    loadRelatedProducts() {
      const all = getTriobionikVariants()
      this.relatedProducts = all
        .filter(v => v.id !== this.product.id)
        .slice(0, 3)
    },
    
    selectImage(img) {
      if (this.imageTransitioning || this.currentImage === img) return
      
      this.imageTransitioning = true
      const mainImg = document.querySelector('.main-image')
      
      if (mainImg) {
        mainImg.style.opacity = '0'
        setTimeout(() => {
          this.currentImage = img
          mainImg.style.opacity = '1'
          this.imageTransitioning = false
        }, 200)
      } else {
        this.currentImage = img
        this.imageTransitioning = false
      }
    },
    
    getPlaceholder() {
      return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"%3E%3Crect fill="%23f0f0f0" width="300" height="300"/%3E%3C/svg%3E'
    }
  }
}
</script>