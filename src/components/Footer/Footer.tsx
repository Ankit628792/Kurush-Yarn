import React from 'react';
import { Logo } from '../Brand/Logo';
import { siteContent } from '../../data/content';
import { ArrowUp, Instagram, ArrowUpRight, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInquiry }) => {
  const footer = siteContent.footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#3D2B1F] text-[#FDFCFB] pt-24 pb-12 px-6 md:px-12 overflow-hidden select-none border-t border-white/10">
      {/* Decorative Large Background Circular Motif Ring */}
      <div className="absolute -bottom-48 -right-48 w-96 h-96 md:w-[600px] md:h-[600px] rounded-full border border-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Big Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end border-b border-white/10 pb-16">
          <div className="lg:col-span-8 space-y-4">
            <span
              className="text-[10px] uppercase tracking-[0.3em] text-[#D4A373] font-semibold block"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Kurush Yarn Manifesto
            </span>
            <h2
              className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FDFCFB] tracking-tight leading-[0.95]"
              style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
            >
              {footer.statementLine1}{' '}
              <span className="italic font-normal text-[#D4A373] block sm:inline">
                {footer.statementLine2}
              </span>
            </h2>
            <p className="text-[#FDFCFB]/75 text-base md:text-lg max-w-xl pt-2 italic">
              {footer.subtext}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
            <button
              onClick={onOpenInquiry}
              className="bg-[#FDFCFB] hover:bg-[#D4A373] text-[#3D2B1F] py-4 px-8 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <span>Commission via Instagram</span>
              <Sparkles size={13} />
            </button>

            <button
              onClick={scrollToTop}
              className="border border-white/20 hover:border-white text-[#FDFCFB] py-4 px-8 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <span>Return to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>

        {/* Navigation & Instagram Studio Channel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Logo & Info */}
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div>
                <span
                  className="font-editorial text-2xl text-[#FDFCFB] block tracking-tight"
                  style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
                >
                  KURUSH YARN
                </span>
                <span
                  className="text-[9px] uppercase tracking-[0.25em] text-[#D4A373] font-semibold"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                  Craft Atelier &amp; Exhibition
                </span>
              </div>
            </div>
            <p className="text-xs text-[#FDFCFB]/70 leading-relaxed max-w-xs font-sans">
              Handcrafted textile sculptures, floral botanicals, and bespoke tactile adornments.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-4">
            <span
              className="text-[10px] uppercase tracking-[0.25em] text-[#D4A373] font-semibold block"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Exhibition Navigation
            </span>
            <div
              className="grid grid-cols-2 gap-2.5 text-[11px] text-[#FDFCFB]/80 uppercase tracking-[0.2em] font-medium"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <button
                onClick={() => onNavigate('works')}
                className="text-left hover:text-[#D4A373] transition-colors py-1"
              >
                All Works
              </button>
              <button
                onClick={() => onNavigate('material')}
                className="text-left hover:text-[#D4A373] transition-colors py-1"
              >
                Material Story
              </button>
              <button
                onClick={() => onNavigate('process')}
                className="text-left hover:text-[#D4A373] transition-colors py-1"
              >
                Atelier Process
              </button>
              <button
                onClick={() => onNavigate('atelier')}
                className="text-left hover:text-[#D4A373] transition-colors py-1"
              >
                Philosophy
              </button>
            </div>
          </div>

          {/* Exclusive Contact via Instagram Channel */}
          <div className="md:col-span-4 space-y-4">
            <span
              className="text-[10px] uppercase tracking-[0.25em] text-[#D4A373] font-semibold block"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Studio Contact Medium
            </span>
            <p className="text-xs text-[#FDFCFB]/75 font-sans leading-relaxed">
              We communicate and accept all custom inquiries, acquisitions, and commissions exclusively via Instagram Direct Message.
            </p>

            <a
              href={footer.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#D4A373] rounded-2xl flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/10 group-hover:bg-[#D4A373] group-hover:text-[#3D2B1F] transition-colors">
                  <Instagram size={18} />
                </div>
                <div>
                  <span
                    className="text-xs font-semibold text-white block"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    {footer.instagramHandle}
                  </span>
                  <span className="text-[10px] text-[#D4A373] block">
                    Direct Atelier Messages
                  </span>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-white/60 group-hover:text-[#D4A373] transition-colors" />
            </a>
          </div>
        </div>

        {/* Bottom Legal & Provenance */}
        <div
          className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-wider text-[#FDFCFB]/50"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          <div>
            © {new Date().getFullYear()} Kurush Yarn Atelier. All rights reserved. Handcrafted with devotion.
          </div>
          <div className="flex items-center gap-2">
            <span>Contact Medium:</span>
            <a
              href={footer.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4A373] hover:underline font-semibold"
            >
              {footer.instagramHandle} on Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
