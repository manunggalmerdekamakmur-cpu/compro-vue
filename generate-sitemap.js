import { writeFileSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = "https://manunggalmerdekamakmur.com";
const BUILD_DIR = "dist";
const TODAY = new Date().toISOString().split("T")[0];

const pages = [
  { url: "/", lastmod: TODAY, changefreq: "daily", priority: "1.0" },
  { url: "/Beranda", lastmod: TODAY, changefreq: "monthly", priority: "0.8" },
  {
    url: "/Tentang Kami",
    lastmod: TODAY,
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    url: "/Visi & Misi",
    lastmod: TODAY,
    changefreq: "weekly",
    priority: "0.9",
  },
  {
    url: "/Produk Kami",
    lastmod: TODAY,
    changefreq: "yearly",
    priority: "0.7",
  },
  {
    url: "/Sertifikasi",
    lastmod: TODAY,
    changefreq: "monthly",
    priority: "0.6",
  },
  { url: "/Kontak", lastmod: TODAY, changefreq: "weekly", priority: "0.8" },
];

function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  xml +=
    '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
  xml += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

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

function generateSitemapIndex() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  xml += "  <sitemap>\n";
  xml += `    <loc>${SITE_URL}/sitemap.xml</loc>\n`;
  xml += `    <lastmod>${TODAY}</lastmod>\n`;
  xml += "  </sitemap>\n";

  xml += "  <sitemap>\n";
  xml += `    <loc>${SITE_URL}/sitemap-pages.xml</loc>\n`;
  xml += `    <lastmod>${TODAY}</lastmod>\n`;
  xml += "  </sitemap>\n";

  xml += "</sitemapindex>";
  return xml;
}

function main() {
  console.log("🚀 Generating enhanced sitemaps...");

  const sitemap = generateSitemap();
  const sitemapIndex = generateSitemapIndex();
  const distPath = join(__dirname, BUILD_DIR);

  if (!existsSync(distPath)) {
    console.error(`❌ Folder ${distPath} tidak ditemukan!`);
    process.exit(1);
  }

  writeFileSync(join(distPath, "sitemap.xml"), sitemap, "utf8");

  writeFileSync(join(distPath, "sitemap-index.xml"), sitemapIndex, "utf8");

  writeFileSync(join(distPath, "sitemap-pages.xml"), sitemap, "utf8");

  console.log("✅ Sitemaps berhasil dibuat!");
  console.log(`📍 ${pages.length} URL telah dimasukkan:`);
  pages.forEach((page, index) => {
    console.log(`   ${index + 1}. ${SITE_URL}${page.url}`);
  });
}

main();
