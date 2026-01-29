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
    logo: "https://res.cloudinary.com/dz1zcobkz/image/upload/c_scale,w_512,h_512,c_fill/v1768461076/logo_xipkza.webp",
    logo192:
      "https://res.cloudinary.com/dz1zcobkz/image/upload/c_scale,w_192,h_192,c_fill/v1768461076/logo_xipkza.webp",
    favicon: "/favicon.ico",
  };

  console.log("🔍 Memperbarui favicon untuk Google Search...");

  // 1. Hapus SEMUA favicon tags lama
  html = html.replace(
    /<link[^>]*rel=(["'])(icon|shortcut icon|apple-touch-icon)[^>]*>/gi,
    "",
  );

  // 2. Hapus SEMUA favicon-related preload tags
  html = html.replace(
    /<link[^>]*rel=(["'])preload["'][^>]*as=["']image["'][^>]*favicon[^>]*>/gi,
    "",
  );

  // 3. Tambahkan favicon tags yang lengkap dan benar
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

  // 4. Inject sebelum </head>
  html = html.replace("</head>", `${faviconTags}</head>`);

  writeFileSync(indexPath, html, "utf8");
  console.log("✅ Favicon configuration updated untuk Google Search");
  console.log("📊 Favicon URL:", company.favicon);
  console.log("📊 Logo URLs:", company.logo192, "dan", company.logo);
}

updateIndexHtml();
