import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollProgress } from './components/Navigation/ScrollProgress';
import { Navbar } from './components/Navigation/Navbar';
import { Hero } from './components/Hero/Hero';
import { ProductGallery } from './components/ProductGallery/ProductGallery';
import { MaterialStory } from './components/MaterialStory/MaterialStory';
import { ProcessSection } from './components/Process/ProcessSection';
import { AtelierSection } from './components/Atelier/AtelierSection';
import { Footer } from './components/Footer/Footer';
import { YarnCursor } from './components/Cursor/YarnCursor';
import { CinematicIntro } from './components/Intro/CinematicIntro';
import { ProductDetailView } from './components/ProductDetail/ProductDetailView';
import { InquiryModal } from './components/Common/InquiryModal';
import { SavedDrawer } from './components/Common/SavedDrawer';
import { ErrorBoundary } from './components/Common/ErrorBoundary';
import { useSEO } from './hooks/useSEO';
import { Product } from './types/product';

gsap.registerPlugin(ScrollTrigger);

const AppContent: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [savedProductIds, setSavedProductIds] = useState<string[]>(['product-01', 'product-07']);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const lenisRef = useRef<Lenis | null>(null);
  const mainContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize global SEO meta tags
  useSEO();

  // Initialize Lenis Smooth Scrolling with GSAP ScrollTrigger synchronization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: true,
      autoRaf: false
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Manage Lenis start/stop lifecycle based on active modal or intro states
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (selectedProduct || inquiryOpen || savedDrawerOpen || !introFinished) {
      lenis.stop();
    } else {
      lenis.start();
      // Ensure focus is restored to the main container
      if (mainContainerRef.current && (document.activeElement === document.body || !document.activeElement)) {
        mainContainerRef.current.focus({ preventScroll: true });
      }
    }
  }, [selectedProduct, inquiryOpen, savedDrawerOpen, introFinished]);

  // Full keyboard navigation support for smooth scrolling (Arrow keys, PageUp/Down, Space, Home, End)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If a modal or drawer is open, or intro is showing, allow native/modal keydown
      if (selectedProduct || inquiryOpen || savedDrawerOpen || !introFinished) {
        return;
      }

      // Do not intercept keyboard shortcuts if the user is typing in form inputs
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName.toUpperCase();
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || target.isContentEditable) {
          return;
        }
      }

      const lenis = lenisRef.current;
      if (!lenis) return;

      // Ensure main container maintains focus
      if (mainContainerRef.current && (document.activeElement === document.body || !document.activeElement)) {
        mainContainerRef.current.focus({ preventScroll: true });
      }

      const stepScroll = 120;
      const pageScroll = window.innerHeight * 0.85;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          lenis.scrollTo(lenis.scroll + stepScroll, { duration: 0.35 });
          break;
        case 'ArrowUp':
          e.preventDefault();
          lenis.scrollTo(lenis.scroll - stepScroll, { duration: 0.35 });
          break;
        case 'PageDown':
          e.preventDefault();
          lenis.scrollTo(lenis.scroll + pageScroll, { duration: 0.6 });
          break;
        case 'PageUp':
          e.preventDefault();
          lenis.scrollTo(lenis.scroll - pageScroll, { duration: 0.6 });
          break;
        case ' ': // Spacebar
          // If focused on a button or link, let standard button activation happen
          if (target && ['BUTTON', 'A'].includes(target.tagName.toUpperCase())) {
            return;
          }
          e.preventDefault();
          if (e.shiftKey) {
            lenis.scrollTo(lenis.scroll - pageScroll, { duration: 0.6 });
          } else {
            lenis.scrollTo(lenis.scroll + pageScroll, { duration: 0.6 });
          }
          break;
        case 'Home':
          e.preventDefault();
          lenis.scrollTo(0, { duration: 0.8 });
          break;
        case 'End':
          e.preventDefault();
          lenis.scrollTo(document.documentElement.scrollHeight, { duration: 0.8 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct, inquiryOpen, savedDrawerOpen, introFinished]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'works', 'material', 'process', 'atelier'];
      const scrollPos = window.scrollY + 200;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const lenis = lenisRef.current;
    const el = document.getElementById(sectionId);
    if (lenis && el) {
      lenis.scrollTo(el, { offset: -60, duration: 1.2 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSave = (productId: string) => {
    setSavedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleOpenInquiryForProduct = (product: Product) => {
    setSelectedProduct(product);
    setInquiryOpen(true);
  };

  return (
    <div
      ref={mainContainerRef}
      id="main-container"
      tabIndex={-1}
      className="min-h-screen bg-[#FDFCFB] text-[#3D2B1F] relative flex flex-col justify-between selection:bg-[#3D2B1F] selection:text-[#FDFCFB] outline-none"
    >
      {/* Elegant Scroll Progress Indicator in brand's muted chocolate (#3D2B1F) */}
      <ScrollProgress />

      {/* Subtle Noise Canvas Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Trailing Yarn Cursor on Desktop */}
      <YarnCursor />

      {/* Cinematic Intro (runs once, instantly skippable) */}
      {!introFinished && (
        <CinematicIntro onComplete={() => setIntroFinished(true)} />
      )}

      {/* Navigation Bar */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenInquiry={() => {
          setSelectedProduct(null);
          setInquiryOpen(true);
        }}
        activeSection={activeSection}
        savedCount={savedProductIds.length}
        onOpenSaved={() => setSavedDrawerOpen(true)}
      />

      {/* Main Content Sections with Isolated Error Boundaries */}
      <main className="flex-grow">
        {/* Section 01 & 02: Hero & 3D WebGL Canvas */}
        <ErrorBoundary isolateSection sectionName="Hero Stage">
          <Hero
            onExploreClick={() => handleNavigate('works')}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onMaterialClick={() => handleNavigate('material')}
          />
        </ErrorBoundary>

        {/* Section 04 & 05: Editorial Product Gallery */}
        <ErrorBoundary isolateSection sectionName="Artisan Product Gallery">
          <ProductGallery
            onSelectProduct={(p) => setSelectedProduct(p)}
            savedProductIds={savedProductIds}
            onToggleSave={handleToggleSave}
          />
        </ErrorBoundary>

        {/* Section 11: Material Transformation Canvas */}
        <ErrorBoundary isolateSection sectionName="Material Story Exhibition">
          <MaterialStory />
        </ErrorBoundary>

        {/* Section 12: Editorial Process Section */}
        <ErrorBoundary isolateSection sectionName="Atelier Craft Process">
          <ProcessSection />
        </ErrorBoundary>

        {/* Section 14: Atelier Philosophy & Metrics */}
        <ErrorBoundary isolateSection sectionName="Atelier Philosophy & Metrics">
          <AtelierSection />
        </ErrorBoundary>
      </main>

      {/* Section 20: Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenInquiry={() => {
          setSelectedProduct(null);
          setInquiryOpen(true);
        }}
      />

      {/* Cinematic Product Detail View Modal */}
      {selectedProduct && !inquiryOpen && (
        <ErrorBoundary isolateSection sectionName="Product Detail Modal">
          <ProductDetailView
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onInquire={handleOpenInquiryForProduct}
            isSaved={savedProductIds.includes(selectedProduct.id)}
            onToggleSave={handleToggleSave}
          />
        </ErrorBoundary>
      )}

      {/* Saved Collection Pieces Drawer */}
      <SavedDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
        savedIds={savedProductIds}
        onToggleSave={handleToggleSave}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setSavedDrawerOpen(false);
        }}
        onOpenInquiry={() => {
          setSavedDrawerOpen(false);
          setInquiryOpen(true);
        }}
      />

      {/* Inquiry & Bespoke Commission Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
};

export default App;
