import { Product } from '../../../types/product';

export interface InstagramInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: Product | null;
  savedProducts?: Product[];
}

export interface InstagramInquiryOptions {
  productName: string;
  price?: string;
  productSlug?: string;
  productUrl?: string;
  customNotes?: string;
  isBespoke?: boolean;
}

export interface InstagramInquiryPayload {
  productName: string;
  price?: string;
  customNotes?: string;
}
