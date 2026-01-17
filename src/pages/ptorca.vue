<template>
  <ProductDetail
    :product="product"
    :product-stats="productStats"
    :specs-title="'Spesifikasi Produk'"
    :features-title="'Keunggulan'"
    :benefits-title="'Manfaat'"
    :breadcrumb-parent="{ name: 'Pupuk Organik Cair', to: '/#products' }"
  />
</template>

<script>
import { getProductById } from '@/data/product.js'
import ProductDetail from '@/components/product/ProductDetail.vue'

export default {
  name: 'Ptorca',
  components: { ProductDetail },
  
  data() {
    return {
      product: {},
      productStats: [
        { icon: 'fas fa-certificate', title: 'Berizin', value: 'No. 03.03.2025.91' },
        { icon: 'fas fa-flask', title: 'Teruji', value: 'Laboratorium Terakreditasi' },
        { icon: 'fas fa-leaf', title: 'Organik', value: '100% Ramah Lingkungan' }
      ]
    }
  },
  
  async beforeMount() {
    await this.loadProduct()
  },
  
  methods: {
    async loadProduct() {
      await new Promise(resolve => setTimeout(resolve, 100))
      this.product = getProductById('ptorca') || {}
    }
  }
}
</script>