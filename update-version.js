const fs = require('fs');
const path = require('path');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const currentVersion = packageJson.version || '1.0.0';

const versionParts = currentVersion.split('.');
versionParts[2] = parseInt(versionParts[2]) + 1;
const newVersion = versionParts.join('.');

packageJson.version = newVersion;
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

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

const versionVarRegex = /const VERSION = '[^']*';/;
if (versionVarRegex.test(indexContent)) {
  indexContent = indexContent.replace(
    versionVarRegex,
    `const VERSION = '${newVersion}';`
  );
} else {
  const scriptCheckRegex = /<script>\s*const VERSION = '[^']*';[\s\S]*?<\/script>/;
  if (!scriptCheckRegex.test(indexContent)) {
    indexContent = indexContent.replace(
      /<\/body>/,
      `  <script>\n    // Tambahkan version check\n    const VERSION = '${newVersion}';\n    const CACHE_KEY = 'app-version';\n    \n    const savedVersion = localStorage.getItem(CACHE_KEY);\n    if (savedVersion && savedVersion !== VERSION) {\n      // Clear cache jika versi berbeda\n      caches.keys().then(function(names) {\n        for (let name of names) caches.delete(name);\n      });\n      localStorage.clear();\n      sessionStorage.clear();\n    }\n    localStorage.setItem(CACHE_KEY, VERSION);\n  </script>\n</body>`
    );
  }
}

fs.writeFileSync(indexPath, indexContent);

console.log(`✅ Updated version from ${currentVersion} to ${newVersion}`);