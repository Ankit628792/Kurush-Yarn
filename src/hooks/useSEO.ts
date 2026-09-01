import { useEffect } from 'react';
import { Product } from '../types/product';
import { getAppOrigin, getProductPieceUrl, getAbsoluteAssetUrl, getCanonicalPageUrl } from '../utils/url';

export interface SEOConfig {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  keywords?: string[];
  priceAmount?: string;
  priceCurrency?: string;
  availability?: string;
}

const DEFAULT_SEO: Required<Omit<SEOConfig, 'priceAmount' | 'priceCurrency' | 'availability'>> = {
  title: 'Kurush Yarn — Handcrafted Textile Exhibition & Atelier',
  description:
    'Explore hand-crocheted botanical stems, bespoke charms, wearable adornments, and architectural fiber sculptures by Kurush Yarn Atelier. Handcrafted in combed cotton and merino wool.',
  canonical: getAppOrigin(),
  image: '/images/products/product-07/hero.jpg',
  type: 'website',
  keywords: [
    'handcrafted crochet',
    'textile art',
    'botanical crochet flowers',
    'kurush yarn',
    'crochet charms',
    'fiber sculpture',
    'handmade amigurumi',
    'merino wool',
    'artisan decor'
  ]
};

/**
 * Helper to update or create a <meta> tag
 */
function setMetaTag(attribute: 'name' | 'property', value: string, content: string) {
  if (typeof document === 'undefined') return;

  let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${value}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Helper to update or create a <link> tag
 */
function setLinkTag(rel: string, href: string) {
  if (typeof document === 'undefined') return;

  let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Hook to manage document head tags for SEO & social sharing
 */
export function useSEO(config?: SEOConfig) {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const currentOrigin = getAppOrigin();
    const title = config?.title ? `${config.title}` : DEFAULT_SEO.title;
    const description = config?.description || DEFAULT_SEO.description;
    const image = config?.image
      ? getAbsoluteAssetUrl(config.image)
      : getAbsoluteAssetUrl(DEFAULT_SEO.image);
    const canonical = config?.canonical || getCanonicalPageUrl();
    const type = config?.type || DEFAULT_SEO.type;
    const keywords = config?.keywords ? config.keywords.join(', ') : DEFAULT_SEO.keywords.join(', ');

    // 1. Document Title
    document.title = title;

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'author', 'Kurush Yarn Atelier');
    setLinkTag('canonical', canonical);

    // 3. OpenGraph Meta Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', canonical);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'Kurush Yarn Atelier');

    // 4. Product-specific OpenGraph Tags (if present)
    if (config?.priceAmount) {
      setMetaTag('property', 'product:price:amount', config.priceAmount.replace(/[^0-9.]/g, ''));
      setMetaTag('property', 'product:price:currency', config.priceCurrency || 'INR');
      setMetaTag('property', 'product:availability', config.availability || 'in stock');
    }

    // 5. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);
    setMetaTag('name', 'twitter:site', '@kurush.yarn');
    setMetaTag('name', 'twitter:creator', '@kurush.yarn');

    return () => {
      // Revert to default site SEO on cleanup
      document.title = DEFAULT_SEO.title;
      setMetaTag('name', 'description', DEFAULT_SEO.description);
      setMetaTag('name', 'keywords', DEFAULT_SEO.keywords.join(', '));
      setMetaTag('property', 'og:title', DEFAULT_SEO.title);
      setMetaTag('property', 'og:description', DEFAULT_SEO.description);
      setMetaTag('property', 'og:image', getAbsoluteAssetUrl(DEFAULT_SEO.image));
      setMetaTag('property', 'og:type', DEFAULT_SEO.type);
    };
  }, [
    config?.title,
    config?.description,
    config?.canonical,
    config?.image,
    config?.type,
    config?.keywords,
    config?.priceAmount,
    config?.priceCurrency,
    config?.availability
  ]);
}

/**
 * Convenient specialized hook for Product Detail pages
 */
export function useProductSEO(product: Product | null) {
  const seoConfig: SEOConfig | undefined = product
    ? {
        title: `${product.name} — Piece No. ${product.number} | Kurush Yarn`,
        description: `${product.tagline || product.description} Handcrafted with ${product.material}. Dimensions: ${product.dimensions}. Price: ${product.price}.`,
        image: product.heroImage,
        type: 'product',
        canonical: getProductPieceUrl(product.slug),
        priceAmount: product.price ? product.price.replace(/[^0-9]/g, '') : undefined,
        priceCurrency: 'INR',
        availability: 'in stock',
        keywords: [
          product.name,
          product.categoryLabel,
          'kurush yarn',
          'crochet ' + product.category,
          product.material,
          'handcrafted textile'
        ]
      }
    : undefined;

  useSEO(seoConfig);
}
