<template>
  <section class="contact" id="contact">
    <div class="container">
      <div class="section-title">
        <h2>Hubungi Kami</h2>
        <p>
          Silakan menghubungi kami untuk informasi lebih lanjut tentang produk
          dan kerjasama bisnis
        </p>
      </div>
      <div class="contact-wrapper">
        <div class="contact-info">
          <h3><i class="fas fa-info-circle"></i> Informasi Kontak</h3>
          <div class="contact-detail">
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="contact-text">
                <h4>Alamat Perusahaan</h4>
                <p>Kabupaten Nganjuk, Jawa Timur, Indonesia</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="contact-text">
                <h4>Email</h4>
                <p>manunggalmerdekamakmur@gmail.com</p>
              </div>
            </div>
            <div class="contact-item">
            <div class="contact-icon">
              <i class="fab fa-whatsapp"></i>
            </div>
            <div class="contact-text">
              <h4>WhatsApp Kantor Resmi</h4>
              <p>
                <a
                  href="https://wa.me/6285199265858"
                  target="_blank"
                  rel="noopener"
                >
                  0851 9926 5858
                </a>
              </p>
            </div>
          </div>
          </div>
          <div class="business-hours">
            <h4><i class="fas fa-clock"></i> Jam Operasional</h4>
            <p>Senin - Jumat: 08:00 - 16:00</p>
            <p>Sabtu: 08:00 - 14:00</p>
          </div>
          <div class="signature">
            <div class="signature-line"></div>
            <p><strong>Management PT. Manunggal Merdeka Makmur</strong></p>
          </div>
        </div>
        <div class="contact-form-wrapper">
          <h3><i class="fas fa-paper-plane"></i> Kirim Pesan</h3>
          <form id="contactForm" novalidate @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">
                <i class="fas fa-user"></i> Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                name="name"
                class="form-control"
                placeholder="Masukkan nama lengkap Anda"
                required
                v-model="form.name"
              />
              <div class="error-message" id="nameError">{{ errors.name }}</div>
            </div>
            <div class="form-group">
              <label for="email"> <i class="fas fa-envelope"></i> Email </label>
              <input
                type="email"
                id="email"
                name="email"
                class="form-control"
                placeholder="Masukkan alamat email Anda"
                required
                v-model="form.email"
              />
              <div class="error-message" id="emailError">
                {{ errors.email }}
              </div>
            </div>
            <div class="form-group">
              <label for="phone">
                <i class="fas fa-phone"></i> Nomor Telepon (Opsional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                class="form-control"
                placeholder="Masukkan nomor telepon"
                v-model="form.phone"
              />
            </div>
            <div class="form-group">
              <label for="subject"> <i class="fas fa-tag"></i> Subjek </label>
              <select
                id="subject"
                name="subject"
                class="form-control"
                required
                v-model="form.subject"
              >
                <option value="">Pilih Subjek</option>
                <option value="pembelian">Pembelian Produk</option>
                <option value="informasi">Informasi Produk</option>
                <option value="kerjasama">Kerjasama Bisnis</option>
                <option value="lainnya">Lainnya</option>
              </select>
              <div class="error-message" id="subjectError">
                {{ errors.subject }}
              </div>
            </div>
            <div class="form-group">
              <label for="message">
                <i class="fas fa-comment"></i> Pesan
              </label>
              <textarea
                id="message"
                name="message"
                class="form-control"
                rows="5"
                placeholder="Tulis pesan Anda di sini"
                required
                v-model="form.message"
              ></textarea>
              <div class="error-message" id="messageError">
                {{ errors.message }}
              </div>
            </div>
            <div class="form-actions">
              <button
                type="submit"
                class="btn btn-primary btn-block"
                :disabled="loading"
              >
                <i class="fas fa-paper-plane"></i> Kirim Pesan
              </button>
              <div
                class="loading-spinner"
                id="formSpinner"
                v-if="loading"
              ></div>
            </div>
            <div id="formSuccess" class="form-message success" v-if="success">
              {{ successMessage }}
            </div>
            <div id="formError" class="form-message error" v-if="error">
              {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ContactSection",
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      },
      errors: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      loading: false,
      success: false,
      error: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    validateForm() {
      let valid = true;
      this.errors = {
        name: "",
        email: "",
        subject: "",
        message: "",
      };

      if (!this.form.name.trim()) {
        this.errors.name = "Nama lengkap wajib diisi";
        valid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.form.email.trim()) {
        this.errors.email = "Email wajib diisi";
        valid = false;
      } else if (!emailRegex.test(this.form.email)) {
        this.errors.email = "Format email tidak valid";
        valid = false;
      }

      if (!this.form.subject) {
        this.errors.subject = "Pilih salah satu subjek";
        valid = false;
      }

      if (!this.form.message.trim()) {
        this.errors.message = "Pesan wajib diisi";
        valid = false;
      }

      return valid;
    },
    async submitForm() {
      if (!this.validateForm()) {
        this.error = true;
        this.errorMessage = "Harap perbaiki field yang masih error.";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }

      this.loading = true;
      this.error = false;
      this.success = false;

      try {
        await this.sendFormData();

        this.success = true;
        this.successMessage =
          "Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.";

        this.form = {
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        };

        setTimeout(() => {
          this.success = false;
        }, 5000);
      } catch (err) {
        this.error = true;
        this.errorMessage =
          "Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami melalui email.";

        setTimeout(() => {
          this.error = false;
        }, 5000);
      } finally {
        this.loading = false;
      }
    },
    async sendFormData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Form submitted:", this.form);
          resolve(true);
        }, 1500);
      });
    },
  },
};
</script>
