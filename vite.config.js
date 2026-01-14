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
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      format: {
        comments: false
      }
    },
    
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router']
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split('.').pop()
          const dirs = {
            css: 'css',
            js: 'js',
            png: 'img',
            jpg: 'img',
            jpeg: 'img',
            webp: 'img',
            svg: 'img',
            gif: 'img',
            woff: 'fonts',
            woff2: 'fonts',
            ttf: 'fonts',
            eot: 'fonts'
          }
          return `assets/${dirs[ext] || 'misc'}/[name]-[hash].[ext]`
        }
      }
    },
    
    target: 'es2015',
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    cssMinify: true
  },
  
  css: {
    devSourcemap: false
  }
})