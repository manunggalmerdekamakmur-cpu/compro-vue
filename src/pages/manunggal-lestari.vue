<template>
  <ProductDetail
    :product="product"
    :product-stats="stats"
    :related-products="related"
    specs-title="Deskripsi PHC Manunggal Lestari"
    features-title="Spesifikasi PHC Manunggal Lestari"
    benefits-title="Manfaat PHC Manunggal Lestari"
  />
</template>

<script>
import ProductDetail from '@/components/product/ProductDetail.vue'
import { getProductById } from '@/data/product.js'

export default {
  name: 'ManunggalLestari',
  
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
          value: 'No. 03.02.2024.619'
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
      this.product = getProductById('phc-manunggal-lestari')
      this.loadRelatedProducts()
    },
    
    loadRelatedProducts() {
      this.related = [
        {
          id: 'triobionik',
          to: '/triobionik',
          title: 'PHP Triobionik',
          description: 'Pupuk Hayati Padat dengan tiga manfaat utama untuk berbagai jenis tanaman.',
          image: 'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461388/triobionik_c1jaie.webp'
        },
        {
          id: 'manunggal-makmur',
          to: '/manunggal-makmur',
          title: 'Manunggal Makmur',
          description: 'Pupuk organik remah untuk pertanian berkelanjutan.',
          image: 'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461343/manunggal-makmur_l37kqf.webp'
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