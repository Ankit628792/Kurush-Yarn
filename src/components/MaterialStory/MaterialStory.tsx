import React, { useState, useEffect, useRef, useCallback } from 'react';
import { siteContent } from '../../data/content';
import { FiberCanvas } from './FiberCanvas';
import { ArrowRight, Activity } from 'lucide-react';

const STAGE_DURATION_MS = 4500; // 4.5 seconds per evolution phase

export const MaterialStory: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isPlaying] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [stageProgress, setStageProgress] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const stages = siteContent.materialStory.stages;
  const currentStage = stages[activeStageIndex];


  // IntersectionObserver to detect when section is in viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.3, // Trigger when at least 30% of the section is visible
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Advance to next stage smoothly
  const advanceStage = useCallback(() => {
    setActiveStageIndex((prev) => (prev + 1) % stages.length);
    setStageProgress(0);
    startTimeRef.current = null;
  }, [stages.length]);

  // Autoplay animation loop when in view and active
  useEffect(() => {
    if (!isInView || !isPlaying) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      startTimeRef.current = null;
      return;
    }

    const updateLoop = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progressRatio = Math.min(1, elapsed / STAGE_DURATION_MS);
      setStageProgress(progressRatio * 100);

      if (progressRatio >= 1) {
        advanceStage();
      } else {
        rafRef.current = requestAnimationFrame(updateLoop);
      }
    };

    rafRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isInView, isPlaying, activeStageIndex, advanceStage]);

  // Handle manual selection
  const handleSelectStage = (idx: number) => {
    setActiveStageIndex(idx);
    setStageProgress(0);
    startTimeRef.current = null;
  };

  return (
    <section
      ref={sectionRef}
      id="material"
      className="py-24 md:py-32 px-6 md:px-12 bg-white border-y border-[#3D2B1F]/15 text-[#3D2B1F]"
    >
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

        {/* Interactive Step Selector Stepper with Dynamic Progress Indicator */}
        <div className="flex items-center justify-between max-w-4xl mx-auto relative px-4">
          {/* Base Background Connecting Line */}
          <div className="absolute top-1/2 left-8 right-8 h-px bg-[#3D2B1F]/15 -translate-y-1/2 z-0" />
          
          {/* Filled Connecting Line based on active stage */}
          <div
            className="absolute top-1/2 left-8 h-px bg-[#3D2B1F] -translate-y-1/2 z-0 transition-all duration-500 ease-out"
            style={{ width: `${(activeStageIndex / (stages.length - 1)) * 92}%` }}
          />

          {stages.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            const isPast = idx < activeStageIndex;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => handleSelectStage(idx)}
                className={`relative z-10 flex flex-col items-center gap-2 group focus:outline-none transition-all duration-300 ${
                  isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className="relative">
                  <div
                    className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-[#3D2B1F] text-[#FDFCFB] shadow-md ring-4 ring-[#3D2B1F]/10'
                        : isPast
                        ? 'bg-[#3D2B1F] text-[#FDFCFB]'
                        : 'bg-[#F7F5F2] text-[#3D2B1F] border border-[#3D2B1F]/15 hover:bg-white'
                    }`}
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    {stage.step}
                  </div>

                  {/* Circular Autoplay Progress Halo around active step */}
                  {isActive && isPlaying && isInView && (
                    <svg className="absolute -inset-1.5 w-[52px] h-[52px] md:w-[56px] md:h-[56px] -rotate-90 pointer-events-none">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="24"
                        fill="transparent"
                        stroke="#D4A373"
                        strokeWidth="2"
                        strokeDasharray={150.8}
                        strokeDashoffset={150.8 - (150.8 * stageProgress) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-75 ease-linear"
                      />
                    </svg>
                  )}
                </div>

                <span
                  className={`text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors ${
                    isActive ? 'text-[#3D2B1F]' : 'text-[#3D2B1F]/50'
                  }`}
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                  {stage.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stage Content & Interactive Canvas Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-[#FDFCFB] p-8 md:p-12 rounded-3xl border border-[#3D2B1F]/15 shadow-sm relative overflow-hidden">
          {/* Top Stage Progression Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#3D2B1F]/10">
            <div
              className="h-full bg-[#3D2B1F] transition-all duration-75 ease-linear"
              style={{
                width: isPlaying && isInView
                  ? `${((activeStageIndex + stageProgress / 100) / stages.length) * 100}%`
                  : `${((activeStageIndex + 1) / stages.length) * 100}%`
              }}
            />
          </div>

          {/* Left Text Explanation */}
          <div key={activeStageIndex} className="lg:col-span-6 space-y-6 animate-in fade-in duration-500">
            <div
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F] font-semibold bg-white border border-[#3D2B1F]/15 px-3.5 py-1.5 rounded-full shadow-xs"
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
            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={advanceStage}
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F] hover:opacity-70 font-semibold group py-1"
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

