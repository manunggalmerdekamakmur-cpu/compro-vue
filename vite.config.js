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
    
    rollupOptions: {
      output: {
        // Gunakan content hash untuk cache busting yang lebih baik
        entryFileNames: `assets/js/[name].[hash:8].js`,
        chunkFileNames: `assets/js/[name].[hash:8].js`,
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').pop()
          
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/css/[name].[hash:8].[ext]`
          }
          
          return `assets/[ext]/[name].[hash:8].[ext]`
        }
      }
    },
    
    // Generate manifest untuk versioning
    manifest: true,
    
    // Tambahkan sourcemap untuk debugging
    sourcemap: false
  },
  
  css: {
    postcss: './postcss.config.js'
  }
})