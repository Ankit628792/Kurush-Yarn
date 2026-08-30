import React, { useEffect } from 'react';
import { Product } from '../../types/product';
import { AngleGallery } from './AngleGallery';
import { products } from '../../data/products';
import {
  X,
  ArrowLeft,
  ArrowRight,
  Heart,
  Sparkles,
  Layers,
  ShieldCheck,
  Feather,
  Instagram
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onInquire: (product: Product) => void;
  isSaved?: boolean;
  onToggleSave?: (productId: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onClose,
  onSelectProduct,
  onInquire,
  isSaved = false,
  onToggleSave
}) => {
  // Find current index for prev/next navigation
  const currentIndex = products.findIndex((p) => p.id === product.id);
  const prevProduct = products[(currentIndex - 1 + products.length) % products.length];
  const nextProduct = products[(currentIndex + 1) % products.length];

  // Lock body scroll and listen for escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onSelectProduct(prevProduct);
      if (e.key === 'ArrowRight') onSelectProduct(nextProduct);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onSelectProduct, prevProduct, nextProduct]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FDFCFB]/95 backdrop-blur-xl flex flex-col justify-between selection:bg-[#3D2B1F] selection:text-[#FDFCFB] text-[#3D2B1F] animate-in fade-in duration-300">
      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-20 bg-[#FDFCFB]/85 backdrop-blur-md border-b border-[#3D2B1F]/15 px-6 md:px-12 py-4 flex items-center justify-between">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#3D2B1F] hover:opacity-60 transition-opacity py-2"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Exhibition</span>
        </button>

        {/* Center Product Indicator */}
        <div className="hidden sm:flex items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <span>Piece No. {product.number}</span>
          <span className="w-1 h-1 rounded-full bg-[#3D2B1F]" />
          <span>{product.categoryLabel}</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {onToggleSave && (
            <button
              onClick={() => onToggleSave(product.id)}
              className={`p-2.5 rounded-full border transition-all ${
                isSaved
                  ? 'bg-[#3D2B1F] text-white border-[#3D2B1F]'
                  : 'bg-white text-[#3D2B1F] border-[#3D2B1F]/20 hover:border-[#3D2B1F]'
              }`}
              title={isSaved ? 'Saved to Collection' : 'Save to Collection'}
            >
              <Heart size={14} className={isSaved ? 'fill-current' : ''} />
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#3D2B1F] text-[#FDFCFB] hover:bg-[#3D2B1F]/80 transition-colors"
            title="Close View"
          >
            <X size={15} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-6 md:px-12 py-10 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Multi-Angle Studio Gallery & Texture Zoom */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <AngleGallery product={product} />
          </div>

          {/* Right Column: Editorial Dossier, Story, Craft Specifications */}
          <div className="lg:col-span-6 space-y-8">
            {/* Header Title Block */}
            <div className="space-y-3 border-b border-[#3D2B1F]/15 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  {product.edition || 'Atelier Series'}
                </span>
                <span className="font-editorial text-2xl text-[#3D2B1F]">
                  {product.price}
                </span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl text-[#3D2B1F] leading-tight" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
                {product.name}
              </h1>

              <p className="text-xs uppercase tracking-[0.2em] text-[#3D2B1F]/70 font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                {product.subtitle}
              </p>
            </div>

            {/* Narrative Story */}
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-bold flex items-center gap-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <Feather size={13} className="text-[#3D2B1F]" /> The Object Narrative
              </h3>
              <p className="text-[#3D2B1F]/85 text-base leading-relaxed font-normal font-sans">
                {product.description}
              </p>
              <div className="p-4 rounded-xl bg-white border-l-2 border-[#3D2B1F] text-sm italic text-[#3D2B1F]/80 shadow-sm">
                "{product.details.story}"
              </div>
            </div>

            {/* Tactile Craft Blueprint & Metrics */}
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-bold flex items-center gap-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <Sparkles size={13} className="text-[#3D2B1F]" /> Craft Technical Specifications
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#3D2B1F]/15 shadow-sm">
                  <span className="text-[9px] uppercase tracking-wider text-[#3D2B1F]/60 block font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    Stitch Count
                  </span>
                  <span className="font-editorial text-xl text-[#3D2B1F] block mt-1" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
                    {product.stitchCount}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#3D2B1F]/15 shadow-sm">
                  <span className="text-[9px] uppercase tracking-wider text-[#3D2B1F]/60 block font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    Atelier Time
                  </span>
                  <span className="font-editorial text-xl text-[#3D2B1F] block mt-1" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
                    {product.craftTime}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#3D2B1F]/15 shadow-sm col-span-2 sm:col-span-1">
                  <span className="text-[9px] uppercase tracking-wider text-[#3D2B1F]/60 block font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    Physical Weight
                  </span>
                  <span className="font-editorial text-xl text-[#3D2B1F] block mt-1" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
                    {product.weight}
                  </span>
                </div>
              </div>
            </div>

            {/* Material & Fiber Origins Table */}
            <div className="space-y-3 bg-white p-6 rounded-2xl border border-[#3D2B1F]/15 shadow-sm">
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F] font-bold flex items-center gap-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <Layers size={13} className="text-[#3D2B1F]" /> Material Composition
              </h4>

              <div className="divide-y divide-[#3D2B1F]/10 text-xs text-[#3D2B1F] font-sans">
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#3D2B1F]/60">Yarn &amp; Fibers</span>
                  <span className="font-semibold text-right max-w-[60%]">{product.material}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#3D2B1F]/60">Dimensions</span>
                  <span className="font-semibold text-right">{product.dimensions}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#3D2B1F]/60">Fiber Origin</span>
                  <span className="font-semibold text-right max-w-[60%]">{product.details.fiberOrigin}</span>
                </div>
                {product.details.hardware && (
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#3D2B1F]/60">Hardware</span>
                    <span className="font-semibold text-right max-w-[60%]">{product.details.hardware}</span>
                  </div>
                )}
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#3D2B1F]/60">Care Routine</span>
                  <span className="font-semibold text-right max-w-[60%]">{product.details.careInstructions}</span>
                </div>
              </div>
            </div>

            {/* Color Palette Swatches */}
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-semibold block" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Artisan Dye Palette
              </span>
              <div className="flex items-center gap-3">
                {product.palette.map((color, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border border-black/10 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[10px] font-mono text-[#3D2B1F]/70">{color}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => onInquire(product)}
                className="w-full sm:w-auto flex-1 bg-[#3D2B1F] hover:bg-[#3D2B1F]/85 text-[#FDFCFB] py-4 px-8 rounded-full text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <Instagram size={14} />
                <span>Inquire on Instagram (@kurush.yarn)</span>
                <Sparkles size={12} />
              </button>

              <button
                onClick={() => onToggleSave && onToggleSave(product.id)}
                className="w-full sm:w-auto py-4 px-6 rounded-full border border-[#3D2B1F]/25 hover:border-[#3D2B1F] hover:bg-white text-[#3D2B1F] text-[10px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <Heart size={14} className={isSaved ? 'fill-[#3D2B1F] text-[#3D2B1F]' : ''} />
                <span>{isSaved ? 'Saved in Collection' : 'Save Piece'}</span>
              </button>
            </div>

            {/* Studio Guarantee */}
            <div className="p-4 rounded-xl bg-white border border-[#3D2B1F]/15 flex items-center gap-3 text-xs text-[#3D2B1F]/75 font-sans shadow-sm">
              <ShieldCheck size={18} className="text-[#D4A373] flex-shrink-0" />
              <span>
                Each Kurush Yarn creation is hand-checked, steam-stabilized, and delivered in a protective cotton dust pouch with a signed atelier certificate of authenticity.
              </span>
            </div>
          </div>
        </div>

        {/* Exhibition Next/Prev Walkthrough Bar */}
        <div className="mt-20 pt-8 border-t border-[#3D2B1F]/15 flex items-center justify-between">
          <button
            onClick={() => onSelectProduct(prevProduct)}
            className="flex items-center gap-3 text-left group hover:opacity-75 transition-opacity"
          >
            <div className="p-3 rounded-full bg-white border border-[#3D2B1F]/15 group-hover:bg-[#3D2B1F] group-hover:text-white transition-all shadow-sm">
              <ArrowLeft size={14} />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 block font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Previous Piece</span>
              <span className="font-editorial text-lg text-[#3D2B1F] transition-colors" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
                {prevProduct.name}
              </span>
            </div>
          </button>

          <button
            onClick={() => onSelectProduct(nextProduct)}
            className="flex items-center gap-3 text-right group hover:opacity-75 transition-opacity"
          >
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 block font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Next Piece</span>
              <span className="font-editorial text-lg text-[#3D2B1F] transition-colors" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
                {nextProduct.name}
              </span>
            </div>
            <div className="p-3 rounded-full bg-white border border-[#3D2B1F]/15 group-hover:bg-[#3D2B1F] group-hover:text-white transition-all shadow-sm">
              <ArrowRight size={14} />
            </div>
          </button>
        </div>
      </main>
    </div>
  );
};
