# Kurush Yarn — Handcrafted Textile Exhibition & Atelier

> **An editorial digital exhibition for handcrafted textile sculptures, botanical stems, and bespoke yarn adornments.**

[![Instagram](https://img.shields.io/badge/Instagram-@kurush.yarn-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/kurush.yarn)
[![PWA](https://img.shields.io/badge/PWA-Ready-purple?style=flat&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)

---

## 🧶 Overview

**Kurush Yarn Atelier** represents the convergence of tactile craft tradition and modern digital curation. Every piece is slow-crafted by hand with combed organic cotton, Merino wool blends, and structural botanical armature wire.

This digital showroom offers an editorial, exhibition-grade platform where collectors and enthusiasts can examine texture macros, explore multi-angle photography, review physical dimensions, save personal curations, install the progressive web application for offline browsing, and connect directly with the artisan.

---

## ✨ Key Features

- **Progressive Web App (PWA)**: Full offline-capable PWA with automatic service worker registration, home screen install prompts for desktop and mobile, custom SVG icon branding, and an offline status indicator.
- **Client-Side SPA Routing & Universal Rewrites**: Clean, direct URL routing powered by React Router DOM with zero-config rewrites for Vercel, Netlify, and static CDN edge servers.
- **Editorial & Catalog Modes**: Toggle seamlessly between an asymmetrical editorial exhibition layout and an organized multi-column catalog grid.
- **Direct Instagram Inquiry Engine**: Direct integration with `@kurush.yarn` featuring pre-drafted direct message templates, piece identification, and one-click Instagram routing.
- **Interactive Three.js 3D Fiber Simulation**: Real-time WebGL ambient strand dynamics and particle dust drift mirroring soft atelier textiles with hardware-accelerated rendering.
- **Dedicated Route Views & Deep Linking**:
  - `/` — Atelier home & hero narrative
  - `/works` (also `/products`, `/pieces`, `/catalog`) — Full collection archive with instant filtering
  - `/product/:slug` — Dedicated high-resolution product inspection view
  - `/material` — Fiber provenance, natural dye disclosures, and textile composition
  - `/process` — Step-by-step artisan methodology from wire armature to finishing stitches
  - `/saved` — Curated bookmarks drawer with batch Instagram inquiry export
  - `/visitors` — Private passkey-protected atelier visitor metrics and traffic telemetry
- **Full Accessibility & Reduced Motion**: Automatically respects system `prefers-reduced-motion` settings and provides a manual toggle for zero-motion viewing.
- **High-Resolution Multi-Angle Viewports**: Detailed multi-perspective photography with high-resolution inspection.
- **Saved Curations Drawer**: Client-side saved wishlist allowing collectors to bookmark favorite pieces and inquire in a single message.
- **Responsive Layout**: Designed for seamless browsing across mobile viewports, tablets, laptops, and ultra-wide displays.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript
- **Routing**: React Router DOM (v7) with universal rewrite rules (`vercel.json`, `_redirects`)
- **PWA & Offline**: `vite-plugin-pwa` with Workbox runtime caching and Service Worker auto-updates
- **Bundler & Dev Server**: Vite 6
- **Styling**: Tailwind CSS v4 (with `@tailwindcss/vite` plugin)
- **3D Graphics**: Three.js (WebGL ambient loop simulations)
- **Smooth Interaction**: Lenis scroll smoothing & GSAP
- **Icons**: Lucide React
- **Typography**: Georgia / Playfair Display (Serif Display) paired with Helvetica / Plus Jakarta Sans (Clean Neutral Sans)

---

## 📬 Contact & Commissions

All bespoke commissions, inquiries, and orders are handled exclusively via Instagram:

- **Instagram**: [https://www.instagram.com/kurush.yarn](https://www.instagram.com/kurush.yarn)
- **Handle**: `@kurush.yarn`

---

## 📄 License & Intellectual Property

This project holds a dual-layered intellectual property structure:

- **Software & Codebase**: Licensed under the **[MIT License](LICENSE)**. You are free to modify, distribute, and utilize the structural React/TypeScript components, layout architecture, and Three.js WebGL simulation code.
- **Creative Designs & Brand**: All physical botanical yarn designs, custom stitch structures, brand names ("Kurush", "Kurush Yarn"), logos, and high-definition photography are the exclusive copyright of **Kurush Yarn Atelier** and are **excluded** from the open-source license.

For detailed terms, please review the [LICENSE](LICENSE) file or visit the **License & Provenance** section on the website.

© 2026 Kurush Yarn Atelier. All rights reserved. Handcrafted with devotion.
