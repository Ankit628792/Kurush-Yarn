import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product, ProductAngle } from '../../types/product';
import { LazyImage } from '../Common/LazyImage';
import { Sparkles, Eye, RotateCw, ZoomIn, Compass, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AngleGalleryProps {
  product: Product;
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
}

export const AngleGallery: React.FC<AngleGalleryProps> = ({ product, scrollerRef }) => {
  const [selectedAngleIndex, setSelectedAngleIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const parallaxBgRef = useRef<HTMLDivElement | null>(null);
  const imageStackRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const gallery = product.gallery || [];
  const currentAngle: ProductAngle = gallery[selectedAngleIndex] || gallery[0] || {
    type: 'front',
    label: 'Studio View',
    src: product.heroImage || product.originalImage,
    alt: product.name
  };

  // Setup GSAP ScrollTrigger for parallax depth and scroll-driven sequence
  useEffect(() => {
    if (!containerRef.current || !viewportRef.current || gallery.length === 0) return;

    const scroller = scrollerRef?.current || window;

    const ctx = gsap.context(() => {
      // 1. Subtle parallax depth shift on background watermark
      if (parallaxBgRef.current) {
        gsap.fromTo(
          parallaxBgRef.current,
          { y: 30, opacity: 0.2 },
          {
            y: -30,
            opacity: 0.5,
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

      // 2. Cinematic container subtle tilt/travel parallax
      if (viewportRef.current) {
        gsap.fromTo(
          viewportRef.current,
          { y: 0, scale: 1 },
          {
            y: -15,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: containerRef.current,
              scroller: scroller,
              start: 'top center',
              end: 'bottom top',
              scrub: 1
            }
          }
        );
      }

      // 3. Scroll-driven angle transition timeline if scroller is present
      if (scrollerRef?.current && gallery.length > 1) {
        ScrollTrigger.create({
          trigger: scrollerRef.current.querySelector('main') || containerRef.current,
          scroller: scrollerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            // Map scroll progress (0 to 1) to gallery angle indices
            const index = Math.min(
              gallery.length - 1,
              Math.floor(self.progress * gallery.length)
            );
            setSelectedAngleIndex((prev) => (prev !== index && !isZoomed ? index : prev));
          }
        });
      }
    }, containerRef);

    // Refresh triggers on setup
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, [gallery.length, scrollerRef, isZoomed]);

  // Handle manual angle switch with smooth GSAP animation
  const handleSelectAngle = (idx: number) => {
    setSelectedAngleIndex(idx);
    setIsZoomed(false);

    if (imageStackRef.current) {
      const activeEl = imagesRef.current[idx];
      if (activeEl) {
        gsap.fromTo(
          activeEl,
          { opacity: 0.4, scale: 1.04, filter: 'blur(4px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }
        );
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div ref={containerRef} className="space-y-6 select-none">
      {/* Main Studio Viewport with Cinematic Parallax Sequence */}
      <div
        ref={viewportRef}
        className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#F7F5F2] border border-[#3D2B1F]/20 shadow-[0_20px_50px_rgba(61,43,31,0.08)] group will-change-transform"
      >
        {/* Parallax Background Artisan Watermark & Grid */}
        <div
          ref={parallaxBgRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
        >
          <span
            className="font-editorial text-[12vw] lg:text-[7vw] font-bold text-[#3D2B1F]/[0.04] tracking-tight uppercase select-none leading-none"
            style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
          >
            {product.number ? `No. ${product.number}` : 'Kurush'}
          </span>
          <div className="absolute inset-0 bg-[radial-gradient(#3D2B1F_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        </div>

        {/* Stacked Image Sequence with Smooth Crossfade & Parallax Zoom */}
        <div
          ref={imageStackRef}
          onMouseMove={handleMouseMove}
          onClick={() => setIsZoomed(!isZoomed)}
          className={`w-full h-full relative overflow-hidden transition-all duration-300 ${
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
        >
          {gallery.map((angle, idx) => {
            const isActive = selectedAngleIndex === idx;
            return (
              <div
                key={idx}
                ref={(el) => {
                  imagesRef.current[idx] = el;
                }}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
                  isActive
                    ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                    : 'opacity-0 scale-105 z-0 pointer-events-none'
                }`}
              >
                <LazyImage
                  src={angle.src}
                  alt={angle.alt}
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

        {/* Top-Left: Parallax Sequence Badge */}
        <div className="absolute top-4 left-4 pointer-events-none z-20 flex items-center gap-2">
          <span
            className="bg-[#FFFFFF]/90 backdrop-blur-md text-[#3D2B1F] text-[9px] uppercase tracking-[0.25em] font-semibold px-3 py-1.5 rounded-full border border-[#3D2B1F]/15 shadow-sm flex items-center gap-2"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <Compass size={12} className="text-[#3D2B1F] animate-spin-slow" />
            <span>{currentAngle.label}</span>
          </span>
          <span
            className="hidden sm:inline-flex bg-[#3D2B1F] text-[#FDFCFB] text-[8px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 rounded-full shadow-sm"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            0{selectedAngleIndex + 1} / 0{gallery.length}
          </span>
        </div>

        {/* Bottom-Left: Scroll-driven Sequence Progression Bar */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none flex items-center gap-1.5 bg-[#FFFFFF]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#3D2B1F]/15 shadow-sm">
          <Layers size={11} className="text-[#3D2B1F]/70" />
          <div className="flex items-center gap-1">
            {gallery.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  selectedAngleIndex === idx
                    ? 'w-5 bg-[#3D2B1F]'
                    : 'w-1.5 bg-[#3D2B1F]/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom-Right: Inspect Stitches Zoom Trigger */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
          className="absolute bottom-4 right-4 z-20 bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#3D2B1F] text-[9px] uppercase tracking-[0.2em] font-semibold px-3.5 py-2 rounded-full border border-[#3D2B1F]/15 shadow-sm flex items-center gap-1.5 transition-all duration-200 active:scale-95"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          <ZoomIn size={12} />
          <span>{isZoomed ? 'Reset View' : 'Inspect Stitches'}</span>
        </button>
      </div>

      {/* Interactive Angle Selector Thumbnails with Parallax Sequence Context */}
      <div className="space-y-2.5">
        <div
          className="flex items-center justify-between text-[10px] text-[#3D2B1F]/70 uppercase tracking-wider font-semibold"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          <span className="flex items-center gap-1.5">
            <RotateCw size={12} className="text-[#3D2B1F]" /> Parallax Angle Sequence
          </span>
          <span className="text-[9px] font-mono text-[#3D2B1F]/60">
            Scroll or Click to Shift Perspective
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {gallery.map((angle, idx) => {
            const isSelected = selectedAngleIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectAngle(idx)}
                className={`p-2 rounded-2xl border text-left transition-all duration-300 flex items-center gap-2.5 relative group ${
                  isSelected
                    ? 'bg-white border-[#3D2B1F] shadow-sm ring-1 ring-[#3D2B1F]'
                    : 'bg-[#F7F5F2] border-[#3D2B1F]/15 hover:border-[#3D2B1F]/40'
                }`}
              >
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#F7F5F2] flex-shrink-0 border border-[#3D2B1F]/10 relative">
                  <LazyImage src={angle.src} alt={angle.alt} className="w-full h-full object-cover" />
                  {isSelected && (
                    <div className="absolute inset-0 border-2 border-[#3D2B1F] rounded-xl pointer-events-none" />
                  )}
                </div>
                <div className="overflow-hidden min-w-0">
                  <span
                    className="text-[11px] font-semibold text-[#3D2B1F] block truncate"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    {angle.label}
                  </span>
                  <span className="text-[8.5px] uppercase tracking-wider text-[#3D2B1F]/60 block truncate">
                    {angle.type}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Angle Dossier Note */}
      {currentAngle.description && (
        <div className="p-4 rounded-2xl bg-white border border-[#3D2B1F]/15 text-xs text-[#3D2B1F]/80 flex items-start gap-3 shadow-sm transition-all duration-300">
          <Sparkles size={14} className="text-[#D4A373] flex-shrink-0 mt-0.5" />
          <p className="font-sans leading-relaxed text-[#3D2B1F]/85">{currentAngle.description}</p>
        </div>
      )}
    </div>
  );
};

