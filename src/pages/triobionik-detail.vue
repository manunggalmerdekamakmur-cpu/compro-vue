<template>
  <ProductDetail
    :product="product"
    :product-stats="productStats"
    :specs-title="'Spesifikasi Produk'"
    :features-title="'Kandungan Mikroorganisme'"
    :benefits-title="'Manfaat'"
    :breadcrumb-parent="{ name: 'Triobionik', to: '/triobionik' }"
  />
</template>

<script>
import { getTriobionikVariantById } from '@/data/product.js'
import ProductDetail from '@/components/product/ProductDetail.vue'

export default {
  name: 'TriobionikDetail',
  components: { ProductDetail },
  
  data() {
    return {
      product: {},
      productStats: [
        { icon: 'fas fa-certificate', title: 'Berizin', value: 'Terdaftar' },
        { icon: 'fas fa-flask', title: 'Teruji', value: 'Laboratorium Terakreditasi' },
        { icon: 'fas fa-leaf', title: 'Organik', value: '100% Ramah Lingkungan' }
      ]
    }
  },
  
  watch: {
    '$route.params.id': {
      handler(newId) {
        if (newId) {
          this.loadProduct(newId)
        }
      },
      immediate: true
    }
  },
  
  beforeMount() {
    const id = this.$route.params.id
    if (id) {
      this.loadProduct(id)
    }
  },
  
  methods: {
    loadProduct(id) {
      this.product = getTriobionikVariantById(id) || {}
    }
  }
}
</script>