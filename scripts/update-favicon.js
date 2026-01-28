// scripts/update-favicon.js - REVISI
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function updateIndexHtml() {
  const indexPath = join(__dirname, "../dist/index.html");
  let html = readFileSync(indexPath, "utf8");

  // 🔥 GUNAKAN CLOUDINARY SAJA - Ini sudah optimal
  const CLOUDINARY_LOGO =
    "https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461076/logo_xipkza.webp";
  const CLOUDINARY_FAVICON =
    "https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461077/favicon_cqc5pw.ico";

  // Versi untuk kebutuhan Google
  const LOGO_512 = `https://res.cloudinary.com/dz1zcobkz/image/upload/w_512,h_512,c_fill/${CLOUDINARY_LOGO.split("/upload/")[1]}`;
  const LOGO_192 = `https://res.cloudinary.com/dz1zcobkz/image/upload/w_192,h_192,c_fill/${CLOUDINARY_LOGO.split("/upload/")[1]}`;

  const company = {
    name: "PT. Manunggal Merdeka Makmur",
    url: "https://manunggalmerdekamakmur.com",
    // ✅ PASTIKAN INI YANG DIPAKAI UNTUK SEMUA STRUCTURED DATA
    logo: LOGO_512,
    description:
      "Perusahaan kontraktor dan developer properti terpercaya dengan pengalaman lebih dari 20 tahun di Indonesia.",
  };

  // HANYA update bagian favicon dan structured data
  // 1. Hapus semua favicon tags lama
  html = html.replace(
    /<link[^>]*rel=(["'])(icon|shortcut icon|apple-touch-icon)[^>]*>/gi,
    "",
  );

  // 2. Hapus structured data lama (jika ada dari update-html-seo.js)
  html = html.replace(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
    "",
  );

  // 3. Hapus meta og:image dan twitter:image yang mungkin konflik
  html = html.replace(/<meta[^>]*(og:image|twitter:image)[^>]*>/gi, "");

  // 4. Tambahkan favicon tags BARU
  const faviconTags = `
    <!-- Primary Favicon -->
    <link rel="icon" type="image/x-icon" href="${CLOUDINARY_FAVICON}">
    <link rel="shortcut icon" href="${CLOUDINARY_FAVICON}" type="image/x-icon">
    
    <!-- WebP Logo untuk modern browsers -->
    <link rel="icon" type="image/webp" sizes="512x512" href="${LOGO_512}">
    <link rel="icon" type="image/webp" sizes="192x192" href="${LOGO_192}">
    
    <!-- Apple Touch Icon -->
    <link rel="apple-touch-icon" href="${LOGO_192}">
    
    <!-- Preload untuk performa -->
    <link rel="preload" href="${CLOUDINARY_FAVICON}" as="image" type="image/x-icon" fetchpriority="high">
  `;

  // 5. Structured data UNIFIED (satu versi saja)
  const structuredData = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "${company.url}/#organization",
          "name": "${company.name}",
          "url": "${company.url}",
          "logo": "${company.logo}",
          "image": "${company.logo}",
          "description": "${company.description}",
          "sameAs": [
            "https://facebook.com/manunggalmerdekamakmur",
            "https://instagram.com/manunggalmerdekamakmur"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "${company.url}/#website",
          "url": "${company.url}",
          "name": "${company.name}",
          "description": "${company.description}",
          "publisher": {
            "@id": "${company.url}/#organization"
          }
        },
        {
          "@type": "WebPage",
          "@id": "${company.url}/#homepage",
          "url": "${company.url}",
          "name": "${company.name}",
          "about": {
            "@id": "${company.url}/#organization"
          },
          "isPartOf": {
            "@id": "${company.url}/#website"
          },
          "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": "${company.logo}",
            "width": "512",
            "height": "512"
          }
        }
      ]
    }
    </script>
  `;

  // 6. Open Graph & Twitter Cards yang konsisten
  const socialMetaTags = `
    <!-- Open Graph -->
    <meta property="og:image" content="${company.logo}">
    <meta property="og:image:width" content="512">
    <meta property="og:image:height" content="512">
    <meta property="og:image:type" content="image/webp">
    <meta property="og:image:alt" content="Logo ${company.name}">
    
    <!-- Twitter -->
    <meta name="twitter:image" content="${company.logo}">
    <meta name="twitter:image:alt" content="Logo ${company.name}">
    
    <!-- Additional for Google -->
    <link rel="image_src" href="${company.logo}">
    <meta name="thumbnail" content="${company.logo}">
  `;

  // 7. Inject semua tags di bagian yang tepat
  // Cari </head> dan tambahkan sebelum itu
  html = html.replace(
    "</head>",
    `${faviconTags}${socialMetaTags}${structuredData}</head>`,
  );

  writeFileSync(indexPath, html, "utf8");
  console.log("✅ Logo configuration updated for Google Search");

  // Generate robots.txt dengan sitemap reference
  generateRobotsTxt(company);
}

function generateRobotsTxt(company) {
  const distPath = join(__dirname, "../dist");
  const robotsContent = `
User-agent: *
Allow: /

Sitemap: ${company.url}/sitemap.xml
Sitemap: ${company.url}/sitemap-index.xml

# Googlebot specific
User-agent: Googlebot
Allow: /
Disallow: /private/

# Image crawling for Google
User-agent: Googlebot-Image
Allow: /
Disallow: /private-images/

# Crawl delay (if needed)
# Crawl-delay: 1
`;

  writeFileSync(join(distPath, "robots.txt"), robotsContent, "utf8");
  console.log("✅ Robots.txt generated");
}

updateIndexHtml();
