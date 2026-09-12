import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { ChevronRight, FileText, Shield, Sparkles, Scale, Info } from 'lucide-react';

export const LicensePage: React.FC = () => {
  useSEO({
    title: 'Intellectual Property & Licensing | Kurush Yarn Atelier',
    description: 'Licensing, design reproduction policies, and digital usage terms for the handcrafted creations of Kurush Yarn Atelier.',
  });

  return (
    <div className="pt-28 md:pt-36 pb-24 text-[#3D2B1F] bg-[#FDFCFB]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 mb-8 font-medium" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <Link to="/" className="hover:text-[#3D2B1F] transition-colors">
            Atelier Home
          </Link>
          <ChevronRight size={12} className="opacity-40" />
          <span className="text-[#3D2B1F] font-semibold">License Terms</span>
        </nav>

        {/* Title Block */}
        <div className="space-y-4 mb-12 border-b border-[#3D2B1F]/15 pb-8">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#D4A373] font-semibold animate-fade-in" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <Scale size={12} />
            <span>Atelier Provenance &amp; Rights</span>
          </div>
          <h1 className="font-editorial text-4xl md:text-5xl tracking-tight text-[#3D2B1F] font-light" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
            Licensing &amp; Intellectual Property
          </h1>
          <p className="text-xs text-[#3D2B1F]/60 font-sans">
            Effective Date: September 12, 2026 · Version 1.2
          </p>
        </div>

        {/* Introduction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#FFFFFF] border border-[#3D2B1F]/10 p-6 rounded-2xl shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-full bg-[#3D2B1F]/5 text-[#3D2B1F] flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <h3 className="font-editorial text-xl font-normal text-[#3D2B1F]" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              Handcrafted Designs
            </h3>
            <p className="text-xs text-[#3D2B1F]/70 leading-relaxed font-sans">
              Every botanical piece, physical stitch layout, and spatial fiber installation exhibited on this site represents proprietary creative work of Kurush Yarn Atelier.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#3D2B1F]/10 p-6 rounded-2xl shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-full bg-[#D4A373]/10 text-[#D4A373] flex items-center justify-center">
              <FileText size={16} />
            </div>
            <h3 className="font-editorial text-xl font-normal text-[#3D2B1F]" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              Digital &amp; Media Code
            </h3>
            <p className="text-xs text-[#3D2B1F]/70 leading-relaxed font-sans">
              Our website code is open source, but the brand name, photography, and high-fidelity textile representations are fully copyrighted assets.
            </p>
          </div>
        </div>

        {/* Core Legal Terms */}
        <div className="space-y-10 font-sans text-xs md:text-sm text-[#3D2B1F]/80 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-editorial text-2xl text-[#3D2B1F] font-normal" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              1. Proprietary Rights &amp; Copyright Notice
            </h2>
            <p>
              Unless otherwise stated, all material—including sculptural yarn pieces, photographic records, textile narratives, brand design elements, icons, logo marks, and descriptive copy—is the exclusive property of <strong>Kurush Yarn Atelier</strong>. 
            </p>
            <p>
              © {new Date().getFullYear()} Kurush Yarn Atelier. All rights reserved. Handcrafted with devotion in limited numbers. Any unauthorized public display, reproduction, commercial sale, or distribution without prior written consent constitutes an infringement of copyright laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-2xl text-[#3D2B1F] font-normal" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              2. Design Replication &amp; Non-Commercial License
            </h2>
            <p>
              As an appreciation of the needlecraft community, we believe in creative sharing. If you are an individual hobbyist or needleworker, you are granted a limited, personal, non-transferable, and non-commercial license to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 bg-[#3D2B1F]/5 p-4 rounded-xl border border-[#3D2B1F]/5">
              <li>Recreate or adapt shown floral or geometric structures strictly for personal enjoyment or private home display.</li>
              <li>Share photos of your personal handmade adaptations, provided that prominent, clear credit is given to <strong>Kurush Yarn Atelier</strong> as the master designer.</li>
              <li>You may <strong>NOT</strong> sell, raffle, or commercially monetize physical items made directly from our curated designs, or claim them as original designs.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-2xl text-[#3D2B1F] font-normal" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              3. Pattern &amp; Instructional Media Usage
            </h2>
            <p>
              Any future stitch patterns, needlework diagrams, drafting instructions, or digital tutorials distributed by the Atelier (whether free or purchased) are licensed under the following terms:
            </p>
            <p>
              The files are for single-user personal use only. Sharing, uploading to public servers, reselling the PDF files, translating the texts to other languages without permission, or hosting group-craft workshops based directly on our copyrighted blueprints without a commercial workshop license is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-2xl text-[#3D2B1F] font-normal" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              4. Open Source Code Licensing
            </h2>
            <p>
              The structural software design, interactive 3D WebGL yarn-curve visualizations, and layout components of this digital exhibition are licensed under the <strong>MIT License</strong>. You are free to inspect and utilize the software codebase architecture for custom projects, excluding:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>The official brand assets, brand colors, trademarks, and "Kurush Yarn Atelier" identities.</li>
              <li>The high-definition botanical exhibition photographs and custom portfolio product descriptions.</li>
            </ul>
          </section>

          <section className="bg-[#D4A373]/10 border border-[#D4A373]/20 p-5 rounded-2xl flex gap-4 items-start">
            <Info size={20} className="text-[#3D2B1F] flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#3D2B1F]">
                Commercial Licensing &amp; Collaborations
              </h4>
              <p className="text-xs text-[#3D2B1F]/80 leading-relaxed">
                For commercial interior design projects, boutique brand collaborations, wholesale licensing of custom collections, or patterns usage in structured textile classrooms, please reach out directly for a commercial written agreement via our <Link to="/about" className="underline font-medium hover:text-[#D4A373] transition-colors">Atelier Consultation desk</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
