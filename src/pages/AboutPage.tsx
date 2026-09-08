import React from 'react';
import { Link } from 'react-router-dom';
import { AtelierSection } from '../components/Atelier/AtelierSection';
import { usePageSEO } from '../hooks/useSEO';
import { ChevronRight, ArrowUpRight, Sparkles, MapPin, HeartHandshake, Eye } from 'lucide-react';

interface AboutPageProps {
  onOpenInquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenInquiry }) => {
  usePageSEO({ section: 'about' });

  const values = [
    {
      icon: <HeartHandshake size={20} />,
      title: 'Ancestral Needlecraft',
      description:
        'Honoring generations of crochet and fiber tradition through contemporary geometric forms and mindful cadence.'
    },
    {
      icon: <Eye size={20} />,
      title: 'Micro-Detail Precision',
      description:
        'Every petal edge, stamen filament, and stem wire is measured down to the millimeter for botanical fidelity.'
    },
    {
      icon: <Sparkles size={20} />,
      title: 'Slow Living Antidote',
      description:
        'In an age of digital haste and synthetic fast decor, we offer permanent, tactile warmth crafted to be held.'
    }
  ];

  return (
    <div className="pt-28 md:pt-36 pb-24 text-[#3D2B1F]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 mb-8 font-medium" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <Link to="/" className="hover:text-[#3D2B1F] transition-colors">
            Atelier Home
          </Link>
          <ChevronRight size={12} className="opacity-40" />
          <span className="text-[#3D2B1F] font-semibold">About the Atelier</span>
        </nav>
      </div>

      {/* Atelier Section Content */}
      <AtelierSection />

      {/* Philosophy Values Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20 border-b border-[#3D2B1F]/15">
          {values.map((val, idx) => (
            <div key={idx} className="space-y-3 bg-white p-8 rounded-2xl border border-[#3D2B1F]/10 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#3D2B1F]/5 text-[#3D2B1F] flex items-center justify-center">
                {val.icon}
              </div>
              <h3 className="font-editorial text-2xl text-[#3D2B1F]" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
                {val.title}
              </h3>
              <p className="text-xs text-[#3D2B1F]/75 leading-relaxed font-sans">
                {val.description}
              </p>
            </div>
          ))}
        </div>

        {/* Studio & Bespoke Consultation */}
        <div className="pt-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#D4A373] font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              <MapPin size={12} />
              <span>Studio &amp; Exhibition Workshop</span>
            </div>
            <h2 className="font-editorial text-3xl md:text-4xl text-[#3D2B1F]" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              Bespoke Commissions &amp; Private Viewing
            </h2>
            <p className="text-xs text-[#3D2B1F]/70 font-sans leading-relaxed">
              We welcome custom floral installations, interior styling consultations, and individual heirloom commissions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onOpenInquiry}
              className="bg-[#3D2B1F] hover:bg-[#3D2B1F]/85 text-[#FDFCFB] px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-sm cursor-pointer whitespace-nowrap"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Consult the Atelier
            </button>
            <Link
              to="/works"
              className="border border-[#3D2B1F]/20 hover:bg-[#3D2B1F]/5 text-[#3D2B1F] px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all whitespace-nowrap"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Explore Archive
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
