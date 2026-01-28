// scripts/update-html-seo.js - REVISI TOTAL (Fokus pada SEO text saja)
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
      "Perusahaan kontraktor dan developer properti terpercaya dengan pengalaman lebih dari 20 tahun di Indonesia.",
    keywords:
      "kontraktor, developer properti, konstruksi bangunan, jasa kontraktor, perusahaan kontraktor, manunggal merdeka makmur",
  };

  // HANYA update title dan meta description/keywords
  // Hapus title lama
  html = html.replace(/<title>.*?<\/title>/s, "");

  // Hapus meta description/keywords lama
  html = html.replace(/<meta[^>]*name=["']description["'][^>]*>/gi, "");
  html = html.replace(/<meta[^>]*name=["']keywords["'][^>]*>/gi, "");

  // Tambahkan SEO text saja (TIDAK termasuk structured data atau favicon)
  const seoTextTags = `
    <!-- Primary Meta Tags (SEO Text Only) -->
    <title>${company.name} | Kontraktor & Developer Properti Terpercaya</title>
    <meta name="description" content="${company.description}">
    <meta name="keywords" content="${company.keywords}">
    <meta name="author" content="${company.name}">
  `;

  // Inject di awal <head>
  if (html.includes("<head>")) {
    html = html.replace("<head>", `<head>${seoTextTags}`);
  }

  writeFileSync(indexPath, html, "utf8");
  console.log("✅ SEO text tags updated (title, description, keywords only)");
}

updateIndexHtml();
