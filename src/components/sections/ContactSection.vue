<template>
  <section class="contact section-bg" id="contact"> <!-- Tambah class section-bg -->
    <div class="container">
      <div class="section-header">
        <div class="header-decoration">
          <div class="decoration-line"></div>
          <div class="decoration-circle"></div>
          <div class="decoration-line"></div>
        </div>
        <h2 class="section-title">Hubungi Kami</h2>
        <p class="section-subtitle">
          Kami siap membantu Anda dengan informasi produk dan kerjasama bisnis
        </p>
      </div>

      <div class="contact-grid">
        <div class="contact-card">
          <div class="card-icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <h3 class="card-title">Lokasi Kami</h3>
          <p class="card-content">Kabupaten Nganjuk, Jawa Timur</p>
          <a
            href="https://maps.google.com/?q=Kabupaten+Nganjuk,+Jawa+Timur,+Indonesia"
            target="_blank"
            class="card-action"
          >
            Lihat di Peta
          </a>
        </div>

        <div class="contact-card">
          <div class="card-icon">
            <i class="fas fa-envelope"></i>
          </div>
          <h3 class="card-title">Email</h3>
          <p class="card-content">manunggalmerdekamakmur@gmail.com</p>
          <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=manunggalmerdekamakmur@gmail.com"
              target="_blank"
              rel="noopener"
              class="card-action"
            >
            Kirim Email
          </a>
        </div>

        <div class="contact-card whatsapp-card">
          <div class="card-icon whatsapp-icon">
            <i class="fab fa-whatsapp"></i>
          </div>
          <h3 class="card-title">WhatsApp</h3>
          <p class="card-content">0851 9926 5858</p>
          <a
            href="https://wa.me/6285199265858"
            target="_blank"
            class="card-action whatsapp-action"
          >
            Chat WhatsApp
          </a>
        </div>

        <div class="contact-card hours-card">
          <div class="card-icon">
            <i class="fas fa-clock"></i>
          </div>
          <h3 class="card-title">Jam Operasional</h3>

          <div class="hours-grid">
            <div class="hours-row">
              <span>Senin – Jum'at</span>
              <span>08:00–16:00</span>
            </div>
            <div class="hours-row">
              <span>Sabtu</span>
              <span>08:00–14:00</span>
            </div>
            <div class="hours-row closed">
              <span>Minggu</span>
              <span>Tutup</span>
            </div>
          </div>
        </div>
      </div>

      <div class="company-signature">
        <span>Management PT. Manunggal Merdeka Makmur</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ContactSection",
};
</script>
