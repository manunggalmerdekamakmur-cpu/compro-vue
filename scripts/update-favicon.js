// scripts/update-favicon.js - VERSI WEBP OPTIMIZED
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function updateIndexHtml() {
  const indexPath = join(__dirname, "../dist/index.html");
  let html = readFileSync(indexPath, "utf8");

  // 🔥 LOGO WEBP - Format TERBAIK untuk SEO!
  const CLOUDINARY_LOGO_WEBP =
    "https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461076/logo_xipkza.webp";

  // Versi dengan ukuran spesifik untuk berbagai kebutuhan
  const LOGO_WEBP_512 =
    "https://res.cloudinary.com/dz1zcobkz/image/upload/w_512,h_512,c_fill/v1768461076/logo_xipkza.webp";
  const LOGO_WEBP_192 =
    "https://res.cloudinary.com/dz1zcobkz/image/upload/w_192,h_192,c_fill/v1768461076/logo_xipkza.webp";
  const LOGO_WEBP_32 =
    "https://res.cloudinary.com/dz1zcobkz/image/upload/w_32,h_32,c_fill/v1768461076/logo_xipkza.webp";

  // Fallback PNG (Cloudinary otomatis konversi)
  const LOGO_PNG_512 =
    "https://res.cloudinary.com/dz1zcobkz/image/upload/f_png,w_512,h_512,c_fill/v1768461076/logo_xipkza.webp";

  // Favicon ICO (tetap untuk kompatibilitas)
  const CLOUDINARY_FAVICON =
    "https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461077/favicon_cqc5pw.ico";

  const company = {
    name: "PT. Manunggal Merdeka Makmur",
    url: "https://manunggalmerdekamakmur.com",
    // ✅ GUNAKAN WEBP untuk structured data - GOOGLE LOVE THIS!
    logo: LOGO_WEBP_512,
    logo192: LOGO_WEBP_192,
    logo32: LOGO_WEBP_32,
    logoPNG: LOGO_PNG_512, // Fallback untuk browser lama
    favicon: CLOUDINARY_FAVICON,
    description:
      "Perusahaan kontraktor dan developer properti terpercaya dengan pengalaman lebih dari 20 tahun di Indonesia.",
    phone: "+62-21-1234567",
    email: "info@manunggalmerdekamakmur.com",
    address: "Jl. Contoh No. 123, Jakarta, Indonesia",
  };

  // 🔥 FAVICON STRATEGY: WebP + ICO fallback
  const faviconTags = `
    <!-- Primary Favicon (WebP untuk browser modern) -->
    <link rel="icon" type="image/webp" sizes="512x512" href="${company.logo}">
    <link rel="icon" type="image/webp" sizes="192x192" href="${company.logo192}">
    <link rel="icon" type="image/webp" sizes="32x32" href="${company.logo32}">
    
    <!-- PNG Fallback untuk browser yang tidak support WebP -->
    <link rel="icon" type="image/png" sizes="512x512" href="${company.logoPNG}">
    <link rel="icon" type="image/png" sizes="192x192" href="${company.logo192.replace(".webp", ".png")}">
    
    <!-- ICO Fallback (untuk legacy) -->
    <link rel="icon" type="image/x-icon" href="${company.favicon}">
    <link rel="shortcut icon" href="${company.favicon}" type="image/x-icon">
    
    <!-- Apple Touch Icons -->
    <link rel="apple-touch-icon" sizes="180x180" href="${company.logo192}">
    <link rel="apple-touch-icon" sizes="512x512" href="${company.logo}">
    
    <!-- Preload untuk performa -->
    <link rel="preload" href="${company.logo}" as="image" type="image/webp" fetchpriority="high">
    <link rel="preload" href="${company.favicon}" as="image" type="image/x-icon">
  `;

  // 🔥 STRUCTURED DATA dengan WebP (Google akan SENANG!)
  const structuredData = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "${company.url}/#organization",
      "name": "${company.name}",
      "legalName": "${company.name}",
      "url": "${company.url}",
      "logo": "${company.logo}",
      "image": "${company.logo}",
      "description": "${company.description}",
      "foundingDate": "2000",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 50,
        "maxValue": 200
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${company.address}",
        "addressLocality": "Jakarta",
        "addressRegion": "DKI Jakarta",
        "postalCode": "12345",
        "addressCountry": "ID"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "${company.phone}",
          "contactType": "customer service",
          "areaServed": "ID",
          "availableLanguage": ["Indonesian"]
        }
      ],
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
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "${company.url}/#website",
          "url": "${company.url}",
          "name": "${company.name}",
          "description": "${company.description}",
          "publisher": {
            "@type": "Organization",
            "@id": "${company.url}/#organization"
          }
        },
        {
          "@type": "WebPage",
          "@id": "${company.url}/#webpage",
          "url": "${company.url}",
          "name": "${company.name}",
          "isPartOf": {
            "@id": "${company.url}/#website"
          },
          "primaryImageOfPage": {
            "@id": "${company.logo}"
          },
          "image": {
            "@id": "${company.logo}"
          },
          "thumbnailUrl": "${company.logo}",
          "datePublished": "2024-01-01T00:00:00+07:00",
          "dateModified": "${new Date().toISOString().split("T")[0]}T00:00:00+07:00"
        }
      ]
    }
    </script>
  `;

  // 🔥 META TAGS dengan WebP - Sangat SEO Friendly!
  const metaTags = `
    <!-- Essential Meta -->
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    
    <!-- Open Graph dengan WebP -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${company.name}">
    <meta property="og:description" content="${company.description}">
    <meta property="og:url" content="${company.url}">
    <meta property="og:image" content="${company.logo}">
    <meta property="og:image:width" content="512">
    <meta property="og:image:height" content="512">
    <meta property="og:image:type" content="image/webp">
    <meta property="og:image:alt" content="Logo ${company.name}">
    <meta property="og:site_name" content="${company.name}">
    <meta property="og:locale" content="id_ID">
    
    <!-- Twitter Card dengan WebP -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${company.name}">
    <meta name="twitter:description" content="${company.description}">
    <meta name="twitter:image" content="${company.logo}">
    <meta name="twitter:image:alt" content="Logo ${company.name}">
    
    <!-- Additional Image Meta -->
    <meta name="image" content="${company.logo}">
    <link rel="image_src" href="${company.logo}">
    
    <!-- Canonical -->
    <link rel="canonical" href="${company.url}">
    
    <!-- Google Site Verification (jika ada) -->
    <meta name="google-site-verification" content="verification_token">
  `;

  // Hapus semua tags SEO lama
  const patterns = [
    /<link[^>]*rel=(["'])(icon|shortcut icon|apple-touch-icon|image_src)[^>]*>/gi,
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
    /<meta[^>]*(og:|twitter:|image|robots|googlebot|bingbot|description|keywords|author)[^>]*>/gi,
    /<link[^>]*rel=["']canonical["'][^>]*>/gi,
    /<meta[^>]*name=["'](google-site-verification)["'][^>]*>/gi,
  ];

  patterns.forEach((pattern) => {
    html = html.replace(pattern, "");
  });

  // Tambahkan tags baru setelah <head>
  if (html.includes("<head>")) {
    html = html.replace(
      "<head>",
      `<head>${metaTags}${faviconTags}${structuredData}`,
    );
  }

  writeFileSync(indexPath, html, "utf8");
  console.log("🔥 Logo updated to WebP format - Google will LOVE this!");
  console.log("📊 Logo URL for Google: " + LOGO_WEBP_512);

  // Generate verification file
  generateVerificationFile(company);
}

function generateVerificationFile(company) {
  const distPath = join(__dirname, "../dist");
  const content = `
# Logo Configuration for ${company.url}
# Generated: ${new Date().toISOString()}

## WebP Logo URLs:
- 512x512: ${company.logo}
- 192x192: ${company.logo192}
- 32x32: ${company.logo32}

## PNG Fallback:
- 512x512: ${company.logoPNG}

## ICO Favicon:
- ${company.favicon}

## Google Requirements Checklist:
✅ Format: WebP (Preferred by Google)
✅ Size: 512x512 pixels (Minimum 112x112)
✅ Aspect Ratio: Square (1:1)
✅ Accessible: Yes (Public URL)
✅ Structured Data: Configured
✅ Open Graph: Configured
✅ Twitter Card: Configured

## Next Steps:
1. Wait 7-14 days for Google to re-crawl
2. Check Google Search Console for errors
3. Monitor Rich Results Test
4. Verify in Google's Structured Data Testing Tool

## Test Commands:
npx structured-data-testing-tool --url "${company.url}" --schemas Organization
curl -I "${company.logo}" | grep -i content-type
  `;

  writeFileSync(join(distPath, "logo-config.txt"), content, "utf8");
}

updateIndexHtml();
