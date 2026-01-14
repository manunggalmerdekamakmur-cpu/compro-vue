import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'assets': resolve(__dirname, './public/assets')
    }
  },
  server: {
    port: 3000,
    host: true
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
        pure_funcs: ['console.log'],
        passes: 3,
        unsafe: true,
        unsafe_math: true
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('vue-router')) return 'router'
            if (id.includes('vue')) return 'vue'
            return 'vendor'
          }
          if (id.includes('/components/layout/')) return 'layout'
          if (id.includes('/components/sections/')) return 'sections'
          if (id.includes('/pages/')) {
            const page = id.split('/pages/')[1].split('.')[0]
            if (['Home', 'triobionik-list'].includes(page)) return 'core'
            return `page-${page}`
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split('.').pop()
          if (ext === 'css') return 'assets/css/[name]-[hash].css'
          if (['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif'].includes(ext)) {
            return 'assets/img/[name]-[hash].[ext]'
          }
          return 'assets/[ext]/[name]-[hash].[ext]'
        },
        compact: true
      }
    },
    target: 'es2020',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    cssMinify: 'lightningcss',
    assetsInlineLimit: 4096
  },
  css: {
    devSourcemap: false
  },
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: []
  }
})