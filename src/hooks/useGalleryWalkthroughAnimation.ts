/**
 * Curated Gallery Walkthrough Section Animation Hook
 * 
 * Drives smooth, museum-grade GSAP entrance animations for each major
 * exhibition chamber as the user scrolls through the gallery.
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface GalleryWalkthroughOptions {
  enabled?: boolean;
  currentRoute?: string;
  selectedProduct?: unknown;
}

export function useGalleryWalkthroughAnimation({
  enabled = true,
  currentRoute = 'home',
  selectedProduct = null,
}: GalleryWalkthroughOptions = {}) {
  useEffect(() => {
    // Only active on client-side, on home route, and when not inspecting a piece modal
    if (typeof window === 'undefined' || !enabled || currentRoute !== 'home' || selectedProduct) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isReturningVisit = typeof window !== 'undefined' && sessionStorage.getItem('kurush_intro_viewed') === 'true';

    // Primary curated exhibition chambers in chronological walkthrough order
    const sectionIds = ['works', 'material', 'process', 'atelier', 'footer'];

    const ctx = gsap.context(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        if (prefersReducedMotion || isReturningVisit) {
          gsap.set(el, { opacity: 1, y: 0, clearProps: 'all' });
          return;
        }

        // Set initial state
        gsap.set(el, {
          opacity: 0,
          y: 44,
          willChange: 'opacity, transform',
        });

        // Create ScrollTrigger timeline for this exhibition section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true,
            onEnter: () => {
              el.setAttribute('data-gallery-revealed', 'true');
            },
          },
        });

        // 1. Fluid container reveal with luxurious ease
        tl.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.15,
          ease: 'power3.out',
          clearProps: 'transform,willChange',
        });

        // 2. Subtle internal focal point stagger (section heading & metadata badge)
        const header = el.querySelector('h2');
        const eyebrow = el.querySelector('.uppercase');
        const subtitle = el.querySelector('p');
        const focusElements = [eyebrow, header, subtitle].filter(Boolean) as HTMLElement[];

        if (focusElements.length > 0) {
          tl.fromTo(
            focusElements,
            {
              opacity: 0,
              y: 18,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.1,
              ease: 'power2.out',
              clearProps: 'transform',
            },
            '-=0.95' // Overlap smoothly with parent section reveal
          );
        }
      });

      // Recalculate ScrollTrigger metrics
      ScrollTrigger.refresh();
    });

    // Refresh after DOM and images settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [enabled, currentRoute, Boolean(selectedProduct)]);
}
