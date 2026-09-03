import { siteContent } from '../../../data/content';
import { Product } from '../../../types/product';

/**
 * Builds standard inquiry text for Instagram DM
 */
export function buildInstagramInquiryText(productName: string, customNotes?: string): string {
  let text = `Hello Kurush Atelier! I would like to inquire about "${productName}" seen on your digital exhibition catalog. Could you share details regarding availability, bespoke options, and crafting timeline?`;
  if (customNotes && customNotes.trim()) {
    text += ` (Custom request: ${customNotes.trim()})`;
  }
  return text;
}

/**
 * Builds inquiry text for multiple saved favorite items
 */
export function buildInstagramSavedInquiryText(products: Product[]): string {
  const names = products.map((p) => `• ${p.name} (${p.price})`).join('\n');
  return `Hello Kurush Atelier! I have curated a selection of favorite handcrafted pieces from your exhibition catalog:\n\n${names}\n\nCould you kindly share availability, bespoke commission possibilities, and crafting timeline?`;
}

/**
 * Returns the atelier Instagram URL
 */
export function getInstagramUrl(): string {
  return siteContent.footer.instagramUrl || 'https://www.instagram.com/kurush.yarn';
}

/**
 * Returns the atelier Instagram handle
 */
export function getInstagramHandle(): string {
  return siteContent.footer.instagramHandle || '@kurush.yarn';
}
