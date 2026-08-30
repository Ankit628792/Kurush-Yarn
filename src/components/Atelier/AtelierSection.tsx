import React from 'react';
import { siteContent } from '../../data/content';
import { LazyImage } from '../Common/LazyImage';
import { Sparkles } from 'lucide-react';

export const AtelierSection: React.FC = () => {
  const atelier = siteContent.atelier;

  return (
    <section id="atelier" className="py-24 md:py-32 px-6 md:px-12 bg-[#3D2B1F] text-[#FDFCFB] select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7 space-y-3">
            <div
              className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#D4A373] font-semibold"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <span>04 / {atelier.title}</span>
              <span className="w-6 h-px bg-[#D4A373]/40" />
              <span>Philosophy</span>
            </div>

            <h2
              className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#FDFCFB] tracking-tight leading-none"
              style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
            >
              {atelier.heading}
            </h2>
          </div>

          <div className="lg:col-span-5 text-[#FDFCFB]/80 text-base md:text-lg leading-relaxed italic">
            <p>{atelier.description}</p>
          </div>
        </div>

        {/* Big Atelier Image & Quote Banner */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-[#3D2B1F] border border-white/15 shadow-2xl">
          <LazyImage
            src={atelier.image}
            alt="Kurush Yarn Craft Atelier"
            aspectRatio="aspect-[16/9] md:aspect-[21/9]"
            className="w-full h-full object-cover opacity-50"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F] via-[#3D2B1F]/40 to-transparent flex items-end p-8 md:p-14">
            <div className="max-w-2xl space-y-3">
              <blockquote
                className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[#FDFCFB] italic leading-snug"
                style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
              >
                "{atelier.quote}"
              </blockquote>
              <span
                className="text-[10px] uppercase tracking-[0.25em] text-[#D4A373] block font-semibold"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                — {atelier.author}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Atelier Pillars & Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
          {atelier.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-center sm:text-left backdrop-blur-sm"
            >
              <span
                className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#FDFCFB] block"
                style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
              >
                {stat.value}
              </span>
              <span
                className="text-[9px] uppercase tracking-[0.25em] text-[#D4A373] block font-semibold"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
