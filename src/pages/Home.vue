<template>
  <div>
    <section class="hero" id="home" role="banner" aria-label="Hero section">
      <div class="container">
        <div class="hero-logo">
          <img
            src="/assets/img/logo-stiesia.webp"
            width="85"
            height="85"
            alt="Logo STIESIA"
            loading="eager"
          />
          <img
            src="/assets/img/logo.webp"
            width="85"
            height="85"
            alt="Logo PT. Manunggal Merdeka Makmur"
            loading="eager"
          />
        </div>
        <h1 style="opacity: 0">PT. Manunggal Merdeka Makmur</h1>
        <p style="opacity: 0">
          Produsen berbagai produk pendukung sektor Pertanian, Perkebunan,
          Perikanan, dan Peternakan dengan komitmen menghasilkan produk
          berkualitas tinggi untuk kemajuan agrobisnis Indonesia.
        </p>
        <div class="hero-buttons">
          <a
            href="#products"
            class="btn btn-primary"
            @click.prevent="scrollToSection('products')"
          >
            <i class="fas fa-seedling"></i> Lihat Produk Kami
          </a>
          <a
            href="#contact"
            class="btn btn-secondary"
            @click.prevent="scrollToSection('contact')"
          >
            <i class="fas fa-phone-alt"></i> Hubungi Kami
          </a>
        </div>
        <a
          href="#about"
          class="scroll-indicator"
          aria-label="Scroll ke bawah"
          @click.prevent="scrollToSection('about')"
        >
          <i class="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>

    <AboutSection />
    <VisionMission />
    <ProductStats />
    <ProductsSection />
    <CertificationsSection />
    <PrinciplesSection />
    <ContactSection />
  </div>
</template>

<script>
import AboutSection from "@/components/sections/AboutSection.vue";
import VisionMission from "@/components/sections/VisionMission.vue";
import ProductStats from "@/components/sections/ProductStats.vue";
import ProductsSection from "@/components/sections/ProductsSection.vue";
import CertificationsSection from "@/components/sections/CertificationsSection.vue";
import PrinciplesSection from "@/components/sections/PrinciplesSection.vue";
import ContactSection from "@/components/sections/ContactSection.vue";

export default {
  name: "Home",
  components: {
    AboutSection,
    VisionMission,
    ProductStats,
    ProductsSection,
    CertificationsSection,
    PrinciplesSection,
    ContactSection,
  },
  mounted() {
    // Fade in hero elements
    setTimeout(() => {
      const heroH1 = this.$el.querySelector(".hero h1");
      const heroP = this.$el.querySelector(".hero p");

      if (heroH1) heroH1.style.opacity = "1";
      if (heroP) heroP.style.opacity = "1";
    }, 100);
  },
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>
