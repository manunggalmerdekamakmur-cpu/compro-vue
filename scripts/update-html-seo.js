// scripts/update-html-seo.js
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function updateIndexHtml() {
  const indexPath = join(__dirname, "../dist/index.html");
  let html = readFileSync(indexPath, "utf8");

  // Data perusahaan
  const company = {
    name: "PT. Manunggal Merdeka Makmur",
    url: "https://manunggalmerdekamakmur.com",
    logo: "https://manunggalmerdekamakmur.com/logo.png",
    description:
      "Perusahaan kontraktor dan developer properti terpercaya dengan pengalaman lebih dari 20 tahun di Indonesia.",
    phone: "+62-21-1234567",
    email: "info@manunggalmerdekamakmur.com",
    address: "Jl. Contoh No. 123, Jakarta, Indonesia",
  };

  // SEO Meta Tags
  const seoTags = `
    <!-- Primary Meta Tags -->
    <title>${company.name} | Kontraktor & Developer Properti Terpercaya</title>
    <meta name="description" content="${company.description}">
    <meta name="keywords" content="kontraktor, developer properti, konstruksi bangunan, jasa kontraktor, perusahaan kontraktor, manunggal merdeka makmur">
    <meta name="author" content="${company.name}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${company.url}">
    <meta property="og:title" content="${company.name}">
    <meta property="og:description" content="${company.description}">
    <meta property="og:image" content="${company.logo}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="id_ID">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${company.url}">
    <meta property="twitter:title" content="${company.name}">
    <meta property="twitter:description" content="${company.description}">
    <meta property="twitter:image" content="${company.logo}">
    
    <!-- Canonical -->
    <link rel="canonical" href="${company.url}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#ffffff">
    
    <!-- Structured Data for Google -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "${company.name}",
      "url": "${company.url}",
      "logo": "${company.logo}",
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
    
    <!-- Website Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "${company.url}",
      "name": "${company.name}",
      "description": "${company.description}",
      "publisher": {
        "@type": "Organization",
        "name": "${company.name}",
        "logo": {
          "@type": "ImageObject",
          "url": "${company.logo}"
        }
      }
    }
    </script>
  `;

  // Remove existing title and meta tags
  html = html.replace(/<title>.*?<\/title>/s, "");
  html = html.replace(/<meta[^>]*name=["']description["'][^>]*>/s, "");
  html = html.replace(/<meta[^>]*name=["']keywords["'][^>]*>/s, "");

  // Insert new SEO tags after opening head tag
  if (html.includes("<head>")) {
    html = html.replace("<head>", `<head>${seoTags}`);
  }

  writeFileSync(indexPath, html, "utf8");
  console.log("✅ SEO tags updated in index.html");

  // Create favicon files
  const distPath = join(__dirname, "../dist");

  // Create minimal favicon.ico (16x16 and 32x32)
  const favicon16 = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA" +
      "B3RJTUUH5wQDBgsMJdP7LgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABDSURBVDjLY2" +
      "AYBaOAUAAkG4DJUS0wMjLCYVTL////D8e0AKM2ABnM0NBAdwMgBkOcQXcDIAYzNDTQ3wCIwQwNDfQ3AGIwQ0MD" +
      "YwMAkH8HdMZJtH4AAAAASUVORK5CYII=",
    "base64",
  );

  writeFileSync(join(distPath, "favicon.ico"), favicon16);
  writeFileSync(join(distPath, "favicon-16x16.png"), favicon16);
  writeFileSync(join(distPath, "favicon-32x32.png"), favicon16);

  // Create site.webmanifest
  const manifest = {
    name: company.name,
    short_name: "Manunggal",
    description: company.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
  };

  writeFileSync(
    join(distPath, "site.webmanifest"),
    JSON.stringify(manifest, null, 2),
  );
  console.log("✅ Favicon files created");
}

updateIndexHtml();
