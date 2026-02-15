# Pevent Brand Assets Brief

**Prepared for:** Brand Identity Designer
**Product:** Pevent - Event Management & Ticketing Mobile App
**Platform:** iOS & Android (React Native / Expo)
**Website:** pevent.ng

---

## 1. Brand Overview

Pevent is a modern event management platform that enables users to discover events, purchase tickets, participate in voting, and manage passes. The brand should feel **trustworthy, energetic, and modern** — appealing to a young Nigerian audience (18-35) who attend concerts, conferences, parties, and cultural events.

---

## 2. Current Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#007bff` | Buttons, links, active states, tab highlights |
| Notification Blue | `#004cff` | Push notification accent, shadows |
| Text Dark | `#11181C` | Primary text (light mode) |
| Text Light | `#ECEDEE` | Primary text (dark mode) |
| Background Light | `#F5F5F5` | Screen backgrounds |
| Background Dark | `#151718` | Screen backgrounds (dark mode) |
| Icon Gray | `#687076` | Inactive icons |

> **Note to designer:** We need a finalized, cohesive color palette. The current blues (`#007bff`, `#004cff`, `#3B82F6`) are inconsistent and need to be unified into a proper primary + secondary + accent system.

---

## 3. Current Typography

- **Font Family:** Lato (Regular, Bold, Black, Light, Thin + Italic variants)
- **Base font size (xs):** 13px

> **Note to designer:** Confirm if Lato remains the brand typeface or recommend an alternative/pairing.

---

## 4. Required Logo Assets

We need the full logo system delivered in the following variants:

### 4.1 Logo Mark (Icon Only)
- Full color
- White (for dark backgrounds)
- Black (for light backgrounds)
- Monochrome

### 4.2 Logo Full (Icon + Wordmark)
- Full color on white background
- Full color on dark background
- White version (for blue/dark backgrounds)
- Black version (for light backgrounds)

### 4.3 Export Specifications

| Asset | Sizes | Format |
|-------|-------|--------|
| App Icon | 1024x1024 (source) | PNG (no transparency) |
| Adaptive Icon (Android) | 1024x1024 with safe zone | PNG (transparent BG) |
| Favicon | 48x48 | PNG |
| Notification Icon | 96x96 | PNG (monochrome white) |
| Logo Mark | @1x, @2x, @3x | PNG + SVG |
| Logo Full | @1x, @2x, @3x | PNG + SVG |

---

## 5. Splash Screen

- **Current:** White background with centered logo
- **Needed:** Finalized splash screen design matching new brand identity
- **Format:** 1284x2778px PNG (iPhone 14 Pro Max safe area)
- **Resize mode:** Contain (centered, no crop)

---

## 6. Onboarding Illustrations

Three full-screen illustrations for the welcome carousel:

| Screen | Title | Description |
|--------|-------|-------------|
| 1 | "Discover Events That Matter" | Illustration showing event discovery/browsing — people exploring a vibrant events feed |
| 2 | "Buy Tickets. Vote. Attend." | Illustration showing the ticket purchase and voting experience — mobile ticket, QR code, voting interface |
| 3 | "Seamless Payments, Online & On-Site" | Illustration showing payment — mobile wallet, card payment, POS terminal |

### Specifications
- **Style:** Modern, flat/semi-flat illustration with brand colors
- **Dimensions:** 375x400pt (@3x = 1125x1200px)
- **Format:** PNG with transparent background
- **Tone:** Inclusive, vibrant, Nigerian context

---

## 7. Empty State Illustrations

Illustrations shown when a screen has no content:

| State | Context | Description |
|-------|---------|-------------|
| No Tickets | Passes tab, no upcoming/past tickets | Empty ticket illustration — suggest browsing events |
| No Search Results | Search returned nothing | Friendly "nothing found" illustration |
| No Events | Home feed is empty | Illustration suggesting events are coming soon |
| No Notifications | Notification center is empty | Calm, peaceful "all caught up" illustration |
| Payment Success | Checkout completion | Celebratory success illustration (checkmark, confetti, ticket) |
| Error / Offline | Network error or server down | Friendly error illustration |

