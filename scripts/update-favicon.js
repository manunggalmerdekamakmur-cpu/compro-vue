import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function updateIndexHtml() {
  const indexPath = join(__dirname, "../dist/index.html");
  let html = readFileSync(indexPath, "utf8");

  const CLOUDINARY_FAVICON =
    "https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461077/favicon_cqc5pw.ico";

  const CLOUDINARY_LOGO_PNG =
    "https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461077/favicon_cqc5pw.ico";

  const FALLBACK_LOGO =
    "https://res.cloudinary.com/dz1zcobkz/image/upload/w_512,h_512/v1768461077/favicon_cqc5pw.ico";

  const company = {
    name: "PT. Manunggal Merdeka Makmur",
    url: "https://manunggalmerdekamakmur.com",
    logo: CLOUDINARY_LOGO_PNG || FALLBACK_LOGO,
    favicon: CLOUDINARY_FAVICON,
    description:
      "Perusahaan kontraktor dan developer properti terpercaya dengan pengalaman lebih dari 20 tahun di Indonesia.",
    phone: "+62-21-1234567",
    email: "info@manunggalmerdekamakmur.com",
    address: "Jl. Contoh No. 123, Jakarta, Indonesia",
  };

  const faviconTags = `
    <!-- Primary Favicon -->
    <link rel="icon" href="${company.favicon}" type="image/x-icon">
    <link rel="shortcut icon" href="${company.favicon}" type="image/x-icon">
    
    <!-- Multiple sizes for different devices -->
    <link rel="icon" type="image/png" sizes="32x32" href="${company.favicon}">
    <link rel="icon" type="image/png" sizes="16x16" href="${company.favicon}">
    <link rel="apple-touch-icon" sizes="180x180" href="${company.favicon}">
    <link rel="mask-icon" href="${company.favicon}" color="#ffffff">
    
    <!-- Preload for performance -->
    <link rel="preload" href="${company.favicon}" as="image" type="image/x-icon">
  `;

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
      "founders": [],
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
        },
        {
          "@type": "ContactPoint",
          "email": "${company.email}",
          "contactType": "customer support",
          "areaServed": "ID"
        }
      ],
      "sameAs": [
        "https://facebook.com/manunggalmerdekamakmur",
        "https://instagram.com/manunggalmerdekamakmur",
        "https://linkedin.com/company/manunggalmerdekamakmur",
        "https://twitter.com/manunggalmerdekamakmur"
      ]
    }
    </script>
    
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "${company.url}/#website",
      "url": "${company.url}",
      "name": "${company.name} - Kontraktor & Developer Properti",
      "description": "${company.description}",
      "publisher": {
        "@type": "Organization",
        "@id": "${company.url}/#organization"
      },
      "inLanguage": "id-ID",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "${company.url}/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
    </script>
    
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "${company.url}/#localbusiness",
      "name": "${company.name}",
      "image": "${company.logo}",
      "description": "${company.description}",
      "url": "${company.url}",
      "telephone": "${company.phone}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${company.address}",
        "addressLocality": "Jakarta",
        "addressRegion": "DKI Jakarta",
        "postalCode": "12345",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-6.2088",
        "longitude": "106.8456"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "17:00"
      },
      "priceRange": "$$"
    }
    </script>
  `;

  const metaTags = `
    <!-- Essential Meta Tags -->
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    
    <!-- Open Graph Tags untuk Social Media -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${company.name}">
    <meta property="og:description" content="${company.description}">
    <meta property="og:url" content="${company.url}">
    <meta property="og:image" content="${company.logo}">
    <meta property="og:image:width" content="512">
    <meta property="og:image:height" content="512">
    <meta property="og:site_name" content="${company.name}">
    <meta property="og:locale" content="id_ID">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${company.name}">
    <meta name="twitter:description" content="${company.description}">
    <meta name="twitter:image" content="${company.logo}">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${company.url}">
  `;

  const faviconRegex =
    /<link[^>]*rel=(["'])(icon|shortcut icon|apple-touch-icon)[^>]*>/gi;
  html = html.replace(faviconRegex, "");

  const scriptRegex =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi;
  html = html.replace(scriptRegex, "");

  const metaRegex = /<meta[^>]*(og:|twitter:|robots|googlebot|bingbot)[^>]*>/gi;
  html = html.replace(metaRegex, "");

  if (html.includes("<head>")) {
    html = html.replace(
      "<head>",
      `<head>${metaTags}${faviconTags}${structuredData}`,
    );
  }

  writeFileSync(indexPath, html, "utf8");
  console.log("✅ SEO tags, favicon, and structured data updated");

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /api/
Disallow: /search?*

Sitemap: ${company.url}/sitemap.xml
Sitemap: ${company.url}/sitemap-pages.xml

# Google-specific
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: AdsBot-Google
Allow: /

# Bing
User-agent: bingbot
Allow: /
Crawl-delay: 2

# Yandex
User-agent: Yandex
Allow: /
Crawl-delay: 3`;

  const distPath = join(__dirname, "../dist");
  writeFileSync(join(distPath, "robots.txt"), robotsTxt, "utf8");
  console.log("✅ Robots.txt updated");
}

updateIndexHtml();
