import React from 'react';
import { Product } from '../../types/product';
import { products } from '../../data/products';
import { LazyImage } from './LazyImage';
import { X, Trash2, ShoppingBag, Sparkles, Instagram, Heart, ArrowRight } from 'lucide-react';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenInquiry: () => void;
  onExploreWorks?: () => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedIds,
  onToggleSave,
  onSelectProduct,
  onOpenInquiry,
  onExploreWorks
}) => {
  if (!isOpen) return null;

  const savedProducts = products.filter((p) => savedIds.includes(p.id));

  const handleExplore = () => {
    onClose();
    if (onExploreWorks) {
      onExploreWorks();
    } else {
      const el = document.getElementById('works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#3D2B1F]/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFCFB] border-l border-[#3D2B1F]/20 shadow-2xl p-6 md:p-8 flex flex-col justify-between animate-in slide-in-from-right duration-300 text-[#3D2B1F]">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#3D2B1F]/15">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#3D2B1F]" />
              <h2
                className="font-editorial text-2xl text-[#3D2B1F]"
                style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
              >
                Saved Exhibition Pieces
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#3D2B1F] hover:bg-[#3D2B1F]/5 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* List or Cute Empty State */}
          <div data-lenis-prevent className="flex-1 overflow-y-auto py-6 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center px-4 py-8 space-y-5 animate-in fade-in zoom-in-95 duration-400">
                {/* Cute Animated Yarn Ball & Heart Illustration */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                  {/* Soft Warm Background Halo */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#EBD9C8]/60 via-[#F7EFE8]/70 to-[#E8D6C4]/50 blur-md scale-110" />

                  {/* Yarn Ball SVG */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-24 h-24 relative z-10 drop-shadow-sm transition-transform duration-500 hover:scale-105"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Main Yarn Body */}
                    <circle cx="50" cy="54" r="34" fill="#D4A373" />
                    <circle cx="50" cy="54" r="34" fill="url(#yarnGrad)" fillOpacity="0.85" />

                    {/* Yarn Strands / Texture Loops */}
                    <path
                      d="M24 45C30 32 60 30 74 48C84 60 62 82 46 80C30 78 20 60 32 44"
                      stroke="#3D2B1F"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeOpacity="0.65"
                    />
                    <path
                      d="M30 68C42 80 68 76 74 60C80 44 65 32 48 34C34 36 24 50 36 64"
                      stroke="#FDFCFB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeOpacity="0.75"
                    />
                    <path
                      d="M38 30C52 24 70 38 68 56C66 70 46 76 36 66"
                      stroke="#3D2B1F"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeOpacity="0.5"
                    />
                    <path
                      d="M42 42C50 38 60 46 58 56C56 64 45 68 40 60"
                      stroke="#FDFCFB"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeOpacity="0.85"
                    />

                    {/* Free Yarn Thread Wandering Out with a Loop */}
                    <path
                      d="M74 64C82 66 88 58 84 50C80 42 70 42 74 34C76 30 82 28 86 32"
                      stroke="#3D2B1F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="2 1"
                      className="animate-pulse"
                    />

                    {/* Cute Knit Needles / Hook crossing through */}
                    <line x1="22" y1="20" x2="78" y2="82" stroke="#3D2B1F" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="22" cy="20" r="3.5" fill="#3D2B1F" />
                    <line x1="78" y1="22" x2="22" y2="84" stroke="#8C6D53" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="78" cy="22" r="3.5" fill="#8C6D53" />

                    {/* Gradients */}
                    <defs>
                      <linearGradient id="yarnGrad" x1="20" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F5EBE0" stopOpacity="0.9" />
                        <stop offset="0.5" stopColor="#D4A373" />
                        <stop offset="1" stopColor="#A26B43" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Floating Knitted Heart Badge */}
                  <div className="absolute -top-1 -right-1 z-20 w-8 h-8 rounded-full bg-white border border-[#3D2B1F]/15 shadow-md flex items-center justify-center text-[#D4A373] animate-bounce">
                    <Heart size={15} fill="#D4A373" />
                  </div>

                  {/* Tiny Sparkle Accent */}
                  <div className="absolute -bottom-1 -left-1 z-20 text-[#D4A373]/80">
                    <Sparkles size={16} />
                  </div>
                </div>

                {/* Typography & Friendly Guidance */}
                <div className="space-y-2 max-w-xs">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EBE0]/80 border border-[#3D2B1F]/10 text-[9px] uppercase tracking-[0.25em] font-bold text-[#3D2B1F]"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    <span>✦ Atelier Wishlist ✦</span>
                  </div>

                  <h3
                    className="font-editorial text-2xl text-[#3D2B1F] tracking-tight leading-snug"
                    style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
                  >
                    Your yarn basket is quiet
                  </h3>

                  <p className="text-xs text-[#3D2B1F]/70 leading-relaxed font-sans">
                    No handcrafted pieces collected yet. Tap the <span className="inline-flex items-center text-[#D4A373] font-semibold">♡</span> on any creation in the gallery to build your bespoke curation.
                  </p>
                </div>

                {/* Cute 3-Step Guide Pills */}
                <div className="flex items-center justify-center gap-1.5 text-[8.5px] uppercase tracking-wider text-[#3D2B1F]/60 font-semibold pt-1">
                  <span className="px-2 py-1 bg-white rounded-md border border-[#3D2B1F]/10">1. Explore</span>
                  <span className="text-[#3D2B1F]/30">→</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-[#3D2B1F]/10">2. Tap ♡</span>
                  <span className="text-[#3D2B1F]/30">→</span>
                  <span className="px-2 py-1 bg-white rounded-md border border-[#3D2B1F]/10">3. Inquire</span>
                </div>

                {/* Explore Exhibition Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleExplore}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3D2B1F] hover:bg-[#3D2B1F]/85 text-[#FDFCFB] text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-sm hover:gap-3 group"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    <span>Explore Exhibition</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl bg-white border border-[#3D2B1F]/15 hover:border-[#3D2B1F]/40 flex items-center gap-4 cursor-pointer transition-all group shadow-sm"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#F7F5F2] flex-shrink-0">
                    <LazyImage
                      src={product.heroImage}
                      alt={product.name}
                      aspectRatio="aspect-square"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span
                      className="text-[9px] uppercase tracking-wider text-[#3D2B1F]/60 block font-semibold"
                      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                    >
                      No. {product.number}
                    </span>
                    <h4
                      className="font-editorial text-base text-[#3D2B1F] truncate group-hover:opacity-75 transition-opacity"
                      style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
                    >
                      {product.name}
                    </h4>
                    <span className="text-xs font-bold text-[#3D2B1F]">
                      {product.price}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(product.id);
                    }}
                    className="p-2 text-[#3D2B1F]/60 hover:text-red-700 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Action */}
          {savedProducts.length > 0 && (
            <div className="pt-6 border-t border-[#3D2B1F]/15 space-y-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry();
                }}
                className="w-full bg-[#3D2B1F] hover:bg-[#3D2B1F]/85 text-[#FDFCFB] py-4 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <Instagram size={14} />
                <span>Inquire on Instagram ({savedProducts.length} Saved)</span>
                <Sparkles size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

