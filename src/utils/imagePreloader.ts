import { products } from '../data/products';

export interface PreloadStats {
  loaded: number;
  failed: number;
  total: number;
  progress: number; // 0 - 100
  isComplete: boolean;
}

// In-memory set of URLs that have successfully loaded/decoded into browser cache
const globalPreloadCache = new Set<string>();

type PreloadListener = (stats: PreloadStats) => void;
const listeners = new Set<PreloadListener>();

let preloadStarted = false;
let currentLoaded = 0;
let currentFailed = 0;
let totalImages = 0;
let isComplete = false;

/**
 * Check if an image URL has already been preloaded and decoded
 */
export function isImageCached(url: string | undefined): boolean {
  if (!url) return false;
  return globalPreloadCache.has(url);
}

/**
 * Get all current cached URLs
 */
export function getCachedImages(): Set<string> {
  return globalPreloadCache;
}

/**
 * Extract all high-resolution textile imagery used in the ProductGallery and details
 */
export function getGalleryImageUrls(): string[] {
  const urlSet = new Set<string>();

  products.forEach((product) => {
    // Primary showcase images
    if (product.heroImage) urlSet.add(product.heroImage);
    if (product.originalImage) urlSet.add(product.originalImage);

    // Gallery angles & detail closeups
    if (Array.isArray(product.gallery)) {
      product.gallery.forEach((g) => {
        if (g?.src) urlSet.add(g.src);
      });
    }

    // Colorway / style variants
    if (Array.isArray(product.variants)) {
      product.variants.forEach((v) => {
        if (Array.isArray(v?.images)) {
          v.images.forEach((imgUrl) => {
            if (imgUrl) urlSet.add(imgUrl);
          });
        }
      });
    }
  });

  return Array.from(urlSet);
}

/**
 * Preload and decode a single image URL into memory
 */
export function preloadSingleImage(url: string): Promise<boolean> {
  if (!url) return Promise.resolve(false);
  if (globalPreloadCache.has(url)) return Promise.resolve(true);

  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;

    const onSuccess = () => {
      globalPreloadCache.add(url);
      resolve(true);
    };

    const onError = () => {
      // Mark complete to not stall queue
      resolve(false);
    };

    if (img.complete && img.naturalWidth > 0) {
      onSuccess();
    } else {
      img.onload = () => {
        if (typeof img.decode === 'function') {
          img.decode().then(onSuccess).catch(onSuccess);
        } else {
          onSuccess();
        }
      };
      img.onerror = onError;
    }
  });
}

function notifyListeners() {
  const totalProcessed = currentLoaded + currentFailed;
  const progress = totalImages > 0 ? Math.min(100, Math.round((totalProcessed / totalImages) * 100)) : 100;
  isComplete = totalProcessed >= totalImages && totalImages > 0;

  const stats: PreloadStats = {
    loaded: currentLoaded,
    failed: currentFailed,
    total: totalImages,
    progress,
    isComplete,
  };

  listeners.forEach((fn) => fn(stats));
}

/**
 * Subscribe to preloading progress updates
 */
export function subscribePreloadProgress(listener: PreloadListener): () => void {
  listeners.add(listener);
  // Send current state immediately
  const totalProcessed = currentLoaded + currentFailed;
  const progress = totalImages > 0 ? Math.min(100, Math.round((totalProcessed / totalImages) * 100)) : 0;
  listener({
    loaded: currentLoaded,
    failed: currentFailed,
    total: totalImages,
    progress,
    isComplete,
  });

  return () => {
    listeners.delete(listener);
  };
}

/**
 * Preload all gallery textile images with controlled concurrency
 */
export async function startGalleryImagePreload(
  customUrls?: string[],
  concurrency = 4
): Promise<PreloadStats> {
  const urls = customUrls || getGalleryImageUrls();
  totalImages = urls.length;

  if (preloadStarted && isComplete) {
    return {
      loaded: currentLoaded,
      failed: currentFailed,
      total: totalImages,
      progress: 100,
      isComplete: true,
    };
  }

  preloadStarted = true;
  currentLoaded = 0;
  currentFailed = 0;
  isComplete = false;
  notifyListeners();

  const queue = [...urls];

  const worker = async () => {
    while (queue.length > 0) {
      const url = queue.shift();
      if (!url) break;
      const success = await preloadSingleImage(url);
      if (success) {
        currentLoaded++;
      } else {
        currentFailed++;
      }
      notifyListeners();
    }
  };

  const poolSize = Math.min(concurrency, urls.length);
  const workers = Array.from({ length: poolSize }, () => worker());
  await Promise.all(workers);

  isComplete = true;
  notifyListeners();

  return {
    loaded: currentLoaded,
    failed: currentFailed,
    total: totalImages,
    progress: 100,
    isComplete: true,
  };
}
