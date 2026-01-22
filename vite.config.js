import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    vue(),
    ...(process.env.NODE_ENV === 'production' ? [
      compression({ algorithm: 'gzip', ext: '.gz' }),
      compression({ algorithm: 'brotliCompress', ext: '.br' })
    ] : [])
  ],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  
  server: {
    port: 3000
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      format: {
        comments: false
      }
    },
    
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split('.').pop()
          if (['css'].includes(ext)) {
            return `assets/css/[name]-[hash].${ext}`
          }
          if (['js'].includes(ext)) {
            return `assets/js/[name]-[hash].${ext}`
          }
          return `assets/[ext]/[name]-[hash].[ext]`
        },
        manualChunks: {
          'vendor': ['vue', 'vue-router'],
          'icons': ['@fortawesome/fontawesome-free']
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    }
  },
  
  css: {
    postcss: './postcss.config.js'
  },
  
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['@fortawesome/fontawesome-free']
  }
})

