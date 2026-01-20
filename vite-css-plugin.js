// vite-css-plugin.js
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { transform } from 'lightningcss'

export default function viteCssPlugin() {
  return {
    name: 'vite-css-plugin',
    
    transform(code, id) {
      if (id.endsWith('.css')) {
        // Minify CSS dengan lightningcss
        const result = transform({
          filename: id,
          code: Buffer.from(code),
          minify: true,
          sourceMap: false,
          targets: {
            chrome: 90,
            firefox: 88,
            safari: 14,
            edge: 90
          }
        })
        
        return {
          code: result.code.toString(),
          map: null
        }
      }
    },
    
    writeBundle() {
      // Proses CSS di folder assets
      const cssFiles = [
        resolve(__dirname, 'assets/css/style.css'),
        resolve(__dirname, 'assets/css/product.css')
      ]
      
      cssFiles.forEach(cssFile => {
        if (existsSync(cssFile)) {
          const cssContent = readFileSync(cssFile, 'utf-8')
          
          // Minify dengan lightningcss
          const result = transform({
            filename: cssFile,
            code: Buffer.from(cssContent),
            minify: true,
            sourceMap: false
          })
          
          // Simpan hasil minify
          writeFileSync(cssFile, result.code.toString())
        }
      })
    }
  }
}