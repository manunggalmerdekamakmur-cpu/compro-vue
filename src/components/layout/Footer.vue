<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-main">
        <div class="footer-brand">
          <div class="brand-header">
            <img
              src="https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461076/logo_xipkza.webp"
              alt="PT. Manunggal Merdeka Makmur"
              width="44"
              height="44"
              loading="lazy"
            />
            <div>
              <h3>PT. Manunggal Merdeka Makmur</h3>
              <span>Produsen Pupuk & Agen Hayati Berkualitas</span>
            </div>
          </div>

          <p class="brand-desc">
            Produsen berbagai produk pendukung sektor Pertanian, Perkebunan, Perikanan, dan Peternakan dengan komitmen menghasilkan produk berkualitas tinggi untuk kemajuan agrobisnis Indonesia.
          </p>
          <p class="brand-desc">
            Bersama kami, mari kita wujudkan keberhasilan dan kesuksesan usaha Agrobisnis di Indonesia.
          </p>
        </div>

        <div class="footer-info">
          <h4>Kontak</h4>

          <ul class="info-list">
            <li>
              <i class="fas fa-envelope"></i>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=manunggalmerdekamakmur@gmail.com"
                target="_blank"
                rel="noopener"
              >
                manunggalmerdekamakmur@gmail.com
              </a>
            </li>

            <li>
              <i class="fab fa-whatsapp"></i>
              <a
                href="https://wa.me/6285199265858"
                target="_blank"
                rel="noopener"
              >
                0851 9926 5858
              </a>
            </li>

            <li>
              <i class="fas fa-map-marker-alt"></i>
              <span>Nganjuk, Jawa Timur</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>
          © {{ currentYear }} Sekolah Tinggi Ilmu Ekonomi Indonesia Surabaya & PT. Manunggal Merdeka Makmur.
          <span>All rights reserved.</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>