<template>
  <ProductDetail
    :product="product"
    :product-stats="productStats"
    :specs-title="'Deskripsi PHC Manunggal Lestari Dekomposer'"
    :features-title="'Spesifikasi PHC Manunggal Lestari Dekomposer'"
    :benefits-title="'Manfaat PHC Manunggal Lestari'"
    :breadcrumb-parent="{ name: 'Pupuk Hayati Cair', to: '/#products' }"
  />
</template>

<script>
import { getProductById } from '@/data/product.js'
import ProductDetail from '@/components/product/ProductDetail.vue'

export default {
  name: 'ManunggalLestariDekomposer',
  components: { ProductDetail },
  
  data() {
    return {
      product: {},
      productStats: [
        { icon: 'fas fa-certificate', title: 'Berizin', value: 'No. 03.03.2025.89' },
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
      this.product = getProductById('phc-manunggal-lestari-dekomposer') || {}
    }
  }
}
</script>