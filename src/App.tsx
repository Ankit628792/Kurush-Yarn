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
import { WhatsAppInquiryModal } from './components/Inquiry/whatsapp';
import { VisitorsAnalyticsView } from './components/Analytics/VisitorsAnalyticsView';
import { AtelierPasskeyGate } from './components/Analytics/AtelierPasskeyGate';
import { SavedDrawer } from './components/Common/SavedDrawer';
import { ErrorBoundary } from './components/Common/ErrorBoundary';
import { useSEO } from './hooks/useSEO';
import { Product } from './types/product';
import { products } from './data/products';
import { analyticsTracker } from './utils/analyticsTracker';

gsap.registerPlugin(ScrollTrigger);

const isVisitorsRoute = (): boolean => {
  if (typeof window === 'undefined') return false;
  const path = (window.location.pathname || '').toLowerCase();
  const search = new URLSearchParams(window.location.search);
  const hash = (window.location.hash || '').toLowerCase();
  return (
    path.startsWith('/visitors') ||
    path.startsWith('/analytics') ||
    path.startsWith('/audience') ||
    search.get('route') === 'visitors' ||
    search.get('route') === 'analytics' ||
    search.get('view') === 'visitors' ||
    search.get('view') === 'analytics' ||
    hash === '#visitors' ||
    hash === '#analytics'
  );
};

const checkInitialAuth = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    if (sessionStorage.getItem('kurush_analytics_auth') === 'unlocked') return true;
    const search = new URLSearchParams(window.location.search);
    const key = (search.get('key') || search.get('admin') || search.get('pass') || '').toLowerCase();
    return ['kurush', '879664', '8796645605', 'atelier', 'ankit'].includes(key);
  } catch {
    return false;
  }
};

