import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { HeroScene } from './HeroScene';
import { siteContent } from '../../data/content';
import { products } from '../../data/products';
import { Product } from '../../types/product';
import { LazyImage } from '../Common/LazyImage';
import { ErrorBoundary } from '../Common/ErrorBoundary';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onSelectProduct: (product: Product) => void;
  onMaterialClick: () => void;
  introFinished?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onSelectProduct,
  onMaterialClick,
  introFinished = true
}) => {
  const heroProduct = products[0]; // Petite Oreo Charm or Bonsai
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 overflow-hidden texture-bg select-none text-[#3D2B1F]"
      style={{ fontFamily: 'Georgia, serif' }}
    >
      {/* 3D WebGL Yarn Curves Background with Error Isolation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={introFinished ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
      >
        <ErrorBoundary
          isolateSection
          sectionName="3D Yarn Scene"
          fallback={<div className="absolute inset-0 pointer-events-none opacity-40 texture-bg" />}
        >
          <HeroScene />
        </ErrorBoundary>
      </motion.div>

      {/* Left Hairline & Vertical Metatext (Hidden on small screens) */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={introFinished ? { opacity: 0.2, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        style={{ transformOrigin: 'top' }}
        className="hidden xl:block absolute left-12 top-1/2 -translate-y-1/2 h-[380px] w-px bg-[#3D2B1F] pointer-events-none z-10"
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
        className="hidden xl:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col justify-between h-[380px] pl-4 pointer-events-none z-10"
      >
        <div
          className="text-[10px] uppercase tracking-widest opacity-40 font-sans"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          Handcrafted Collection
        </div>
        <div
          className="text-[10px] uppercase tracking-widest opacity-40 font-sans"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          Limited Material Release
        </div>
      </motion.div>

      {/* Center Bold Typography Stage & Visual Focus */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center items-center py-6">
        <div className="relative text-center w-full max-w-4xl flex flex-col items-center">
          {/* Decorative Rotating Geometric Circles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={introFinished ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="contents pointer-events-none"
          >
            <div className="w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px] rounded-full border border-[#3D2B1F] opacity-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] rounded-full border-[0.5px] border-dashed border-[#3D2B1F] opacity-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-spin-slow" />
          </motion.div>

          {/* Staggered Giant Bold Italic Typography */}
          <div className="relative w-full flex flex-col items-center overflow-visible">
            <motion.h1
              initial={{ opacity: 0, y: 0, filter: 'blur(6px)' }}
              animate={introFinished ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="text-[72px] sm:text-[110px] md:text-[140px] lg:text-[160px] leading-[0.85] tracking-tighter italic font-light text-[#3D2B1F] sm:-ml-12 md:-ml-20 lg:-ml-24 transition-all duration-300 drop-shadow-sm"
              style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
            >
              Kurush
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 0, filter: 'blur(6px)' }}
              animate={introFinished ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-[72px] sm:text-[110px] md:text-[140px] lg:text-[160px] leading-[0.85] tracking-tighter italic font-light text-[#3D2B1F] sm:ml-12 md:ml-20 lg:ml-24 -mt-2 sm:-mt-4 transition-all duration-300 drop-shadow-sm"
              style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
            >
              Yarn
            </motion.h1>
          </div>

          {/* Editorial Subtitle & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="mt-8 sm:mt-10 max-w-md text-center mx-auto space-y-6"
          >
            <p className="text-base sm:text-lg md:text-xl leading-relaxed italic opacity-85 text-[#3D2B1F]">
              Objects, textures and forms shaped through material, craft and imagination.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.58 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-1"
            >
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-3 bg-[#3D2B1F] hover:bg-[#3D2B1F]/85 text-[#FDFCFB] px-8 py-3.5 rounded-full text-[10px] uppercase tracking-[0.3em] font-medium transition-all duration-300 shadow-md group cursor-pointer"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <span>Explore Works</span>
                <ArrowDown size={13} className="transform transition-transform duration-300 group-hover:translate-y-1" />
              </button>

              <button
                onClick={onMaterialClick}
                className="inline-flex items-center space-x-3 text-[#3D2B1F] hover:opacity-60 transition-opacity py-2 px-4 cursor-pointer"
              >
                <div className="w-8 h-px bg-[#3D2B1F] opacity-40"></div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  Explore Material
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Featured Object floating vignette */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={introFinished ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 35, scale: 0.96 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="mt-12 w-full max-w-2xl mx-auto flex justify-center"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onSelectProduct(heroProduct)}
            style={{
              transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
            className="w-full bg-[#FFFFFF]/85 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#3D2B1F]/15 shadow-[0_15px_40px_rgba(61,43,31,0.06)] cursor-pointer group flex flex-col sm:flex-row items-center gap-5 hover:border-[#3D2B1F]/30 transition-all duration-300"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#F7F5F2] flex-shrink-0 border border-[#3D2B1F]/10">
              <LazyImage
                src={heroProduct.heroImage}
                alt={heroProduct.name}
                aspectRatio="aspect-square"
                className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            <div className="flex-1 text-center sm:text-left min-w-0">
              <div className="flex items-center justify-center sm:justify-between gap-2">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  Featured No. {heroProduct.number} — {heroProduct.categoryLabel}
                </span>
                <span className="text-xs font-semibold text-[#3D2B1F]">
                  {heroProduct.price}
                </span>
              </div>
              <h3 className="font-editorial text-xl text-[#3D2B1F] group-hover:opacity-75 transition-opacity mt-0.5 truncate">
                {heroProduct.name}
              </h3>
              <p className="text-xs text-[#3D2B1F]/70 line-clamp-1 mt-1 font-sans">
                {heroProduct.tagline}
              </p>
            </div>

            <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border border-[#3D2B1F]/20 text-[#3D2B1F] group-hover:bg-[#3D2B1F] group-hover:text-white transition-all flex-shrink-0">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bold Typography Footer Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
        className="relative z-10 w-full max-w-7xl mx-auto pt-8 border-t border-[#3D2B1F]/10 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 items-end gap-6 text-[#3D2B1F]"
      >
        {/* Left Sequence Progress */}
        <div className="col-span-1 hidden sm:block">
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            01 / Sequence
          </div>
          <div className="flex space-x-1">
            <div className="h-1 w-8 bg-[#3D2B1F]"></div>
            <div className="h-1 w-8 bg-[#3D2B1F] opacity-15"></div>
            <div className="h-1 w-8 bg-[#3D2B1F] opacity-15"></div>
            <div className="h-1 w-8 bg-[#3D2B1F] opacity-15"></div>
          </div>
        </div>

        {/* Center Scroll Ring Button */}
        <div className="col-span-1 sm:col-span-1 md:col-span-2 text-center flex flex-col items-center justify-center">
          <button
            onClick={onExploreClick}
            className="group flex flex-col items-center focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full border border-[#3D2B1F]/40 group-hover:border-[#3D2B1F] flex items-center justify-center transition-colors">
              <div className="w-1.5 h-1.5 bg-[#3D2B1F] rounded-full animate-ping"></div>
            </div>
            <div className="text-[9px] uppercase tracking-[0.4em] mt-3 font-medium text-[#3D2B1F]/80 group-hover:text-[#3D2B1F]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              Scroll to Unravel
            </div>
          </button>
        </div>

        {/* Right Status Spacer */}
        <div className="col-span-1 hidden sm:block" />
      </motion.div>
    </section>
  );
};
