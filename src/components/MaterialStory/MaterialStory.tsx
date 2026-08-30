import React, { useState } from 'react';
import { siteContent } from '../../data/content';
import { FiberCanvas } from './FiberCanvas';
import { ArrowRight, Sparkles, Activity } from 'lucide-react';

export const MaterialStory: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const stages = siteContent.materialStory.stages;
  const currentStage = stages[activeStageIndex];

  return (
    <section id="material" className="py-24 md:py-32 px-6 md:px-12 bg-white border-y border-[#3D2B1F]/15 text-[#3D2B1F]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div
            className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#3D2B1F]/60 font-semibold"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <span>02 / Material Evolution</span>
            <span className="w-6 h-px bg-[#3D2B1F]/30" />
            <span>Fiber Physics</span>
          </div>

          <h2
            className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#3D2B1F] tracking-tight leading-tight"
            style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
          >
            {siteContent.materialStory.title}
          </h2>

          <p className="text-[#3D2B1F]/75 text-base md:text-lg leading-relaxed italic">
            {siteContent.materialStory.subtitle}
          </p>
        </div>

        {/* Interactive Step Selector Stepper */}
        <div className="flex items-center justify-between max-w-4xl mx-auto relative px-4">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-8 right-8 h-px bg-[#3D2B1F]/15 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-8 h-px bg-[#3D2B1F] -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${(activeStageIndex / (stages.length - 1)) * 92}%` }}
          />

          {stages.map((stage, idx) => (
            <button
              key={stage.id}
              onClick={() => setActiveStageIndex(idx)}
              className={`relative z-10 flex flex-col items-center gap-2 group focus:outline-none transition-all ${
                activeStageIndex === idx ? 'scale-105' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div
                className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  activeStageIndex === idx
                    ? 'bg-[#3D2B1F] text-[#FDFCFB] shadow-md ring-4 ring-[#3D2B1F]/10'
                    : 'bg-[#F7F5F2] text-[#3D2B1F] border border-[#3D2B1F]/15 hover:bg-white'
                }`}
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                {stage.step}
              </div>
              <span
                className={`text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors ${
                  activeStageIndex === idx ? 'text-[#3D2B1F]' : 'text-[#3D2B1F]/50'
                }`}
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                {stage.title}
              </span>
            </button>
          ))}
        </div>

        {/* Stage Content & Interactive Canvas Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-[#FDFCFB] p-8 md:p-12 rounded-2xl border border-[#3D2B1F]/15 shadow-sm">
          {/* Left Text Explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F] font-semibold bg-white border border-[#3D2B1F]/15 px-3.5 py-1.5 rounded-full"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <Activity size={12} className="text-[#D4A373]" />
              <span>Phase {currentStage.step} of 05 — {currentStage.title}</span>
            </div>

            <h3
              className="font-editorial text-3xl sm:text-4xl text-[#3D2B1F]"
              style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
            >
              The Genesis of {currentStage.title}
            </h3>

            <p className="text-[#3D2B1F]/80 text-base leading-relaxed font-sans">
              {currentStage.description}
            </p>

            <blockquote className="p-4 rounded-xl bg-white border-l-2 border-[#3D2B1F] text-sm italic text-[#3D2B1F]/75 shadow-sm">
              "{currentStage.quote}"
            </blockquote>

            {/* Next Step Button */}
            <div className="pt-2">
              <button
                onClick={() => setActiveStageIndex((prev) => (prev + 1) % stages.length)}
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F] hover:opacity-70 font-semibold group"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <span>Advance to Next Stage</span>
                <ArrowRight size={13} className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Interactive Animated Canvas */}
          <div className="lg:col-span-6 h-[340px] md:h-[400px]">
            <FiberCanvas stage={activeStageIndex} />
          </div>
        </div>
      </div>
    </section>
  );
};
