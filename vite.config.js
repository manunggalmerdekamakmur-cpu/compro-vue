import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// Generate version based on timestamp
const version = Date.now().toString()

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
    emptyOutDir: true,
    
    // Add version to output
    rollupOptions: {
      output: {
        // File names dengan hash
        entryFileNames: `assets/js/[name]-[hash].js`,
        chunkFileNames: `assets/js/[name]-[hash].js`,
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split('.').pop()
          if (['css'].includes(ext)) {
            return `assets/css/[name]-[hash].${ext}`
          }
          return `assets/[ext]/[name]-[hash].[ext]`
        }
      }
    }
  },
  
  css: {
    postcss: './postcss.config.js'
  },
  
  // Define global version
  define: {
    '__APP_VERSION__': JSON.stringify(version)
  }
})