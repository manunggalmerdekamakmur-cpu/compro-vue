import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import compression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          whitespace: 'preserve'
        }
      }
    }),
    
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false
    }),
    
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false
    }),
    
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'PT. Manunggal Merdeka Makmur',
        short_name: 'Manunggal',
        description: 'Produsen Pupuk Organik Berkualitas',
        theme_color: '#1a7d3e',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/res\.cloudinary\.com\/.*\.(webp|jpg|png)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cloudinary-images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  
  server: {
    port: 3000,
    host: true,
    open: true,
    strictPort: false
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        pure_funcs: ['console.log', 'console.info'],
        ecma: 2018
      },
      format: {
        comments: false
      }
    },
    
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'utils': ['/src/data/product.js']
        },
        
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        
        assetFileNames: assetInfo => {
          const name = assetInfo.name || ''
          const ext = name.split('.').pop()
          
          if (ext === 'css') {
            return 'assets/css/[name]-[hash].css'
          }
          
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(name)) {
            return 'assets/img/[name]-[hash].[ext]'
          }
          
          if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
            return 'assets/fonts/[name]-[hash].[ext]'
          }
          
          return 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    
    target: 'es2018',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    cssMinify: 'lightningcss',
    assetsInlineLimit: 4096,
    
    modulePreload: {
      polyfill: true
    }
  },
  
  css: {
    devSourcemap: false,
    
    lightningcss: {
      minify: true,
      targets: {
        chrome: 90,
        firefox: 88,
        safari: 14,
        edge: 90
      }
    }
  },
  
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: [],
    
    esbuildOptions: {
      target: 'es2018',
      minify: true,
      keepNames: false,
      treeShaking: true
    }
  },
  
  preview: {
    port: 4173,
    strictPort: false,
    host: true
  }
})