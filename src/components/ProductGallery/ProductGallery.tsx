import React, { useState } from 'react';
import { products } from '../../data/products';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { LayoutGrid, GalleryHorizontal } from 'lucide-react';

interface ProductGalleryProps {
  onSelectProduct: (product: Product) => void;
  savedProductIds: string[];
  onToggleSave: (productId: string) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  onSelectProduct,
  savedProductIds,
  onToggleSave
}) => {
  const [layoutMode, setLayoutMode] = useState<'editorial' | 'grid'>('editorial');

  return (
    <section id="works" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto text-[#3D2B1F]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#3D2B1F]/15">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#3D2B1F]/60 font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <span>01 / Permanent Collection</span>
            <span className="w-6 h-px bg-[#3D2B1F]/30" />
            <span>Exhibition Room ({products.length} Works)</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#3D2B1F] tracking-tight leading-none" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
            Crafted Objects &amp; Forms
          </h2>

          <p className="text-[#3D2B1F]/75 text-base md:text-lg leading-relaxed italic">
            Every piece is an individual sculptural dialogue between organic fiber tension and human time.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-3">
          <div className="bg-[#3D2B1F]/5 p-1 rounded-full flex items-center border border-[#3D2B1F]/15">
            <button
              onClick={() => setLayoutMode('editorial')}
              className={`p-2 rounded-full text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${
                layoutMode === 'editorial'
                  ? 'bg-[#3D2B1F] text-[#FDFCFB] shadow-sm'
                  : 'text-[#3D2B1F]/60 hover:text-[#3D2B1F]'
              }`}
              title="Editorial Curated View"
            >
              <GalleryHorizontal size={14} />
              <span className="hidden sm:inline text-[10px] font-medium tracking-[0.15em]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Curated</span>
            </button>

            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-2 rounded-full text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${
                layoutMode === 'grid'
                  ? 'bg-[#3D2B1F] text-[#FDFCFB] shadow-sm'
                  : 'text-[#3D2B1F]/60 hover:text-[#3D2B1F]'
              }`}
              title="Standard Grid View"
            >
              <LayoutGrid size={14} />
              <span className="hidden sm:inline text-[10px] font-medium tracking-[0.15em]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Catalog ({products.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Display Gallery */}
      <div
        className={`grid gap-8 md:gap-10 lg:gap-12 pt-10 items-stretch ${
          layoutMode === 'editorial'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            totalItems={products.length}
            onSelect={onSelectProduct}
            isSaved={savedProductIds.includes(product.id)}
            onToggleSave={onToggleSave}
            layout={layoutMode}
          />
        ))}
      </div>

      {/* Exhibition Footnote / Bespoke Banner */}
      <div className="mt-20 p-8 md:p-10 rounded-2xl bg-white border border-[#3D2B1F]/15 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4A373] font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Custom Atelier Studio
          </div>
          <h4 className="font-editorial text-2xl md:text-3xl text-[#3D2B1F]">
            Bespoke Inquiries &amp; Custom Acquisitions
          </h4>
          <p className="text-xs text-[#3D2B1F]/70 max-w-xl font-sans">
            Seeking custom plant fiber selections, personalized botanicals, or architectural textile installations?
          </p>
        </div>
        <button
          onClick={() => onSelectProduct(products[0])}
          className="bg-[#3D2B1F] hover:bg-[#3D2B1F]/85 text-[#FDFCFB] px-7 py-3.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-medium whitespace-nowrap transition-all duration-300 shadow-sm cursor-pointer"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          Consult Atelier
        </button>
      </div>
    </section>
  );
};


