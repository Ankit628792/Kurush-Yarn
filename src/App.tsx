import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { MotionProvider, useReducedMotion } from './context/MotionContext';
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

const AppContent: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [savedProductIds, setSavedProductIds] = useState<string[]>(['product-01', 'product-07']);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const reducedMotion = useReducedMotion();

  // Initialize global SEO meta tags
  useSEO();

  // Initialize Lenis Smooth Scrolling only when reducedMotion is disabled
  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [reducedMotion]);

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
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
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
    <div className="min-h-screen bg-[#FDFCFB] text-[#3D2B1F] relative flex flex-col justify-between selection:bg-[#3D2B1F] selection:text-[#FDFCFB]">
      {/* Subtle Noise Canvas Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Trailing Yarn Cursor on Desktop (automatically simplified on reduced motion) */}
      <YarnCursor />

      {/* Cinematic Intro (runs once, instantly skippable or reduced on preference) */}
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
      <MotionProvider>
        <AppContent />
      </MotionProvider>
    </ErrorBoundary>
  );
};

export default App;
