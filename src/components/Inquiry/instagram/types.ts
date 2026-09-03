import { Product } from '../../../types/product';

export interface InstagramInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: Product | null;
}

export interface InstagramInquiryPayload {
  productName: string;
  price?: string;
  customNotes?: string;
}
