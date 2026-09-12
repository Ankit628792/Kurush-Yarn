/**
 * Dynamic URL & Domain Utilities
 * Dynamically resolves application origins, canonical deep links, and asset paths
 * using the configured APP_URL environment variable, falling back
 * to dynamic browser window.location.origin.
 */

export function getAppOrigin(): string {
  // 1. Prefer explicitly configured APP_URL environment variable
  const envUrl = (
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.APP_URL) ||
    (typeof process !== 'undefined' && process.env && process.env.APP_URL) ||
    ''
  ).trim();

  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }

  // 2. Dynamic fallback in browser environment
  if (typeof window !== 'undefined' && window.location) {
    if (window.location.origin && window.location.origin !== 'null') {
      return window.location.origin.replace(/\/+$/, '');
    }
    // Fallback if origin is not directly set (e.g. older environments or edge cases)
    const { protocol, hostname, port } = window.location;
    if (protocol && hostname) {
      return `${protocol}//${hostname}${port ? `:${port}` : ''}`.replace(/\/+$/, '');
    }
  }

  return '';
}

export function getBasePath(): string {
  if (typeof window !== 'undefined' && window.location) {
    return window.location.pathname || '/';
  }
  return '/';
}

/**
 * Returns the fully qualified dynamic deep link for a specific product piece
 */
export function getProductPieceUrl(slug: string): string {
  const origin = getAppOrigin();
  return `${origin}/product/${encodeURIComponent(slug)}`;
}

/**
 * Returns the fully qualified dynamic URL for any image or asset path
 */
export function getAbsoluteAssetUrl(assetPath: string): string {
  if (!assetPath) return '';
  if (assetPath.startsWith('http://') || assetPath.startsWith('https://') || assetPath.startsWith('data:')) {
    return assetPath;
  }
  const origin = getAppOrigin();
  const cleanPath = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  return `${origin}${cleanPath}`;
}

/**
 * Returns the current canonical page URL dynamically derived from APP_URL and current route
 */
export function getCanonicalPageUrl(): string {
  const origin = getAppOrigin();
  if (typeof window !== 'undefined' && window.location) {
    const pathname = window.location.pathname || '';
    const search = window.location.search || '';
    return `${origin}${pathname}${search}`;
  }
  return origin;
}

/**
 * Atelier Instagram Social Channel Helpers
 */
export function getInstagramHandle(): string {
  return '@kurush.yarn';
}

export function getInstagramUrl(): string {
  return 'https://www.instagram.com/kurush.yarn';
}

