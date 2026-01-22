# Deployment Guide - PT. Manunggal Website

## Problem

When pushing to GitHub, the Vercel deployment at `https://mmm-v1.vercel.app/` shows old content on mobile browsers due to **browser caching**.

## Solution Implemented

### 1. Vercel Headers Configuration (`vercel.json`)

- HTML files: No cache (`no-cache, no-store, must-revalidate`)
- Assets (JS/CSS): Long cache with immutable hash
- Images (SVG, WebP): Long cache with immutable

### 2. Version-based Cache Busting

- Each build increments the version in `package.json`
- The main script tag includes a version query parameter: `main.js?v=2.0.1`
- This forces browsers to download the new version

### 3. Auto-update Service Worker

- PWA configured with `registerType: 'autoUpdate'`
- Service worker automatically updates when new content is available
- API requests use `NetworkFirst` strategy (always fetch fresh data)

## How to Deploy

### Option 1: Automatic Deploy (Recommended)

Simply push your changes to GitHub:

```bash
git add .
git commit -m "Your message"
git push origin main
```

Vercel will automatically:

1. Detect the changes
2. Build the project (version will be auto-incremented)
3. Deploy to production

### Option 2: Manual Deploy Script

```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

This script will:

1. Install dependencies
2. Build the project (auto-increment version)
3. Add all changes to git
4. Commit with timestamp
5. Push to GitHub

## Version Management

The version is automatically updated during build:

- Format: `major.minor.patch` (e.g., `2.0.0` → `2.0.1`)
- Version is stored in `package.json`
- Version is appended to main script URL for cache busting

## Testing After Deployment

1. **Hard Refresh**: Open DevTools → Network tab → Check "Disable cache" → Reload
2. **Incognito Mode**: Test in private/incognito window
3. **Mobile Testing**: Use Chrome DevTools → Toggle device toolbar → Refresh
4. **Clear Cache**: If still seeing old version, clear browser cache

## Force Clear Cache (For Users)

If users still see old content, they can:

1. **Hard Refresh**: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. **Clear Browser Cache**: Settings → Privacy → Clear browsing data
3. **Incognito Mode**: Open in private window

## Vercel Dashboard

Monitor deployments at: https://vercel.com/dashboard

## Troubleshooting

### Still showing old version?

1. Check if deployment completed in Vercel dashboard
2. Try hard refresh (`Ctrl+Shift+R`)
3. Clear browser cache
4. Check if version changed in source (DevTools → Sources)

### Deployment failed?

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are installed
3. Check Node.js version (requires >=18.0.0)

## Files Modified

- `vercel.json` - Cache control headers
- `index.html` - Version query parameter
- `vite.config.js` - PWA configuration
- `package.json` - Build script with auto-versioning
- `scripts/update-version.js` - Auto-version script
- `scripts/deploy.sh` - Automated deployment script
