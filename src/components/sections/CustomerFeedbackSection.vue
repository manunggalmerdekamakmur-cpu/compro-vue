<template>
  <section class="customer-feedback section-bg" id="testimonials">
    <div class="container">
      <div class="section-title">
        <h2>Testimoni Distributor</h2>
        <p>Ulasan dari mitra distributor kami di berbagai wilayah Indonesia</p>
      </div>
      
      <div class="feedback-container">
        <!-- Feedback Cards dalam grid 2x2 -->
        <div class="feedback-cards">
          <!-- Baris 1: Kolom 1 dan 2 -->
          <div class="feedback-card">
            <div class="feedback-header">
              <div class="customer-info">
                <p class="customer-location">
                  <i class="fas fa-map-marker-alt"></i> Distributor Provinsi Sumatera Utara
                </p>
                <div class="rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
              </div>
            </div>
            <div class="feedback-body">
              <p class="feedback-text">
                "Selama 2 tahun menjadi distributor pupuk organik PT. Manunggal Merdeka Makmur, kami melihat peningkatan permintaan yang signifikan. Petani di Sumatera Utara sangat puas dengan kualitas dan hasil yang diperoleh. Produknya mudah diterapkan dan memberikan dampak nyata terhadap kesuburan tanah."
              </p>
              <div class="feedback-meta">
                <span class="feedback-date"><i class="far fa-calendar"></i> 15 Oktober 2024</span>
                <span class="verified"><i class="fas fa-check-circle"></i> Terverifikasi</span>
              </div>
            </div>
          </div>
          
          <div class="feedback-card">
            <div class="feedback-header">
              <div class="customer-info">
                <p class="customer-location">
                  <i class="fas fa-map-marker-alt"></i> Distributor Provinsi Sulawesi
                </p>
                <div class="rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
            <div class="feedback-body">
              <p class="feedback-text">
                "Kemitraan dengan PT. Manunggal Merdeka Makmur sangat menguntungkan. Tidak hanya produk berkualitas, tetapi juga dukungan teknis dan pelatihan yang diberikan kepada tim kami. Petani perkebunan kakao dan kelapa sawit di Sulawesi melaporkan peningkatan produktivitas hingga 25% setelah menggunakan produk mereka."
              </p>
              <div class="feedback-meta">
                <span class="feedback-date"><i class="far fa-calendar"></i> 3 November 2024</span>
                <span class="verified"><i class="fas fa-check-circle"></i> Terverifikasi</span>
              </div>
            </div>
          </div>
          
          <!-- Baris 2: Kolom 1 dan 2 -->
          <div class="feedback-card">
            <div class="feedback-header">
              <div class="customer-info">
                <p class="customer-location">
                  <i class="fas fa-map-marker-alt"></i> Distributor Provinsi Jawa Timur
                </p>
                <div class="rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
              </div>
            </div>
            <div class="feedback-body">
              <p class="feedback-text">
                "Sebagai distributor di provinsi yang sama dengan lokasi pabrik, kami sangat menghargai konsistensi kualitas produk. Sistem distribusi yang terorganisir dan komunikasi yang baik dari tim sales membuat kerja sama berjalan lancar. Banyak petani di Jawa Timur yang menjadi pelanggan setia produk ini."
              </p>
              <div class="feedback-meta">
                <span class="feedback-date"><i class="far fa-calendar"></i> 22 September 2024</span>
                <span class="verified"><i class="fas fa-check-circle"></i> Terverifikasi</span>
              </div>
            </div>
          </div>
          
          <div class="feedback-card">
            <div class="feedback-header">
              <div class="customer-info">
                <p class="customer-location">
                  <i class="fas fa-map-marker-alt"></i> Distributor Provinsi Jawa Barat
                </p>
                <div class="rating">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
              </div>
            </div>
            <div class="feedback-body">
              <p class="feedback-text">
                "Permintaan produk PT. Manunggal Merdeka Makmur di Jawa Barat terus meningkat. Petani sayuran dan buah-buahan di daerah Lembang, Cianjur, dan Garut sangat puas dengan hasil panen mereka. Produk pupuk hayati khususnya sangat cocok untuk pertanian organik yang sedang berkembang pesat di sini."
              </p>
              <div class="feedback-meta">
                <span class="feedback-date"><i class="far fa-calendar"></i> 5 Oktober 2024</span>
                <span class="verified"><i class="fas fa-check-circle"></i> Terverifikasi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CustomerFeedbackSection"
}
</script>

<style scoped>
.customer-feedback {
  padding: 80px 0;
  background-color: #f9f9f9;
}

.section-title {
  text-align: center;
  margin-bottom: 50px;
}

.section-title h2 {
  font-size: 2.5rem;
  color: #2c541d;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}

.section-title h2::after {
  content: '';
  position: absolute;
  width: 70px;
  height: 3px;
  background-color: #4a9c2d;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.section-title p {
  color: #666;
  font-size: 1.1rem;
  max-width: 700px;
  margin: 20px auto 0;
}

/* Container utama - HAPUS grid-template-columns karena sudah tidak ada statistics */
.feedback-container {
  display: block; /* Ubah dari grid menjadi block */
}

/* Grid 2x2 untuk feedback cards */
.feedback-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 kolom */
  gap: 30px; /* Jarak antara kartu */
}

.feedback-card {
  background-color: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 4px solid #4a9c2d;
  height: 100%; /* Pastikan semua kartu memiliki tinggi yang sama */
  display: flex;
  flex-direction: column;
}

.feedback-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

.feedback-header {
  margin-bottom: 20px;
}

.customer-info h4 {
  margin: 0 0 5px 0;
  color: #2c541d;
  font-size: 1.2rem;
}

.customer-location {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 8px;
  font-weight: 600;
}

.customer-location i {
  color: #4a9c2d;
  margin-right: 5px;
}

.rating {
  color: #ffc107;
  font-size: 0.9rem;
  margin-top: 5px;
}

.feedback-body {
  padding-top: 15px;
  border-top: 1px solid #eee;
  flex-grow: 1; /* Agar konten memenuhi ruang yang tersedia */
  display: flex;
  flex-direction: column;
}

.feedback-text {
  color: #444;
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 15px;
  flex-grow: 1; /* Agar teks testimoni memenuhi ruang */
}

.feedback-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #777;
  margin-top: auto; /* Push ke bawah */
}

.feedback-date i, .verified i {
  margin-right: 5px;
}

.verified {
  color: #4a9c2d;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 992px) {
  .feedback-cards {
    gap: 25px;
  }
}

@media (max-width: 768px) {
  .feedback-cards {
    grid-template-columns: 1fr; /* 1 kolom pada tablet */
    gap: 20px;
  }
  
  .section-title h2 {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .feedback-meta {
    flex-direction: column;
    gap: 10px;
  }
  
  .customer-feedback {
    padding: 60px 0;
  }
}
</style>