const AppContent: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'visitors'>(() =>
    isVisitorsRoute() ? 'visitors' : 'home'
  );
  const [isAnalyticsUnlocked, setIsAnalyticsUnlocked] = useState<boolean>(() => checkInitialAuth());
  const [introFinished, setIntroFinished] = useState(() => isVisitorsRoute());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [savedProductIds, setSavedProductIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('kurush_saved_pieces');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Handle browser popstate (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const isVis = isVisitorsRoute();
      setCurrentRoute(isVis ? 'visitors' : 'home');
      if (isVis) {
        setIntroFinished(true);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Track product views for audience and catalog intelligence
  useEffect(() => {
    if (selectedProduct) {
      analyticsTracker.trackProductView(selectedProduct);
    }
  }, [selectedProduct]);

  // Global secret shortcut for atelier owner: Ctrl+Shift+A or Cmd+Shift+A
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setCurrentRoute((prev) => {
          const next = prev === 'visitors' ? 'home' : 'visitors';
          if (next === 'visitors') {
            setIntroFinished(true);
            try {
              window.history.pushState({ route: 'visitors' }, '', '/visitors');
            } catch {
              window.location.hash = 'visitors';
            }
          } else {
            try {
              window.history.pushState(null, '', '/');
            } catch {
              window.location.hash = '';
            }
          }
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleGlobalShortcuts);
    return () => window.removeEventListener('keydown', handleGlobalShortcuts);
  }, []);

  const navigateToRoute = (route: 'home' | 'visitors') => {
    setCurrentRoute(route);
    if (route === 'visitors') {
      setSelectedProduct(null);
      setIntroFinished(true);
      try {
        window.history.pushState({ route: 'visitors' }, '', '/visitors');
      } catch {
        // Fallback for sandboxed history
        window.location.hash = 'visitors';
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      try {
        window.history.pushState(null, '', '/');
      } catch {
        window.location.hash = '';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Deep-link initial resolver: Check URL parameters or hash on mount for shared piece
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const pieceParam = searchParams.get('piece') || searchParams.get('product');
      const hash = window.location.hash.replace(/^#piece-|^#/, '');

      const targetIdentifier = pieceParam || hash;
      if (targetIdentifier) {
        const found = products.find(
          (p) =>
            p.slug.toLowerCase() === targetIdentifier.toLowerCase() ||
            p.id.toLowerCase() === targetIdentifier.toLowerCase() ||
            p.number === targetIdentifier
        );
        if (found) {
          setSelectedProduct(found);
          setIntroFinished(true); // Directly open piece view for shared visitors
        }
      }
    } catch (e) {
      console.warn('Could not parse initial deep link', e);
    }
  }, []);

  // Synchronize active product in browser address bar without reload
  useEffect(() => {
    try {
      if (selectedProduct) {
        const newUrl = `${window.location.pathname}?piece=${selectedProduct.slug}`;
        window.history.replaceState({ piece: selectedProduct.slug }, '', newUrl);
      } else {
        // Only clear piece query param if no product is active
        const url = new URL(window.location.href);
        if (url.searchParams.has('piece') || url.searchParams.has('product')) {
          url.searchParams.delete('piece');
          url.searchParams.delete('product');
          const cleanUrl = url.pathname + (url.search ? url.search : '') + url.hash;
          window.history.replaceState(null, '', cleanUrl || '/');
        }
      }
    } catch {
      // ignore in environments without history api
    }
  }, [selectedProduct]);

  // Persist saved collection pieces
  useEffect(() => {
    try {
      localStorage.setItem('kurush_saved_pieces', JSON.stringify(savedProductIds));
    } catch {
      // ignore
    }
  }, [savedProductIds]);

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

    if (selectedProduct || inquiryOpen || savedDrawerOpen || !introFinished || currentRoute === 'visitors') {
      lenis.stop();
    } else {
      lenis.start();
      // Ensure focus is restored to the main container
      if (mainContainerRef.current && (document.activeElement === document.body || !document.activeElement)) {
        mainContainerRef.current.focus({ preventScroll: true });
      }
    }
  }, [selectedProduct, inquiryOpen, savedDrawerOpen, introFinished, currentRoute]);

  // Full keyboard navigation support for smooth scrolling (Arrow keys, PageUp/Down, Space, Home, End)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If a modal or drawer is open, or intro is showing, or on analytics route, allow native keydown
      if (selectedProduct || inquiryOpen || savedDrawerOpen || !introFinished || currentRoute === 'visitors') {
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

  if (currentRoute === 'visitors') {
    return (
      <div
        id="visitors-analytics-viewport"
        className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[#FAF7F2] text-[#3D2B1F] selection:bg-[#3D2B1F] selection:text-[#FAF7F2]"
        data-lenis-prevent="true"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}
      >
        {/* Subtle Noise Canvas Overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Trailing Yarn Cursor on Desktop */}
        <YarnCursor />

        {!isAnalyticsUnlocked ? (
          <AtelierPasskeyGate
            onUnlock={() => setIsAnalyticsUnlocked(true)}
            onReturnHome={() => navigateToRoute('home')}
          />
        ) : (
          <ErrorBoundary isolateSection sectionName="Visitors & Acquisition Intelligence">
            <VisitorsAnalyticsView
              onBackToCatalog={() => navigateToRoute('home')}
              onLock={() => {
                try {
                  sessionStorage.removeItem('kurush_analytics_auth');
                } catch {}
                setIsAnalyticsUnlocked(false);
              }}
              onSelectProduct={(slug) => {
                const target = products.find((p) => p.slug === slug || p.id === slug);
                if (target) {
                  setSelectedProduct(target);
                  navigateToRoute('home');
                }
              }}
            />
          </ErrorBoundary>
        )}
      </div>
    );
  }

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
        onOpenAnalytics={() => navigateToRoute('visitors')}
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
        onExploreWorks={() => {
          setSavedDrawerOpen(false);
          handleNavigate('works');
        }}
      />

      {/* WhatsApp Inquiry & Bespoke Acquisition Modal */}
      <WhatsAppInquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        selectedProduct={selectedProduct}
        savedProducts={products.filter((p) => savedProductIds.includes(p.id))}
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
