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
  name: 'Ptorca',
  
  components: {
    ProductDetail
  },
  
  data() {
    return {
      product: null,
      stats: [
        {
          icon: 'fas fa-certificate',
          title: 'Berizin',
          value: 'No. 03.03.2025.91'
        },
        {
          icon: 'fas fa-flask',
          title: 'Teruji',
          value: 'Laboratorium Terakreditasi'
        },
        {
          icon: 'fas fa-leaf',
          title: 'Organik',
          value: '100% Ramah Lingkungan'
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
      this.product = getProductById('ptorca')
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
          id: 'manunggal-makmur',
          to: '/manunggal-makmur',
          title: 'Manunggal Makmur',
          description: 'Pupuk organik remah untuk pertanian berkelanjutan.',
          image: 'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461343/manunggal-makmur_l37kqf.webp'
        },
        {
          id: 'triobionik',
          to: '/triobionik',
          title: 'PHP Triobionik',
          description: 'Pupuk Hayati Padat dengan tiga manfaat utama untuk berbagai jenis tanaman.',
          image: 'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461388/triobionik_c1jaie.webp'
        }
      ]
    }
  }
}
</script>