<template>
  <div class="product-detail-page">
    <section class="breadcrumb">
      <div class="container">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><router-link to="/">Beranda</router-link></li>
            <li v-if="isTriobionik">
              <router-link to="/triobionik">Triobionik</router-link>
            </li>
            <li v-else>
              <a href="#products">Produk</a>
            </li>
            <li class="current">{{ product.title }}</li>
          </ol>
        </nav>
      </div>
    </section>

    <section class="product-detail-page">
      <div class="container">
        <div class="product-detail-container">
          <div class="product-images">
            <div class="main-image-container">
              <img :src="currentImage" :alt="product.title" class="main-image" loading="lazy">
            </div>
            <div class="thumbnail-gallery">
              <div 
                v-for="(image, index) in product.images" 
                :key="index"
                :class="['thumbnail-item', { active: currentImageIndex === index }]"
                @click="currentImageIndex = index"
              >
                <img :src="image" :alt="`${product.title} ${index + 1}`" loading="lazy">
              </div>
            </div>
            
            <div class="product-brochure" v-if="product.brochure">
              <a :href="product.brochure" target="_blank" class="btn btn-secondary">
                <i class="fas fa-file-pdf"></i> Unduh Brosur
              </a>
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
                <p>Laboratorium Terakreditasi</p>
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
              <h1>{{ product.title }}</h1>
              <div :class="['product-badge', product.status === 'approved' ? 'badge-approved' : 'badge-coming']">
                {{ product.badge }}
              </div>
              <div class="certificate-badge">
                <i class="fas fa-certificate"></i>
                <span>Izin Edar No: {{ product.certificate }}</span>
              </div>
            </div>
            
            <p class="product-description">{{ product.description }}</p>
            
            <div class="product-specs">
              <h3><i class="fas fa-clipboard-list"></i> Spesifikasi Produk</h3>
              <ul>
                <li v-for="(spec, index) in product.specs" :key="`spec-${index}`">{{ spec }}</li>
              </ul>
            </div>

            <div class="product-benefits" v-if="product.benefits?.length">
              <h3><i class="fas fa-check-circle"></i> Manfaat</h3>
              <ul>
                <li v-for="(benefit, index) in product.benefits" :key="`benefit-${index}`">{{ benefit }}</li>
              </ul>
            </div>
            
            <div class="product-features" v-if="product.features?.length">
              <h3><i class="fas fa-star"></i> Fitur</h3>
              <ul>
                <li v-for="(feature, index) in product.features" :key="`feature-${index}`">{{ feature }}</li>
              </ul>
            </div>
            
            <div class="product-actions">
              <a href="#contact" class="btn btn-primary">
                <i class="fab fa-whatsapp"></i> Pesan Sekarang
              </a>
              <router-link v-if="isTriobionik" to="/triobionik" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Lihat Varian Lain
              </router-link>
              <router-link v-else to="/#products" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Lihat Produk Lain
              </router-link>
            </div>
          </div>
        </div>

        <section class="related-products">
          <div class="section-title">
            <h2>Produk Lainnya</h2>
            <p>Telusuri produk berkualitas lainnya dari PT. Manunggal Merdeka Makmur</p>
          </div>
          <div class="related-products-grid">
            <div class="related-product-card" v-for="related in relatedProducts" :key="related.id">
              <div class="related-product-img">
                <img :src="related.image" :alt="related.title" loading="lazy">
              </div>
              <div class="related-product-info">
                <h4>{{ related.title }}</h4>
                <p>{{ related.description }}</p>
                <router-link :to="related.link" class="related-product-link">
                  Lihat Detail <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>

    <div class="modal">
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <div class="modal-main-image">
          <img :src="modalImage" :alt="product.title">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentImageIndex: 0,
      modalImage: '',
      relatedProducts: []
    }
  },
  computed: {
    currentImage() {
      return this.product.images?.[this.currentImageIndex] || ''
    },
    isTriobionik() {
      return this.product.id?.includes('triobionik') || this.product.productId === 'php-triobionik'
    }
  },
  mounted() {
    if (this.product.title) {
      document.title = `${this.product.title} - PT. Manunggal Merdeka Makmur`
    }
  }
}
</script>