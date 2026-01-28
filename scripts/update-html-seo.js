import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function updateIndexHtml() {
  const indexPath = join(__dirname, "../dist/index.html");
  let html = readFileSync(indexPath, "utf8");

  const company = {
    name: "PT. Manunggal Merdeka Makmur",
    url: "https://manunggalmerdekamakmur.com",
    description:
      "PT. Manunggal Merdeka Makmur merupakan perusahaan agrobisnis yang didirikan pada tahun 2024 dan berkedudukan di Kabupaten Nganjuk, Provinsi Jawa Timur. Perusahaan ini bergerak sebagai produsen pupuk organik dan pupuk hayati berkualitas yang mendukung sektor Pertanian, Perkebunan, Perikanan, dan Peternakan di Indonesia.",
    keywords:
      "pupuk organik, pupuk hayati, produsen pupuk organik, produsen pupuk hayati, pabrik pupuk organik, pabrik pupuk hayati, pupuk pertanian, pupuk perkebunan, pupuk perikanan, pupuk peternakan, agrobisnis indonesia, perusahaan pupuk indonesia, pupuk ramah lingkungan, pupuk organik jawa timur, pupuk hayati jawa timur, PT Manunggal Merdeka Makmur",
    logo: "https://res.cloudinary.com/dz1zcobkz/image/upload/c_scale,w_112,h_112/v1768461076/logo_xipkza.webp",
    telephone: "+62-851-9926-5858",
    address: {
      street: "Desa Pandantoyo RT. 001/RW. 004, Kecamatan Kertosono",
      city: "Nganjuk",
      province: "Jawa Timur",
      postalCode: "64472",
      country: "Indonesia",
    },
  };

  console.log("🔍 Memperbarui SEO untuk logo Google...");

  html = html.replace(/<title>.*?<\/title>/s, "");

  html = html.replace(/<meta[^>]*name=["']description["'][^>]*>/gi, "");
  html = html.replace(/<meta[^>]*name=["']keywords["'][^>]*>/gi, "");

  const organizationRegex =
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)"@type":\s*"Organization"([\s\S]*?)<\/script>/i;

  if (html.match(organizationRegex)) {
    console.log("✅ Structured data Organization ditemukan, memperbarui...");

    const completeOrganization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${company.url}/#organization`,
      name: company.name,
      url: company.url,
      logo: company.logo,
      description: company.description,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.address.street,
        addressLocality: company.address.city,
        addressRegion: company.address.province,
        postalCode: company.address.postalCode,
        addressCountry: company.address.country,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: company.telephone,
        email: "info@manunggalmerdekamakmur.com",
        contactType: "customer service",
      },
    };

    const newStructuredData = `<script type="application/ld+json">\n${JSON.stringify(completeOrganization, null, 2)}\n</script>`;
    html = html.replace(organizationRegex, newStructuredData);
  } else {
    console.log(
      "⚠️ Structured data Organization tidak ditemukan, menambahkan...",
    );

    const completeOrganization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: company.name,
      url: company.url,
      logo: company.logo,
      description: company.description,
    };

    const newStructuredData = `<script type="application/ld+json">\n${JSON.stringify(completeOrganization, null, 2)}\n</script>`;

    if (html.includes("</head>")) {
      html = html.replace("</head>", `${newStructuredData}\n</head>`);
    }
  }

  const seoTextTags = `
    <!-- Primary Meta Tags -->
    <title>${company.name} | Produsen Pupuk Organik & Hayati Indonesia</title>
    <meta name="description" content="${company.description}">
    <meta name="keywords" content="${company.keywords}">
    <meta name="author" content="${company.name}">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${company.url}">
    <meta property="og:title" content="${company.name} | Produsen Pupuk Organik & Hayati">
    <meta property="og:description" content="${company.description}">
    <meta property="og:image" content="${company.logo.replace("w_112,h_112", "w_600")}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${company.name} | Produsen Pupuk Organik & Hayati">
    <meta name="twitter:description" content="${company.description}">
    <meta name="twitter:image" content="${company.logo.replace("w_112,h_112", "w_600")}">
  `;

  if (html.includes("<head>")) {
    html = html.replace("<head>", `<head>${seoTextTags}`);
  }

  writeFileSync(indexPath, html, "utf8");
  console.log("✅ SEO dan structured data diperbarui untuk logo Google");
  console.log("📊 Logo URL untuk Google:", company.logo);
  console.log("⏳ Logo mungkin butuh 1-4 minggu muncul di Google Search");
}

updateIndexHtml();
