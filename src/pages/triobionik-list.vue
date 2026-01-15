<template>
  <div class="triobionik-list-page">
    <section class="hero-small">
      <div class="container">
        <h1>Produk Triobionik</h1>
        <p>Berbagai varian pupuk hayati berkualitas untuk pertanian dan perkebunan</p>
      </div>
    </section>
    
    <section class="products-grid">
      <div class="container">
        <div class="grid">
          <router-link
            v-for="variant in variants"
            :key="variant.id"
            :to="`/triobionik/${variant.id}`"
            class="product-card"
          >
            <div class="product-image-wrapper">
              <img
                v-if="variant.image"
                :src="getPlaceholder()"
                :data-src="variant.image"
                :alt="variant.name"
                v-lazy
                loading="lazy"
                decoding="async"
              />
              <span v-if="variant.badge" class="badge">{{ variant.badge }}</span>
            </div>
            <div class="product-info">
              <h3>{{ variant.name }}</h3>
              <p class="short-desc">{{ variant.shortDesc }}</p>
              <span class="view-details">Lihat Detail →</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getTriobionikVariants } from '@/data/product.js'

export default {
  name: 'TriobionikList',
  
  data() {
    return {
      variants: []
    }
  },
  
  created() {
    this.loadVariants()
  },
  
  mounted() {
    this.updateDocumentTitle()
  },
  
  methods: {
    loadVariants() {
      this.variants = getTriobionikVariants()
    },
    
    updateDocumentTitle() {
      document.title = 'Produk Triobionik - PT. Manunggal Merdeka Makmur'
    },
    
    getPlaceholder() {
      return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E'
    }
  }
}
</script>