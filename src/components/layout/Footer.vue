<template>
  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo-section">
          <div class="footer-logo">
            <img 
              src="https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461076/logo_xipkza.webp" 
              width="50" 
              height="50" 
              alt="Logo PT. Manunggal Merdeka Makmur"
              loading="lazy"
            />
            <div>
              <h3>PT. Manunggal Merdeka Makmur</h3>
              <p>Produsen Pupuk Organik dan Agen Hayati Berkualitas</p>
            </div>
          </div>
          <p class="footer-description">
            Produsen berbagai produk pendukung sektor Pertanian, Perkebunan, Perikanan, dan Peternakan dengan komitmen menghasilkan produk berkualitas tinggi untuk kemajuan agrobisnis Indonesia.
          </p>
          <p class="footer-motto">
            Bersama kami, mari kita wujudkan keberhasilan dan kesuksesan usaha Agrobisnis di Indonesia.
          </p>
        </div>
        
        <div class="footer-links">
          <h4><i class="fas fa-link"></i> Tautan Cepat</h4>
          <ul>
            <li>
              <a href="#home" @click="handleHashClick('#home')">
                <i class="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <a href="#about" @click="handleHashClick('#about')">
                <i class="fas fa-info-circle"></i> Tentang Kami
              </a>
            </li>
            <li>
              <a href="#visi-misi" @click="handleHashClick('#visi-misi')">
                <i class="fas fa-eye"></i> Visi & Misi
              </a>
            </li>
            <li>
              <a href="#products" @click="handleHashClick('#products')">
                <i class="fas fa-boxes"></i> Produk Kami
              </a>
            </li>
            <li>
              <a href="#certifications" @click="handleHashClick('#certifications')">
                <i class="fas fa-certificate"></i> Sertifikasi
              </a>
            </li>
            <li>
              <a href="#contact" @click="handleHashClick('#contact')">
                <i class="fas fa-phone-alt"></i> Kontak
              </a>
            </li>
          </ul>
        </div>
        
        <div class="footer-contact">
          <h4><i class="fas fa-address-book"></i> Hubungi Kami</h4>
          <div class="contact-info-footer">
            <p class="contact-email">
              <i class="fas fa-envelope"></i>
              <a href="mailto:manunggalmerdekamakmur@gmail.com">
                manunggalmerdekamakmur@gmail.com
              </a>
            </p>
            <p>
              <i class="fas fa-map-marker-alt"></i>
              Kabupaten Nganjuk, Jawa Timur, Indonesia
            </p>
            <p class="contact-whatsapp">
              <i class="fab fa-whatsapp"></i>
              <a href="https://wa.me/6285199265858" target="_blank" rel="noopener">
                WhatsApp: 0851 9926 5858
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="copyright">
          <p>&copy; {{ currentYear }} Sekolah Tinggi Ilmu Ekonomi Indonesia Surabaya & PT. Manunggal Merdeka Makmur. All rights reserved.</p>
          <p class="thank-you">Atas perhatian dan kepedulian serta kebijaksanaannya kami ucapkan terima kasih.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  },
  
  methods: {
    handleHashClick(hash) {
      if (this.$route.path !== '/') {
        this.$router.push('/' + hash)
      } else {
        const element = document.querySelector(hash)
        if (element) {
          const headerHeight = 80
          const top = element.offsetTop - headerHeight
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }
    }
  }
}
</script>