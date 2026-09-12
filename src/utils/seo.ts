/**
 * Dynamic SEO & Metadata Management Utility (Phase 19)
 * 
 * Provides automated, reactive synchronization of the HTML Document title,
 * standard meta tags, OpenGraph protocol, Twitter Cards, canonical link,
 * and Schema.org JSON-LD structured data based on the currently viewed page,
 * section, or product piece.
 */

import { Product } from '../types/product';
import { getAppOrigin, getProductPieceUrl, getAbsoluteAssetUrl, getCanonicalPageUrl } from './url';

export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  keywords?: string[];
  priceAmount?: string;
  priceCurrency?: string;
  availability?: string;
  sku?: string;
  brand?: string;
  author?: string;
  robots?: string;
  section?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  jsonLd?: Record<string, unknown>;
}

export const DEFAULT_SITE_SEO: SEOConfig = {
  title: 'Kurush Yarn — Handcrafted Textile Exhibition & Atelier',
  description:
    'A soft-futuristic digital exhibition for handcrafted textile objects created using Kurush and yarn. Explore bespoke crochet flora, adornments, and fiber sculptures.',
  image: '/images/products/product-07/hero.jpg',
  type: 'website',
  canonical: getAppOrigin(),
  brand: 'Kurush Yarn Atelier',
  author: 'Kurush Yarn Atelier',
  robots: 'index, follow',
  keywords: [
    'kurush yarn',
    'handcrafted crochet',
    'textile art exhibition',
    'botanical crochet flowers',
    'crochet charms',
    'fiber sculpture',
    'merino wool',
    'mercerized combed cotton',
    'artisan decor',
    'slow craft atelier'
  ]
};

/**
 * Sets or updates a <meta> attribute in document.head
 */
export function setMetaTag(attribute: 'name' | 'property', key: string, content: string): void {
  if (typeof document === 'undefined') return;

  let element: HTMLMetaElement | null = null;
  try {
    element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  } catch {
    // Fallback if key contains unexpected characters for querySelector
    const metas = document.querySelectorAll('meta');
    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute(attribute) === key) {
        element = metas[i];
        break;
      }
    }
  }

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Sets or updates a <link> tag in document.head
 */
export function setLinkTag(rel: string, href: string, attributes?: Record<string, string>): void {
  if (typeof document === 'undefined') return;

  let element: HTMLLinkElement | null = null;
  try {
    element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  } catch {
    const links = document.querySelectorAll('link');
    for (let i = 0; i < links.length; i++) {
      if (links[i].getAttribute('rel') === rel) {
        element = links[i];
        break;
      }
    }
  }

  if (!element) {
    element = document.createElement('link');
    element.setAttribute(rel, rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);

  if (attributes) {
    Object.entries(attributes).forEach(([attrKey, attrVal]) => {
      element?.setAttribute(attrKey, attrVal);
    });
  }
}

/**
 * Injects or updates a Schema.org JSON-LD script tag
 */
export function setStructuredData(id: string, schema: Record<string, unknown>): void {
  if (typeof document === 'undefined') return;

  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema, null, 2);
}

/**
 * Removes a meta tag if it exists
 */
export function removeMetaTag(attribute: 'name' | 'property', key: string): void {
  if (typeof document === 'undefined') return;
  try {
    const element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  } catch {
    // Fallback: iterate meta tags and remove matching attribute
    const metas = document.querySelectorAll('meta');
    metas.forEach((m) => {
      if (m.getAttribute(attribute) === key && m.parentNode) {
        m.parentNode.removeChild(m);
      }
    });
  }
}

/**
 * Core function: Dynamically updates the document title and all SEO tags
 */
