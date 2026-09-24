/**
 * AEO/GEO In-Memory & Session Caching Subsystem
 * 
 * Provides high-performance memoization of computed AEO/GEO signals,
 * avoiding duplicate CPU cycles and enabling deterministic cache invalidation.
 */

import { OptimizationResult, PageInputData } from './types';

interface CacheEntry {
  data: OptimizationResult;
  timestamp: number;
  hash: string;
}

class AeoGeoCache {
  private memoryCache: Map<string, CacheEntry> = new Map();
  private maxEntries: number = 100;
  private ttlMs: number = 1000 * 60 * 60 * 24; // 24 hours

  /**
   * Generates a deterministic cache key based on page parameters
   */
  public generateKey(pageData: PageInputData): string {
    const productId = pageData.product?.id || 'none';
    const section = pageData.section || 'default';
    const type = pageData.type || 'home';
    const url = pageData.url || '/';
    return `${type}:${productId}:${section}:${url}`;
  }

  /**
   * Retrieves cached optimization data if available and fresh
   */
  public get(key: string): OptimizationResult | null {
    const entry = this.memoryCache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > this.ttlMs;
    if (isExpired) {
      this.memoryCache.delete(key);
      return null;
    }

    return {
      ...entry.data,
      isCached: true
    };
  }

  /**
   * Stores optimization data in cache
   */
  public set(key: string, data: OptimizationResult, hash: string = ''): void {
    if (this.memoryCache.size >= this.maxEntries) {
      // Evict oldest entry
      const firstKey = this.memoryCache.keys().next().value;
      if (firstKey) {
        this.memoryCache.delete(firstKey);
      }
    }

    this.memoryCache.set(key, {
      data,
      timestamp: Date.now(),
      hash
    });
  }

  /**
   * Clears the entire cache or specific key
   */
  public invalidate(key?: string): void {
    if (key) {
      this.memoryCache.delete(key);
    } else {
      this.memoryCache.clear();
    }
  }

  /**
   * Returns current cache statistics
   */
  public getStats() {
    return {
      entryCount: this.memoryCache.size,
      maxCapacity: this.maxEntries
    };
  }
}

export const aeoGeoCache = new AeoGeoCache();
