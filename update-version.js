const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const currentVersion = packageJson.version || '1.0.0';

const versionParts = currentVersion.split('.');
versionParts[2] = parseInt(versionParts[2]) + 1;
const newVersion = versionParts.join('.');

packageJson.version = newVersion;
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Generate unique build hash
const buildHash = crypto.randomBytes(4).toString('hex');

// Update meta tag version
const metaVersionRegex = /<meta name="version" content="[^"]*">/;
if (metaVersionRegex.test(indexContent)) {
  indexContent = indexContent.replace(
    metaVersionRegex,
    `<meta name="version" content="${newVersion}">`
  );
} else {
  indexContent = indexContent.replace(
    /<meta name="robots" content="index, follow">/,
    `<meta name="robots" content="index, follow">\n  <meta name="version" content="${newVersion}">`
  );
}

// Update version in script
const versionPattern = /const VERSION = '[^']*';/g;
if (versionPattern.test(indexContent)) {
  indexContent = indexContent.replace(
    versionPattern,
    `const VERSION = '${newVersion}_${buildHash}';`
  );
}

// Add build timestamp if needed
const timestamp = Date.now();
indexContent = indexContent.replace(
  /const TIMESTAMP = Date.now\(\);/,
  `const TIMESTAMP = ${timestamp};`
);

fs.writeFileSync(indexPath, indexContent);

// Juga update environment variable untuk build process
const envPath = path.join(__dirname, '.env.production');
if (fs.existsSync(envPath)) {
  let envContent = fs.readFileSync(envPath, 'utf8');
  envContent = envContent.replace(/VITE_APP_VERSION=.*/g, `VITE_APP_VERSION=${newVersion}_${buildHash}`);
  fs.writeFileSync(envPath, envContent);
}

console.log(`✅ Updated version from ${currentVersion} to ${newVersion}_${buildHash}`);
console.log(`✅ Build timestamp: ${timestamp}`);