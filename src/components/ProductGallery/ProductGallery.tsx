import React, { useState } from 'react';
import { products } from '../../data/products';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { LayoutGrid, GalleryHorizontal, Filter } from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [layoutMode, setLayoutMode] = useState<'editorial' | 'grid'>('editorial');

  const categories = [
    { id: 'all', label: 'All Works', count: products.length },
    { id: 'charm', label: 'Key Adornments', count: products.filter((p) => p.category === 'charm').length },
    { id: 'botanical', label: 'Botanical Stems', count: products.filter((p) => p.category === 'botanical').length },
    { id: 'wearable', label: 'Wearable Accents', count: products.filter((p) => p.category === 'wearable').length },
    { id: 'sculpture', label: 'Potted Sculptures', count: products.filter((p) => p.category === 'sculpture').length }
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

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

      {/* Filter Category Chips */}
      <div data-lenis-prevent className="py-8 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F]/50 mr-2 hidden sm:inline-flex items-center gap-1 font-medium" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <Filter size={11} /> Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 sm:px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.18em] whitespace-nowrap transition-all duration-300 border flex items-center gap-1.5 ${
              selectedCategory === cat.id
                ? 'bg-[#3D2B1F] text-[#FDFCFB] border-[#3D2B1F] shadow-sm font-semibold'
                : 'bg-white text-[#3D2B1F]/70 border-[#3D2B1F]/15 hover:border-[#3D2B1F]/40 hover:text-[#3D2B1F]'
            }`}
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <span>{cat.label}</span>
            <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
              selectedCategory === cat.id ? 'bg-white/20 text-[#FDFCFB]' : 'bg-[#3D2B1F]/10 text-[#3D2B1F]'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Product Display Gallery */}
      <div
        className={`grid gap-8 md:gap-10 lg:gap-12 pt-4 items-stretch ${
          layoutMode === 'editorial' && selectedCategory === 'all'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : filteredProducts.length === 1
            ? 'grid-cols-1 max-w-xl mx-auto'
            : filteredProducts.length === 2
            ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            totalItems={filteredProducts.length}
            onSelect={onSelectProduct}
            isSaved={savedProductIds.includes(product.id)}
            onToggleSave={onToggleSave}
            layout={selectedCategory === 'all' ? layoutMode : 'grid'}
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
            Bespoke Commissions &amp; Custom Sizing
          </h4>
          <p className="text-xs text-[#3D2B1F]/70 max-w-xl font-sans">
            Seeking custom plant fiber selections, personalized botanicals, or architectural textile installations?
          </p>
        </div>
        <button
          onClick={() => onSelectProduct(products[0])}
          className="bg-[#3D2B1F] hover:bg-[#3D2B1F]/85 text-[#FDFCFB] px-7 py-3.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-medium whitespace-nowrap transition-all duration-300 shadow-sm"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          Consult Atelier
        </button>
      </div>
    </section>
  );
};
