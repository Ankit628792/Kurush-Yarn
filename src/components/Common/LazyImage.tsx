import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { isImageCached } from '../../utils/imagePreloader';

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  aspectRatio?: string; // e.g. 'aspect-square', 'aspect-[4/3]', 'aspect-[16/9]'
  containerClassName?: string;
  className?: string;
  fallbackSrc?: string;
  lowResPlaceholder?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholderSrc,
  aspectRatio = '',
  containerClassName = '',
  className = '',
  fallbackSrc,
  lowResPlaceholder = true,
  loading = 'lazy',
  decoding = 'async',
  ...props
}) => {
  const initiallyCached = isImageCached(src);
  const [isInView, setIsInView] = useState(initiallyCached);
  const [isLoaded, setIsLoaded] = useState(initiallyCached);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If image is already cached via preloader, ensure state is updated
    if (isImageCached(src)) {
      setIsInView(true);
      setIsLoaded(true);
      return;
    }

    // If IntersectionObserver is not supported, load immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      {
        rootMargin: '250px 0px', // Preload images 250px before entering viewport
        threshold: 0.01
      }
    );

    const currentEl = containerRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
      observer.disconnect();
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
  };

  const imageSrc = hasError && fallbackSrc ? fallbackSrc : src;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#F7F5F2] ${aspectRatio} ${containerClassName}`}
    >
      {/* Low-resolution / Skeleton Placeholder with Shimmer Wave */}
      {lowResPlaceholder && !isLoaded && (
        <div
          className="absolute inset-0 bg-[#F7F5F2] flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          {placeholderSrc ? (
            <img
              src={placeholderSrc}
              alt=""
              className="w-full h-full object-cover filter blur-lg scale-105 opacity-60"
            />
          ) : (
            <>
              {/* Skeleton Shimmer Gradient Wave */}
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-[#FFFFFF]/50 to-transparent" />
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 text-[#3D2B1F]/20">
                <Sparkles size={20} className="stroke-[1.5] animate-pulse" />
                <div className="w-8 h-px bg-[#3D2B1F]/15 mt-2" />
              </div>
            </>
          )}
        </div>
      )}

      {/* Fallback Graphic if failed to load */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 bg-[#F7F5F2] flex flex-col items-center justify-center p-4 text-center text-[#3D2B1F]/50">
          <span className="text-[9px] uppercase tracking-widest font-semibold font-sans">
            Image Unavailable
          </span>
          <span className="text-xs italic font-editorial mt-1 text-[#3D2B1F]/70">{alt}</span>
        </div>
      )}

      {/* Actual High-Res / Lazy Loaded Image */}
      {isInView && (
        <img
          src={imageSrc}
          alt={alt}
          loading={loading}
          decoding={decoding}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
