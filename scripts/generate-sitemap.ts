/**
 * Static Sitemap Generator Script (Phase 19)
 * 
 * Generates a production-ready sitemap.xml in /public containing:
 * - Static exhibition pages and major architectural sections
 * - Deep links for all 22 handcrafted textile product pieces
 * - Google Image Sitemap extensions (<image:image>) for rich image search indexing
 * 
 * Run via: npx tsx scripts/generate-sitemap.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import { products } from '../src/data/products';

// Configurable base URL (via environment variable APP_URL or canonical default)
const BASE_URL = (
  process.env.APP_URL ||
  'https://kurush-yarn.vercel.app'
).replace(/\/+$/, '');

const TODAY = new Date().toISOString().split('T')[0];

interface SitemapUrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: string;
  images?: Array<{
    loc: string;
    title?: string;
    caption?: string;
  }>;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSitemap(): void {
  console.log('🧶 [Sitemap Generator] Initializing sitemap generation for Kurush Yarn Atelier...');
  console.log(`🌐 [Sitemap Generator] Base URL: ${BASE_URL}`);

  const entries: SitemapUrlEntry[] = [];

  // 1. Static Exhibition Pages & Core Architectural Sections
  entries.push(
    {
      loc: `${BASE_URL}/`,
      lastmod: TODAY,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      loc: `${BASE_URL}/#works`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      loc: `${BASE_URL}/#material`,
      lastmod: TODAY,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: `${BASE_URL}/#process`,
      lastmod: TODAY,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: `${BASE_URL}/#atelier`,
      lastmod: TODAY,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      loc: `${BASE_URL}/visitors`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.5'
    }
  );

  // 2. All 22 Handcrafted Textile Pieces
  for (const product of products) {
    const pieceUrl = `${BASE_URL}/?piece=${encodeURIComponent(product.slug)}`;
    
    // Collect images for Google Image Sitemap
    const images: SitemapUrlEntry['images'] = [];

    if (product.heroImage) {
      const heroAbsUrl = product.heroImage.startsWith('http')
        ? product.heroImage
        : `${BASE_URL}${product.heroImage.startsWith('/') ? '' : '/'}${product.heroImage}`;

      images.push({
        loc: heroAbsUrl,
        title: `${product.name} — Piece No. ${product.number} | Kurush Yarn`,
        caption: `${product.tagline || product.subtitle || product.description} Handcrafted in ${product.material}`
      });
    }

    if (Array.isArray(product.gallery)) {
      for (const item of product.gallery) {
        if (item.src && item.src !== product.heroImage) {
          const itemAbsUrl = item.src.startsWith('http')
            ? item.src
            : `${BASE_URL}${item.src.startsWith('/') ? '' : '/'}${item.src}`;

          images.push({
            loc: itemAbsUrl,
            title: `${product.name} (${item.type}) — Kurush Yarn`,
            caption: item.alt || product.name
          });
        }
      }
    }

    entries.push({
      loc: pieceUrl,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.85',
      images
    });
  }

  // 3. Assemble XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const entry of entries) {
    xml += `  <url>\n`;
    xml += `    <loc>${escapeXml(entry.loc)}</loc>\n`;
    if (entry.lastmod) {
      xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    }
    if (entry.changefreq) {
      xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    }
    if (entry.priority) {
      xml += `    <priority>${entry.priority}</priority>\n`;
    }
    if (entry.images && entry.images.length > 0) {
      for (const img of entry.images) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(img.loc)}</image:loc>\n`;
        if (img.title) {
          xml += `      <image:title>${escapeXml(img.title)}</image:title>\n`;
        }
        if (img.caption) {
          xml += `      <image:caption>${escapeXml(img.caption)}</image:caption>\n`;
        }
        xml += `    </image:image>\n`;
      }
    }
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  // 4. Ensure public directory exists & write file
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');

  console.log(`✅ [Sitemap Generator] Successfully generated ${sitemapPath}`);
  console.log(`📊 [Sitemap Generator] Total URLs indexed: ${entries.length} (${products.length} product pieces + ${entries.length - products.length} static sections)`);

  // 5. Also write/verify public/robots.txt
  const robotsPath = path.join(publicDir, 'robots.txt');
  const robotsContent = [
    '# Kurush Yarn Atelier Robots Policy',
    'User-agent: *',
    'Allow: /',
    'Disallow: /visitors',
    '',
    `Sitemap: ${BASE_URL}/sitemap.xml`,
    ''
  ].join('\n');

  fs.writeFileSync(robotsPath, robotsContent, 'utf8');
  console.log(`✅ [Sitemap Generator] Successfully generated ${robotsPath}`);
}

generateSitemap();
