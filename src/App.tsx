import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollProgress } from './components/Navigation/ScrollProgress';
import { ScrollToTopOnRouteChange } from './components/Navigation/ScrollToTopOnRouteChange';
import { Navbar } from './components/Navigation/Navbar';
import { Footer } from './components/Footer/Footer';
import { YarnCursor } from './components/Cursor/YarnCursor';
import { CinematicIntro } from './components/Intro/CinematicIntro';
import { GalleryImagePreloader } from './components/ProductGallery/GalleryImagePreloader';
import { BackToTop } from './components/Navigation/BackToTop';
import { InstagramInquiryModal } from './components/Inquiry/instagram';
import { SavedDrawer } from './components/Common/SavedDrawer';
import { ErrorBoundary } from './components/Common/ErrorBoundary';
import { Product } from './types/product';
import { products } from './data/products';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { WorksPage } from './pages/WorksPage';
import { MaterialPage } from './pages/MaterialPage';
import { ProcessPage } from './pages/ProcessPage';
import { AboutPage } from './pages/AboutPage';
import { SavedPage } from './pages/SavedPage';
import { VisitorsPage } from './pages/VisitorsPage';
import { NotFoundPage } from './pages/NotFoundPage';

gsap.registerPlugin(ScrollTrigger);

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isVisitorsRoute =
    location.pathname.startsWith('/visitors') ||
    location.pathname.startsWith('/analytics') ||
    location.pathname.startsWith('/audience');

  const [introFinished, setIntroFinished] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const path = window.location.pathname;
    // Don't show intro when directly navigating to subpages or pieces
    if (path !== '/' && path !== '') return true;
    return sessionStorage.getItem('kurush_intro_viewed') === 'true';
  });

  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);
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

  // Handle legacy deep links: convert ?piece=... or ?product=... query parameters to /product/:slug route
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const pieceParam = searchParams.get('piece') || searchParams.get('product');
      if (pieceParam) {
        const found = products.find(
          (p) =>
            p.slug.toLowerCase() === pieceParam.toLowerCase() ||
            p.id.toLowerCase() === pieceParam.toLowerCase() ||
            p.number === pieceParam
        );
        if (found) {
          navigate(`/product/${found.slug}`, { replace: true });
          return;
        }
      }

      // Legacy route query params
      const routeParam = searchParams.get('route') || searchParams.get('view');
      if (routeParam === 'visitors' || routeParam === 'analytics') {
        navigate('/visitors', { replace: true });
        return;
      }
    } catch (e) {
      console.warn('Could not parse legacy query parameter', e);
    }
  }, [location.search, navigate]);

  // Global secret shortcut for atelier owner: Ctrl+Shift+A or Cmd+Shift+A
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isVisitorsRoute) {
          navigate('/');
        } else {
          navigate('/visitors');
        }
      }
    };
    window.addEventListener('keydown', handleGlobalShortcuts);
    return () => window.removeEventListener('keydown', handleGlobalShortcuts);
  }, [isVisitorsRoute, navigate]);

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

    if (inquiryOpen || savedDrawerOpen || !introFinished || isVisitorsRoute) {
      lenis.stop();
    } else {
      lenis.start();
      if (mainContainerRef.current && (document.activeElement === document.body || !document.activeElement)) {
        mainContainerRef.current.focus({ preventScroll: true });
      }
    }
  }, [inquiryOpen, savedDrawerOpen, introFinished, isVisitorsRoute]);

  // Keyboard navigation support for smooth scrolling (Arrow keys, PageUp/Down, Space, Home, End)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (inquiryOpen || savedDrawerOpen || !introFinished || isVisitorsRoute) {
        return;
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName.toUpperCase();
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || target.isContentEditable) {
          return;
        }
      }

      const lenis = lenisRef.current;
      if (!lenis) return;

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
        case ' ':
          if (!e.shiftKey) {
            e.preventDefault();
            lenis.scrollTo(lenis.scroll + pageScroll, { duration: 0.6 });
          }
          break;
        case 'PageUp':
          e.preventDefault();
          lenis.scrollTo(lenis.scroll - pageScroll, { duration: 0.6 });
          break;
        case 'Home':
          e.preventDefault();
          lenis.scrollTo(0, { duration: 0.8 });
          break;
        case 'End':
          e.preventDefault();
          lenis.scrollTo(document.body.scrollHeight, { duration: 0.8 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inquiryOpen, savedDrawerOpen, introFinished, isVisitorsRoute]);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'hero') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      return;
    }

    if (sectionId === 'works') {
      if (location.pathname === '/') {
        const el = document.getElementById('works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else navigate('/works');
      } else {
        navigate('/works');
      }
      return;
    }

    if (sectionId === 'material') {
      if (location.pathname === '/') {
        const el = document.getElementById('material');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else navigate('/material');
      } else {
        navigate('/material');
      }
      return;
    }

    if (sectionId === 'process') {
      if (location.pathname === '/') {
        const el = document.getElementById('process');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else navigate('/process');
      } else {
        navigate('/process');
      }
      return;
    }

    if (sectionId === 'atelier' || sectionId === 'about') {
      if (location.pathname === '/') {
        const el = document.getElementById('atelier');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else navigate('/about');
      } else {
        navigate('/about');
      }
      return;
    }

    if (sectionId === 'visitors' || sectionId === 'analytics') {
      navigate('/visitors');
      return;
    }
  };

  const handleToggleSave = (productId: string) => {
    setSavedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleOpenInquiry = (product?: Product) => {
    setInquiryProduct(product || null);
    setInquiryOpen(true);
  };

  const handleScrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 0.8 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleIntroComplete = () => {
    setIntroFinished(true);
    try {
      sessionStorage.setItem('kurush_intro_viewed', 'true');
    } catch {}
  };

  return (
    <div
      ref={mainContainerRef}
      id="main-container"
      tabIndex={-1}
      className="min-h-screen bg-[#FDFCFB] text-[#3D2B1F] relative flex flex-col justify-between selection:bg-[#3D2B1F] selection:text-[#FDFCFB] outline-none"
    >
      {/* Scroll restoration helper */}
      <ScrollToTopOnRouteChange />

      {/* Elegant Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Subtle Noise Canvas Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Trailing Yarn Cursor on Desktop */}
      <YarnCursor />

      {/* Background preloader for high-resolution textile imagery */}
      <GalleryImagePreloader />

      {/* Cinematic Intro (runs once on home page entry, skippable) */}
      {!introFinished && location.pathname === '/' && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* Global Navigation Bar */}
      {!isVisitorsRoute && (
        <Navbar
          onNavigate={handleNavigate}
          onOpenInquiry={() => handleOpenInquiry()}
          activeSection={activeSection}
          savedCount={savedProductIds.length}
          onOpenSaved={() => setSavedDrawerOpen(true)}
          introFinished={introFinished}
        />
      )}

      {/* Main Routed Content */}
      <main className="flex-grow">
        <Routes>
          {/* Home Exhibition Page */}
          <Route
            path="/"
            element={
              <HomePage
                introFinished={introFinished}
                savedProductIds={savedProductIds}
                onToggleSave={handleToggleSave}
                onActiveSectionChange={setActiveSection}
                onOpenInquiry={handleOpenInquiry}
              />
            }
          />

          {/* Dedicated Individual Product Detail Route Pages */}
          <Route
            path="/product/:slug"
            element={
              <ProductDetailPage
                savedProductIds={savedProductIds}
                onToggleSave={handleToggleSave}
                onOpenInquiry={handleOpenInquiry}
              />
            }
          />

          {/* Alias /piece/:slug */}
          <Route
            path="/piece/:slug"
            element={
              <ProductDetailPage
                savedProductIds={savedProductIds}
                onToggleSave={handleToggleSave}
                onOpenInquiry={handleOpenInquiry}
              />
            }
          />

          {/* Dedicated Collection & Archive Routes */}
          <Route
            path="/works"
            element={
              <WorksPage
                savedProductIds={savedProductIds}
                onToggleSave={handleToggleSave}
                onOpenInquiry={handleOpenInquiry}
              />
            }
          />
          <Route
            path="/gallery"
            element={
              <WorksPage
                savedProductIds={savedProductIds}
                onToggleSave={handleToggleSave}
                onOpenInquiry={handleOpenInquiry}
              />
            }
          />
          <Route
            path="/collection"
            element={
              <WorksPage
                savedProductIds={savedProductIds}
                onToggleSave={handleToggleSave}
                onOpenInquiry={handleOpenInquiry}
              />
            }
          />

          {/* Dedicated Material Story Route */}
          <Route path="/material" element={<MaterialPage />} />

          {/* Dedicated Craft Process Route */}
          <Route path="/process" element={<ProcessPage />} />

          {/* Dedicated Atelier & Philosophy Routes */}
          <Route
            path="/about"
            element={<AboutPage onOpenInquiry={() => handleOpenInquiry()} />}
          />
          <Route
            path="/atelier"
            element={<AboutPage onOpenInquiry={() => handleOpenInquiry()} />}
          />

          {/* Dedicated Saved Favorites Route */}
          <Route
            path="/saved"
            element={
              <SavedPage
                savedProductIds={savedProductIds}
                onToggleSave={handleToggleSave}
                onOpenInquiry={handleOpenInquiry}
              />
            }
          />

          {/* Dedicated Visitors & Analytics Intelligence Route */}
          <Route path="/visitors" element={<VisitorsPage />} />
          <Route path="/analytics" element={<VisitorsPage />} />

          {/* 404 Not Found Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global Exhibition Footer (hidden on analytics dashboard) */}
      {!isVisitorsRoute && (
        <Footer
          onNavigate={handleNavigate}
          onOpenInquiry={() => handleOpenInquiry()}
          onOpenAnalytics={() => navigate('/visitors')}
        />
      )}

      {/* Floating Back to Top Button */}
      {introFinished && !isVisitorsRoute && (
        <BackToTop onScrollToTop={handleScrollToTop} />
      )}

      {/* Saved Collection Pieces Quick Drawer */}
      <SavedDrawer
        isOpen={savedDrawerOpen}
        onClose={() => setSavedDrawerOpen(false)}
        savedIds={savedProductIds}
        onToggleSave={handleToggleSave}
        onSelectProduct={(p) => {
          setSavedDrawerOpen(false);
          navigate(`/product/${p.slug}`);
        }}
        onOpenInquiry={() => {
          setSavedDrawerOpen(false);
          handleOpenInquiry();
        }}
        onExploreWorks={() => {
          setSavedDrawerOpen(false);
          navigate('/works');
        }}
      />

      {/* Instagram Inquiry & Bespoke Acquisition Modal */}
      <InstagramInquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        selectedProduct={inquiryProduct}
        savedProducts={products.filter((p) => savedProductIds.includes(p.id))}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
