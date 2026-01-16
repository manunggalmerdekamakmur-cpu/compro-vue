<template>
  <header role="banner" :class="{ scrolled: isScrolled, 'at-top': isAtTop }">
    <div class="container header-container">
      <div class="logo">
        <img
          src="/assets/img/logo-stiesia.webp"
          width="35"
          height="35"
          alt="Logo STIESIA"
          loading="eager"
        />
        <img
          src="/assets/img/logo.webp"
          width="35"
          height="35"
          alt="Logo PT. Manunggal Merdeka Makmur"
          loading="eager"
        />
        <div class="logo-text">
          <h1 style="opacity: 0">PT. Manunggal Merdeka Makmur</h1>
          <p>Produsen Pupuk Organik dan Agen Hayati Berkualitas</p>
        </div>
      </div>
      <nav role="navigation">
        <div
          class="hamburger"
          @click="toggleMenu"
          :aria-expanded="menuOpen.toString()"
          aria-label="Toggle menu"
        >
          <i :class="menuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </div>
        <ul class="nav-menu" :class="{ active: menuOpen }">
          <li>
            <a
              href="/"
              class="nav-link"
              :class="{ active: isActive('/') }"
              @click="handleNavClick($event, '/')"
              >Beranda</a
            >
          </li>
          <li>
            <a
              href="#about"
              class="nav-link"
              :class="{ active: activeSection === 'about' }"
              @click="handleNavClick($event, '#about')"
              >Tentang Kami</a
            >
          </li>
          <li>
            <a
              href="#visi-misi"
              class="nav-link"
              :class="{ active: activeSection === 'visi-misi' }"
              @click="handleNavClick($event, '#visi-misi')"
              >Visi & Misi</a
            >
          </li>
          <li>
            <a
              href="#products"
              class="nav-link"
              :class="{ active: activeSection === 'products' }"
              @click="handleNavClick($event, '#products')"
              >Produk Kami</a
            >
          </li>
          <li>
            <a
              href="#certifications"
              class="nav-link"
              :class="{ active: activeSection === 'certifications' }"
              @click="handleNavClick($event, '#certifications')"
              >Sertifikasi</a
            >
          </li>
          <li>
            <a
              href="#contact"
              class="nav-link"
              :class="{ active: activeSection === 'contact' }"
              @click="handleNavClick($event, '#contact')"
              >Kontak</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isScrolled: false,
      isAtTop: true,
      menuOpen: false,
      activeSection: "home",
      sections: [],
    };
  },
  mounted() {
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);

    this.initSections();

    window.addEventListener("scroll", this.updateActiveSection);

    setTimeout(() => {
      const logoTextH1 = this.$el.querySelector(".logo-text h1");
      if (logoTextH1) {
        logoTextH1.style.opacity = "1";
      }
    }, 100);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.updateActiveSection);
  },
  methods: {
    handleScroll() {
      const scrollY = window.scrollY;
      this.isScrolled = scrollY > 60;
      this.isAtTop = scrollY < 10;
    },
    handleResize() {
      if (window.innerWidth > 768 && this.menuOpen) {
        this.menuOpen = false;
      }
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      document.body.style.overflow = this.menuOpen ? "hidden" : "";
    },
    handleNavClick(event, target) {
      event.preventDefault();

      if (this.menuOpen) {
        this.menuOpen = false;
        document.body.style.overflow = "";
      }

      if (target === "/") {
        this.$router.push("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (target.startsWith("#")) {
        const element = document.querySelector(target);
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          this.activeSection = target.substring(1);
        }
      }
    },
    initSections() {
      this.sections = [
        "home",
        "about",
        "visi-misi",
        "products",
        "certifications",
        "contact",
      ];
    },
    updateActiveSection() {
      const scrollPosition = window.scrollY + 100;

      for (const section of this.sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            this.activeSection = section;
            break;
          }
        }
      }
    },
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>