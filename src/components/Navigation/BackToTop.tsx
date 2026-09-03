import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface BackToTopProps {
  /** Optional custom scroll-to-top handler (e.g. via Lenis) */
  onScrollToTop?: () => void;
  /** Section ID to consider as the hero threshold. Default: 'hero' */
  heroSectionId?: string;
  /** Additional CSS class names */
  className?: string;
}

export const BackToTop: React.FC<BackToTopProps> = ({
  onScrollToTop,
  heroSectionId = 'hero',
  className = '',
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const isVisibleRef = useRef<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Animate button visibility in using GSAP
  const showButton = useCallback(() => {
    if (isVisibleRef.current || !buttonRef.current) return;
    isVisibleRef.current = true;

    gsap.killTweensOf(buttonRef.current);
    gsap.fromTo(
      buttonRef.current,
      {
        autoAlpha: 0,
        y: 24,
        scale: 0.8,
        pointerEvents: 'none',
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        pointerEvents: 'auto',
        duration: 0.6,
        ease: 'power3.out',
      }
    );
  }, []);

  // Animate button visibility out using GSAP
  const hideButton = useCallback(() => {
    if (!isVisibleRef.current || !buttonRef.current) return;
    isVisibleRef.current = false;

    gsap.killTweensOf(buttonRef.current);
    gsap.to(buttonRef.current, {
      autoAlpha: 0,
      y: 20,
      scale: 0.82,
      pointerEvents: 'none',
      duration: 0.45,
      ease: 'power2.in',
    });
  }, []);

  // Set up GSAP ScrollTrigger and scroll progress calculation
  useEffect(() => {
    const heroEl = document.getElementById(heroSectionId);

    // Initial state: hidden via GSAP
    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        autoAlpha: 0,
        y: 24,
        scale: 0.8,
        pointerEvents: 'none',
      });
    }

    // Scroll progress calculation for the circular outline
    const updateScrollState = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const maxScroll = docHeight - windowHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100)));
      }

      // Check if user has scrolled past hero section
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        // When bottom of hero is above or within 40px of top of viewport
        if (heroRect.bottom <= 40) {
          showButton();
        } else {
          hideButton();
        }
      } else {
        // Fallback if hero element is not yet found: appear after scrolling 700px
        if (scrollTop > 700) {
          showButton();
        } else {
          hideButton();
        }
      }
    };

    // ScrollTrigger integration for robust GSAP lifecycle
    let trigger: ScrollTrigger | null = null;
    if (heroEl) {
      trigger = ScrollTrigger.create({
        trigger: heroEl,
        start: 'bottom top+=40',
        onEnter: () => showButton(),
        onLeaveBack: () => hideButton(),
      });
    }

    // Passive scroll listener for smooth progress & backup detection
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState, { passive: true });

    // Initial check
    updateScrollState();

    return () => {
      if (trigger) trigger.kill();
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
      if (buttonRef.current) {
        gsap.killTweensOf(buttonRef.current);
      }
      if (arrowRef.current) {
        gsap.killTweensOf(arrowRef.current);
      }
    };
  }, [heroSectionId, showButton, hideButton]);

  // Handle click with tactile GSAP micro-animation and scroll to top
  const handleClick = () => {
    if (!buttonRef.current || !arrowRef.current) return;

    // Tactile button bounce
    const tl = gsap.timeline();
    tl.to(buttonRef.current, {
      scale: 0.92,
      duration: 0.12,
      ease: 'power2.in',
    }).to(buttonRef.current, {
      scale: 1,
      duration: 0.4,
      ease: 'back.out(2)',
    });

    // Arrow blast upward and reset
    gsap.to(arrowRef.current, {
      y: -8,
      opacity: 0,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        if (!arrowRef.current) return;
        gsap.fromTo(
          arrowRef.current,
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' }
        );
      },
    });

    // Execute scroll to top
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // Hover micro-animations
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!buttonRef.current || !arrowRef.current) return;

    gsap.to(buttonRef.current, {
      y: -4,
      boxShadow: '0 14px 32px rgba(61, 43, 31, 0.16)',
      duration: 0.28,
      ease: 'power2.out',
    });

    gsap.to(arrowRef.current, {
      y: -2,
      duration: 0.22,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!buttonRef.current || !arrowRef.current) return;

    gsap.to(buttonRef.current, {
      y: 0,
      boxShadow: '0 8px 24px rgba(61, 43, 31, 0.08)',
      duration: 0.28,
      ease: 'power2.out',
    });

    gsap.to(arrowRef.current, {
      y: 0,
      duration: 0.22,
      ease: 'power2.out',
    });
  };

  // SVG Circle parameters for progress ring (radius = 18, circumference = 2 * PI * 18 ~ 113.1)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8 select-none ${className}`}
      style={{ pointerEvents: 'none' }}
    >
      <button
        ref={buttonRef}
        id="back-to-top-button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Back to top of exhibition"
        title="Back to Top"
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FAF7F2]/90 hover:bg-[#FDFCFB] backdrop-blur-md border border-[#3D2B1F]/15 hover:border-[#3D2B1F]/35 text-[#3D2B1F] shadow-[0_8px_24px_rgba(61,43,31,0.08)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D2B1F]/40 cursor-pointer"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Subtle Radial Yarn Ring Background */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1"
          viewBox="0 0 44 44"
          aria-hidden="true"
        >
          {/* Subtle Background Track */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="#3D2B1F"
            strokeOpacity="0.08"
            strokeWidth="1.5"
          />
          {/* Active Scroll Progress Ring */}
          <circle
            ref={ringRef}
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="#3D2B1F"
            strokeOpacity="0.75"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-150 ease-out"
          />
        </svg>

        {/* Central Upward Icon */}
        <ArrowUp
          ref={arrowRef}
          size={16}
          strokeWidth={2}
          className="relative z-10 transition-colors group-hover:text-[#3D2B1F]"
          aria-hidden="true"
        />

        {/* Subtle Hover Tooltip Badge */}
        <div
          className={`absolute bottom-full mb-2.5 px-2.5 py-1 rounded-full bg-[#3D2B1F] text-[#FAF7F2] text-[9px] uppercase tracking-[0.25em] font-medium whitespace-nowrap shadow-md pointer-events-none transition-all duration-200 ${
            isHovered ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-1'
          }`}
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          Top
        </div>
      </button>
    </div>
  );
};

export default BackToTop;
