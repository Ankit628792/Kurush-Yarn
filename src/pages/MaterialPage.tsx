import React from 'react';
import { Link } from 'react-router-dom';
import { MaterialStory } from '../components/MaterialStory/MaterialStory';
import { usePageSEO } from '../hooks/useSEO';
import { ChevronRight, Feather, Sparkles, Compass, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const MaterialPage: React.FC = () => {
  usePageSEO({ section: 'material' });

  const fiberSpecs = [
    {
      title: 'Combed Mercerized Cotton',
      origin: 'Long-staple organic harvest',
      ply: '4-Ply tightly spun filament',
      properties: 'Zero fraying, silky structural sheen, crisp petal definition.',
      care: 'Resistant to natural fading and electrostatic dust attraction.'
    },
    {
      title: 'Ethical Merino Wool Roving',
      origin: 'Cruelty-free pasture flocks',
      ply: '2-Ply brushed ultra-fine gauge',
      properties: 'Warm cloud-soft tactile loft, elastic recovery under tension.',
      care: 'Naturally resilient, self-cleansing fiber structure.'
    },
    {
      title: 'Natural Botanical Pigments',
      origin: 'Plant roots, marigold, indigo & walnut husks',
      ply: 'Small-batch artisanal kettle dip',
      properties: 'Rich nuanced earthen gradations that mature gracefully with age.',
      care: 'Non-toxic, safe for gentle handling and interior longevity.'
    },
    {
      title: 'Japanese Bamboo Needles & Hooks',
      origin: 'Aged moso bamboo from Kyoto',
      ply: 'Hand-polished 1.75mm to 3.0mm tips',
      properties: 'Imparts gentle organic micro-friction for flawless stitch tensioning.',
      care: 'Naturally conditioned with pure camellia seed oil.'
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
          <span className="text-[#3D2B1F] font-semibold">Material Provenance</span>
        </nav>

        {/* Hero Section Banner */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#3D2B1F]/60 font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <span>Material Story</span>
            <span className="w-6 h-px bg-[#3D2B1F]/30" />
            <span>Tactile Provenance</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#3D2B1F] tracking-tight leading-none" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
            The Architecture of Fiber
          </h1>
          <p className="text-[#3D2B1F]/75 text-base md:text-lg leading-relaxed font-serif italic">
            Before a single loop forms a petal, our discipline begins in the soil, the pasture, and the spool.
          </p>
        </div>
      </div>

      {/* Interactive Material Story Visualizer */}
      <MaterialStory />

      {/* Deep Dive Fiber Specifications */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20">
        <div className="border-t border-[#3D2B1F]/15 pt-16">
          <div className="max-w-2xl mb-12">
            <h2 className="font-editorial text-3xl md:text-4xl text-[#3D2B1F] mb-3" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              Raw Fiber Provenance
            </h2>
            <p className="text-sm text-[#3D2B1F]/70 font-sans leading-relaxed">
              Every spool that enters Kurush Atelier is tested for tactile memory, tensile cohesion, and ethical sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fiberSpecs.map((spec, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-[#3D2B1F]/10 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-full bg-[#3D2B1F]/5 flex items-center justify-center text-[#3D2B1F]">
                    <Feather size={16} />
                  </div>
                  <h3 className="font-editorial text-xl text-[#3D2B1F]" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
                    {spec.title}
                  </h3>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#D4A373] font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    {spec.origin}
                  </div>
                  <p className="text-xs text-[#3D2B1F]/75 leading-relaxed">
                    {spec.properties}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#3D2B1F]/10 text-[11px] text-[#3D2B1F]/60 italic font-serif">
                  {spec.care}
                </div>
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
              <span>Explore Pieces Woven With These Fibers</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
