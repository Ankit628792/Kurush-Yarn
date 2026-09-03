import { siteContent } from '../../../data/content';
import { Product } from '../../../types/product';
import { products } from '../../../data/products';
import { getProductPieceUrl, getAppOrigin, getBasePath } from '../../../utils/url';
import { WhatsAppInquiryOptions } from './types';

/**
 * Returns the sanitized WhatsApp phone number (digits only with country code, e.g. 918796645605)
 */
export function getWhatsAppNumber(): string {
  const rawNumber = siteContent.footer.whatsappNumber || '8796645605';
  const digits = rawNumber.replace(/[^0-9]/g, '');
  // If user provided a 10-digit number without country code, prepend India country code 91
  if (digits.length === 10) {
    return `91${digits}`;
  }
  return digits;
}

/**
 * Returns user-friendly formatted phone display text
 */
export function getWhatsAppDisplayNumber(): string {
  return siteContent.footer.whatsappDisplay || '+91 87966 45605';
}

/**
 * Generates structured, polite atelier inquiry message for WhatsApp with product deep link
 */
export function buildWhatsAppInquiryText(options: WhatsAppInquiryOptions): string {
  const { productName, price, productSlug, productUrl, customNotes, isBespoke } = options;

  let directUrl = productUrl;
  if (!directUrl && productSlug) {
    directUrl = getProductPieceUrl(productSlug);
  }
  if (!directUrl && !isBespoke) {
    const matched = products.find(
      (p) => p.name.toLowerCase().trim() === productName.toLowerCase().trim()
    );
    if (matched) {
      directUrl = getProductPieceUrl(matched.slug);
    }
  }

  if (isBespoke || productName.toLowerCase().includes('bespoke') || productName.toLowerCase().includes('custom')) {
    let msg = `Hello Kurush Atelier! ✨\n\nI would like to inquire about commissioning a *Bespoke Custom Creation* seen in your digital exhibition catalog.`;
    if (customNotes && customNotes.trim()) {
      msg += `\n\n*Bespoke Request Details:* ${customNotes.trim()}`;
    }
    const catalogUrl = `${getAppOrigin()}${getBasePath()}`;
    if (catalogUrl) {
      msg += `\n\n*Catalog:* ${catalogUrl}`;
    }
    msg += `\n\nCould you kindly share details regarding custom possibilities, fiber selection, and crafting timeline?`;
    return msg;
  }

  let msg = `Hello Kurush Atelier! ✨\n\nI would like to inquire about *"${productName}"*`;
  if (price) {
    msg += ` (${price})`;
  }
  msg += ` from your handcrafted textile exhibition.`;

  if (directUrl) {
    msg += `\n\n*Product Link:* ${directUrl}`;
  }

  if (customNotes && customNotes.trim()) {
    msg += `\n• *Custom Note / Sizing:* ${customNotes.trim()}`;
  }

  msg += `\n\nCould you please share availability, customization options, and delivery timeline? Thank you!`;
  return msg;
}

/**
 * Generates formatted WhatsApp inquiry message for multiple saved favorite items with links
 */
export function buildWhatsAppSavedInquiryText(productsList: Product[]): string {
  if (!productsList || productsList.length === 0) {
    return buildWhatsAppInquiryText({ productName: 'Bespoke Custom Creation', isBespoke: true });
  }

  const itemsList = productsList
    .map((p, idx) => `${idx + 1}. *${p.name}* (${p.price})\n   🔗 Link: ${getProductPieceUrl(p.slug)}`)
    .join('\n\n');

  return `Hello Kurush Atelier! ✨\n\nI have curated a selection of favorite handcrafted textile pieces from your exhibition catalog:\n\n${itemsList}\n\nCould you kindly confirm availability, combined crafting timelines, and acquisition details? Thank you!`;
}

/**
 * Creates direct WhatsApp link with pre-filled encoded message
 */
export function createWhatsAppUrl(message: string, phoneNumber?: string): string {
  const phone = (phoneNumber || getWhatsAppNumber()).replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  
  if (phone) {
    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;
  }
  return `https://api.whatsapp.com/send?text=${encodedText}`;
}

/**
 * Directly opens WhatsApp with the pre-filled inquiry message
 */
export function openWhatsAppInquiry(message: string, phoneNumber?: string): void {
  const url = createWhatsAppUrl(message, phoneNumber);
  window.open(url, '_blank', 'noopener,noreferrer');
}
