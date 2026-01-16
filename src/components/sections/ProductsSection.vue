<template>
  <section class="products section-bg" id="products">
    <div class="container">
      <div class="section-title">
        <h2>Produk Unggulan Kami</h2>
        <p>Produk pupuk hayati dan organik berkualitas untuk mendukung pertanian berkelanjutan</p>
      </div>
      <div class="product-filter">
        <button class="filter-btn" :class="{ active: activeFilter === 'all' }" @click="activeFilter = 'all'">
          <i class="fas fa-boxes"></i> Semua Produk
        </button>
        <button class="filter-btn" :class="{ active: activeFilter === 'approved' }" @click="activeFilter = 'approved'">
          <i class="fas fa-certificate"></i> Berizin
        </button>
        <button class="filter-btn" :class="{ active: activeFilter === 'coming-soon' }" @click="activeFilter = 'coming-soon'">
          <i class="fas fa-clock"></i> Segera Hadir
        </button>
      </div>
      <div class="products-grid" v-lazy>
        <router-link v-for="product in filteredProducts" :key="product.id" :to="getProductLink(product)" class="product-card">
          <div class="product-img">
            <img 
              :src="getPlaceholder()" 
              :data-src="product.images[0]" 
              :alt="product.title" 
              width="300"
              height="200"
              loading="lazy"
            />
            <span :class="['product-badge', product.status === 'approved' ? 'badge-approved' : 'badge-coming']">
              <i :class="product.status === 'approved' ? 'fas fa-check-circle' : 'fas fa-clock'"></i>
              {{ product.badge }}
            </span>
          </div>
          <div class="product-info">
            <h3>{{ product.title }}</h3>
            <p>{{ truncateDescription(product.description) }}</p>
            <div class="product-tags">
              <span class="tag" v-for="tag in getProductTags(product)" :key="tag">
                <i :class="getTagIcon(tag)"></i> {{ tag }}
              </span>
            </div>
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
      activeFilter: 'all'
    }
  },
  computed: {
    filteredProducts() {
      if (this.activeFilter === 'all') return this.products
      return this.products.filter(p => p.status === this.activeFilter)
    }
  },
  created() {
    this.products = getAllProducts()
  },
  methods: {
    getPlaceholder() {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PC9zdmc+'
    },
    truncateDescription(desc) {
      return desc.length > 100 ? desc.substring(0, 100) + '...' : desc
    },
    getProductLink(product) {
      const routes = {
        'phc-manunggal-lestari': '/manunggal-lestari',
        'php-triobionik': '/triobionik',
        'manunggal-makmur': '/manunggal-makmur',
        'ptorca': '/ptorca'
      }
      return routes[product.id] || '/'
    },
    getProductTags(product) {
      const tags = []
      if (product.id.includes('cair')) tags.push('Cair')
      if (product.id.includes('padat') || product.id.includes('remah')) tags.push('Padat')
      if (product.status === 'approved') tags.push('Berizin')
      if (product.status === 'coming-soon') tags.push('Proses')
      return tags.slice(0, 2)
    },
    getTagIcon(tag) {
      const icons = {
        'Cair': 'fas fa-tint',
        'Padat': 'fas fa-cube',
        'Berizin': 'fas fa-certificate',
        'Proses': 'fas fa-hourglass-half'
      }
      return icons[tag] || 'fas fa-info-circle'
    }
  }
}
</script>