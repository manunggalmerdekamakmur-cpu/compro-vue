import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { compression } from 'vite-plugin-compression2'
import { visualizer } from 'rollup-plugin-visualizer'

// Conditionally enable visualizer based on env
const isAnalyze = process.env.ANALYZE === 'true'

export default defineConfig({
  plugins: [
    vue(),
    ViteImageOptimizer({
      png: { quality: 65 },
      jpeg: { quality: 65 },
      jpg: { quality: 65 },
      webp: { quality: 70 },
      avif: { quality: 70 },
      cache: true,
      cacheLocation: './node_modules/.cache/image-optimizer'
    }),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br|gz)$/, /\.(png|jpg|jpeg|webp|avif)$/],
      threshold: 10240
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br|gz)$/, /\.(png|jpg|jpeg|webp|avif)$/]
    }),
    // Visualizer hanya aktif jika ANALYZE=true
    isAnalyze && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true
    })
  ].filter(Boolean), // Filter out false (when visualizer is disabled)
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'assets': path.resolve(__dirname, './public/assets')
    }
  },
  
  server: {
    port: 3000,
    open: true,
    host: true,
    hmr: {
      overlay: false
    }
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    cssMinify: true,
    
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2
      },
      mangle: {
        properties: {
          regex: /^_/
        }
      }
    },
    
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'font-awesome': ['@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons', '@fortawesome/free-brands-svg-icons']
        },
        
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash].css'
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return 'assets/img/[name]-[hash][extname]'
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }
          return 'assets/[ext]/[name]-[hash][extname]'
        }
      }
    },
    
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000
  },
  
  css: {
    devSourcemap: false,
    
    preprocessorOptions: {
      css: {
        charset: false
      }
    }
  },
  
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['@fortawesome/fontawesome-svg-core']
  }
})