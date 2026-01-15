import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import compression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        vue(),
        compression({
            algorithm: 'gzip',
            ext: '.gz'
        }),
        compression({
            algorithm: 'brotliCompress',
            ext: '.br'
        }),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
            manifest: {
                name: 'PT. Manunggal Merdeka Makmur',
                short_name: 'Manunggal',
                description: 'Produsen Pupuk Organik Berkualitas',
                theme_color: '#1a7d3e',
                background_color: '#ffffff',
                display: 'standalone',
                icons: [
                    {
                        src: '/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/res\.cloudinary\.com\/.*\.(webp|jpg|png)/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'cloudinary-images',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
                            }
                        }
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    },
    server: {
        port: 3000,
        host: true,
        open: true
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
                passes: 3
            },
            format: {
                comments: false
            }
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    'vue-vendor': ['vue', 'vue-router']
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    const ext = assetInfo.name.split('.').pop()
                    if (ext === 'css') return 'assets/css/[name]-[hash].css'
                    return 'assets/[ext]/[name]-[hash].[ext]'
                }
            }
        },
        target: 'es2018',
        reportCompressedSize: false,
        chunkSizeWarningLimit: 1000,
        cssCodeSplit: true,
        cssMinify: true,
        assetsInlineLimit: 4096
    },
    css: {
        devSourcemap: false
    },
    optimizeDeps: {
        include: ['vue', 'vue-router'],
        exclude: [],
        esbuildOptions: {
            target: 'es2018'
        }
    }
})