import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types/product';
import { usePageSEO } from '../hooks/useSEO';
import { ProductCard } from '../components/ProductGallery/ProductCard';
import { Heart, ChevronRight, ArrowUpRight, Sparkles, Trash2 } from 'lucide-react';

interface SavedPageProps {
  savedProductIds: string[];
  onToggleSave: (id: string) => void;
  onOpenInquiry: (product?: Product) => void;
}

export const SavedPage: React.FC<SavedPageProps> = ({
  savedProductIds,
  onToggleSave,
  onOpenInquiry
}) => {
  const navigate = useNavigate();
  usePageSEO({ section: 'saved' });

  const savedPieces = products.filter((p) => savedProductIds.includes(p.id));

  return (
    <div className="pt-28 md:pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-[#3D2B1F]">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 mb-8 font-medium" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <Link to="/" className="hover:text-[#3D2B1F] transition-colors">
          Atelier Home
        </Link>
        <ChevronRight size={12} className="opacity-40" />
        <span className="text-[#3D2B1F] font-semibold">Saved Pieces</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#3D2B1F]/15">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#3D2B1F]/60 font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <Heart size={12} className="fill-[#3D2B1F] text-[#3D2B1F]" />
            <span>Personal Wishlist</span>
            <span className="w-4 h-px bg-[#3D2B1F]/30" />
            <span>{savedPieces.length} {savedPieces.length === 1 ? 'Piece' : 'Pieces'}</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#3D2B1F] tracking-tight leading-none" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
            Curated Favorites
          </h1>

          <p className="text-[#3D2B1F]/75 text-base leading-relaxed font-serif italic">
            Your personal salon collection of textile artifacts bookmarked for contemplation or acquisition.
          </p>
        </div>

        {savedPieces.length > 0 && (
          <button
            onClick={() => onOpenInquiry()}
            className="inline-flex items-center gap-2 bg-[#3D2B1F] hover:bg-[#3D2B1F]/85 text-[#FDFCFB] px-7 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-sm cursor-pointer whitespace-nowrap"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <span>Inquire for Curated Set</span>
            <Sparkles size={13} />
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {savedPieces.length === 0 ? (
        <div className="py-24 text-center space-y-6 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#3D2B1F]/5 text-[#3D2B1F]/40 flex items-center justify-center mx-auto">
            <Heart size={28} />
          </div>
          <div className="space-y-2">
            <h2 className="font-editorial text-2xl text-[#3D2B1F]" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              Your collection is empty
            </h2>
            <p className="text-xs text-[#3D2B1F]/70 font-sans leading-relaxed">
              Explore the permanent archive and tap the heart icon on any textile artifact to curate your personal collection.
            </p>
          </div>
          <div>
            <Link
              to="/works"
              className="inline-flex items-center gap-2 bg-[#3D2B1F] text-[#FDFCFB] px-7 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#3D2B1F]/85 transition-all shadow-sm"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <span>Explore Collection</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pt-10">
          {savedPieces.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              totalItems={savedPieces.length}
              onSelect={(p) => navigate(`/product/${p.slug}`)}
              isSaved={true}
              onToggleSave={onToggleSave}
              layout="grid"
            />
          ))}
        </div>
      )}
    </div>
  );
};
