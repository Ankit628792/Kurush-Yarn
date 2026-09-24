/**
 * React Hook for Reactive AEO/GEO Signal Generation & Injection
 * 
 * Automatically synchronizes answer engine and generative engine signals
 * when routes, sections, or product entities change in the UI.
 */

import { useEffect, useState } from 'react';
import { PageInputData, OptimizationResult } from '../aeo-geo/types';
import { generateOptimizationData, injectAeoGeoSignals, removeAeoGeoSignals } from '../aeo-geo';

export function useAeoGeo(pageData: PageInputData | null): OptimizationResult | null {
  const [data, setData] = useState<OptimizationResult | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !pageData) {
      removeAeoGeoSignals();
      return;
    }

    try {
      const result = generateOptimizationData(pageData);
      setData(result);
      injectAeoGeoSignals(result);
    } catch (err) {
      console.error('❌ [AEO/GEO Engine] Failed to generate optimization data:', err);
    }

    return () => {
      // Signal cleanup
    };
  }, [
    pageData?.url,
    pageData?.title,
    pageData?.description,
    pageData?.type,
    pageData?.section,
    pageData?.product?.id,
    pageData?.product?.slug
  ]);

  return data;
}
