import React from 'react';
import { siteContent } from '../../data/content';
import { LazyImage } from '../Common/LazyImage';
import { Compass, CheckCircle2 } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = siteContent.process.steps;

  return (
    <section id="process" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto text-[#3D2B1F]">
      {/* Section Header */}
      <div className="space-y-3 max-w-3xl pb-16">
        <div
          className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#3D2B1F]/60 font-semibold"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          <span>03 / Atelier Protocol</span>
          <span className="w-6 h-px bg-[#3D2B1F]/30" />
          <span>Handcraft Sequence</span>
        </div>

        <h2
          className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#3D2B1F] tracking-tight leading-none"
          style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
        >
          {siteContent.process.title}
        </h2>

        <p className="text-[#3D2B1F]/75 text-base md:text-lg leading-relaxed italic">
          {siteContent.process.subtitle}
        </p>
      </div>

      {/* Sequential Process Cards */}
      <div className="space-y-16">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={step.number}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Image Column */}
              <div
                className={`lg:col-span-6 ${
                  isEven ? 'order-1' : 'order-1 lg:order-2'
                }`}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F7F5F2] border border-[#3D2B1F]/15 shadow-sm group hover:border-[#3D2B1F]/30 transition-all duration-300">
                  <LazyImage
                    src={step.image}
                    alt={step.headline}
                    aspectRatio="aspect-[4/3]"
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Step Watermark */}
                  <div
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] text-[#3D2B1F] border border-[#3D2B1F]/10 shadow-sm"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    Step {step.number} — {step.name}
                  </div>
                </div>
              </div>

              {/* Text Editorial Column */}
              <div
                className={`lg:col-span-6 space-y-4 ${
                  isEven ? 'order-2' : 'order-2 lg:order-1'
                }`}
              >
                <span
                  className="text-6xl sm:text-7xl font-light text-[#3D2B1F]/20 block -mb-2"
                  style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
                >
                  {step.number}
                </span>

                <h3
                  className="font-editorial text-3xl sm:text-4xl text-[#3D2B1F]"
                  style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
                >
                  {step.headline}
                </h3>

                <p className="text-[#3D2B1F]/80 text-base leading-relaxed font-normal font-sans">
                  {step.description}
                </p>

                {/* Technique Callout Pill */}
                <div className="p-4 rounded-xl bg-white border border-[#3D2B1F]/15 flex items-center gap-3 shadow-sm">
                  <CheckCircle2 size={16} className="text-[#D4A373] flex-shrink-0" />
                  <span className="text-xs font-medium text-[#3D2B1F] font-sans">
                    <strong className="text-[#3D2B1F] font-bold">Craft Technique:</strong> {step.technique}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
