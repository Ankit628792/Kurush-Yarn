import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero/Hero';
import { ProductGallery } from '../components/ProductGallery/ProductGallery';
import { MaterialStory } from '../components/MaterialStory/MaterialStory';
import { ProcessSection } from '../components/Process/ProcessSection';
import { AtelierSection } from '../components/Atelier/AtelierSection';
import { Product } from '../types/product';
import { usePageSEO } from '../hooks/useSEO';
import { useGalleryWalkthroughAnimation } from '../hooks/useGalleryWalkthroughAnimation';

interface HomePageProps {
  introFinished: boolean;
  savedProductIds: string[];
  onToggleSave: (id: string) => void;
  onActiveSectionChange?: (section: string) => void;
  onOpenInquiry?: (product?: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  introFinished,
  savedProductIds,
  onToggleSave,
  onActiveSectionChange,
  onOpenInquiry
}) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for SEO and navigation highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'works', 'material', 'process', 'atelier'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            onActiveSectionChange?.(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onActiveSectionChange]);

  // Dynamic SEO for active section on home page
  usePageSEO({ route: 'home', section: activeSection });

  // GSAP walkthrough animation for home exhibition sections
  useGalleryWalkthroughAnimation({ enabled: introFinished, currentRoute: 'home' });

  const handleSelectProduct = (product: Product) => {
    navigate(`/product/${product.slug}`);
  };

  const handleExploreClick = () => {
    const el = document.getElementById('works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/works');
    }
  };

  const handleMaterialClick = () => {
    const el = document.getElementById('material');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/material');
    }
  };

  return (
    <>
      <Hero
        onExploreClick={handleExploreClick}
        onSelectProduct={handleSelectProduct}
        onMaterialClick={handleMaterialClick}
        introFinished={introFinished}
      />

      <ProductGallery
        onSelectProduct={handleSelectProduct}
        savedProductIds={savedProductIds}
        onToggleSave={onToggleSave}
        onOpenInquiry={onOpenInquiry}
      />

      <MaterialStory />

      <ProcessSection />

      <AtelierSection />
    </>
  );
};
