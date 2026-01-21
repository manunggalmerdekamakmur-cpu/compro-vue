# TODO: Mobile Header & Hero Fixes

## Phase 1: Header Mobile Optimization

- [x] Simplify header layout for mobile (hide logo text)
- [x] Fix hamburger menu full-screen overlay
- [x] Fix logo sizing on mobile
- [x] Clean up header CSS duplicates

## Phase 2: Hero Section Mobile Optimization

- [x] Fix hero text size responsive scaling
- [x] Fix hero logo sizing on mobile
- [x] Fix hero buttons stacking properly
- [x] Optimize hero spacing for all mobile sizes

## Phase 3: CSS Cleanup & Performance

- [x] Remove all CSS comments
- [x] Consolidate duplicate media queries
- [x] Optimize animations and transitions
- [x] Ensure code is clean and minimal

## Phase 4: Testing Checklist

- [ ] Test on mobile portrait (375px, 414px)
- [ ] Test on mobile landscape
- [ ] Test hamburger menu toggle
- [ ] Test scroll behavior
- [ ] Verify no horizontal scroll

---

## Changes Made:

### Header.vue

- Simplified template structure with condensed HTML
- Converted logo to router-link for proper navigation
- Simplified logo text to use span and small tags
- Changed hamburger div to button element
- Simplified menu items to single-line format
- Consolidated data, mounted, beforeUnmount, and methods
- Removed setTimeout for logo animation (unnecessary)
- Reduced header height from 80px to 70px
- Optimized scroll position offsets

### style.css

- Removed all CSS comments
- Consolidated media queries for mobile (768px, 480px, landscape)
- Simplified CSS custom properties
- Removed duplicate animation keyframes
- Mobile header: 60px height, hidden logo text, full-screen menu overlay
- Mobile hero: Responsive sizing for logos, text, buttons
- Clean, minimal code structure
