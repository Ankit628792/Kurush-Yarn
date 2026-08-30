import React, { useState, useEffect } from 'react';
import { Logo } from '../Brand/Logo';
import { useMotion } from '../../context/MotionContext';
import { Menu, X, Sparkles, ShoppingBag, Volume2, VolumeX, Eye, EyeOff } from 'lucide-react';

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
  const [soundEnabled, setSoundEnabled] = useState(false);
  const { reducedMotion, toggleReducedMotion } = useMotion();

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

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
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
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#3D2B1F]/50 font-medium">
              Atelier 2024–2025
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

        {/* Right Status & Utility Buttons */}
        <div className="flex items-center gap-4">
          {/* Production Status indicator from design */}
          <div className="hidden lg:flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-[#3D2B1F]/70 border-r border-[#3D2B1F]/15 pr-4">
            <div className="w-1.5 h-1.5 bg-[#D4A373] rounded-full animate-pulse"></div>
            <span className="font-medium text-[#3D2B1F]">Atelier Active</span>
          </div>

          {/* Reduced Motion Toggle Button */}
          <button
            type="button"
            onClick={toggleReducedMotion}
            aria-pressed={reducedMotion}
            title={reducedMotion ? 'Reduced Motion: ON (Click to enable animations)' : 'Reduced Motion: OFF (Click to reduce animations)'}
            aria-label={reducedMotion ? 'Enable animations' : 'Reduce motion and simplify animations'}
            className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
              reducedMotion
                ? 'bg-[#3D2B1F] text-[#FDFCFB] shadow-sm'
                : 'text-[#3D2B1F]/60 hover:text-[#3D2B1F] hover:bg-[#3D2B1F]/5'
            }`}
          >
            {reducedMotion ? <EyeOff size={15} /> : <Eye size={15} />}
            <span className="sr-only">
              {reducedMotion ? 'Reduced motion active' : 'Full motion active'}
            </span>
          </button>

          {/* Ambient Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute atelier ambiance' : 'Listen to atelier ambiance'}
            className="p-2 rounded-full text-[#3D2B1F]/60 hover:text-[#3D2B1F] hover:bg-[#3D2B1F]/5 transition-colors hidden sm:flex items-center justify-center"
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Saved Pieces / Exhibition Wishlist */}
          <button
            onClick={onOpenSaved}
            className="relative p-2 rounded-full text-[#3D2B1F] hover:bg-[#3D2B1F]/5 transition-colors flex items-center justify-center"
            title="Saved Exhibition Works"
          >
            <ShoppingBag size={16} />
            {savedCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#3D2B1F] text-[#FDFCFB] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* Inquire CTA Button */}
          <button
            onClick={onOpenInquiry}
            className="hidden sm:inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] bg-[#3D2B1F] hover:bg-[#3D2B1F]/85 text-[#FDFCFB] px-5 py-2.5 rounded-full transition-all duration-300 font-medium shadow-sm"
          >
            <span>Instagram / Inquire</span>
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
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#3D2B1F]/70 py-2 border-b border-[#3D2B1F]/10">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-[#D4A373] rounded-full"></div>
                <span>Atelier Active</span>
              </div>
              <button
                type="button"
                onClick={toggleReducedMotion}
                className="flex items-center gap-1.5 text-[9px] font-semibold uppercase px-2.5 py-1 rounded-full border border-[#3D2B1F]/20 text-[#3D2B1F]"
              >
                {reducedMotion ? <EyeOff size={12} /> : <Eye size={12} />}
                <span>{reducedMotion ? 'Reduced Motion' : 'Full Motion'}</span>
              </button>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="mt-2 text-center text-[10px] uppercase tracking-[0.2em] bg-[#3D2B1F] text-[#FDFCFB] py-3.5 rounded-full font-medium"
            >
              Inquire via Instagram (@kurush.yarn)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
