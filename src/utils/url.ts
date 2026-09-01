/**
 * Dynamic URL & Domain Utilities
 * Dynamically resolves application origins, canonical deep links, and asset paths
 * from `window.location.origin` across all environments.
 */

export function getAppOrigin(): string {
  if (typeof window !== 'undefined' && window.location) {
    if (window.location.origin && window.location.origin !== 'null') {
      return window.location.origin;
    }
    // Fallback if origin is not directly set (e.g. older environments or edge cases)
    const { protocol, hostname, port } = window.location;
    if (protocol && hostname) {
      return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
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
  const basePath = getBasePath();
  return `${origin}${basePath}?piece=${encodeURIComponent(slug)}`;
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
 * Returns the current canonical page URL dynamically
 */
export function getCanonicalPageUrl(): string {
  if (typeof window !== 'undefined' && window.location) {
    return window.location.href;
  }
  return getAppOrigin();
}
