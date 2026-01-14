<template>
  <section class="triobionik-list section-bg" id="triobionik-list">
    <div class="container">
      <div class="section-title">
        <h2>Varian Triobionik</h2>
        <p>Telusuri varian Triobionik yang tersedia untuk berbagai kebutuhan</p>
      </div>

      <div class="product-filter">
        <button class="filter-btn" :class="{ active: activeFilter === 'all' }" @click="activeFilter = 'all'">
          <i class="fas fa-boxes"></i> Semua Varian
        </button>
        <button class="filter-btn" :class="{ active: activeFilter === 'agriculture' }" @click="activeFilter = 'agriculture'">
          <i class="fas fa-tractor"></i> Pertanian
        </button>
        <button class="filter-btn" :class="{ active: activeFilter === 'livestock' }" @click="activeFilter = 'livestock'">
          <i class="fas fa-paw"></i> Peternakan
        </button>
      </div>

      <div class="products-grid">
        <div v-for="(variant, index) in filteredVariants" 
             :key="variant.id" 
             class="product-card"
             :class="getVariantClass(variant)">
          <div class="product-img">
            <img :src="variant.image" :alt="variant.name" loading="lazy" />
            <span class="product-badge badge-approved">
              <i class="fas fa-check-circle"></i> Berizin
            </span>
            <div class="product-overlay">
              <router-link :to="`/triobionik/${variant.id}`" class="btn-view-details">
                <i class="fas fa-eye"></i> Lihat Detail
              </router-link>
            </div>
          </div>
          <div class="product-info">
            <h3>{{ variant.name }}</h3>
            <p>{{ variant.shortDesc }}</p>
            <div class="product-tags">
              <span class="tag" v-for="spec in variant.specs.slice(0, 2)" :key="spec">
                <i class="fas fa-info-circle"></i> {{ spec.split(':')[0] }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getTriobionikVariants } from '@/data/product.js'

export default {
  name: 'TriobionikList',
  data() {
    return {
      variants: [],
      activeFilter: 'all'
    }
  },
  computed: {
    filteredVariants() {
      if (this.activeFilter === 'all') return this.variants
      if (this.activeFilter === 'agriculture') {
        return this.variants.filter(v => 
          !v.id.includes('unggas') && !v.id.includes('ternak') && !v.id.includes('ikan')
        )
      }
      if (this.activeFilter === 'livestock') {
        return this.variants.filter(v => 
          v.id.includes('unggas') || v.id.includes('ternak') || v.id.includes('ikan')
        )
      }
      return this.variants
    }
  },
  created() {
    this.variants = getTriobionikVariants()
  },
  methods: {
    getVariantClass(variant) {
      if (variant.id.includes('unggas') || variant.id.includes('ternak') || variant.id.includes('ikan')) {
        return 'livestock-variant'
      }
      return 'agriculture-variant'
    }
  }
}
</script>