import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  
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
    
    // Tambahkan manifest untuk cache busting
    manifest: true,
    
    rollupOptions: {
      output: {
        // Tambahkan hash untuk semua file aset
        entryFileNames: `assets/js/[name]-[hash].js`,
        chunkFileNames: `assets/js/[name]-[hash].js`,
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].[ext]`
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].[ext]`
          }
          return `assets/[ext]/[name]-[hash].[ext]`
        }
      }
    }
  },
  
  css: {
    postcss: './postcss.config.js'
  }
})