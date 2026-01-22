<template>
  <div class="product-detail-page">
    <div v-if="loading" class="triobionik-list-skeleton">
      <div class="container">
        <div class="skeleton-breadcrumb">
          <div class="skeleton-breadcrumb-item"></div>
          <div class="skeleton-breadcrumb-item"></div>
          <div class="skeleton-breadcrumb-item short"></div>
        </div>

        <div class="skeleton-header">
          <div class="skeleton-title"></div>
          <div class="skeleton-subtitle"></div>
        </div>

        <div class="skeleton-variants-grid">
          <div v-for="n in 6" :key="n" class="skeleton-variant-card">
            <div class="skeleton-variant-img">
              <div class="skeleton-img"></div>
            </div>
            <div class="skeleton-variant-content">
              <div class="skeleton-title"></div>
              <div class="skeleton-text"></div>
              <div class="skeleton-text short"></div>
            </div>
          </div>
        </div>

        <div class="skeleton-related-section">
          <div class="skeleton-section-title">
            <div class="skeleton-title"></div>
            <div class="skeleton-subtitle"></div>
          </div>

          <div class="skeleton-related-grid">
            <div v-for="n in 3" :key="n" class="skeleton-related-card">
              <div class="skeleton-img"></div>
              <div class="skeleton-content">
                <div class="skeleton-title"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text short"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template v-else>
      <section class="breadcrumb" aria-label="Breadcrumb">
        <div class="container">
          <nav aria-label="Breadcrumb">
            <ol>
              <li><router-link to="/">Beranda</router-link></li>
              <li><router-link to="/#products">Produk</router-link></li>
              <li class="current" aria-current="page">Triobionik</li>
            </ol>
          </nav>
        </div>
      </section>

      <section class="product-detail-page">
        <div class="container">
          <div class="section-title">
            <h1>Produk Triobionik</h1>
            <p>
              Berbagai varian pupuk hayati berkualitas untuk pertanian dan
              perkebunan
            </p>
          </div>

          <div class="related-products-grid">
            <router-link
              v-for="variant in variants"
              :key="variant.id"
              :to="`/triobionik/${variant.id}`"
              class="related-product-card"
            >
              <div class="related-product-img">
                <div v-if="!imageLoaded[variant.id]" class="image-loading">
                  <div class="skeleton-img"></div>
                </div>
                <img
                  :src="variant.image"
                  :alt="variant.name"
                  :class="{ 'image-loaded': imageLoaded[variant.id] }"
                  loading="lazy"
                  decoding="async"
                  @load="handleImageLoad(variant.id)"
                  @error="handleImageError(variant.id)"
                />
                <span
                  v-if="variant.badge"
                  class="product-badge badge-approved"
                  >{{ variant.badge }}</span
                >
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

          <section class="related-products" aria-label="Produk Lainnya">
            <div class="section-title">
              <h2>Produk Lainnya</h2>
              <p>
                Telusuri produk berkualitas lainnya dari PT. Manunggal Merdeka
                Makmur
              </p>
            </div>
            <div class="related-products-grid">
              <router-link
                v-for="product in relatedProducts"
                :key="product.id"
                :to="getProductLink(product)"
                class="related-product-card"
              >
                <div class="related-product-img">
                  <div v-if="!imageLoaded[product.id]" class="image-loading">
                    <div class="skeleton-img"></div>
                  </div>
                  <img
                    :src="product.images[0]"
                    :alt="product.title"
                    :class="{ 'image-loaded': imageLoaded[product.id] }"
                    loading="lazy"
                    decoding="async"
                    @load="handleImageLoad(product.id)"
                    @error="handleImageError(product.id)"
                  />
                </div>
                <div class="related-product-info">
                  <h4>{{ product.title }}</h4>
                  <p>{{ truncateDescription(product.description) }}</p>
                  <span class="related-product-link">
                    Lihat Detail <i class="fas fa-arrow-right"></i>
                  </span>
                </div>
              </router-link>
            </div>
          </section>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import { getTriobionikVariants, getApprovedProducts } from "@/data/product.js";

