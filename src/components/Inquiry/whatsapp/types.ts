import { Product } from '../../../types/product';

export interface WhatsAppInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: Product | null;
  savedProducts?: Product[];
}

export interface WhatsAppInquiryOptions {
  productName: string;
  price?: string;
  productSlug?: string;
  productUrl?: string;
  customNotes?: string;
  isBespoke?: boolean;
}

export interface WhatsAppContactConfig {
  phoneNumber: string;
  displayNumber?: string;
}
