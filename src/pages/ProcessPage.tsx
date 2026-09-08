import React from 'react';
import { Link } from 'react-router-dom';
import { ProcessSection } from '../components/Process/ProcessSection';
import { usePageSEO } from '../hooks/useSEO';
import { ChevronRight, ArrowUpRight, Sparkles, Clock, Compass, ShieldCheck } from 'lucide-react';

export const ProcessPage: React.FC = () => {
  usePageSEO({ section: 'process' });

  const craftMetrics = [
    {
      metric: '6–18',
      unit: 'Hours',
      label: 'Average Weave Time',
      detail: 'Each piece is hand-looped stitch by stitch with focused artisan patience.'
    },
    {
      metric: '1,200+',
      unit: 'Stitches',
      label: 'Average Stitch Count',
      detail: 'Calculated mathematical tensioning preventing distortion across decades.'
    },
    {
      metric: '0%',
      unit: 'Waste',
      label: 'Zero Scrap Guarantee',
      detail: 'Every strand is spun, blocked, and integrated without industrial off-cuts.'
    },
    {
      metric: '100%',
      unit: 'Organic',
      label: 'Combed Cotton & Wool',
      detail: 'Naturally biodegradable fibers safe for home air quality and tactile touch.'
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
          <span className="text-[#3D2B1F] font-semibold">The Craft Process</span>
        </nav>
      </div>

      {/* Process Section Content */}
      <ProcessSection />

      {/* Craft Metrics & Studio Standards */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        <div className="border-t border-[#3D2B1F]/15 pt-16">
          <div className="max-w-2xl mb-12">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4A373] font-semibold mb-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              Artisan Standards
            </div>
            <h2 className="font-editorial text-3xl md:text-4xl text-[#3D2B1F]" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              The Discipline of Human Hands
            </h2>
            <p className="text-sm text-[#3D2B1F]/70 font-sans leading-relaxed mt-2">
              Unlike automated loom production, every Kurush creation carries microscopic organic variations that authenticate genuine human handcraft.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {craftMetrics.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-[#3D2B1F]/10 shadow-sm space-y-2"
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-serif text-[#3D2B1F] font-bold">
                    {item.metric}
                  </span>
                  <span className="text-xs uppercase tracking-[0.15em] text-[#3D2B1F]/60 font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    {item.unit}
                  </span>
                </div>
                <div className="text-xs uppercase tracking-[0.15em] font-medium text-[#3D2B1F]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  {item.label}
                </div>
                <p className="text-xs text-[#3D2B1F]/70 leading-relaxed font-sans pt-1">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Explore Collection Link */}
          <div className="mt-16 text-center">
            <Link
              to="/works"
              className="inline-flex items-center gap-2 bg-[#3D2B1F] hover:bg-[#3D2B1F]/85 text-[#FDFCFB] px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-sm"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <span>Explore Handcrafted Pieces</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
