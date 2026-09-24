/**
 * React Hooks for Dynamic SEO & Metadata Synchronization (Phase 19)
 */

import { useEffect } from 'react';
import { Product } from '../types/product';
import {
  SEOConfig,
  updateDocumentSEO,
  getProductSEO,
  resolveCurrentPageSEO,
  DEFAULT_SITE_SEO
} from '../utils/seo';
import { generateOptimizationData, injectAeoGeoSignals } from '../aeo-geo';
import { PageType, PageInputData } from '../aeo-geo/types';

export type { SEOConfig };

function mapSectionToPageType(section?: string, route?: string, product?: Product | null): PageType {
  if (product) return 'product';
  if (route === 'visitors' || route === 'analytics') return 'analytics';
  switch (section) {
    case 'works':
    case 'gallery':
    case 'collection':
      return 'collection';
    case 'material':
      return 'material';
    case 'process':
      return 'process';
    case 'atelier':
    case 'about':
      return 'about';
    case 'saved':
      return 'saved';
    default:
      return 'home';
  }
}

/**
 * Direct hook to apply an explicit SEO configuration alongside AEO/GEO signals
 */
export function useSEO(config?: Partial<SEOConfig>) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    updateDocumentSEO(config);

    if (config) {
      const pageData: PageInputData = {
        url: config.canonical || window.location.pathname,
        title: config.title || DEFAULT_SITE_SEO.title,
        description: config.description || DEFAULT_SITE_SEO.description,
        type: (config.type as PageType) || 'home',
        keywords: config.keywords,
        image: config.image
      };
      try {
        const optData = generateOptimizationData(pageData);
        injectAeoGeoSignals(optData);
      } catch (err) {
        console.warn('⚠️ [AEO/GEO Engine] Non-fatal optimization error:', err);
      }
    }
  }, [
    config?.title,
    config?.description,
    config?.canonical,
    config?.image,
    config?.type,
    config?.priceAmount,
    config?.priceCurrency,
    config?.availability,
    config?.sku
  ]);
}

/**
 * Dedicated hook for Product Detail views
 */
export function useProductSEO(product: Product | null) {
  useEffect(() => {
    if (typeof window === 'undefined' || !product) return;
    const config = getProductSEO(product);
    updateDocumentSEO(config);

    const pageData: PageInputData = {
      url: config.canonical || window.location.pathname,
      title: config.title,
      description: config.description,
      type: 'product',
      product,
      keywords: config.keywords,
      image: config.image
    };

    try {
      const optData = generateOptimizationData(pageData);
      injectAeoGeoSignals(optData);
    } catch (err) {
      console.warn('⚠️ [AEO/GEO Engine] Non-fatal optimization error for product:', err);
    }

    return () => {
      // Return to default site SEO on unmount
      updateDocumentSEO(DEFAULT_SITE_SEO);
    };
  }, [product?.id, product?.slug, product?.name, product?.price]);
}

/**
 * High-level dynamic page SEO hook that automatically responds to:
 * - Current active route ('home' | 'visitors')
 * - Active scrolled section ('hero' | 'works' | 'material' | 'process' | 'atelier')
 * - Currently inspected product piece modal
 */
export function usePageSEO(options: {
  route?: 'home' | 'visitors';
  section?: string;
  product?: Product | null;
}) {
  const { route, section, product } = options;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const activeConfig = resolveCurrentPageSEO({ route, section, product });
    updateDocumentSEO(activeConfig);

    const pageType = mapSectionToPageType(section, route, product);
    const pageData: PageInputData = {
      url: activeConfig.canonical || window.location.pathname,
      title: activeConfig.title,
      description: activeConfig.description,
      type: pageType,
      section,
      product: product || null,
      keywords: activeConfig.keywords,
      image: activeConfig.image
    };

    try {
      const optData = generateOptimizationData(pageData);
      injectAeoGeoSignals(optData);
    } catch (err) {
      console.warn('⚠️ [AEO/GEO Engine] Non-fatal optimization error for page:', err);
    }
  }, [route, section, product?.id, product?.slug]);
}

