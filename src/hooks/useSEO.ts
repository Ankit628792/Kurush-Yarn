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

export type { SEOConfig };

/**
 * Direct hook to apply an explicit SEO configuration
 */
export function useSEO(config?: Partial<SEOConfig>) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    updateDocumentSEO(config);
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
  }, [route, section, product?.id, product?.slug]);
}
