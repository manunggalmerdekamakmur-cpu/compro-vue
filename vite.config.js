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
    emptyOutDir: true
  },
  
  css: {
    postcss: './postcss.config.js'
  }
})