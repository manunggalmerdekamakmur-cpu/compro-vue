import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "./assets/css/style.css";
import "./assets/css/product.css";

const routes = [
  {
    path: "/",
    component: () => import("./pages/Home.vue"),
    meta: {
      title: "Beranda",
      layout: true,
      preloadImages: [
        "https://res.cloudinary.com/dz1zcobkz/image/upload/v1768890938/menyecut_20_mm1irt.webp",
        "https://res.cloudinary.com/dz1zcobkz/image/upload/v1768807981/visi-misi-bg_w1tk8e_drwylj.webp",
        "https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461076/logo_xipkza.webp",
        "https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461077/logo-stiesia_raywzt.webp",
      ],
      priority: "high",
    },
  },
  {
    path: "/triobionik",
    component: () => import("./pages/triobionik-list.vue"),
    meta: {
      title: "Triobionik",
      layout: true,
      priority: "low",
    },
  },
  {
    path: "/triobionik/:id",
    component: () => import("./pages/triobionik-detail.vue"),
    meta: {
      title: "Detail Triobionik",
      layout: true,
      priority: "low",
    },
  },
  {
    path: "/manunggal-lestari",
    component: () => import("./pages/manunggal-lestari.vue"),
    meta: {
      title: "Manunggal Lestari",
      layout: true,
      priority: "low",
    },
  },
  {
    path: "/manunggal-lestari-dekomposer",
    component: () => import("./pages/manunggal-lestari-dekomposer.vue"),
    meta: {
      title: "Manunggal Lestari Dekomposer",
      layout: true,
      priority: "low",
    },
  },
  {
    path: "/manunggal-makmur",
    component: () => import("./pages/manunggal-makmur.vue"),
    meta: {
      title: "Manunggal Makmur",
      layout: true,
      priority: "low",
    },
  },
  {
    path: "/ptorca",
    component: () => import("./pages/ptorca.vue"),
    meta: {
      title: "PTORCA",
      layout: true,
      priority: "low",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: "smooth", top: 80 };
    return { top: 0, behavior: "smooth" };
  },
});

const preloadImages = (urls) => {
  return Promise.all(
    urls.map((url) => {
      if (!url) return Promise.resolve();
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = url;
      });
    }),
  );
};

const hideLoadingScreen = () => {
  const loadingEl = document.getElementById("app-loading");
  if (loadingEl) {
    loadingEl.classList.add("hidden");
    setTimeout(() => {
      loadingEl.style.display = "none";
    }, 300);
  }
  document.body.classList.remove("loading");
  document.body.classList.add("loaded");
};

const initLazyLoader = () => {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
              img.classList.add("image-loaded");
            }
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "100px 0px", threshold: 0.01 },
    );

    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => imageObserver.observe(img));

    window.App = window.App || {};
    window.App.lazyLoader = {
      observe: (el) => el.tagName === "IMG" && imageObserver.observe(el),
      scan: () =>
        document
          .querySelectorAll("img[data-src]")
          .forEach((img) => imageObserver.observe(img)),
    };
  }
};

const loadFontAwesome = async () => {
  if (window.FontAwesomeLoaded) return;
  try {
    await import("@fortawesome/fontawesome-free/css/all.min.css");
    window.FontAwesomeLoaded = true;
  } catch (e) {
    console.warn("Font Awesome failed to load:", e);
  }
};

router.afterEach(() => {
  if (window.App?.lazyLoader) {
    requestIdleCallback(() => window.App.lazyLoader.scan(), { timeout: 100 });
  }
});

const initApp = async () => {
  const loadingEl = document.getElementById("app-loading");

  try {
    await Promise.race([
      new Promise((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", resolve, { once: true });
      }),
      new Promise((resolve) => setTimeout(resolve, 800)),
    ]);

    const currentRoute = router.currentRoute.value;
    if (currentRoute.meta?.preloadImages) {
      await Promise.race([
        preloadImages(currentRoute.meta.preloadImages),
        new Promise((resolve) => setTimeout(resolve, 500)),
      ]);
    }

    const app = createApp(App);

    app.directive("lazy", {
      mounted(el) {
        window.App?.lazyLoader?.observe(el);
      },
    });

    app.use(router);
    await router.isReady();
    app.mount("#app");

    initLazyLoader();
    loadFontAwesome();

    requestAnimationFrame(() => {
      hideLoadingScreen();
      requestIdleCallback(
        () => {
          if (window.App?.lazyLoader) window.App.lazyLoader.scan();
        },
        { timeout: 50 },
      );
    });
  } catch (error) {
    console.error("App initialization failed:", error);
    setTimeout(hideLoadingScreen, 300);
    if (loadingEl) {
      loadingEl.innerHTML = `<div style="text-align:center;padding:2rem;color:#666;"><p>Gagal memuat aplikasi.</p><button onclick="window.location.reload()" style="padding:0.75rem 1.5rem;background:#1a7d3e;color:white;border:none;border-radius:25px;cursor:pointer;margin-top:1rem">Coba Lagi</button></div>`;
    }
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

if ("fonts" in document) {
  document.fonts.ready.then(() =>
    document.documentElement.classList.add("fonts-loaded"),
  );
}
