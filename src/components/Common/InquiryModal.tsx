import React, { useState } from 'react';
import { Product } from '../../types/product';
import { products } from '../../data/products';
import { siteContent } from '../../data/content';
import { X, Instagram, Copy, Check, ArrowUpRight, Sparkles } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: Product | null;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  selectedProduct
}) => {
  const [selectedPieceName, setSelectedPieceName] = useState(
    selectedProduct ? selectedProduct.name : 'Bespoke Custom Commission'
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const instagramUrl = siteContent.footer.instagramUrl;
  const instagramHandle = siteContent.footer.instagramHandle;

  const inquiryText = `Hello Kurush Atelier! I would like to inquire about "${selectedPieceName}" seen on your digital exhibition catalog. Could you share details regarding availability, custom options, and crafting timeline?`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inquiryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenInstagram = () => {
    window.open(instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3D2B1F]/65 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-[#FDFCFB] rounded-2xl p-7 sm:p-9 border border-[#3D2B1F]/20 shadow-2xl overflow-hidden text-[#3D2B1F]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#3D2B1F]/60 hover:text-[#3D2B1F] hover:bg-[#3D2B1F]/5 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <div
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-semibold mb-2"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <Sparkles size={12} className="text-[#D4A373]" />
              <span>Studio Contact &amp; Commissions</span>
            </div>
            <h2
              className="font-editorial text-2xl sm:text-3xl text-[#3D2B1F] tracking-tight"
              style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
            >
              Connect via Instagram
            </h2>
            <p className="text-xs text-[#3D2B1F]/70 mt-1 font-sans leading-relaxed">
              All commissions, orders, and inquiries are received and managed exclusively through our Instagram direct messages.
            </p>
          </div>

          {/* Piece Selector */}
          <div className="space-y-1.5">
            <label
              className="block text-[10px] uppercase tracking-wider text-[#3D2B1F]/70 font-semibold"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Piece of Interest / Commission Type
            </label>
            <select
              value={selectedPieceName}
              onChange={(e) => setSelectedPieceName(e.target.value)}
              className="w-full bg-white border border-[#3D2B1F]/20 rounded-xl px-4 py-2.5 text-xs text-[#3D2B1F] focus:outline-none focus:border-[#3D2B1F] shadow-sm font-sans"
            >
              <option value="Bespoke Custom Commission">Bespoke Custom Commission (New Handcrafted Design)</option>
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
                className="text-[10px] uppercase tracking-wider font-semibold text-[#3D2B1F] hover:text-[#D4A373] flex items-center gap-1 transition-colors"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                {copied ? <Check size={11} className="text-green-700" /> : <Copy size={11} />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Message'}</span>
              </button>
            </div>

            <div className="p-3.5 bg-white border border-[#3D2B1F]/15 rounded-xl text-xs text-[#3D2B1F]/85 font-sans leading-relaxed shadow-sm italic">
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
                // Auto-copy text on click for user convenience
                navigator.clipboard.writeText(inquiryText);
              }}
              className="w-full bg-[#3D2B1F] hover:bg-[#2A1D15] text-[#FDFCFB] py-3.5 px-6 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
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
                  className="font-semibold text-[#3D2B1F] underline hover:text-[#D4A373] transition-colors"
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
