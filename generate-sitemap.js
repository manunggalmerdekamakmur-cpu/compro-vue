import { writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = "https://manunggalmerdekamakmur.com";
const BUILD_DIR = "dist";
const TODAY = new Date().toISOString().split("T")[0];

const pages = [
  {
    url: "/",
    lastmod: TODAY,
    changefreq: "daily",
    priority: "1.0",
  },
];

function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml +=
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

  pages.forEach((page) => {
    xml += "  <url>\n";
    xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += "  </url>\n";
  });

  xml += "</urlset>";
  return xml;
}

function main() {
  console.log("🚀 Generating sitemap.xml...");

  const sitemap = generateSitemap();
  const distPath = join(__dirname, BUILD_DIR);

  if (!existsSync(distPath)) {
    console.error(`❌ Folder ${distPath} tidak ditemukan!`);
    process.exit(1);
  }

  writeFileSync(join(distPath, "sitemap.xml"), sitemap, "utf8");

  console.log("✅ sitemap.xml berhasil dibuat!");
  console.log(`📍 Sitemap berisi ${pages.length} URL:`);
  pages.forEach((page) => {
    console.log(`   - ${SITE_URL}${page.url}`);
  });
}

main();
