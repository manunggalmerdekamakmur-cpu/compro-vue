import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read package.json
const packagePath = path.join(__dirname, '..', 'package.json')
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))

// Increment patch version
const versionParts = packageJson.version.split('.')
versionParts[2] = parseInt(versionParts[2]) + 1
const newVersion = versionParts.join('.')
packageJson.version = newVersion

// Write updated package.json
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n')

console.log(`🚀 Version updated to: ${newVersion}`)

// Update index.html with new version
const indexPath = path.join(__dirname, '..', 'index.html')
let indexContent = fs.readFileSync(indexPath, 'utf-8')

// Add cache-busting version to main.js
const versionParam = `?v=${newVersion}`
indexContent = indexContent.replace(
  /src="\/src\/main\.js(?:\?[^"]*)?"/,
  `src="/src/main.js${versionParam}"`
)

fs.writeFileSync(indexPath, indexContent)
console.log(`✅ index.html updated with version: ${newVersion}`)

