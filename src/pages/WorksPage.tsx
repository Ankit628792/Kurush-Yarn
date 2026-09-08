import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types/product';
import { ProductCard } from '../components/ProductGallery/ProductCard';
import { usePageSEO } from '../hooks/useSEO';
import {
  LayoutGrid,
  GalleryHorizontal,
  ChevronRight
} from 'lucide-react';

interface WorksPageProps {
  savedProductIds: string[];
  onToggleSave: (id: string) => void;
  onOpenInquiry: (product?: Product) => void;
}

export const WorksPage: React.FC<WorksPageProps> = ({
  savedProductIds,
  onToggleSave,
  onOpenInquiry
}) => {
  const navigate = useNavigate();
  const [layoutMode, setLayoutMode] = useState<'editorial' | 'grid'>('editorial');

  // Dynamic SEO for Works collection
  usePageSEO({ section: 'works' });

  const handleSelectProduct = (product: Product) => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <div className="pt-28 md:pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-[#3D2B1F]">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 mb-8 font-medium" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <Link to="/" className="hover:text-[#3D2B1F] transition-colors">
          Atelier Home
        </Link>
        <ChevronRight size={12} className="opacity-40" />
        <span className="text-[#3D2B1F] font-semibold">Collection Archive</span>
      </nav>

      {/* Header Statement */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-5">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#3D2B1F]/60 font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <span>Permanent Collection</span>
            <span className="w-6 h-px bg-[#3D2B1F]/30" />
            <span>Exhibition Archive ({products.length} Works)</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#3D2B1F] tracking-tight leading-none" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
            Crafted Objects &amp; Forms
          </h1>

          <p className="text-[#3D2B1F]/75 text-base md:text-lg leading-relaxed font-serif italic">
            Each artifact represents an exploration into micro-tension, botanical silhouettes, and slow heirloom fiber weaving.
          </p>
        </div>
      </div>

      {/* Layout Switcher */}
      <div className="border-b border-[#3D2B1F]/15 w-full flex justify-end pb-5">
        <div className="bg-[#3D2B1F]/5 p-1 rounded-full flex items-center border border-[#3D2B1F]/15 self-start md:self-end">
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
            <span className="hidden sm:inline text-[10px] font-medium tracking-[0.15em]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Grid</span>
          </button>
        </div>
      </div>

      {/* Products Grid */}
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
            onSelect={handleSelectProduct}
            isSaved={savedProductIds.includes(product.id)}
            onToggleSave={onToggleSave}
            layout={layoutMode}
          />
        ))}
      </div>

      {/* Bottom Bespoke Acquisition Banner */}
      <div className="mt-24 p-8 md:p-12 rounded-2xl bg-white border border-[#3D2B1F]/15 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-2">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4A373] font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Custom Atelier Studio
          </div>
          <h2 className="font-editorial text-2xl md:text-3xl text-[#3D2B1F]" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
            Bespoke Inquiries &amp; Custom Acquisitions
          </h2>
          <p className="text-xs text-[#3D2B1F]/70 max-w-xl font-sans">
            Have an intention for a custom color palette, oversized botanical installation, or bespoke textile piece?
          </p>
        </div>
        <button
          onClick={() => onOpenInquiry()}
          className="bg-[#3D2B1F] hover:bg-[#3D2B1F]/85 text-[#FDFCFB] px-8 py-3.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-medium whitespace-nowrap transition-all duration-300 shadow-sm cursor-pointer"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          Consult Atelier
        </button>
      </div>
    </div>
  );
};
