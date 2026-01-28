import fetch from "node-fetch";

async function submitToGoogle() {
  const SITE_URL = "https://manunggalmerdekamakmur.com";

  const indexingUrl =
    "https://indexing.googleapis.com/v3/urlNotifications:publish";

  const urlsToSubmit = [
    `${SITE_URL}/`,
    `${SITE_URL}/sitemap.xml`,
    `${SITE_URL}/sitemap-index.xml`,
  ];

  console.log("🚀 Submitting URLs to Google...");

  for (const url of urlsToSubmit) {
    try {
      const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`;
      const response = await fetch(pingUrl);

      console.log(`✅ Submitted: ${url}`);
      console.log(`   Status: ${response.status}`);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Error submitting ${url}:`, error.message);
    }
  }

  console.log("\n📋 Manual Steps Required:");
  console.log(
    "1. Login ke Google Search Console: https://search.google.com/search-console",
  );
  console.log("2. Submit sitemap: " + SITE_URL + "/sitemap.xml");
  console.log("3. Request indexing untuk homepage");
  console.log("4. Tunggu 1-7 hari untuk hasil");
}

submitToGoogle();
