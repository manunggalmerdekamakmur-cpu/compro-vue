<template>
  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo-section">
          <div class="footer-logo">
            <img src="/assets/img/logo.webp" width="50" height="50" alt="Logo PT. Manunggal Merdeka Makmur" />
            <div>
              <h3>PT. Manunggal Merdeka Makmur</h3>
              <p>Produsen Pupuk Organik dan Agen Hayati Berkualitas</p>
            </div>
          </div>
          <p class="footer-description">Produsen berbagai produk pendukung sektor Pertanian, Perkebunan, Perikanan, dan Peternakan dengan komitmen menghasilkan produk berkualitas tinggi untuk kemajuan agrobisnis Indonesia.</p>
          <p class="footer-motto">Bersama kami, mari kita wujudkan keberhasilan dan kesuksesan usaha Agrobisnis di Indonesia.</p>
        </div>
        <div class="footer-links">
          <h4><i class="fas fa-link"></i> Tautan Cepat</h4>
          <ul>
            <li><a href="#home" @click="scrollTo"><i class="fas fa-home"></i> Beranda</a></li>
            <li><a href="#about" @click="scrollTo"><i class="fas fa-info-circle"></i> Tentang Kami</a></li>
            <li><a href="#visi-misi" @click="scrollTo"><i class="fas fa-eye"></i> Visi & Misi</a></li>
            <li><a href="#products" @click="scrollTo"><i class="fas fa-boxes"></i> Produk Kami</a></li>
            <li><a href="#certifications" @click="scrollTo"><i class="fas fa-certificate"></i> Sertifikasi</a></li>
            <li><a href="#contact" @click="scrollTo"><i class="fas fa-phone-alt"></i> Kontak</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h4><i class="fas fa-address-book"></i> Hubungi Kami</h4>
          <div class="contact-info-footer">
            <p><i class="fas fa-envelope"></i> manunggalmerdekamakmur@gmail.com</p>
            <p><i class="fas fa-map-marker-alt"></i> Kabupaten Nganjuk, Jawa Timur</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="copyright">
          <p>&copy; {{ currentYear }} PT. Manunggal Merdeka Makmur. All rights reserved.</p>
          <p class="thank-you">Atas perhatian dan kepedulian serta kebijaksanaannya kami ucapkan terima kasih.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    scrollTo(event) {
      event.preventDefault()
      const href = event.target.getAttribute("href") || event.target.closest("a").getAttribute("href")
      if (href?.startsWith("#")) {
        const element = document.getElementById(href.substring(1))
        if (element) {
          const headerHeight = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight
          window.scrollTo({ top: offsetPosition, behavior: "smooth" })
        }
      }
    }
  }
}
</script>