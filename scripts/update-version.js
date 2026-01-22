import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packagePath = path.join(__dirname, "..", "package.json");
const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf-8"));

const versionParts = packageJson.version.split(".");
versionParts[2] = parseInt(versionParts[2]) + 1;
const newVersion = versionParts.join(".");
packageJson.version = newVersion;

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + "\n");

console.log(`🚀 Version updated to: ${newVersion}`);

const indexPath = path.join(__dirname, "..", "index.html");
let indexContent = fs.readFileSync(indexPath, "utf-8");

const versionParam = `?v=${newVersion}`;
indexContent = indexContent.replace(
  /src="\/src\/main\.js(?:\?[^"]*)?"/,
  `src="/src/main.js${versionParam}"`,
);

fs.writeFileSync(indexPath, indexContent);
console.log(`✅ index.html updated with version: ${newVersion}`);