export default {
  name: "TriobionikList",

  data() {
    return {
      variants: [],
      relatedProducts: [],
      loading: true,
      imageLoaded: {},
    };
  },

  async beforeMount() {
    this.loading = true;
    this.variants = getTriobionikVariants();
    this.relatedProducts = getApprovedProducts().slice(0, 3);
    this.variants.forEach((v) => (this.imageLoaded[v.id] = false));
    this.relatedProducts.forEach((p) => (this.imageLoaded[p.id] = false));
    this.$nextTick(() => {
      this.loading = false;
    });
  },

  mounted() {
    document.title = "Triobionik - PT. Manunggal Merdeka Makmur";
  },

  methods: {
    handleImageLoad(id) {
      this.imageLoaded[id] = true;
    },

    handleImageError(id) {
      this.imageLoaded[id] = true;
    },

    getProductLink(product) {
      const routes = {
        "phc-manunggal-lestari": "/manunggal-lestari",
        "phc-manunggal-lestari-dekomposer": "/manunggal-lestari-dekomposer",
        "php-triobionik": "/triobionik",
        "manunggal-makmur": "/manunggal-makmur",
        ptorca: "/ptorca",
      };
      return routes[product.id] || "/";
    },

    truncateDescription(desc) {
      if (!desc) return "";
      return desc.length > 100 ? desc.substring(0, 100) + "..." : desc;
    },
  },
};
</script>

<style scoped>
.triobionik-list-skeleton {
  padding: 2rem 0;
}

.skeleton-breadcrumb {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.skeleton-breadcrumb-item {
  height: 20px;
  width: 80px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-breadcrumb-item.short {
  width: 50px;
}

.skeleton-header {
  margin-bottom: 2rem;
}

.skeleton-title {
  height: 40px;
  width: 60%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.skeleton-subtitle {
  height: 24px;
  width: 80%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 6px;
}

.skeleton-variants-grid,
.skeleton-related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.skeleton-variant-card,
.skeleton-related-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.skeleton-variant-img {
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-img {
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-variant-content,
.skeleton-content {
  padding: 1.25rem;
}

.skeleton-text {
  height: 16px;
  width: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.skeleton-text.short {
  width: 60%;
}

.skeleton-related-section {
  margin-top: 3rem;
}

.skeleton-section-title {
  margin-bottom: 1.5rem;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.breadcrumb {
  padding: 1rem 0;
  background: #f8f9fa;
}

.breadcrumb nav ol {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb li {
  font-size: 0.9rem;
  color: #6c757d;
}

.breadcrumb li a {
  color: #1a7d3e;
  text-decoration: none;
}

.breadcrumb li a:hover {
  text-decoration: underline;
}

.breadcrumb li.current {
  color: #212529;
  font-weight: 500;
}

.breadcrumb li:not(:last-child)::after {
  content: "/";
  margin-left: 0.5rem;
  color: #adb5bd;
}

.related-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
  content-visibility: auto;
  contain-intrinsic-size: 1000px;
}

.related-product-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  display: block;
  will-change: transform;
}

.related-product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.related-product-img {
  position: relative;
  height: 200px;
  background: rgba(248, 255, 249, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-md);
  overflow: hidden;
  min-height: 200px;
  width: 100%;
}

.related-product-img img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.related-product-img img.image-loaded {
  opacity: 1;
}

.related-product-card:hover .related-product-img img {
  transform: translate(-50%, -50%) scale(1.05);
}

.image-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  z-index: 1;
}

.product-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
}

.badge-approved {
  background: #28a745;
  color: #fff;
}

.related-product-info {
  padding: 1.25rem;
  position: relative;
  z-index: 1;
  background: #fff;
}

.related-product-info h4 {
  margin: 0 0 0.5rem;
  color: #1a1a1a;
  font-size: 1.1rem;
  font-weight: 600;
}

.related-product-info p {
  margin: 0 0 1rem;
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.5;
}

.related-product-link {
  color: #1a7d3e;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.related-product-link i {
  transition: transform 0.2s ease;
}

.related-product-card:hover .related-product-link i {
  transform: translateX(4px);
}

.related-products {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
  content-visibility: auto;
  contain-intrinsic-size: 500px;
}

@media (max-width: 768px) {
  .related-products-grid {
    grid-template-columns: 1fr;
  }

  .related-product-card:hover {
    transform: translateY(-4px);
  }

  .related-product-img {
    height: 180px;
  }
}
</style>