export function updateDocumentSEO(config: Partial<SEOConfig> = {}): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const origin = getAppOrigin();
  const title = config.title ? `${config.title}` : DEFAULT_SITE_SEO.title;
  const description = config.description || DEFAULT_SITE_SEO.description;
  const canonical = config.canonical || getCanonicalPageUrl() || origin;
  const image = config.image
    ? getAbsoluteAssetUrl(config.image)
    : getAbsoluteAssetUrl(DEFAULT_SITE_SEO.image || '');
  const type = config.type || DEFAULT_SITE_SEO.type || 'website';
  const author = config.author || DEFAULT_SITE_SEO.author || 'Kurush Yarn Atelier';
  const robots = config.robots || 'index, follow';
  const brand = config.brand || DEFAULT_SITE_SEO.brand || 'Kurush Yarn Atelier';

  const keywordsArray = config.keywords && config.keywords.length > 0
    ? config.keywords
    : DEFAULT_SITE_SEO.keywords || [];
  const keywords = keywordsArray.join(', ');

  // 1. Browser Window & Tab Title
  document.title = title;

  // 2. Standard Search Engine Meta Tags
  setMetaTag('name', 'description', description);
  setMetaTag('name', 'keywords', keywords);
  setMetaTag('name', 'author', author);
  setMetaTag('name', 'robots', robots);
  setMetaTag('name', 'theme-color', '#FDFCFB');
  setLinkTag('canonical', canonical);

  // 3. OpenGraph Social Indexing Protocol
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:image', image);
  setMetaTag('property', 'og:url', canonical);
  setMetaTag('property', 'og:type', type);
  setMetaTag('property', 'og:site_name', brand);
  setMetaTag('property', 'og:locale', 'en_US');

  // 4. Product-Specific OpenGraph Attributes
  if (config.priceAmount) {
    const cleanPrice = config.priceAmount.replace(/[^0-9.]/g, '');
    setMetaTag('property', 'product:price:amount', cleanPrice);
    setMetaTag('property', 'product:price:currency', config.priceCurrency || 'INR');
    setMetaTag('property', 'product:availability', config.availability || 'https://schema.org/InStock');
    setMetaTag('property', 'product:brand', brand);
    if (config.sku) {
      setMetaTag('property', 'product:retailer_item_id', config.sku);
    }
  } else {
    // Clear product-specific tags when viewing non-product pages
    removeMetaTag('property', 'product:price:amount');
    removeMetaTag('property', 'product:price:currency');
    removeMetaTag('property', 'product:availability');
    removeMetaTag('property', 'product:brand');
    removeMetaTag('property', 'product:retailer_item_id');
  }

  // 5. Twitter / X Card Meta Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', title);
  setMetaTag('name', 'twitter:description', description);
  setMetaTag('name', 'twitter:image', image);
  setMetaTag('name', 'twitter:site', '@kurush.yarn');
  setMetaTag('name', 'twitter:creator', '@kurush.yarn');

  // 6. Schema.org JSON-LD Structured Data
  let jsonLdPayload: Record<string, unknown>;

  if (config.jsonLd) {
    jsonLdPayload = config.jsonLd;
  } else if (type === 'product' && config.priceAmount) {
    jsonLdPayload = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: title.split('—')[0].trim(),
      image: [image],
      description,
      sku: config.sku || 'KY-01',
      brand: {
        '@type': 'Brand',
        name: brand
      },
      offers: {
        '@type': 'Offer',
        url: canonical,
        priceCurrency: config.priceCurrency || 'INR',
        price: config.priceAmount.replace(/[^0-9.]/g, ''),
        availability: config.availability || 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: brand
        }
      }
    };
  } else {
    jsonLdPayload = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${origin}/#website`,
          url: origin,
          name: brand,
          description: DEFAULT_SITE_SEO.description,
          inLanguage: 'en-US'
        },
        {
          '@type': 'ArtGallery',
          '@id': `${origin}/#gallery`,
          name: brand,
          url: origin,
          image,
          description
        }
      ]
    };
  }

  setStructuredData('kurush-schema-ld', jsonLdPayload);
}

/**
 * Generate SEO Configuration for a specific Product piece
 */
export function getProductSEO(product: Product): SEOConfig {
  const pieceUrl = getProductPieceUrl(product.slug);
  const heroImgUrl = getAbsoluteAssetUrl(product.heroImage);
  const cleanPrice = product.price ? product.price.replace(/[^0-9.]/g, '') : '199';

  return {
    title: `${product.name} — Piece No. ${product.number} | Kurush Yarn`,
    description: `${product.tagline || product.description} Handcrafted with ${product.material}. Dimensions: ${product.dimensions}. Price: ${product.price}.`,
    canonical: pieceUrl,
    image: heroImgUrl,
    type: 'product',
    sku: product.id,
    priceAmount: cleanPrice,
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    keywords: [
      product.name,
      product.categoryLabel,
      'kurush yarn',
      'crochet ' + product.category,
      product.material,
      'handcrafted textile',
      'botanical crochet',
      'artisan fiber craft'
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: [heroImgUrl],
      description: product.description || product.tagline,
      sku: product.id,
      mpn: product.number,
      category: product.categoryLabel,
      material: product.material,
      brand: {
        '@type': 'Brand',
        name: 'Kurush Yarn Atelier'
      },
      offers: {
        '@type': 'Offer',
        url: pieceUrl,
        priceCurrency: 'INR',
        price: cleanPrice,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: 'Kurush Yarn Atelier'
        }
      }
    }
  };
}

