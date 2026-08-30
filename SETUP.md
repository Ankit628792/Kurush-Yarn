# Kurush Yarn Atelier — Setup & Developer Guide

This guide covers local environment setup, dependency management, development workflow, production compilation, and testing for the **Kurush Yarn** application.

---

## 📋 Prerequisites

Ensure you have the following installed on your development machine:

- **Node.js**: Version `18.x`, `20.x`, or `22.x` (LTS recommended)
- **Package Manager**: `npm` (v9+), `pnpm`, `yarn`, or `bun`
- **Modern Web Browser**: Chrome, Safari, Firefox, or Edge with WebGL 2.0 support

---

## 🚀 Quick Start

### 1. Clone & Navigate to the Project

```bash
git clone <repository-url>
cd kurush-yarn
```

### 2. Install Dependencies

Using `npm`:
```bash
npm install
```

Or using `bun`:
```bash
bun install
```

### 3. Run Development Server

```bash
npm run dev
```

The dev server will start at:
```
http://localhost:3000
```
*(Binds to `0.0.0.0:3000`)*

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Boots the Vite development server with Hot Module Replacement on port `3000`. |
| `npm run build` | Compiles TypeScript and runs Vite production build, outputting optimized assets to `/dist`. |
| `npm run preview` | Starts a local static server to preview the production build in `/dist`. |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) to validate syntax and types. |
| `npm run clean` | Removes `/dist` and temporary build artifacts. |

---

## 📂 Project Structure

```
├── public/
│   ├── images/
│   │   ├── brand/          # Brand textures and atelier studio assets
│   │   └── products/       # Product image assets for all 7 catalog pieces
│   │       ├── product-01/
│   │       ├── product-02/
│   │       ├── product-03/
│   │       ├── product-04/
│   │       ├── product-05/
│   │       ├── product-06/
│   │       └── product-07/
├── src/
│   ├── assets/             # Raw photography assets
│   ├── components/
│   │   ├── Brand/          # Logo & Atelier emblem components
│   │   ├── Common/         # Reusable ProductCard, LazyImage, InquiryModal, SavedDrawer
│   │   ├── Footer/         # Atelier manifesto footer & Instagram channel links
│   │   ├── Hero/           # Exhibition hero with 3D ambient simulation
│   │   ├── Navigation/     # Sticky navigation with reduced motion toggle
│   │   ├── ProductDetail/  # Full-screen multi-angle inspection modal
│   │   ├── ProductGallery/ # Asymmetrical & grid collection visualizers
│   │   └── ThreeScene/     # Three.js 3D yarn particle & strand canvas
│   ├── data/
│   │   ├── content.ts      # Site text, manifesto, and Instagram links
│   │   └── products.ts     # Complete 7-piece product dataset
│   ├── types/
│   │   └── product.ts      # TypeScript interfaces and type definitions
│   ├── App.tsx             # Main application orchestrator
│   ├── index.css           # Tailwind CSS directives and custom typography
│   └── main.tsx            # React root mount
├── metadata.json           # Application metadata
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite & Tailwind configuration
```

---

## ⚙️ Environment Configuration

The application is structured as a client-side digital exhibition. If you introduce custom server-side API integrations (such as Google GenAI endpoints), create a `.env` file based on `.env.example`:

```env
# .env.example
GEMINI_API_KEY=
```

---

## 🔍 Verification & Linting

To run full TypeScript validation:
```bash
npm run lint
```

To test production build compilation:
```bash
npm run build
```

---

## 💡 Troubleshooting

- **WebGL Canvas Issues**: Ensure your browser hardware acceleration is enabled if the 3D yarn ambient background is not rendering. On lower-spec devices, toggle **Reduced Motion** in the navigation bar to switch to static visual mode.
- **Port Conflicts**: The development server defaults to port `3000`. If port 3000 is occupied, you can adjust the `--port` flag in `package.json`.
- **Image Caching**: If updating product photography in `/public/images`, perform a hard refresh (`Ctrl + F5` or `Cmd + Shift + R`) to clear browser asset cache.
