<template>
  <div class="product-detail-page">
    <section class="breadcrumb">
      <div class="container">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><router-link to="/">Beranda</router-link></li>
            <li><router-link to="/triobionik">Triobionik</router-link></li>
            <li class="current">{{ product.name }}</li>
          </ol>
        </nav>
      </div>
    </section>
    <section class="product-detail-page">
      <div class="container">
        <div class="product-detail-container">
          <div class="product-images">
            <div class="main-image-container" @click="openModal">
              <img :src="currentImage" :alt="product.name" class="main-image">
            </div>
            <div class="thumbnail-gallery" v-if="product.images.length > 1">
              <div v-for="(image, index) in product.images" :key="index" :class="['thumbnail-item', { active: currentImageIndex === index }]" @click="currentImageIndex = index">
                <img :src="image" :alt="`${product.name} ${index + 1}`" loading="lazy">
              </div>
            </div>
            <div class="product-brochure" v-if="product.brochure">
              <embed :src="product.brochure" type="application/pdf" class="pdf-embed" />
            </div>
            <div class="product-stats-detail">
              <div class="product-stat-item">
                <i class="fas fa-certificate"></i>
                <h4>Berizin</h4>
                <p>{{ product.certificate }}</p>
              </div>
              <div class="product-stat-item">
                <i class="fas fa-flask"></i>
                <h4>Teruji</h4>
                <p>Lab Terakreditasi</p>
              </div>
              <div class="product-stat-item">
                <i class="fas fa-leaf"></i>
                <h4>Organik</h4>
                <p>100% Ramah Lingkungan</p>
              </div>
            </div>
          </div>
          <div class="product-info">
            <div class="product-header">
              <h1>{{ product.name }}</h1>
              <div class="product-badge badge-approved">{{ product.badge }}</div>
              <div class="certificate-badge">
                <i class="fas fa-certificate"></i>
                <span>Izin Edar No: {{ product.certificate }}</span>
              </div>
            </div>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-specs">
              <h3><i class="fas fa-clipboard-list"></i> Spesifikasi Produk</h3>
              <ul>
                <li v-for="(spec, index) in product.specs" :key="index">{{ spec }}</li>
              </ul>
            </div>
            <div class="product-benefits" v-if="product.benefits?.length">
              <h3><i class="fas fa-check-circle"></i> Manfaat</h3>
              <ul>
                <li v-for="(benefit, index) in product.benefits" :key="index">{{ benefit }}</li>
              </ul>
            </div>
            <div class="product-features" v-if="product.features?.length">
              <h3><i class="fas fa-star"></i> Kandungan</h3>
              <ul>
                <li v-for="(feature, index) in product.features" :key="index">{{ feature }}</li>
              </ul>
            </div>
            <div class="product-actions">
              <a href="#contact" class="btn btn-primary" @click.prevent="scrollToContact">
                <i class="fab fa-whatsapp"></i> Pesan Sekarang
              </a>
              <router-link to="/triobionik" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Lihat Varian Lain
              </router-link>
            </div>
          </div>
        </div>
        <section class="related-products">
          <div class="section-title">
            <h2>Varian Triobionik Lainnya</h2>
            <p>Telusuri varian Triobionik lainnya</p>
          </div>
          <div class="related-products-grid">
            <router-link v-for="variant in relatedVariants" :key="variant.id" :to="`/triobionik/${variant.id}`" class="related-product-card">
              <div class="related-product-img">
                <img :src="variant.image" :alt="variant.name" loading="lazy">
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
        </section>
      </div>
    </section>
    <div :class="['modal', { active: showModal }]" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">&times;</button>
        <div class="modal-main-image">
          <img :src="modalImage" :alt="product.name">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTriobionikVariantById, getTriobionikVariants } from '@/data/product.js'

export default {
  name: 'TriobionikDetail',
  data() {
    return {
      product: {},
      currentImageIndex: 0,
      showModal: false,
      modalImage: '',
      relatedVariants: []
    }
  },
  computed: {
    currentImage() {
      return this.product.images?.[this.currentImageIndex] || ''
    }
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler(id) {
        this.loadProduct(id)
      }
    }
  },
  methods: {
    loadProduct(id) {
      this.product = getTriobionikVariantById(id) || {}
      if (this.product.title) {
        document.title = `${this.product.name} - PT. Manunggal Merdeka Makmur`
      }
      const allVariants = getTriobionikVariants()
      this.relatedVariants = allVariants.filter(v => v.id !== id).slice(0, 3)
      this.currentImageIndex = 0
    },
    openModal() {
      this.modalImage = this.currentImage
      this.showModal = true
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.showModal = false
      document.body.style.overflow = ''
    },
    scrollToContact() {
      this.$router.push('/#contact')
    }
  }
}
</script>