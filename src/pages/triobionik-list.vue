<template>
  <section class="tribionik-list" id="tribionik-list">
    <div class="container">
      <div class="section-title">
        <h2>Varian Triobionik</h2>
        <p>Telusuri 7 varian Triobionik yang tersedia</p>
      </div>

      <div class="products-grid">
        <div v-for="(item, index) in variants" :key="index" class="product-card">
          <div class="product-img">
            <img :src="item.thumbnail" :alt="item.name" loading="lazy" />
            <div class="product-overlay">
              <a @click.prevent="goToDetail(index)" href="#" class="btn-view-details">
                <i class="fas fa-eye"></i> Lihat
              </a>
            </div>
          </div>
          <div class="product-info">
            <h3>{{ item.name }}</h3>
            <p>{{ item.shortDesc }}</p>
            <div class="product-tags">
              <span class="tag"><i class="fas fa-box-open"></i> Varian</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getProductById } from '@/data/product.js'

export default {
  name: 'TriobionikList',
  data() {
    return {
      variants: []
    }
  },
  created() {
    const product = getProductById('php-triobionik') || {}
    const imgs = Array.isArray(product.images) ? product.images.slice(0, 7) : []
    this.variants = imgs.map((src, i) => ({
      id: `php-triobionik-${i}`,
      name: `Triobionik Varian ${i + 1}`,
      thumbnail: src,
      shortDesc: product.description || ''
    }))
  },
  methods: {
    goToDetail(index) {
      this.$router.push({ path: `/triobionik/php-triobionik/${index}` })
    }
  }
}
</script>
