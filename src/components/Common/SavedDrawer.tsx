import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
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

  const navigate = useNavigate();

  const handleExplore = () => {
    onClose();
    if (onExploreWorks) {
      onExploreWorks();
    } else {
      navigate('/works');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#3D2B1F]/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFCFB] border-l border-[#3D2B1F]/20 shadow-2xl p-6 md:p-8 flex flex-col justify-between animate-in slide-in-from-right duration-300 text-[#3D2B1F]">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#3D2B1F]/15">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#3D2B1F]/5 flex items-center justify-center text-[#3D2B1F]">
                <Heart size={16} className="fill-[#3D2B1F]" />
              </div>
              <h2
                className="font-editorial text-2xl text-[#3D2B1F]"
                style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
              >
                Saved Favorites
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#3D2B1F] hover:bg-[#3D2B1F]/5 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* List or Minimal Empty State */}
          <div data-lenis-prevent className="flex-1 overflow-y-auto py-6 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="h-full min-h-[320px] flex flex-col items-center justify-center text-center px-6 py-12 space-y-5 animate-in fade-in duration-300">
                {/* Minimal Heart Icon Badge */}
                <div className="w-16 h-16 rounded-full bg-[#3D2B1F]/5 border border-[#3D2B1F]/10 flex items-center justify-center text-[#3D2B1F]/50">
                  <Heart size={26} strokeWidth={1.5} />
                </div>

                {/* Typography */}
                <div className="space-y-2 max-w-xs">
                  <h3
                    className="font-editorial text-2xl text-[#3D2B1F] tracking-tight"
                    style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
                  >
                    No Saved Favorites Yet
                  </h3>

                  <p className="text-xs text-[#3D2B1F]/65 leading-relaxed font-sans">
                    Tap the heart on any handcrafted piece in the exhibition to curate your favorites.
                  </p>
                </div>

                {/* Minimal Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleExplore}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3D2B1F] hover:bg-[#3D2B1F]/85 text-[#FDFCFB] text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm cursor-pointer"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    <span>Explore Exhibition</span>
                    <ArrowRight size={13} />
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

          {/* Footer Action with entry animation fading along with translation */}
          {savedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="pt-6 border-t border-[#3D2B1F]/15 space-y-3"
            >
              <motion.button
                whileHover={{ scale: 1.025, y: -2 }}
                whileTap={{ scale: 0.975 }}
                onClick={() => {
                  onClose();
                  onOpenInquiry();
                }}
                className="w-full relative overflow-hidden bg-[#3D2B1F] hover:bg-[#2A1D15] text-[#FDFCFB] py-4 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-xl cursor-pointer group"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                {/* Subtle animated light sweep on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                <Instagram size={14} className="group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">Inquire on Instagram</span>
                <Sparkles size={12} className="text-[#D4A373] animate-pulse" />
              </motion.button>

              <Link
                to="/saved"
                onClick={onClose}
                className="w-full text-center text-[10px] uppercase tracking-[0.2em] border border-[#3D2B1F]/20 hover:border-[#3D2B1F] text-[#3D2B1F] py-3 rounded-full font-medium transition-colors block cursor-pointer"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Open Saved Collection Page (/saved)
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

