# TODO: Favicon Google Search Fix

## Masalah

Favicon tidak muncul di Google Search Results ketika mencari `site:manunggalmerdekamakmur.com`

## Penyebab

1. PWA Manifest tidak lengkap (hanya 192x192)
2. Favicon tidak tersedia di root URL (`/favicon.ico`)
3. Missing icon sizes untuk berbagai context Google

## Rencana Perbaikan

### 1. Update `vite.config.js` ✅ DONE

- [x] Tambah icon sizes lengkap di PWA manifest
- [x] Include: 16x16, 32x32, 180x180, 192x192, 512x512

### 2. Update `scripts/update-html-seo.js` ✅ DONE

- [x] Fix favicon links dengan proper sizes
- [x] Tambah sizes attribute yang benar

### 3. Update `scripts/update-favicon.js` ✅ DONE

- [x] Optimize favicon configuration
- [x] Tambah proper sizes untuk semua devices

### 4. Update `index.html` ✅ DONE

- [x] Tambah direct favicon.ico accessible di root
- [x] Perbaiki link rel="icon" dengan sizes yang tepat

### 5. Update `deploy.sh` ✅ DONE

- [x] Copy favicon.ico ke dist root saat deploy

## Status

- [x] Planning: DONE
- [x] Implementation: DONE
- [x] Testing: PENDING
- [x] Deployment: PENDING

## Langkah Selanjutnya (Setelah Deploy)

1. **Build dan Deploy:**

```bash
npm run deploy
```

2. **Submit URL ke Google Search Console:**

```bash
npm run seo-audit
```

3. **Manual Steps Required:**
   - Login ke Google Search Console: https://search.google.com/search-console
   - Submit sitemap: https://manunggalmerdekamakmur.com/sitemap.xml
   - Request indexing untuk homepage
   - Klik "URL Inspection" untuk homepage dan klik "Request Indexing"

4. **Verifikasi Favicon:**
   - Buka: https://manunggalmerdekamakmur.com/favicon.ico
   - Harus menampilkan gambar favicon

## Catatan Penting

- Google membutuhkan **1-4 minggu** untuk mengupdate favicon di search results setelah fix
- Favicon akan muncul di Google Search Results setelah Googlebot重新crawl halaman dan memproses favicon
- Jika setelah 4 minggu favicon belum muncul, coba:
  1. Submit ulang URL di Search Console
  2. Cek apakah favicon.ico accessible di https://manunggalmerdekamakmur.com/favicon.ico
  3. Gunakan Rich Results Test untuk memverifikasi structured data
