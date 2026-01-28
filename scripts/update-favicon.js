// scripts/update-favicon.js
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function updateIndexHtml() {
  const indexPath = join(__dirname, "../dist/index.html");
  let html = readFileSync(indexPath, "utf8");

  // URL favicon dari Cloudinary
  const CLOUDINARY_FAVICON =
    "https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461077/favicon_cqc5pw.ico";
  const CLOUDINARY_LOGO =
    "https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461077/favicon_cqc5pw.ico"; // Ganti dengan logo asli jika ada

  // Data perusahaan
  const company = {
    name: "PT. Manunggal Merdeka Makmur",
    url: "https://manunggalmerdekamakmur.com",
    logo: CLOUDINARY_LOGO,
    favicon: CLOUDINARY_FAVICON,
    description:
      "Perusahaan kontraktor dan developer properti terpercaya dengan pengalaman lebih dari 20 tahun di Indonesia.",
    phone: "+62-21-1234567",
    email: "info@manunggalmerdekamakmur.com",
    address: "Jl. Contoh No. 123, Jakarta, Indonesia",
  };

  // Favicon & Logo Tags
  const faviconTags = `
    <!-- Favicon dari Cloudinary -->
    <link rel="icon" type="image/x-icon" href="${company.favicon}">
    <link rel="shortcut icon" href="${company.favicon}">
    <link rel="apple-touch-icon" href="${company.favicon}">
    
    <!-- Untuk Google Search Results -->
    <link rel="icon" type="image/png" href="${company.favicon}" sizes="32x32">
    <link rel="icon" type="image/png" href="${company.favicon}" sizes="16x16">
    
    <!-- Untuk Apple devices -->
    <link rel="apple-touch-icon-precomposed" href="${company.favicon}">
    <meta name="msapplication-TileImage" content="${company.favicon}">
  `;

  // Structured Data dengan Logo untuk Google
  const structuredData = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "${company.url}/#organization",
      "name": "${company.name}",
      "url": "${company.url}",
      "logo": "${company.logo}",
      "image": "${company.logo}",
      "description": "${company.description}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${company.address}",
        "addressLocality": "Jakarta",
        "addressRegion": "DKI Jakarta",
        "addressCountry": "ID"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "${company.phone}",
        "email": "${company.email}",
        "contactType": "Customer Service",
        "availableLanguage": ["Indonesian", "English"]
      },
      "sameAs": [
        "https://facebook.com/manunggalmerdekamakmur",
        "https://instagram.com/manunggalmerdekamakmur",
        "https://linkedin.com/company/manunggalmerdekamakmur"
      ]
    }
    </script>
    
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "${company.url}/#website",
      "url": "${company.url}",
      "name": "${company.name}",
      "description": "${company.description}",
      "publisher": {
        "@type": "Organization",
        "@id": "${company.url}/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "${company.url}/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
    </script>
  `;

  // Cari dan hapus favicon tags yang ada
  const faviconRegex =
    /<link[^>]*rel=(["'])(icon|shortcut icon|apple-touch-icon)[^>]*>/gi;
  html = html.replace(faviconRegex, "");

  // Hapus script structured data yang ada
  const scriptRegex =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi;
  html = html.replace(scriptRegex, "");

  // Tambahkan favicon dan structured data baru setelah <head>
  if (html.includes("<head>")) {
    html = html.replace("<head>", `<head>${faviconTags}${structuredData}`);
  }

  writeFileSync(indexPath, html, "utf8");
  console.log("✅ Favicon and Structured Data updated with Cloudinary links");

  // Buat file robots.txt yang lebih komprehensif
  const robotsTxt = `# Robots.txt for ${company.name}
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /cgi-bin/
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /search/
Disallow: /?s=

Crawl-delay: 10

# Sitemaps
Sitemap: ${company.url}/sitemap.xml

# Google Adsbot
User-agent: AdsBot-Google
Allow: /

# Bingbot
User-agent: bingbot
Allow: /

# Yandex
User-agent: Yandex
Allow: /
Crawl-delay: 5

# Baidu
User-agent: Baiduspider
Allow: /
Crawl-delay: 10

# DuckDuckGo
User-agent: DuckDuckBot
Allow: /

# Slack
User-agent: Slackbot
Allow: /
Disallow: /private/

# Facebook
User-agent: facebookexternalhit
Allow: /
Crawl-delay: 5
`;

  const distPath = join(__dirname, "../dist");
  writeFileSync(join(distPath, "robots.txt"), robotsTxt, "utf8");
  console.log("✅ Robots.txt updated");
}

updateIndexHtml();
