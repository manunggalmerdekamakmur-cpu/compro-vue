// api/cache-bust.js
export default function handler(req, res) {
  // Set cache control headers
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  // Add version hash to HTML
  const versionHash = Date.now();
  const html = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PT. Manunggal Merdeka Makmur – Produsen Pupuk Organik Berkualitas</title>
      <meta name="description" content="PT. Manunggal Merdeka Makmur adalah produsen pupuk organik dan agen hayati berkualitas tinggi untuk pertanian berkelanjutan.">
      <meta name="theme-color" content="#0b1f14">
      <meta name="robots" content="index, follow">
      <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=0">
      <meta http-equiv="Pragma" content="no-cache">
      <meta http-equiv="Expires" content="0">
      
      <link rel="preconnect" href="https://res.cloudinary.com">
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
      <link rel="icon" type="image/x-icon" href="https://res.cloudinary.com/dz1zcobkz/image/upload/v1768461077/favicon_cqc5pw.ico">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body class="loading">
      <div id="app"></div>
      <div id="app-loading">
        <div class="css-spinner"></div>
        <div class="loading-text">Memuat aplikasi...</div>
      </div>
      
      <script>
        // Cache busting
        const version = ${versionHash};
        localStorage.setItem('app_version', version);
        
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(regs => {
            regs.forEach(reg => reg.unregister());
          });
        }
      </script>
      
      <script type="module" src="/src/main.js?version=${versionHash}"></script>
    </body>
    </html>
  `;
  
  res.status(200).send(html);
}