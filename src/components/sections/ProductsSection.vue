<template>
  <section
    class="products section-bg"
    id="products"
    style="padding: var(--space-xl) 0"
  >
    <div class="container">
      <div class="section-title">
        <h2>Produk Unggulan Kami</h2>
        <p>
          Produk pupuk hayati dan organik berkualitas untuk mendukung pertanian
          berkelanjutan
        </p>
      </div>

      <div class="product-filter" role="group" aria-label="Filter produk">
        <button
          v-for="filter in filters"
          :key="filter.value"
          :class="['filter-btn', { active: activeFilter === filter.value }]"
          @click="setFilter(filter.value)"
          :aria-pressed="activeFilter === filter.value"
        >
          <i :class="filter.icon" aria-hidden="true"></i> {{ filter.label }}
        </button>
      </div>

      <div class="products-grid" role="list">
        <router-link
          v-for="product in visibleProducts"
          :key="product.id"
          :to="getProductLink(product)"
          class="product-card"
          role="listitem"
        >
          <div class="product-img">
            <div
              v-if="!imageLoaded[product.id]"
              class="image-loading"
              aria-hidden="true"
            >
              <div class="skeleton-img"></div>
            </div>
            <img
              :src="getProductImage(product)"
              :alt="product.title"
              :class="{ 'image-loaded': imageLoaded[product.id] }"
              loading="lazy"
              decoding="async"
              @load="onImageLoad(product.id)"
              @error="onImageError(product.id)"
            />
            <span
              :class="[
                'product-badge',
                product.status === 'approved'
                  ? 'badge-approved'
                  : 'badge-coming',
              ]"
              aria-label="Status produk"
            >
              {{ product.badge }}
            </span>
          </div>
          <div class="product-info">
            <h3>{{ product.title }}</h3>
            <p>{{ truncateDescription(product.description) }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { getAllProducts } from "@/data/product.js";

export default {
  name: "ProductsSection",

  data() {
    return {
      products: [],
      activeFilter: "all",
      imageLoaded: {},
      filters: [
        { value: "all", label: "Semua Produk", icon: "fas fa-boxes" },
        { value: "approved", label: "Berizin", icon: "fas fa-certificate" },
        { value: "coming-soon", label: "Segera Hadir", icon: "fas fa-clock" },
      ],
    };
  },

  computed: {
    visibleProducts() {
      if (this.activeFilter === "all") return this.products;
      return this.products.filter((p) => p.status === this.activeFilter);
    },
  },

  async beforeMount() {
    this.products = getAllProducts();
    this.products.forEach((p) => {
      this.imageLoaded[p.id] = false;
    });
  },

  methods: {
    setFilter(value) {
      this.activeFilter = value;
    },

    onImageLoad(productId) {
      this.imageLoaded[productId] = true;
    },

    onImageError(productId) {
      this.imageLoaded[productId] = true;
    },

    getProductImage(product) {
      return product.images?.[0] || product.image || "";
    },

    truncateDescription(desc) {
      if (!desc) return "";
      return desc.length > 100 ? desc.substring(0, 100) + "..." : desc;
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
  },
};
</script>
