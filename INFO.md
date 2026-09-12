# Kurush Yarn Atelier — Information & Reference

This document provides complete technical, artistic, and operational documentation for the **Kurush Yarn** digital exhibition.

---

## 🏛️ Brand Identity & Philosophy

- **Artisan Studio**: Kurush Yarn Atelier
- **Medium**: Handcrafted fiber arts, botanical sculptures, wearable accessories, and textile charms.
- **Manifesto**: *"Made by hand. Reimagined digitally."*
- **Primary Contact Channel**: Instagram Direct Messages ([@kurush.yarn](https://www.instagram.com/kurush.yarn))

---

## 🧶 Artisan Categories

The atelier creates slow-crafted works across five distinct categories:

1. **Key Adornments & Charms**: Miniature tactile sculptures, macaron cookies, paw charms, and floral key chains designed for bag clips and keyrings.
2. **Botanical Stems**: Sculpted standalone floral stems including roses, tulips, sunflowers, and daisies with flexible wrapped wire armature.
3. **Potted Tabletop Sculptures**: Self-standing floral bonsai and potted lily arrangements weighted for desktop and shelf display.
4. **Wearable Accents & Headbands**: Handcrafted hair clips, butterfly bows, and continuous row-tulip headbands with floral tassel ties.
5. **Botanical Garlands**: Flexible woven floral garlands for hair ornamentation and festive styling.

---

## 🎨 Design System & Visual Language

### Color Palette
- **Deep Espresso Brown (Primary)**: `#3D2B1F`
- **Soft Cream Off-White (Canvas)**: `#FDFCFB` / `#F8F6F0`
- **Ochre / Golden Honey (Accent)**: `#D4A373`
- **Warm Border Accent**: `rgba(61, 43, 31, 0.12)`
- **Dark Soil / Shadow**: `#2A1D15`

### Typography Pairing
- **Display & Headings**: Editorial Serif (`Georgia, "Playfair Display", serif`)
- **Body & Captions**: Precision Sans (`Helvetica, Arial, sans-serif`) with generous letter tracking (`tracking-[0.2em]`)

---

## 📱 Contact & Communication Specification

- **Exclusive Medium**: Instagram Direct Messages
- **Official URL**: `https://www.instagram.com/kurush.yarn`
- **Handle**: `@kurush.yarn`
- **Policy**: All custom sizing requests, bespoke yarn color palettes, international shipping inquiries, and order confirmations are conducted through Instagram direct messages.

---

## ⚡ Progressive Web App (PWA) & Offline Capabilities

- **Manifest**: Standalone display configuration with vector branding via `/favicon.svg`.
- **Service Worker Strategy**: Managed via `vite-plugin-pwa` with automatic updates (`registerType: 'autoUpdate'`).
- **Caching Tiers**:
  - Precached static bundles (JS, CSS, HTML, WebP images).
  - Runtime cache for Google Fonts stylesheets and binary webfont assets with a 1-year expiration policy (`CacheFirst`).
- **Install Triggers**: Desktop install button in the navigation header, mobile install action in the mobile drawer, and guided modal instructions for iOS Safari users.
- **Offline Mode**: Interactive offline banner alerting the visitor when navigating through cached exhibition works without network connectivity.

---

## 🌐 Routes & Deep Linking

| Path | Purpose |
|---|---|
| `/` | Atelier welcome, ambient 3D fiber canvas, and curated hero highlights. |
| `/works` | Full archival catalogue with fuzzy search, color filtering, and categorization. |
| `/product/:slug` | High-definition multi-angle view, physical specs, and direct DM generator. |
| `/material` | Fiber disclosures: organic combed cotton, Merino wool, and brass armature. |
| `/process` | 5-phase slow-crafting timeline from hand-spun warp to structural stitches. |
| `/saved` | LocalStorage-persisted bookmarks drawer with batch inquiry export. |
| `/visitors` | Passkey-protected atelier interaction and audience telemetry dashboard. |
| `/privacy` | Privacy policy and local data handling disclosure. |
| `/license` | Dual-license software and artistic intellectual property terms. |
