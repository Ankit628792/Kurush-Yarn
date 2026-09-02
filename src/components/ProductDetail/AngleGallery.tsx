import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product, ProductAngle } from '../../types/product';
import { LazyImage } from '../Common/LazyImage';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AngleGalleryProps {
  product: Product;
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
  activeImageIndex?: number;
  onImageIndexChange?: (idx: number) => void;
}

export const AngleGallery: React.FC<AngleGalleryProps> = ({
  product,
  scrollerRef,
  activeImageIndex,
  onImageIndexChange
}) => {
  const [internalImageIndex, setInternalImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const selectedImageIndex = activeImageIndex !== undefined ? activeImageIndex : internalImageIndex;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const parallaxBgRef = useRef<HTMLDivElement | null>(null);
  const imageStackRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const gallery = (product.gallery || []).filter((item) => item.type !== 'texture' && !item.src.includes('yarn_macro'));

  // Reset index when product changes
  useEffect(() => {
    setInternalImageIndex(0);
    setIsZoomed(false);
  }, [product.id]);

  // Setup GSAP ScrollTrigger for subtle parallax depth
  useEffect(() => {
    if (!containerRef.current || !viewportRef.current || gallery.length === 0) return;

    const scroller = scrollerRef?.current || window;

    const ctx = gsap.context(() => {
      if (parallaxBgRef.current) {
        gsap.fromTo(
          parallaxBgRef.current,
          { y: 20, opacity: 0.2 },
          {
            y: -20,
            opacity: 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              scroller: scroller,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8
            }
          }
        );
      }
    }, containerRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, [gallery.length, scrollerRef]);

  const handleSelectImage = (idx: number) => {
    setInternalImageIndex(idx);
    if (onImageIndexChange) {
      onImageIndexChange(idx);
    }
    setIsZoomed(false);

    if (imageStackRef.current) {
      const activeEl = imagesRef.current[idx];
      if (activeEl) {
        gsap.fromTo(
          activeEl,
          { opacity: 0.4, scale: 1.03 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
        );
      }
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (selectedImageIndex - 1 + gallery.length) % gallery.length;
    handleSelectImage(nextIdx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (selectedImageIndex + 1) % gallery.length;
    handleSelectImage(nextIdx);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div ref={containerRef} className="space-y-4 select-none">
      {/* Main Studio Image Viewport */}
      <div
        ref={viewportRef}
        className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#F7F5F2] border border-[#3D2B1F]/15 shadow-[0_20px_50px_rgba(61,43,31,0.08)] group will-change-transform"
      >
        {/* Parallax Background Watermark */}
        <div
          ref={parallaxBgRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
        >
          <span
            className="font-editorial text-[12vw] lg:text-[7vw] font-bold text-[#3D2B1F]/[0.03] tracking-tight uppercase select-none leading-none"
            style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
          >
            {product.number ? `No. ${product.number}` : 'Kurush'}
          </span>
        </div>

        {/* Stacked Image Sequence */}
        <div
          ref={imageStackRef}
          onMouseMove={handleMouseMove}
          onClick={() => setIsZoomed(!isZoomed)}
          className={`w-full h-full relative overflow-hidden transition-all duration-300 ${
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
        >
          {gallery.map((img, idx) => {
            const isActive = selectedImageIndex === idx;
            return (
              <div
                key={idx}
                ref={(el) => {
                  imagesRef.current[idx] = el;
                }}
                className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
                  isActive
                    ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                    : 'opacity-0 scale-105 z-0 pointer-events-none'
                }`}
              >
                <LazyImage
                  src={img.src}
                  alt={img.alt || product.name}
                  aspectRatio="aspect-square"
                  style={{
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    transform: isZoomed && isActive ? 'scale(2.2)' : 'scale(1)'
                  }}
                  className="w-full h-full object-cover transition-transform duration-200 ease-out"
                />
              </div>
            );
          })}
        </div>

        {/* Top-Left: Image Counter Badge */}
        {gallery.length > 1 && (
          <div className="absolute top-4 left-4 pointer-events-none z-20">
            <span
              className="bg-[#FFFFFF]/90 backdrop-blur-md text-[#3D2B1F] text-[9px] uppercase tracking-[0.2em] font-semibold px-3 py-1.5 rounded-full border border-[#3D2B1F]/15 shadow-sm"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              0{selectedImageIndex + 1} / 0{gallery.length}
            </span>
          </div>
        )}

        {/* Next / Prev Navigation Arrows */}
        {gallery.length > 1 && !isZoomed && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#3D2B1F] shadow-md border border-[#3D2B1F]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#3D2B1F] shadow-md border border-[#3D2B1F]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Bottom-Right: Zoom Control */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
          className="absolute bottom-4 right-4 z-20 bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#3D2B1F] text-[9px] uppercase tracking-[0.2em] font-semibold px-3 py-1.5 rounded-full border border-[#3D2B1F]/15 shadow-sm flex items-center gap-1.5 transition-all duration-200 active:scale-95"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          <ZoomIn size={12} />
          <span>{isZoomed ? 'Reset' : 'Zoom'}</span>
        </button>
      </div>

      {/* Pure Image Thumbnails */}
      {gallery.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {gallery.map((img, idx) => {
            const isSelected = selectedImageIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectImage(idx)}
                className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-[#3D2B1F] shadow-sm ring-2 ring-[#3D2B1F]/20 scale-[1.02]'
                    : 'border-transparent opacity-65 hover:opacity-100 hover:border-[#3D2B1F]/30 bg-[#F7F5F2]'
                }`}
              >
                <LazyImage
                  src={img.src}
                  alt={img.alt || product.name}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

