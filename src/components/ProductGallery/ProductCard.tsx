import React, { useState } from 'react';
import { Product } from '../../types/product';
import { LazyImage } from '../Common/LazyImage';
import { ArrowUpRight, Heart, Sparkles, Layers } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
  imageType?: 'hero' | 'gallery' | 'thumbnail';
  selectedImageIndex?: number;
  index?: number;
  totalItems?: number;
  onSelect?: (product: Product) => void;
  isSaved?: boolean;
  onToggleSave?: (productId: string) => void;
  layout?: 'editorial' | 'grid' | 'compact' | 'featured';
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'auto';
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  imageType = 'hero',
  selectedImageIndex = 0,
  index = 0,
  totalItems = 7,
  onSelect,
  isSaved = false,
  onToggleSave,
  layout = 'editorial',
  aspectRatio = 'auto',
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine which image source to display based on imageType prop
  let targetImage = product.heroImage;
  let targetAlt = product.name;

  if (imageType === 'thumbnail') {
    targetImage = product.heroImage || product.originalImage;
  } else if (imageType === 'gallery' && product.gallery && product.gallery.length > 0) {
    const angleIndex = Math.min(selectedImageIndex, product.gallery.length - 1);
    targetImage = product.gallery[angleIndex]?.src || product.heroImage;
    targetAlt = product.gallery[angleIndex]?.alt || product.name;
  }

  // Editorial asymmetrical layout sizing:
  // In a 7-item 3-column layout:
  // Row 1: Item 0 (Large 2-col) + Item 1 (1-col) = 3 cols
  // Row 2: Item 2 (1-col) + Item 3 (1-col) + Item 4 (1-col) = 3 cols
  // Row 3: Item 5 (1-col) + Item 6 (Large 2-col) = 3 cols
  const isLarge = layout === 'editorial' && (index === 0 || (totalItems >= 7 && index === totalItems - 1));

  // Dynamic aspect ratio calculation to auto-adjust spacing for large vs small images
  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : aspectRatio === 'landscape'
      ? 'aspect-[4/3]'
      : isLarge
      ? 'aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/10] lg:aspect-[16/10.5]'
      : 'aspect-square md:aspect-[4/4.6] lg:aspect-[4/4.8]';

  const handleClick = () => {
    if (onSelect) {
      onSelect(product);
    }
  };

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`group relative flex flex-col justify-between h-full cursor-pointer select-none transition-all duration-300 ${
        isLarge ? 'md:col-span-2' : 'col-span-1'
      } ${className}`}
      id={`product-card-${product.id}`}
    >
      {/* Product Image Frame with Responsive Aspect Ratio */}
      <div className="relative w-full bg-[#F7F5F2] rounded-2xl overflow-hidden border border-[#3D2B1F]/15 shadow-sm group-hover:shadow-[0_20px_45px_rgba(61,43,31,0.08)] group-hover:border-[#3D2B1F]/30 transition-all duration-300 flex-shrink-0">
        <LazyImage
          src={targetImage}
          alt={targetAlt}
          aspectRatio={aspectClass}
          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Floating Badge Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <span
            className="bg-[#FFFFFF]/90 backdrop-blur-md text-[#3D2B1F] text-[9px] uppercase tracking-[0.25em] font-semibold px-3 py-1.5 rounded-full border border-[#3D2B1F]/10 shadow-sm"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            No. {product.number} — {product.categoryLabel}
          </span>

          {onToggleSave && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(product.id);
              }}
              className={`pointer-events-auto p-2.5 rounded-full backdrop-blur-md transition-all duration-300 transform active:scale-90 hover:scale-110 shadow-sm ${
                isSaved
                  ? 'bg-[#3D2B1F] text-[#FDFCFB] border border-[#3D2B1F]'
                  : 'bg-white/90 text-[#3D2B1F] hover:bg-white hover:text-[#D4A373] border border-[#3D2B1F]/10'
              }`}
              title={isSaved ? 'Remove from favorites' : 'Save to favorites'}
              aria-label={isSaved ? `Remove ${product.name} from saved favorites` : `Save ${product.name} to favorites`}
            >
              <Heart
                size={14}
                className={`transition-transform duration-200 ${
                  isSaved ? 'fill-current text-[#FDFCFB]' : 'text-[#3D2B1F]'
                }`}
              />
            </button>
          )}
        </div>

        {/* Hover Explore Indicator Overlay */}
        <div
          className={`absolute inset-0 bg-[#3D2B1F]/20 transition-opacity duration-300 flex items-center justify-center pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="bg-[#FFFFFF] text-[#3D2B1F] px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.25em] font-medium flex items-center gap-2 shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <span>Explore Piece</span>
            <ArrowUpRight size={14} className="text-[#3D2B1F]" />
          </div>
        </div>

        {/* Bottom Quick Material Tag */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#FDFCFB] text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-sans">
          <span className="bg-[#3D2B1F]/85 backdrop-blur-md px-3 py-1 rounded-full">
            {product.material.split('&')[0]}
          </span>
          <span className="bg-[#3D2B1F]/85 backdrop-blur-md px-3 py-1 rounded-full">
            {product.craftTime}
          </span>
        </div>
      </div>

      {/* Product Information Details with Auto-adjusting Flex Space */}
      <div className="mt-4 sm:mt-5 flex-grow flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between gap-4">
            <h3
              className={`font-editorial text-[#3D2B1F] group-hover:opacity-75 transition-opacity leading-tight ${
                isLarge ? 'text-2xl sm:text-3xl lg:text-3xl' : 'text-xl sm:text-2xl md:text-2xl'
              }`}
              style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
            >
              {product.name}
            </h3>
            {product.price && (
              <span
                className="text-xs uppercase tracking-widest text-[#3D2B1F] font-bold whitespace-nowrap"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                {product.price}
              </span>
            )}
          </div>

          {/* Brief Tagline / Description */}
          <p className="text-xs sm:text-sm text-[#3D2B1F]/70 line-clamp-2 font-normal leading-relaxed font-sans">
            {product.tagline || product.description}
          </p>
        </div>

        {/* Craft Metrics Meta Footer */}
        <div
          className="pt-3 flex items-center justify-between text-[10px] uppercase tracking-wider text-[#3D2B1F]/60 border-t border-[#3D2B1F]/10"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          <span className="inline-flex items-center gap-1.5">
            <Sparkles size={11} className="text-[#3D2B1F]" />
            {product.stitchCount}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Layers size={11} className="text-[#3D2B1F]/60" />
            {product.dimensions}
          </span>
        </div>
      </div>
    </article>
  );
};
