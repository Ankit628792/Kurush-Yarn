import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../../../data/products';
import { getProductPieceUrl } from '../../../utils/url';
import { X, Instagram, Copy, Check, Sparkles, ExternalLink, Send } from 'lucide-react';
import { InstagramInquiryModalProps } from './types';
import { analyticsTracker } from '../../../utils/analyticsTracker';
import {
  buildInstagramInquiryText,
  buildInstagramSavedInquiryText,
  getInstagramHandle,
  getInstagramUrl,
  getInstagramDmUrl,
} from './instagramUtils';

export const InstagramInquiryModal: React.FC<InstagramInquiryModalProps> = ({
  isOpen,
  onClose,
  selectedProduct,
  savedProducts = [],
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

  const currentProduct = products.find((p) => p.id === selectedPieceId);
  const instagramHandle = getInstagramHandle();
  const instagramProfileUrl = getInstagramUrl();
  const instagramDmUrl = getInstagramDmUrl();

  // Compute live Instagram draft message
  let inquiryText = '';
  if (selectedPieceId === 'saved-collection' && savedProducts.length > 0) {
    inquiryText = buildInstagramSavedInquiryText(savedProducts);
  } else if (selectedPieceId === 'bespoke' || !currentProduct) {
    inquiryText = buildInstagramInquiryText({
      productName: 'Bespoke Custom Creation',
      isBespoke: true,
      customNotes,
    });
  } else {
    inquiryText = buildInstagramInquiryText({
      productName: currentProduct.name,
      price: currentProduct.price,
      productSlug: currentProduct.slug,
      productUrl: getProductPieceUrl(currentProduct.slug),
      customNotes,
    });
  }

  const logInquiry = () => {
    try {
      analyticsTracker.trackInquiry({
        productName: currentProduct
          ? currentProduct.name
          : selectedPieceId === 'saved-collection'
          ? 'Saved Collection Inquiry'
          : 'Bespoke Custom Creation',
        productSlug: currentProduct?.slug,
        price: currentProduct?.price,
        thumbnail: currentProduct?.heroImage || currentProduct?.originalImage,
        customNotes,
        isBespoke: selectedPieceId === 'bespoke',
        channel: 'instagram',
      });
    } catch (e) {
      console.warn('Could not log inquiry:', e);
    }
  };

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(inquiryText);
    }
    setCopied(true);
    logInquiry();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenInstagram = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(inquiryText);
    }
    setCopied(true);
    logInquiry();
    window.open(instagramDmUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="instagram-inquiry-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          data-lenis-prevent
          className="fixed inset-0 z-50 overflow-y-auto bg-[#3D2B1F]/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop click outside to close */}
          <div
            className="fixed inset-0 cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container with cool spring translation and fading entrance */}
          <motion.div
            key="instagram-inquiry-dialog"
            initial={{ opacity: 0, y: 46, scale: 0.92, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 28, scale: 0.95, filter: 'blur(6px)' }}
            transition={{
              type: 'spring',
              damping: 24,
              stiffness: 270,
              mass: 0.85
            }}
            data-lenis-prevent
            className="relative z-10 w-full max-w-lg max-h-[min(90vh,760px)] bg-[#FDFCFB] rounded-2xl sm:rounded-3xl border border-[#3D2B1F]/15 shadow-2xl overflow-hidden text-[#3D2B1F] flex flex-col m-auto"
          >
            {/* Header - Staggered fade and translation */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="px-6 sm:px-8 py-5 border-b border-[#3D2B1F]/10 flex items-start justify-between bg-[#FAF7F2]/90 backdrop-blur-xs flex-shrink-0"
            >
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-semibold mb-1"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                  <Sparkles size={11} className="text-[#D4A373] animate-pulse" />
                  <span>Studio Inquiries &amp; Acquisitions</span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="font-editorial text-xl sm:text-2xl text-[#3D2B1F] tracking-tight"
                  style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
                >
                  Inquire on Instagram
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[11px] sm:text-xs text-[#3D2B1F]/70 mt-0.5 font-sans leading-relaxed"
                >
                  Connect directly with our atelier artisans on Instagram Direct Message for availability, bespoke commissions, and acquisitions.
                </motion.p>
              </div>

              <motion.button
                type="button"
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full text-[#3D2B1F]/60 hover:text-[#3D2B1F] hover:bg-[#3D2B1F]/10 transition-colors cursor-pointer flex-shrink-0 ml-2"
                aria-label="Close modal"
              >
                <X size={18} />
              </motion.button>
            </motion.div>

            {/* Scrollable Center Body Area */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-5 sm:space-y-6"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {/* Piece Selector */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1.5"
              >
                <label
                  className="block text-[10px] uppercase tracking-wider text-[#3D2B1F]/70 font-semibold"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                  Piece of Interest / Creation Type
                </label>
                <select
                  value={selectedPieceId}
                  onChange={(e) => setSelectedPieceId(e.target.value)}
                  className="w-full bg-white border border-[#3D2B1F]/20 rounded-xl px-4 py-2.5 text-xs text-[#3D2B1F] focus:outline-none focus:border-[#3D2B1F] shadow-xs font-sans cursor-pointer transition-colors"
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
              </motion.div>

              {/* Optional Custom Notes Input */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1.5"
              >
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
                  placeholder="e.g., Long stem length, custom color combination, gift presentation..."
                  className="w-full bg-white border border-[#3D2B1F]/20 rounded-xl px-4 py-2 text-xs text-[#3D2B1F] placeholder:text-[#3D2B1F]/40 focus:outline-none focus:border-[#3D2B1F] shadow-xs font-sans"
                />
              </motion.div>

              {/* Message Preview */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <label
                    className="text-[10px] uppercase tracking-wider text-[#3D2B1F]/70 font-semibold"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    Instagram DM Message Draft
                  </label>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleCopy}
                    className="text-[10px] uppercase tracking-wider font-semibold text-[#3D2B1F] hover:text-[#D4A373] flex items-center gap-1 transition-colors cursor-pointer"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    {copied ? <Check size={11} className="text-green-700" /> : <Copy size={11} />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
                  </motion.button>
                </div>

                <div
                  data-lenis-prevent
                  className="p-3.5 bg-white border border-[#3D2B1F]/15 rounded-xl text-xs text-[#3D2B1F]/85 font-sans leading-relaxed shadow-xs whitespace-pre-line max-h-36 overflow-y-auto overscroll-contain"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  {inquiryText}
                </div>
              </motion.div>

              {/* Primary Action Button: Open Instagram DM with rich entry animation and hover shine */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.40, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3 pt-1"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.025, y: -2 }}
                  whileTap={{ scale: 0.975 }}
                  onClick={handleOpenInstagram}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-[#FDFCFB] py-3.5 px-6 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-xl cursor-pointer group"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                  {/* Subtle animated sweep light effect on hover */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                  <Instagram size={15} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">Message on Instagram ({instagramHandle})</span>
                  <Send size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>

                <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-[10px] text-[#3D2B1F]/60 font-sans">
                  <span>Atelier Concierge:</span>
                  <a
                    href={instagramProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#3D2B1F] hover:text-[#D4A373] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{instagramHandle}</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

