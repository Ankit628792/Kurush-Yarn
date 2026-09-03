import React, { useState, useEffect } from 'react';
import { products } from '../../../data/products';
import { getProductPieceUrl } from '../../../utils/url';
import { X, MessageCircle, Copy, Check, Sparkles, ExternalLink } from 'lucide-react';
import { WhatsAppInquiryModalProps } from './types';
import {
  buildWhatsAppInquiryText,
  buildWhatsAppSavedInquiryText,
  createWhatsAppUrl,
  getWhatsAppDisplayNumber,
  getWhatsAppNumber
} from './whatsappUtils';

export const WhatsAppInquiryModal: React.FC<WhatsAppInquiryModalProps> = ({
  isOpen,
  onClose,
  selectedProduct,
  savedProducts = []
}) => {
  const [selectedPieceId, setSelectedPieceId] = useState<string>(
    selectedProduct ? selectedProduct.id : savedProducts.length > 0 ? 'saved-collection' : 'bespoke'
  );
  const [customNotes, setCustomNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Sync state when selectedProduct or isOpen changes
  useEffect(() => {
    if (selectedProduct) {
      setSelectedPieceId(selectedProduct.id);
    } else if (savedProducts.length > 0) {
      setSelectedPieceId('saved-collection');
    } else {
      setSelectedPieceId('bespoke');
    }
    setCustomNotes('');
    setCopied(false);
  }, [selectedProduct, savedProducts, isOpen]);

  if (!isOpen) return null;

  const currentProduct = products.find((p) => p.id === selectedPieceId);

  // Compute live WhatsApp draft text
  let inquiryText = '';
  if (selectedPieceId === 'saved-collection' && savedProducts.length > 0) {
    inquiryText = buildWhatsAppSavedInquiryText(savedProducts);
  } else if (selectedPieceId === 'bespoke' || !currentProduct) {
    inquiryText = buildWhatsAppInquiryText({
      productName: 'Bespoke Custom Creation',
      isBespoke: true,
      customNotes
    });
  } else {
    inquiryText = buildWhatsAppInquiryText({
      productName: currentProduct.name,
      price: currentProduct.price,
      productSlug: currentProduct.slug,
      productUrl: getProductPieceUrl(currentProduct.slug),
      customNotes
    });
  }

  const whatsAppUrl = createWhatsAppUrl(inquiryText);
  const displayNumber = getWhatsAppDisplayNumber();
  const rawNumber = getWhatsAppNumber();

  const handleCopy = () => {
    navigator.clipboard.writeText(inquiryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    navigator.clipboard.writeText(inquiryText);
    window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 overflow-y-auto bg-[#3D2B1F]/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-6 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop click outside to close */}
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        data-lenis-prevent
        className="relative z-10 w-full max-w-lg max-h-[min(90vh,760px)] bg-[#FDFCFB] rounded-2xl sm:rounded-3xl border border-[#3D2B1F]/15 shadow-2xl overflow-hidden text-[#3D2B1F] flex flex-col m-auto"
      >
        {/* Header - Fixed Top */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#3D2B1F]/10 flex items-start justify-between bg-[#FAF7F2]/90 backdrop-blur-xs flex-shrink-0">
          <div>
            <div
              className="inline-flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-semibold mb-1"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <Sparkles size={11} className="text-[#D4A373]" />
              <span>Studio Inquiries &amp; Acquisitions</span>
            </div>
            <h2
              className="font-editorial text-xl sm:text-2xl text-[#3D2B1F] tracking-tight"
              style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
            >
              Inquire via WhatsApp
            </h2>
            <p className="text-[11px] sm:text-xs text-[#3D2B1F]/70 mt-0.5 font-sans leading-relaxed">
              Connect directly with our atelier artisans for orders, availability, and bespoke inquiries.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#3D2B1F]/60 hover:text-[#3D2B1F] hover:bg-[#3D2B1F]/10 transition-colors cursor-pointer flex-shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Center Body Area */}
        <div
          data-lenis-prevent
          className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-5 sm:space-y-6"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* Piece Selector */}
          <div className="space-y-1.5">
            <label
              className="block text-[10px] uppercase tracking-wider text-[#3D2B1F]/70 font-semibold"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Piece of Interest / Creation Type
            </label>
            <select
              value={selectedPieceId}
              onChange={(e) => setSelectedPieceId(e.target.value)}
              className="w-full bg-white border border-[#3D2B1F]/20 rounded-xl px-4 py-2.5 text-xs text-[#3D2B1F] focus:outline-none focus:border-[#3D2B1F] shadow-xs font-sans cursor-pointer"
            >
              {savedProducts.length > 0 && (
                <option value="saved-collection">
                  ✦ Curated Saved Selection ({savedProducts.length} Pieces)
                </option>
              )}
              <option value="bespoke">
                Bespoke Custom Creation (New Handcrafted Design)
              </option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.price})
                </option>
              ))}
            </select>
          </div>

          {/* Optional Custom Notes Input */}
          <div className="space-y-1.5">
            <label
              className="block text-[10px] uppercase tracking-wider text-[#3D2B1F]/70 font-semibold"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Custom Sizing / Requests (Optional)
            </label>
            <input
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g., Long stem length, custom color combination, gift wrap..."
              className="w-full bg-white border border-[#3D2B1F]/20 rounded-xl px-4 py-2 text-xs text-[#3D2B1F] placeholder:text-[#3D2B1F]/40 focus:outline-none focus:border-[#3D2B1F] shadow-xs font-sans"
            />
          </div>

          {/* Message Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                className="text-[10px] uppercase tracking-wider text-[#3D2B1F]/70 font-semibold"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                WhatsApp Message Draft
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[10px] uppercase tracking-wider font-semibold text-[#3D2B1F] hover:text-[#D4A373] flex items-center gap-1 transition-colors cursor-pointer"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                {copied ? <Check size={11} className="text-green-700" /> : <Copy size={11} />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>

            <div
              data-lenis-prevent
              className="p-3.5 bg-white border border-[#3D2B1F]/15 rounded-xl text-xs text-[#3D2B1F]/85 font-sans leading-relaxed shadow-xs whitespace-pre-line max-h-36 overflow-y-auto overscroll-contain"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {inquiryText}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="w-full bg-[#128C7E] hover:bg-[#075E54] text-[#FDFCFB] py-3.5 px-6 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <MessageCircle size={15} />
              <span>Inquire on WhatsApp</span>
              <ExternalLink size={13} />
            </button>

            <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-[10px] text-[#3D2B1F]/60 font-sans">
              <span>Atelier Concierge:</span>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#128C7E] hover:underline cursor-pointer"
              >
                WhatsApp {displayNumber || rawNumber}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
