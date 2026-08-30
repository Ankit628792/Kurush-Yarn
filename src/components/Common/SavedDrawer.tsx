import React from 'react';
import { Product } from '../../types/product';
import { products } from '../../data/products';
import { LazyImage } from './LazyImage';
import { X, Trash2, ShoppingBag, Sparkles, Instagram } from 'lucide-react';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenInquiry: () => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedIds,
  onToggleSave,
  onSelectProduct,
  onOpenInquiry
}) => {
  if (!isOpen) return null;

  const savedProducts = products.filter((p) => savedIds.includes(p.id));

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

          {/* List or Empty State */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-white border border-[#3D2B1F]/15 flex items-center justify-center text-[#3D2B1F]/60">
                  <ShoppingBag size={20} />
                </div>
                <p
                  className="font-editorial text-xl text-[#3D2B1F]"
                  style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
                >
                  Your curation is empty
                </p>
                <p className="text-xs text-[#3D2B1F]/60 max-w-xs font-sans">
                  Click the heart icon on any piece across the exhibition to collect your favorite works here.
                </p>
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
