import { siteContent } from '../../../data/content';
import { Product } from '../../../types/product';
import { InstagramInquiryOptions } from './types';

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

/**
 * Returns direct Instagram DM link to send a message to the atelier.
 * ig.me is Instagram's official quick link for opening direct messages.
 */
export function getInstagramDmUrl(): string {
  const handle = getInstagramHandle().replace('@', '');
  return `https://ig.me/m/${handle}`;
}

/**
 * Builds standard, polite atelier inquiry text for Instagram DM
 */
export function buildInstagramInquiryText(
  optionsOrName: InstagramInquiryOptions | string,
  maybeNotes?: string
): string {
  if (typeof optionsOrName === 'string') {
    let text = `Hello Kurush Atelier! I would like to inquire about "${optionsOrName}" seen on your digital exhibition catalog. Could you share details regarding availability, bespoke options, and crafting timeline?`;
    if (maybeNotes && maybeNotes.trim()) {
      text += `\n\nCustom request / note: ${maybeNotes.trim()}`;
    }
    return text;
  }

  const { productName, price, productSlug, productUrl, customNotes, isBespoke } = optionsOrName;

  if (isBespoke) {
    let text = `Hello Kurush Atelier!\n\nI am captivated by your woolen botanical art and would like to commission a bespoke, handcrafted creation.\n\nType: Custom Commission / Special Project`;
    if (customNotes && customNotes.trim()) {
      text += `\nDetails & Preferences: ${customNotes.trim()}`;
    }
    text += `\n\nCould you kindly guide me through the bespoke consultation process, fiber selections, and crafting timeline?`;
    return text;
  }

  let text = `Hello Kurush Atelier!\n\nI would love to inquire about acquiring "${productName}"`;
  if (price) {
    text += ` (${price})`;
  }
  text += ` from your handcrafted exhibition catalog.`;

  if (productUrl) {
    text += `\nPiece Reference: ${productUrl}`;
  } else if (productSlug) {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    text += `\nPiece Reference: ${origin}/product/${productSlug}`;
  }

  if (customNotes && customNotes.trim()) {
    text += `\nCustom Request: ${customNotes.trim()}`;
  }

  text += `\n\nCould you please share details regarding availability, shipping, and crafting timeline?`;
  return text;
}

/**
 * Builds formatted inquiry text for multiple saved favorite items
 */
export function buildInstagramSavedInquiryText(products: Product[]): string {
  if (!products || products.length === 0) {
    return buildInstagramInquiryText({ productName: 'Bespoke Custom Creation', isBespoke: true });
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const lines = products.map((p, idx) => {
    const link = `${origin}/product/${p.slug}`;
    return `${idx + 1}. ${p.name} (${p.price})\n   Reference: ${link}`;
  });

  return `Hello Kurush Atelier!\n\nI have curated a selection of favorite handcrafted pieces from your exhibition catalog:\n\n${lines.join('\n\n')}\n\nCould you kindly share availability, delivery timelines, and options for acquiring these pieces together?`;
}

/**
 * Directly copies inquiry text and opens Instagram DM
 */
export function openInstagramInquiry(message?: string): void {
  if (message && typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(message).catch(() => {});
  }
  const dmUrl = getInstagramDmUrl();
  if (typeof window !== 'undefined') {
    window.open(dmUrl, '_blank', 'noopener,noreferrer');
  }
}
