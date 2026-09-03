import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGalleryImagePreloader } from '../ProductGallery/GalleryImagePreloader';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<SVGCircleElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLDivElement | null>(null);
  const [isSkipped, setIsSkipped] = useState(false);
  const preloadStats = useGalleryImagePreloader();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      // Initial state
      gsap.set(circleRef.current, {
        strokeDasharray: 600,
        strokeDashoffset: 600,
        rotate: -90,
        transformOrigin: '50% 50%'
      });
      gsap.set(textRef.current, { opacity: 0, y: 15, filter: 'blur(8px)' });
      gsap.set(taglineRef.current, { opacity: 0, y: 10 });

      // Animate circle stroke drawing
      tl.to(circleRef.current, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: 'power3.inOut'
      })
      // Animate brand title
      .to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out'
        },
        '-=0.7'
      )
      // Animate atelier tagline
      .to(
        taglineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        },
        '-=0.4'
      )
      // Hold briefly then dissolve
      .to(containerRef.current, {
        opacity: 0,
        scale: 1.03,
        duration: 0.9,
        ease: 'power2.inOut',
        delay: 0.4
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const handleSkip = () => {
    setIsSkipped(true);
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => onComplete()
      });
    } else {
      onComplete();
    }
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      handleSkip();
    };

    window.addEventListener('wheel', handleUserInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true });
    window.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  if (isSkipped) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDFCFB] text-[#3D2B1F] cursor-pointer selection:bg-transparent"
    >
      <div className="relative flex flex-col items-center justify-center p-8 max-w-sm text-center">
        {/* Animated Brand Circular Motif */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 mb-8">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle
              ref={circleRef}
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#3D2B1F"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Center decorative fiber node */}
            <circle
              cx="100"
              cy="100"
              r="5"
              fill="#D4A373"
              className="animate-pulse"
              style={{ animationDuration: '2s' }}
            />
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-editorial text-4xl text-[#3D2B1F] font-normal tracking-wide"
              style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
            >
              KY
            </span>
          </div>
        </div>

        {/* Brand Name typography */}
        <div ref={textRef} className="space-y-1">
          <h1
            className="font-editorial text-3xl md:text-4xl tracking-tight uppercase text-[#3D2B1F]"
            style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
          >
            Kurush Yarn
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={taglineRef} className="mt-3 flex flex-col items-center">
          <p
            className="text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-semibold"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            Future Craft Atelier
          </p>

          {/* Textile Imagery Preload Monitor */}
          <div className="mt-4 flex flex-col items-center gap-1.5 opacity-75">
            <div className="w-28 h-[1.5px] bg-[#3D2B1F]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6E3F3A] transition-all duration-300 ease-out"
                style={{ width: `${Math.max(10, preloadStats.progress)}%` }}
              />
            </div>
            <span
              className="text-[8.5px] uppercase tracking-[0.2em] text-[#3D2B1F]/50 font-medium"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              {preloadStats.isComplete
                ? `Textile Archive Ready (${preloadStats.total})`
                : `Weaving Fiber Archive · ${preloadStats.progress}%`}
            </span>
          </div>
        </div>

        {/* Skip hint */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="absolute bottom-[-60px] text-[10px] uppercase tracking-[0.25em] font-semibold text-[#3D2B1F]/60 hover:text-[#3D2B1F] transition-colors py-2 px-4 rounded-full border border-[#3D2B1F]/20"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          Click to enter
        </button>
      </div>
    </div>
  );
};
