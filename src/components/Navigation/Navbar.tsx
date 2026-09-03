import React, { useState, useEffect } from 'react';
import { Logo } from '../Brand/Logo';
import { Menu, X, Sparkles, Heart } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenInquiry: () => void;
  activeSection: string;
  savedCount: number;
  onOpenSaved: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenInquiry,
  activeSection,
  savedCount,
  onOpenSaved
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'works', label: 'Work' },
    { id: 'material', label: 'Material' },
    { id: 'process', label: 'Process' },
    { id: 'atelier', label: 'About' }
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FDFCFB]/90 backdrop-blur-md border-b border-[#3D2B1F]/10 py-4 shadow-[0_4px_20px_rgba(61,43,31,0.03)]'
          : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Stamp & Name matching Bold Typography */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <Logo size="sm" />
          <div className="flex flex-col">
            <span className="text-xs tracking-[0.3em] font-bold uppercase text-[#3D2B1F]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              Kurush Yarn
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-[10px] tracking-[0.2em] font-medium uppercase" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`transition-all duration-300 py-1 relative ${
                activeSection === link.id
                  ? 'text-[#3D2B1F] font-bold opacity-100'
                  : 'text-[#3D2B1F]/70 hover:opacity-100 hover:text-[#3D2B1F]'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#3D2B1F]" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Utility Buttons */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Saved Pieces / Favorite Works */}
          <button
            onClick={onOpenSaved}
            className="relative p-2.5 rounded-full text-[#3D2B1F] hover:bg-[#3D2B1F]/5 transition-all flex items-center justify-center group"
            title="Favorite Exhibition Works"
            aria-label="View saved favorite exhibition works"
          >
            <Heart
              size={18}
              className={`transition-all duration-300 ${
                savedCount > 0
                  ? 'fill-[#3D2B1F] text-[#3D2B1F] scale-105'
                  : 'text-[#3D2B1F] group-hover:scale-110'
              }`}
            />
            {savedCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#3D2B1F] text-[#FDFCFB] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm animate-in zoom-in-50 duration-200">
                {savedCount}
              </span>
            )}
          </button>

          {/* Inquire CTA Button */}
          <button
            onClick={onOpenInquiry}
            className="hidden sm:inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] bg-[#3D2B1F] hover:bg-[#3D2B1F]/85 text-[#FDFCFB] px-5 py-2.5 rounded-full transition-all duration-300 font-medium shadow-sm cursor-pointer"
          >
            <span>Inquire</span>
            <Sparkles size={11} className="opacity-80" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#3D2B1F] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFCFB] border-b border-[#3D2B1F]/15 px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left text-xs uppercase tracking-[0.2em] py-2.5 border-b border-[#3D2B1F]/10 ${
                  activeSection === link.id ? 'text-[#3D2B1F] font-bold' : 'text-[#3D2B1F]/70'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Mobile Saved Favorites Shortcut */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSaved();
              }}
              className="flex items-center justify-between py-2.5 border-b border-[#3D2B1F]/10 text-xs uppercase tracking-[0.2em] text-[#3D2B1F]"
            >
              <div className="flex items-center gap-2 font-medium">
                <Heart size={14} className={savedCount > 0 ? 'fill-[#3D2B1F]' : ''} />
                <span>Saved Favorites</span>
              </div>
              <span className="bg-[#3D2B1F]/10 text-[#3D2B1F] text-[10px] px-2 py-0.5 rounded-full font-bold">
                {savedCount}
              </span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="mt-2 text-center text-[10px] uppercase tracking-[0.2em] bg-[#3D2B1F] text-[#FDFCFB] py-3.5 rounded-full font-medium cursor-pointer"
            >
              Inquire
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
