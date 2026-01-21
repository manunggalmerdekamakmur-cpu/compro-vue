# Performance Optimization Plan

## Goal: Improve LCP (< 2.5s) and CLS (< 0.1)

---

## Files to Modify

### 1. `index.html`

- [ ] Add `font-display: swap` untuk Google Fonts
- [ ] Add `fetchpriority="high"` untuk hero image
- [ ] Add `sizes` attribute untuk hero background
- [ ] Add inline critical CSS untuk loader

### 2. `src/main.js`

- [ ] Optimize lazy loading dengan IntersectionObserver
- [ ] Defer non-critical JavaScript
- [ ] Improve router preload strategy
- [ ] Optimize loading timeout

### 3. `src/assets/css/style.css`

- [ ] Fix CLS: Add explicit aspect-ratio untuk gambar
- [ ] Reserve space untuk counter animations
- [ ] Add `font-display: swap` ke @font-face
- [ ] Optimize background-attachment (fallback)
- [ ] Add skeleton loading styles

### 4. `src/components/sections/CompanyShowcaseSection.vue`

- [ ] Reserve fixed height untuk counter cards
- [ ] Add skeleton state before animation
- [ ] Prevent layout shift during count animation

---

## Optimization Checklist

### LCP Improvements

- [ ] Hero background preload dengan correct `sizes` dan `fetchpriority`
- [ ] Remove atau optimize loading overlay
- [ ] Preload critical fonts
- [ ] Use `content-visibility: auto` untuk below-fold content

### CLS Improvements

- [ ] All images have explicit width/height
- [ ] Reserve space untuk dynamic content (counters, fonts)
- [ ] Font loading dengan `font-display: swap`
- [ ] Skeleton loaders untuk async content

### INP Improvements

- [ ] Lazy load non-critical components
- [ ] Defer third-party scripts
- [ ] Optimize event handlers dengan requestIdleCallback

---

## Testing Commands

```bash
# Build production
npm run build

# Preview production build
npm run preview

# Lighthouse check
npx lighthouse http://localhost:4173 --view
```

---

## Progress

- [x] Optimized index.html
- [x] Optimized src/main.js
- [x] Optimized src/assets/css/style.css
- [x] Optimized CompanyShowcaseSection.vue
- [x] Tested and verified
