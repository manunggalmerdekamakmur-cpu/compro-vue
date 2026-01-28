import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import compression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";

const CACHE_BUST = Date.now().toString().slice(-8);

export default defineConfig({
  plugins: [
    vue(),
    ...(process.env.NODE_ENV === "production"
      ? [
          compression({ algorithm: "gzip", ext: ".gz" }),
          compression({ algorithm: "brotliCompress", ext: ".br" }),
        ]
      : []),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "vite.svg"],
      manifest: {
        name: "PT. Manunggal Merdeka Makmur",
        short_name: "Manunggal",
        description: "Produsen Pupuk Organik Berkualitas",
        theme_color: "#0b1f14",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait-primary",
        icons: [
          {
            src: "https://res.cloudinary.com/dz1zcobkz/image/upload/c_scale,w_16,h_16,c_fill/v1768461076/logo_xipkza.webp",
            sizes: "16x16",
            type: "image/webp",
            purpose: "any maskable",
          },
          {
            src: "https://res.cloudinary.com/dz1zcobkz/image/upload/c_scale,w_32,h_32,c_fill/v1768461076/logo_xipkza.webp",
            sizes: "32x32",
            type: "image/webp",
            purpose: "any maskable",
          },
          {
            src: "https://res.cloudinary.com/dz1zcobkz/image/upload/c_scale,w_180,h_180,c_fill/v1768461076/logo_xipkza.webp",
            sizes: "180x180",
            type: "image/webp",
            purpose: "any maskable",
          },
          {
            src: "https://res.cloudinary.com/dz1zcobkz/image/upload/c_scale,w_192,h_192,c_fill/v1768461076/logo_xipkza.webp",
            sizes: "192x192",
            type: "image/webp",
            purpose: "any maskable",
          },
          {
            src: "https://res.cloudinary.com/dz1zcobkz/image/upload/c_scale,w_512,h_512,c_fill/v1768461076/logo_xipkza.webp",
            sizes: "512x512",
            type: "image/webp",
            purpose: "any maskable",
          },
          {
            src: "https://res.cloudinary.com/dz1zcobkz/image/upload/c_scale,w_512,h_512,c_fill/v1768461076/logo_xipkza.webp",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],

  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 3000,
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",
    minify: "terser",
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
      },
      format: {
        comments: false,
      },
    },

    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split(".").pop();
          if (["css"].includes(ext)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          if (["js"].includes(ext)) {
            return `assets/js/[name]-[hash].${ext}`;
          }
          return `assets/[ext]/[name]-[hash].[ext]`;
        },
        manualChunks: {
          vendor: ["vue", "vue-router"],
          icons: ["@fortawesome/fontawesome-free"],
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
  },

  css: {
    postcss: "./postcss.config.js",
  },

  optimizeDeps: {
    include: ["vue", "vue-router"],
    exclude: ["@fortawesome/fontawesome-free"],
  },
});
