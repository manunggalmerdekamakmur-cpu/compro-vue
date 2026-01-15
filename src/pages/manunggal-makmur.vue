<template>
  <ProductDetail
    :product="product"
    :product-stats="stats"
    :related-products="related"
  />
</template>

<script>
import ProductDetail from '@/components/product/ProductDetail.vue'
import { getProductById } from '@/data/product.js'

export default {
  name: 'ManunggalMakmur',
  
  components: {
    ProductDetail
  },
  
  data() {
    return {
      product: null,
      stats: [
        {
          icon: 'fas fa-clock',
          title: 'Segera',
          value: 'Dalam Proses'
        },
        {
          icon: 'fas fa-recycle',
          title: 'Organik',
          value: '100% Alami'
        },
        {
          icon: 'fas fa-weight',
          title: 'Berat',
          value: '5kg - 50kg'
        }
      ],
      related: []
    }
  },
  
  created() {
    this.loadProduct()
  },
  
  methods: {
    loadProduct() {
      this.product = getProductById('manunggal-makmur')
      this.loadRelatedProducts()
    },
    
    loadRelatedProducts() {
      this.related = [
        {
          id: 'manunggal-lestari',
          to: '/manunggal-lestari',
          title: 'PHC Manunggal Lestari',
          description: 'Pupuk organik cair untuk tanaman pangan, hortikultura, dan perkebunan.',
          image: 'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461329/manunggal-lestari_qayrkt.webp'
        },
        {
          id: 'triobionik',
          to: '/triobionik',
          title: 'PHP Triobionik',
          description: 'Pupuk Hayati Padat dengan tiga manfaat utama untuk berbagai jenis tanaman.',
          image: 'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461388/triobionik_c1jaie.webp'
        },
        {
          id: 'ptorca',
          to: '/ptorca',
          title: 'PTORCA',
          description: 'Pupuk organik cair untuk tanaman pangan dan hortikultura.',
          image: 'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461354/ptorca_nxre0r.webp'
        }
      ]
    }
  }
}
</script>