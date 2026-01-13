<template>
  <section class="products section-bg" id="products">
    <div class="container">
      <div class="section-title">
        <h2>Produk Unggulan Kami</h2>
        <p>
          Produk pupuk hayati dan organik berkualitas untuk mendukung pertanian
          berkelanjutan
        </p>
      </div>

      <div class="product-filter">
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'all' }"
          @click="setFilter('all')"
        >
          <i class="fas fa-boxes"></i> Semua Produk
        </button>
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'approved' }"
          @click="setFilter('approved')"
        >
          <i class="fas fa-certificate"></i> Berizin
        </button>
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'coming-soon' }"
          @click="setFilter('coming-soon')"
        >
          <i class="fas fa-clock"></i> Segera Hadir
        </button>
      </div>

      <div class="products-grid">
        <div class="product-card approved" data-product="phc-manunggal-lestari">
          <div class="product-img">
            <img
              src="/assets/img/manunggal-lestari/manunggal-lestari.webp"
              alt="Pupuk Hayati Cair Manunggal Lestari"
              loading="lazy"
            />
            <span class="product-badge badge-approved">
              <i class="fas fa-check-circle"></i> Berizin
            </span>
            <div class="product-overlay">
              <router-link to="/manunggal-lestari" class="btn-view-details">
                <i class="fas fa-eye"></i> Detail Produk
              </router-link>
            </div>
          </div>
          <div class="product-info">
            <h3>Pupuk Hayati Cair Manunggal Lestari</h3>
            <p>Pupuk Hayati Cair untuk tanaman pangan dan hortikultura.</p>
            <div class="product-tags">
              <span class="tag"><i class="fas fa-tint"></i> Cair</span>
              <span class="tag"><i class="fas fa-leaf"></i> Hayati</span>
            </div>
          </div>
        </div>

        <div class="product-card approved" data-product="php-tribionik">
          <div class="product-img">
            <img
              src="/assets/img/triobionik/triobionik.webp"
              alt="PHP Tribionik"
              loading="lazy"
            />
            <span class="product-badge badge-approved">
              <i class="fas fa-check-circle"></i> Berizin
            </span>
            <div class="product-overlay">
              <router-link to="/tribionik" class="btn-view-details">
                <i class="fas fa-eye"></i> Detail Produk
              </router-link>
            </div>
          </div>
          <div class="product-info">
            <h3>Pupuk Hayati Padat Tribionik</h3>
            <p>Pupuk Hayati Padat unggulan dengan tiga manfaat utama.</p>
            <div class="product-tags">
              <span class="tag"><i class="fas fa-cube"></i> Padat</span>
              <span class="tag"><i class="fas fa-star"></i> Unggulan</span>
            </div>
          </div>
        </div>

        <div class="product-card coming-soon" data-product="manunggal-makmur">
          <div class="product-img">
            <img
              src="/assets/img/manunggal-makmur/manunggal-makmur.webp"
              alt="Manunggal Makmur"
              loading="lazy"
            />
            <span class="product-badge badge-coming">
              <i class="fas fa-clock"></i> Segera Hadir
            </span>
            <div class="product-overlay">
              <router-link to="/manunggal-makmur" class="btn-view-details">
                <i class="fas fa-eye"></i> Detail Produk
              </router-link>
            </div>
          </div>
          <div class="product-info">
            <h3>Pupuk Organik Remah Manunggal Makmur</h3>
            <p>Pupuk organik remah – dalam proses perizinan.</p>
            <div class="product-tags">
              <span class="tag"><i class="fas fa-seedling"></i> Organik</span>
              <span class="tag"
                ><i class="fas fa-hourglass-half"></i> Proses</span
              >
            </div>
          </div>
        </div>

        <div class="product-card coming-soon" data-product="ptorca">
          <div class="product-img">
            <img
              src="/assets/img/ptorca/ptorca.webp"
              alt="PTORCA"
              loading="lazy"
            />
            <span class="product-badge badge-coming">
              <i class="fas fa-clock"></i> Segera Hadir
            </span>
            <div class="product-overlay">
              <router-link to="/ptorca" class="btn-view-details">
                <i class="fas fa-eye"></i> Detail Produk
              </router-link>
            </div>
          </div>
          <div class="product-info">
            <h3>Pupuk Organik Cair PTORCA</h3>
            <p>Pupuk organik cair – proses izin edar.</p>
            <div class="product-tags">
              <span class="tag"><i class="fas fa-tint"></i> Cair</span>
              <span class="tag"><i class="fas fa-seedling"></i> Organik</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProductsSection",
  data() {
    return {
      activeFilter: "all",
    };
  },
  methods: {
    setFilter(filter) {
      this.activeFilter = filter;
      this.filterProducts();
    },
    filterProducts() {
      const products = document.querySelectorAll(".product-card");

      products.forEach((product) => {
        if (this.activeFilter === "all") {
          product.style.display = "block";
        } else {
          if (product.classList.contains(this.activeFilter)) {
            product.style.display = "block";
          } else {
            product.style.display = "none";
          }
        }
      });
    },
  },
  mounted() {
    this.filterProducts();
  },
};
</script>
