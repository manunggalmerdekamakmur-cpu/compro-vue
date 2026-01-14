import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'assets': resolve(__dirname, './public/assets')
    }
  },
  
  server: {
    port: 3000,
    host: true,
    hmr: {
      overlay: false // Disable error overlay untuk performa
    }
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
        pure_funcs: ['console.log', 'console.info'],
        passes: 2,
        keep_fargs: false,
        unsafe: true,
        unsafe_math: true,
        unsafe_methods: true
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false,
        ecma: 2020
      }
    },
    
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Group vendor libraries
          if (id.includes('node_modules')) {
            if (id.includes('vue')) return 'vue'
            if (id.includes('vue-router')) return 'vue-router'
            return 'vendor'
          }
          
          // Group pages untuk optimal chunking
          if (id.includes('/pages/')) {
            const pageName = id.split('/pages/')[1].split('.')[0]
            const smallPages = ['Home', 'triobionik-list', 'manunggal-lestari']
            if (smallPages.includes(pageName)) return 'core-pages'
            return `page-${pageName}`
          }
          
          // Group components
          if (id.includes('/components/')) {
            const compName = id.split('/components/')[1].split('/')[0]
            if (compName.includes('Product')) return 'product-components'
            if (compName.includes('Layout')) return 'layout-components'
            return 'shared-components'
          }
        },
        
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split('.').pop()
          if (ext === 'css') return 'assets/css/[name]-[hash].css'
          if (['png', 'jpg', 'jpeg', 'webp', 'svg'].includes(ext)) {
            return 'assets/img/[name]-[hash].[ext]'
          }
          return 'assets/[ext]/[name]-[hash].[ext]'
        },
        
        // Optimasi untuk mobile
        compact: true,
        minifyInternalExports: true,
        hoistTransitiveImports: false
      },
      
      // Externalize jika ada library besar
      external: []
    },
    
    target: ['es2020', 'edge79', 'firefox67', 'chrome63', 'safari11.1'],
    reportCompressedSize: true,
    chunkSizeWarningLimit: 800,
    cssCodeSplit: true,
    cssMinify: true,
    
    // Build optimasi
    modulePreload: {
      polyfill: false
    },
    
    // Asset optimasi
    assetsInlineLimit: 4096
  },
  
  css: {
    devSourcemap: false,
    postcss: {
      plugins: [
        require('autoprefixer')({
          overrideBrowserslist: [
            '> 1%',
            'last 2 versions',
            'not dead'
          ]
        }),
        require('cssnano')({
          preset: ['default', {
            discardComments: {
              removeAll: true
            },
            normalizeWhitespace: false
          }]
        })
      ]
    }
  },
  
  // Optimasi dev server
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: []
  }
})