/**
 * Generate SEO Configuration for specific sections within the exhibition
 */
export function getPageSEOForSection(sectionId: string): SEOConfig {
  const origin = getAppOrigin();

  switch (sectionId) {
    case 'works':
      return {
        title: 'Collection & Handcrafted Works | Kurush Yarn Atelier',
        description:
          'Explore our complete archive of 22 artisanal crochet pieces, botanical flower stems, miniature adornments, and tactile fiber sculptures.',
        canonical: `${origin}/works`,
        image: '/images/products/product-07/hero.jpg',
        type: 'website',
        keywords: [
          'crochet collection',
          'botanical stems',
          'crochet keychain',
          'fiber accessories',
          'kurush catalog'
        ]
      };

    case 'material':
      return {
        title: 'Material Philosophy & Fiber Provenance | Kurush Yarn Atelier',
        description:
          'Discover our commitment to natural fibers: combed mercerized cotton, fine merino roving, and hypoallergenic fill ethically sourced for heirloom longevity.',
        canonical: `${origin}/material`,
        image: '/images/products/product-03/hero.jpg',
        type: 'website',
        keywords: [
          'yarn material story',
          'mercerized combed cotton',
          'ethical merino wool',
          'slow craft materials'
        ]
      };

    case 'process':
      return {
        title: 'Artisanal Technique & Meditative Craft Process | Kurush Yarn Atelier',
        description:
          'From filament tensioning to mathematical stitch calculations and botanical steam shaping. An inside look into our slow crochet process.',
        canonical: `${origin}/process`,
        image: '/images/products/product-10/hero.jpg',
        type: 'website',
        keywords: [
          'crochet technique',
          'slow craft process',
          'hand crochet stitch counts',
          'botanical floral assembly'
        ]
      };

    case 'atelier':
    case 'about':
      return {
        title: 'The Atelier & Craft Philosophy | Kurush Yarn',
        description:
          'Crafted with mindful intention at Kurush Yarn Atelier. Discover the convergence of ancestral needlecraft and modern tactile aesthetics.',
        canonical: `${origin}/about`,
        image: '/images/products/product-01/hero.jpg',
        type: 'website',
        keywords: [
          'kurush yarn atelier',
          'bengaluru textile studio',
          'handcrafted fiber art',
          'textile design philosophy'
        ]
      };

    case 'saved':
      return {
        title: 'Saved Collection & Curated Favorites | Kurush Yarn Atelier',
        description:
          'View your personally saved and bookmarked textile pieces from Kurush Yarn Atelier, ready for bespoke acquisition or direct inquiry.',
        canonical: `${origin}/saved`,
        image: '/images/products/product-07/hero.jpg',
        type: 'website',
        keywords: ['saved crochet pieces', 'curated wishlist', 'kurush favorites']
      };

    case 'hero':
    default:
      return {
        ...DEFAULT_SITE_SEO,
        canonical: `${origin}/`
      };
  }
}

/**
 * Generate SEO Configuration for the Visitor Intelligence / Analytics Route
 */
export function getVisitorsSEO(): SEOConfig {
  const origin = getAppOrigin();
  return {
    title: 'Visitor Intelligence & Atelier Telemetry | Kurush Yarn',
    description:
      'Real-time exhibition analytics, geographic visitor distribution, interactive engagement depth, and telemetry insights for Kurush Yarn Atelier.',
    canonical: `${origin}/visitors`,
    image: '/logo.png',
    type: 'website',
    robots: 'noindex, nofollow', // Keep internal atelier dashboard unindexed while providing structured titles
    keywords: ['atelier analytics', 'exhibition visitors', 'telemetry data']
  };
}

/**
 * High-level resolver that determines the active SEO config based on current route, section, and product
 */
export function resolveCurrentPageSEO(options: {
  route?: 'home' | 'visitors';
  section?: string;
  product?: Product | null;
}): SEOConfig {
  const { route, section, product } = options;

  if (product) {
    return getProductSEO(product);
  }

  if (route === 'visitors') {
    return getVisitorsSEO();
  }

  return getPageSEOForSection(section || 'hero');
}
