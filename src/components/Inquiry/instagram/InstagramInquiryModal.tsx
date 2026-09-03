import React, { useState } from 'react';
import { products } from '../../../data/products';
import { siteContent } from '../../../data/content';
import { X, Instagram, Copy, Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { InstagramInquiryModalProps } from './types';
import { buildInstagramInquiryText, getInstagramHandle, getInstagramUrl } from './instagramUtils';

export const InstagramInquiryModal: React.FC<InstagramInquiryModalProps> = ({
  isOpen,
  onClose,
  selectedProduct
}) => {
  const [selectedPieceName, setSelectedPieceName] = useState(
    selectedProduct ? selectedProduct.name : 'Bespoke Custom Creation'
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const instagramUrl = getInstagramUrl();
  const instagramHandle = getInstagramHandle();
  const inquiryText = buildInstagramInquiryText(selectedPieceName);

  const handleCopy = () => {
    navigator.clipboard.writeText(inquiryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
              <span>Studio Inquiries &amp; Custom Acquisitions</span>
            </div>
            <h2
              className="font-editorial text-xl sm:text-2xl text-[#3D2B1F] tracking-tight"
              style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
            >
              Inquire on Instagram
            </h2>
            <p className="text-[11px] sm:text-xs text-[#3D2B1F]/70 mt-0.5 font-sans leading-relaxed">
              All bespoke orders, acquisitions, and inquiries can be received and managed through our Instagram direct messages.
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
              value={selectedPieceName}
              onChange={(e) => setSelectedPieceName(e.target.value)}
              className="w-full bg-white border border-[#3D2B1F]/20 rounded-xl px-4 py-2.5 text-xs text-[#3D2B1F] focus:outline-none focus:border-[#3D2B1F] shadow-xs font-sans cursor-pointer"
            >
              <option value="Bespoke Custom Creation">Bespoke Custom Creation (New Handcrafted Design)</option>
              {products.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} ({p.price})
                </option>
              ))}
            </select>
          </div>

          {/* Inquiry Message Template Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                className="text-[10px] uppercase tracking-wider text-[#3D2B1F]/70 font-semibold"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Direct Message Draft
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[10px] uppercase tracking-wider font-semibold text-[#3D2B1F] hover:text-[#D4A373] flex items-center gap-1 transition-colors cursor-pointer"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                {copied ? <Check size={11} className="text-green-700" /> : <Copy size={11} />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Message'}</span>
              </button>
            </div>

            <div
              data-lenis-prevent
              className="p-3.5 bg-white border border-[#3D2B1F]/15 rounded-xl text-xs text-[#3D2B1F]/85 font-sans leading-relaxed shadow-xs italic whitespace-pre-line max-h-36 overflow-y-auto overscroll-contain"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              &ldquo;{inquiryText}&rdquo;
            </div>
          </div>

          {/* Primary Action Button: Instagram DM */}
          <div className="space-y-3 pt-1">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                navigator.clipboard.writeText(inquiryText);
              }}
              className="w-full bg-[#3D2B1F] hover:bg-[#2A1D15] text-[#FDFCFB] py-3.5 px-6 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <Instagram size={14} />
              <span>Message on Instagram ({instagramHandle})</span>
              <ArrowUpRight size={13} />
            </a>

            <div className="text-center">
              <span className="text-[10px] text-[#3D2B1F]/60 font-sans">
                Official Account:{' '}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#3D2B1F] underline hover:text-[#D4A373] transition-colors cursor-pointer"
                >
                  instagram.com/kurush.yarn
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