### Specifications
- **Dimensions:** 235x188pt (@3x = 705x564px)
- **Format:** SVG (preferred) + PNG fallback
- **Style:** Consistent with onboarding illustrations

---

## 8. Tab Bar Icons

Five custom tab icons, each in two states:

| Tab | Inactive (Outline) | Active (Filled) |
|-----|-------------------|-----------------|
| Home | House outline | House filled |
| Search | Magnifying glass outline | Magnifying glass filled |
| Passes | Ticket outline | Ticket filled |
| Profile | Person outline | Person filled |

### Specifications
- **Size:** 24x24pt (deliver @1x, @2x, @3x or SVG)
- **Format:** SVG (preferred)
- **Stroke width:** 1.5-2px (outline variants)
- **Color:** Monochrome (color applied programmatically via `currentColor`)

---

## 9. In-App Icons

Custom SVG icons used throughout the app:

| Icon | Usage | Current State |
|------|-------|---------------|
| Map pin | Event card location indicator | Exists, may need refinement |
| Calendar | Event card date indicator | Exists, may need refinement |
| Notification bell | Home header notification icon | Exists, may need refinement |
| Success checkmark | Payment success screen | Exists, may need refinement |

### Specifications
- **Size:** Variable (11-24px usage range)
- **Format:** SVG with `currentColor` fill for dynamic coloring
- **Style:** Consistent stroke weight, rounded caps/joins

---

## 10. Promotional / Marketing Assets

### 10.1 Home Banner
- **Usage:** Scrollable carousel at top of home screen
- **Dimensions:** 345x160pt (@3x = 1035x480px)
- **Count:** 3-5 template banners (event promotion, seasonal, brand)
- **Format:** PNG or JPG

### 10.2 App Store Assets
- **App Store Screenshots:** 1290x2796px (iPhone 15 Pro Max)
- **Play Store Feature Graphic:** 1024x500px
- **Count:** 5-8 screenshots with device frames and captions

### 10.3 Social Media Kit
- **Profile picture:** 400x400px
- **Cover/banner:** Platform-specific (Twitter 1500x500, Instagram 1080x1080)
- **Story template:** 1080x1920px

---

## 11. Miscellaneous Assets

| Asset | Description | Format |
|-------|-------------|--------|
| Default avatar | Placeholder for users without a profile photo | PNG (256x256) |
| Map placeholder | Fallback image when event map fails to load | PNG (375x200pt) |
| QR code frame | Branded frame around ticket QR codes | SVG |
| Email header | Logo banner for transactional emails | PNG (600px wide) |

---

## 12. Deliverables Summary

Please deliver all assets in an organized folder structure:

```
pevent-brand-assets/
  logos/
    logo-mark/          (icon only, all color variants)
    logo-full/          (icon + wordmark, all color variants)
  app-icons/
    ios/                (1024x1024 app icon)
    android/            (adaptive icon foreground + background)
    favicon.png
    notification-icon.png
  splash/
    splash.png
  onboarding/
    discover.png
    voting.png
    payment.png
  empty-states/
    no-tickets.svg
    no-results.svg
    no-events.svg
    no-notifications.svg
    payment-success.svg
    error.svg
  tab-icons/
    home.svg
    home-filled.svg
    search.svg
    search-filled.svg
    passes.svg
    passes-filled.svg
    profile.svg
    profile-filled.svg
  icons/
    map.svg
    calendar.svg
    notification.svg
    success.svg
  banners/
    banner-01.png
    banner-02.png
    banner-03.png
  app-store/
    screenshots/
    feature-graphic.png
  social/
    profile.png
    cover.png
    story-template.png
  misc/
    default-avatar.png
    map-placeholder.png
    qr-frame.svg
    email-header.png
```

---

## 13. Brand Guidelines Request

Along with the assets, please provide a **brand guidelines document** covering:

1. Logo usage rules (spacing, minimum size, don'ts)
2. Final color palette with hex, RGB, and usage guidelines
3. Typography hierarchy (headings, body, captions)
4. Icon style guide (stroke weight, corner radius, grid)
5. Illustration style guide (color usage, character style, dos/don'ts)
6. Tone of voice summary (if applicable)
