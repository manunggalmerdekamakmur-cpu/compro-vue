<template>
  <ProductDetail
    :product="product"
    :product-stats="productStats"
    :specs-title="'Spesifikasi Produk'"
    :features-title="'Keunggulan'"
    :benefits-title="'Manfaat'"
    :breadcrumb-parent="{ name: 'Pupuk Organik', to: '/#products' }"
  />
</template>

<script>
import { getProductById } from '@/data/product.js'
import ProductDetail from '@/components/product/ProductDetail.vue'

export default {
  name: 'ManunggalMakmur',
  components: { ProductDetail },
  
  data() {
    return {
      product: {},
      productStats: [
        { icon: 'fas fa-clock', title: 'Segera', value: 'Dalam Proses' },
        { icon: 'fas fa-recycle', title: 'Organik', value: '100% Alami' },
        { icon: 'fas fa-weight', title: 'Berat', value: '5kg - 50kg' }
      ]
    }
  },
  
  created() {
    this.loadProduct()
  },
  
  methods: {
    loadProduct() {
      this.product = getProductById('manunggal-makmur') || {}
    }
  }
}
</script>