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

indexContent = indexContent.replace(
  /<meta name="version" content="[^"]*">/,
  `<meta name="version" content="${newVersion}">`
);

indexContent = indexContent.replace(
  /const VERSION = '[^']*';/,
  `const VERSION = '${newVersion}';`
);

fs.writeFileSync(indexPath, indexContent);

console.log(`✅ Updated version from ${currentVersion} to ${newVersion}`);