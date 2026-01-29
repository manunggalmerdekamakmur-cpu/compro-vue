# TODO: Fix Favicon in Google Search Results

## Current Issue

- Favicon tidak muncul di hasil pencarian Google untuk "site:manunggalmerdekamakmur.com"
- URL /favicon.ico redirect ke website utama
- HTML menggunakan favicon dari Cloudinary, tapi Google mencari /favicon.ico

## Root Cause

- Nginx di container menggunakan try_files $uri $uri/ /index.html
- Jika favicon.ico tidak ada di dist, maka serve index.html
- Curl di deploy.sh mungkin gagal download favicon dari Cloudinary

## Plan

- [x] Edit scripts/update-favicon.js untuk menggunakan /favicon.ico lokal
- [x] Edit scripts/update-html-seo.js untuk menggunakan /favicon.ico lokal
- [x] Pastikan favicon.ico ada di public/ dan dicopy ke dist oleh Vite
- [ ] Rebuild dan deploy aplikasi
- [ ] Test /favicon.ico dapat diakses langsung (setelah deployment selesai)
- [ ] Submit ulang ke Google Search Console jika perlu

## Files to Edit

- scripts/update-favicon.js
- scripts/update-html-seo.js

## Followup

- Test di browser: https://manunggalmerdekamakmur.com/favicon.ico
- Jika masih redirect, check logs container
- Tunggu 1-4 minggu untuk Google update favicon
