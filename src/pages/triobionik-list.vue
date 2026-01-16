<template>
  <div class="product-detail-page">
    <section class="breadcrumb">
      <div class="container">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><router-link to="/">Beranda</router-link></li>
            <li><a href="/#products" @click.prevent="scrollToProducts">Produk</a></li>
            <li class="current">Triobionik</li>
          </ol>
        </nav>
      </div>
    </section>

    <section class="product-detail-page">
      <div class="container">
        <div class="section-title">
          <h1>Produk Triobionik</h1>
          <p>Berbagai varian pupuk hayati berkualitas untuk pertanian dan perkebunan</p>
        </div>

        <div class="related-products-grid">
          <router-link
            v-for="variant in variants"
            :key="variant.id"
            :to="`/triobionik/${variant.id}`"
            class="related-product-card"
          >
            <div class="related-product-img">
              <img
                :src="getPlaceholder()"
                :data-src="variant.image"
                :alt="variant.name"
                width="300"
                height="200"
                v-lazy
                loading="lazy"
                decoding="async"
              />
              <span v-if="variant.badge" class="product-badge badge-approved">{{ variant.badge }}</span>
            </div>
            <div class="related-product-info">
              <h4>{{ variant.name }}</h4>
              <p>{{ variant.shortDesc }}</p>
              <span class="related-product-link">
                Lihat Detail <i class="fas fa-arrow-right"></i>
              </span>
            </div>
          </router-link>
        </div>

        <section class="related-products">
          <div class="section-title">
            <h2>Produk Lainnya</h2>
            <p>Telusuri produk berkualitas lainnya dari PT. Manunggal Merdeka Makmur</p>
          </div>
          <div class="related-products-grid">
            <div class="related-product-card">
              <div class="related-product-img">
                <img
                  :src="getPlaceholder()"
                  :data-src="'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461329/manunggal-lestari_qayrkt.webp'"
                  alt="Manunggal Lestari"
                  width="300"
                  height="200"
                  v-lazy
                  loading="lazy"
                />
              </div>
              <div class="related-product-info">
                <h4>Manunggal Lestari</h4>
                <p>Pupuk organik cair untuk tanaman pangan, hortikultura, dan perkebunan.</p>
                <router-link to="/manunggal-lestari" class="related-product-link">
                  Lihat Detail <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
            <div class="related-product-card">
              <div class="related-product-img">
                <img
                  :src="getPlaceholder()"
                  :data-src="'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461343/manunggal-makmur_l37kqf.webp'"
                  alt="Manunggal Makmur"
                  width="300"
                  height="200"
                  v-lazy
                  loading="lazy"
                />
              </div>
              <div class="related-product-info">
                <h4>Manunggal Makmur</h4>
                <p>Pupuk organik remah untuk pertanian berkelanjutan.</p>
                <router-link to="/manunggal-makmur" class="related-product-link">
                  Lihat Detail <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
            <div class="related-product-card">
              <div class="related-product-img">
                <img
                  :src="getPlaceholder()"
                  :data-src="'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461354/ptorca_nxre0r.webp'"
                  alt="PTORCA"
                  width="300"
                  height="200"
                  v-lazy
                  loading="lazy"
                />
              </div>
              <div class="related-product-info">
                <h4>PTORCA</h4>
                <p>Pupuk organik cair untuk tanaman pangan dan hortikultura.</p>
                <router-link to="/ptorca" class="related-product-link">
                  Lihat Detail <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { getTriobionikVariants } from '../data/product.js'

export default {
  name: 'TriobionikList',
  
  data() {
    return {
      variants: [],
      isLoading: true,
      preloadedImages: []
    }
  },
  
  async beforeMount() {
    await this.preloadImages()
    await this.loadVariants()
  },
  
  mounted() {
    document.title = 'Triobionik - PT. Manunggal Merdeka Makmur'
    this.debounceScroll = this.debounce(() => {
      this.isLoading = false
      setTimeout(() => {
        if (window.App && window.App.lazyLoader) {
          window.App.lazyLoader.scan()
        }
      }, 200)
    }, 300)
    this.debounceScroll()
  },
  
  methods: {
    debounce(fn, delay) {
      let timer
      return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn(...args), delay)
      }
    },
    
    async preloadImages() {
      const images = [
        'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461329/manunggal-lestari_qayrkt.webp',
        'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461343/manunggal-makmur_l37kqf.webp',
        'https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461354/ptorca_nxre0r.webp'
      ]
      
      const variants = getTriobionikVariants()
      variants.forEach(variant => {
        if (variant.image) images.push(variant.image)
        if (variant.images && variant.images.length > 0) {
          images.push(...variant.images)
        }
      })
      
      await Promise.all(
        images.map(src => {
          return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
              this.preloadedImages.push(src)
              resolve()
            }
            img.onerror = resolve
            img.src = src
          })
        })
      )
    },
    
    async loadVariants() {
      await new Promise(resolve => setTimeout(resolve, 100))
      this.variants = getTriobionikVariants()
    },
    
    getPlaceholder() {
      return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E'
    },
    
    scrollToProducts() {
      this.$router.push('/#products')
    }
  }
}
</script>