<template>
  <ProductDetail
    :product="product"
    :product-stats="productStats"
    :specs-title="'Deskripsi POC PTORCA'"
    :features-title="'Spesifikasi POC PTORCA'"
    :benefits-title="'Manfaat POC PTORCA'"
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
  
  created() {
    this.loadProduct()
  },
  
  methods: {
    loadProduct() {
      this.product = getProductById('ptorca') || {}
    }
  }
}
</script>