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
    logo: "https://res.cloudinary.com/dz1zcobkz/image/upload/c_scale,w_512,h_512,c_fill/v1768461076/logo_xipkza.webp",
    logo192:
      "https://res.cloudinary.com/dz1zcobkz/image/upload/c_scale,w_192,h_192,c_fill/v1768461076/logo_xipkza.webp",
    favicon:
      "https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461077/favicon_cqc5pw.ico",
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

  // 1. Hapus title tag lama
  html = html.replace(/<title>.*?<\/title>/s, "");

  // 2. Hapus meta description dan keywords lama
  html = html.replace(/<meta[^>]*name=["']description["'][^>]*>/gi, "");
  html = html.replace(/<meta[^>]*name=["']keywords["'][^>]*>/gi, "");

  // 3. Hapus SEMUA favicon tags lama
  html = html.replace(
    /<link[^>]*rel=(["'])(icon|shortcut icon|apple-touch-icon)[^>]*>/gi,
    "",
  );

  // 4. Hapus SEMUA structured data Organization lama (termasuk yang hardcoded)
  html = html.replace(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?"@type":\s*"Organization"[\s\S]*?<\/script>/gi,
    "",
  );
  html = html.replace(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?"@graph"[\s\S]*?<\/script>/gi,
    "",
  );

  // 5. Hapus og:image dan twitter:image yang mungkin konflik
  html = html.replace(/<meta[^>]*(og:image|twitter:image)[^>]*>/gi, "");

  // 6. Tambahkan favicon tags BARU yang lengkap
  const faviconTags = `
    <!-- Favicon untuk Google Search Results & Browser -->
    <link rel="icon" type="image/x-icon" href="${company.favicon}" sizes="16x16">
    <link rel="icon" type="image/x-icon" href="${company.favicon}" sizes="32x32">
    <link rel="shortcut icon" href="${company.favicon}" type="image/x-icon">
    <link rel="icon" type="image/webp" sizes="16x16" href="${company.logo192}">
    <link rel="icon" type="image/webp" sizes="32x32" href="${company.logo192}">
    <link rel="icon" type="image/webp" sizes="180x180" href="${company.logo192}">
    <link rel="icon" type="image/webp" sizes="192x192" href="${company.logo192}">
    <link rel="icon" type="image/webp" sizes="512x512" href="${company.logo}">
    <link rel="apple-touch-icon" sizes="180x180" href="${company.logo192}">
    <link rel="apple-touch-icon" sizes="192x192" href="${company.logo192}">
  `;

  // 7. Structured data Organization yang bersih
  const completeOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${company.url}/#organization`,
    name: company.name,
    url: company.url,
    logo: company.logo,
    image: company.logo,
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

  const structuredData = `<script type="application/ld+json">
${JSON.stringify(completeOrganization, null, 2)}
</script>`;

  // 8. Open Graph & Twitter yang konsisten
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
    <meta property="og:image" content="${company.logo}">
    <meta property="og:image:width" content="512">
    <meta property="og:image:height" content="512">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${company.name} | Produsen Pupuk Organik & Hayati">
    <meta name="twitter:description" content="${company.description}">
    <meta name="twitter:image" content="${company.logo}">
  `;

  // 9. Inject semua tags di tempat yang tepat
  if (html.includes("<head>")) {
    html = html.replace(
      "<head>",
      `<head>${seoTextTags}${faviconTags}${structuredData}`,
    );
  }

  writeFileSync(indexPath, html, "utf8");
  console.log("✅ SEO dan favicon diperbarui untuk Google Search");
  console.log("📊 Logo URL:", company.logo);
  console.log("📊 Favicon URL:", company.favicon);
  console.log("⏳ Logo mungkin butuh 1-4 minggu muncul di Google Search");
}

updateIndexHtml();
