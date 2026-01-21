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
        entryFileNames: `assets/js/[name].[hash:8].js`,
        chunkFileNames: `assets/js/[name].[hash:8].js`,
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split('.').pop()
          if (['css'].includes(ext)) {
            return `assets/css/[name].[hash:8].${ext}`
          }
          return `assets/[ext]/[name].[hash:8].[ext]`
        }
      }
    }
  },
  
  css: {
    postcss: './postcss.config.js'
  }
})