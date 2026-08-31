import React from 'react';
import { Sparkles, Layers } from 'lucide-react';

interface SkeletonProps {
  className?: string;
}

export const SkeletonShimmer: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden bg-[#3D2B1F]/[0.06] rounded-md animate-pulse ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-[#FDFCFB]/40 to-transparent" />
    </div>
  );
};

export interface ProductCardSkeletonProps {
  isLarge?: boolean;
  className?: string;
}

/**
 * Skeleton loader mimicking the ProductCard layout
 */
export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({
  isLarge = false,
  className = ''
}) => {
  const aspectClass = isLarge
    ? 'aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/10] lg:aspect-[16/10.5]'
    : 'aspect-square md:aspect-[4/4.6] lg:aspect-[4/4.8]';

  return (
    <div
      className={`flex flex-col justify-between h-full select-none ${
        isLarge ? 'md:col-span-2' : 'col-span-1'
      } ${className}`}
    >
      {/* Image Container Skeleton */}
      <div
        className={`relative w-full bg-[#F7F5F2] rounded-2xl overflow-hidden border border-[#3D2B1F]/10 ${aspectClass} flex items-center justify-center`}
      >
        <SkeletonShimmer className="absolute inset-0 rounded-2xl" />
        
        {/* Subtle Center Emblem */}
        <div className="relative z-10 flex flex-col items-center justify-center text-[#3D2B1F]/15">
          <Sparkles size={24} className="stroke-[1.2]" />
          <span
            className="text-[8px] uppercase tracking-[0.25em] font-semibold mt-2"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            Loading Piece
          </span>
        </div>

        {/* Top Badges Skeleton */}
        <div className="absolute top-4 left-4 z-10">
          <SkeletonShimmer className="w-16 h-5 rounded-full" />
        </div>
        <div className="absolute top-4 right-4 z-10">
          <SkeletonShimmer className="w-8 h-8 rounded-full" />
        </div>
      </div>

      {/* Product Information Details Skeleton */}
      <div className="mt-4 sm:mt-5 flex-grow flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <SkeletonShimmer className={`h-7 rounded-md ${isLarge ? 'w-3/5' : 'w-2/3'}`} />
            <SkeletonShimmer className="h-5 w-16 rounded-full" />
          </div>

          <div className="space-y-1.5 pt-1">
            <SkeletonShimmer className="h-3.5 w-full rounded" />
            <SkeletonShimmer className="h-3.5 w-4/5 rounded" />
          </div>
        </div>

        {/* Metadata Footer Skeleton */}
        <div className="pt-3 flex items-center justify-between border-t border-[#3D2B1F]/10">
          <SkeletonShimmer className="h-3 w-28 rounded" />
          <SkeletonShimmer className="h-3 w-20 rounded" />
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton loader mimicking the full ProductDetailView modal
 */
export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FDFCFB]/95 backdrop-blur-xl flex flex-col justify-between text-[#3D2B1F]">
      {/* Top Header Bar */}
      <div className="sticky top-0 z-20 bg-[#FDFCFB]/85 backdrop-blur-md border-b border-[#3D2B1F]/15 px-6 md:px-12 py-4 flex items-center justify-between">
        <SkeletonShimmer className="w-36 h-6 rounded-md" />
        <SkeletonShimmer className="hidden sm:block w-48 h-4 rounded-md" />
        <div className="flex items-center gap-3">
          <SkeletonShimmer className="w-8 h-8 rounded-full" />
          <SkeletonShimmer className="w-8 h-8 rounded-full" />
        </div>
      </div>

      {/* Main Dual-Column Body */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-8 md:py-12 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Visual Column */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 sm:gap-6">
            {/* Thumbnail Strip */}
            <div className="flex md:flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <SkeletonShimmer key={i} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl" />
              ))}
            </div>

            {/* Main Stage Canvas */}
            <div className="flex-1 aspect-[4/3] sm:aspect-square bg-[#F7F5F2] rounded-2xl overflow-hidden border border-[#3D2B1F]/10 relative flex items-center justify-center">
              <SkeletonShimmer className="absolute inset-0" />
              <div className="relative z-10 flex flex-col items-center justify-center text-[#3D2B1F]/20">
                <Layers size={36} className="stroke-[1.2]" />
                <span
                  className="text-[9px] uppercase tracking-[0.25em] font-semibold mt-3"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                  Loading Multi-Angle View
                </span>
              </div>
            </div>
          </div>

          {/* Right Product Dossier Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title & Category */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <SkeletonShimmer className="w-20 h-5 rounded-full" />
                <SkeletonShimmer className="w-24 h-5 rounded-full" />
              </div>
              <SkeletonShimmer className="w-4/5 h-10 rounded-lg" />
              <SkeletonShimmer className="w-3/5 h-5 rounded-md" />
            </div>

            {/* Price Box */}
            <div className="p-4 bg-white rounded-xl border border-[#3D2B1F]/10 flex items-center justify-between">
              <div className="space-y-1">
                <SkeletonShimmer className="w-16 h-3 rounded" />
                <SkeletonShimmer className="w-24 h-6 rounded" />
              </div>
              <SkeletonShimmer className="w-28 h-8 rounded-full" />
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-3 bg-white/70 rounded-xl border border-[#3D2B1F]/10 space-y-1.5">
                  <SkeletonShimmer className="w-16 h-3 rounded" />
                  <SkeletonShimmer className="w-24 h-4 rounded" />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <SkeletonShimmer className="w-full h-12 rounded-full" />
              <SkeletonShimmer className="w-full h-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface SkeletonLoaderProps {
  variant?: 'card' | 'detail' | 'image' | 'gallery';
  isLarge?: boolean;
  aspectRatio?: string;
  count?: number;
  className?: string;
}

/**
 * Universal SkeletonLoader component supporting card, detail, image, and gallery states
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'card',
  isLarge = false,
  aspectRatio = 'aspect-square',
  count = 3,
  className = ''
}) => {
  if (variant === 'detail') {
    return <ProductDetailSkeleton />;
  }

  if (variant === 'gallery') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 ${className}`}>
        {Array.from({ length: count }).map((_, idx) => (
          <ProductCardSkeleton
            key={idx}
            isLarge={idx === 0 || (count >= 7 && idx === count - 1)}
          />
        ))}
      </div>
    );
  }

  if (variant === 'image') {
    return (
      <div className={`relative overflow-hidden bg-[#F7F5F2] ${aspectRatio} ${className}`}>
        <SkeletonShimmer className="w-full h-full" />
      </div>
    );
  }

  return <ProductCardSkeleton isLarge={isLarge} className={className} />;
};

export default SkeletonLoader;
