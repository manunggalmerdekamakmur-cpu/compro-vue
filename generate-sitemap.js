import { writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Konfigurasi
const SITE_URL = "https://manunggalmerdekamakmur.com";
const BUILD_DIR = "dist"; // Folder build Vue
const TODAY = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

// Halaman-halaman website Anda (sesuaikan dengan routes yang ada)
const pages = [
  {
    url: "/",
    lastmod: TODAY,
    changefreq: "weekly",
    priority: "1.0",
  },
  // Jika ada halaman lain, tambahkan di sini:
  // { url: '/tentang', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
  // { url: '/layanan', lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
];

// Generate XML sitemap
function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

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

// Generate robots.txt
function generateRobotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: ${SITE_URL}/sitemap.xml`;
}

// Main function
function main() {
  console.log("🚀 Generating sitemap.xml and robots.txt...");

  const sitemap = generateSitemap();
  const robots = generateRobotsTxt();

  // Path untuk output
  const distPath = join(__dirname, BUILD_DIR);

  // Pastikan folder dist ada
  if (!existsSync(distPath)) {
    console.error(`❌ Folder ${distPath} tidak ditemukan!`);
    console.log('💡 Jalankan "npm run build" terlebih dahulu');
    process.exit(1);
  }

  // Tulis file
  writeFileSync(join(distPath, "sitemap.xml"), sitemap, "utf8");
  writeFileSync(join(distPath, "robots.txt"), robots, "utf8");

  console.log("✅ sitemap.xml berhasil dibuat!");
  console.log("✅ robots.txt berhasil dibuat!");
  console.log("\n📍 File sitemap.xml berisi:");
  pages.forEach((page) => {
    console.log(`   - ${SITE_URL}${page.url}`);
  });
}

// Jalankan
main();
