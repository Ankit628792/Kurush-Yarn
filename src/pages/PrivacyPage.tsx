import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { ChevronRight, Shield, Lock, EyeOff, CheckCircle, HelpCircle } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  useSEO({
    title: 'Privacy Policy | Kurush Yarn Atelier',
    description: 'Privacy policy and data protection practices for visitors, collectors, and fiber art enthusiasts at Kurush Yarn Atelier.',
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
          <span className="text-[#3D2B1F] font-semibold">Privacy Policy</span>
        </nav>

        {/* Title Block */}
        <div className="space-y-4 mb-12 border-b border-[#3D2B1F]/15 pb-8">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#D4A373] font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <Shield size={12} />
            <span>Ethical Safeguards</span>
          </div>
          <h1 className="font-editorial text-4xl md:text-5xl tracking-tight text-[#3D2B1F] font-light" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
            Privacy Policy &amp; Data Safeguards
          </h1>
          <p className="text-xs text-[#3D2B1F]/60 font-sans">
            Effective Date: September 12, 2026 · Version 1.1
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#FFFFFF] border border-[#3D2B1F]/10 p-6 rounded-2xl shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-full bg-[#3D2B1F]/5 text-[#3D2B1F] flex items-center justify-center">
              <EyeOff size={16} />
            </div>
            <h3 className="font-editorial text-lg font-normal text-[#3D2B1F]" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              No Surveillance
            </h3>
            <p className="text-[11px] text-[#3D2B1F]/70 leading-relaxed font-sans">
              We never run third-party tracking pixels, behavioural ads, or commercial cookie brokers on our craft platform.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#3D2B1F]/10 p-6 rounded-2xl shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-full bg-[#3D2B1F]/5 text-[#3D2B1F] flex items-center justify-center">
              <Lock size={16} />
            </div>
            <h3 className="font-editorial text-lg font-normal text-[#3D2B1F]" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              Local Sandbox
            </h3>
            <p className="text-[11px] text-[#3D2B1F]/70 leading-relaxed font-sans">
              Saved favorite items or custom collections are persisted strictly on your own browser’s local storage cache.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#3D2B1F]/10 p-6 rounded-2xl shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-full bg-[#D4A373]/10 text-[#D4A373] flex items-center justify-center">
              <CheckCircle size={16} />
            </div>
            <h3 className="font-editorial text-lg font-normal text-[#3D2B1F]" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              Acquisition Intent
            </h3>
            <p className="text-[11px] text-[#3D2B1F]/70 leading-relaxed font-sans">
              Email addresses and Instagram handles are handled with complete confidentiality during acquisition consultations.
            </p>
          </div>
        </div>

        {/* Policy Text */}
        <div className="space-y-10 font-sans text-xs md:text-sm text-[#3D2B1F]/80 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-editorial text-2xl text-[#3D2B1F] font-normal" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              1. Our Philosophy Towards Personal Data
            </h2>
            <p>
              Kurush Yarn Atelier operates as a mindful digital space. We believe that privacy is an essential component of slow, attentive living. We collect the minimum amount of data required to display our digital exhibition correctly, answer questions about custom textile orders, and ensure the website operates smoothly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-2xl text-[#3D2B1F] font-normal" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              2. Data We May Collect &amp; Process
            </h2>
            <p>
              We distinguish clearly between browser sandbox interactions and voluntary contact:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Atelier Consultation Inquiries:</strong> When you click "Inquire on Instagram" or choose to consult our design desk, you may provide your name, contact email address, shipping city, and your Instagram handle. This is processed solely to discuss custom commissioning parameters, sizing, fiber selection, and logistics.
              </li>
              <li>
                <strong>Browser Storage Cache:</strong> Your curated saved gallery items are kept on your computer via <code>localStorage</code>. No servers are notified of which botanical specimens you save.
              </li>
              <li>
                <strong>Anonymous Analytics:</strong> To measure collective interest in different exhibition chambers (e.g. how many times specific crochet designs are visited), we utilize lightweight, privacy-respecting telemetry. No IP addresses or identities are tracked.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-2xl text-[#3D2B1F] font-normal" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              3. No Data Sharing with Third Parties
            </h2>
            <p>
              We do not sell, rent, license, or exchange visitor contact details with any third parties, brokers, or large advertising models under any circumstances. All communication about custom creations is kept securely within the Atelier’s direct custody.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-editorial text-2xl text-[#3D2B1F] font-normal" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              4. Data Retention &amp; Deletion Rights
            </h2>
            <p>
              If you have previously initiated an inquiry or custom commission via email or social form and would like your record to be fully deleted from our offline client archives, please let us know. We will remove all emails and specifications from our files immediately.
            </p>
          </section>

          <section className="bg-[#3D2B1F]/5 p-6 rounded-2xl space-y-3 border border-[#3D2B1F]/5">
            <h3 className="font-editorial text-lg text-[#3D2B1F] flex items-center gap-2" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
              <HelpCircle size={16} />
              Questions or Concerns?
            </h3>
            <p className="text-xs text-[#3D2B1F]/75 leading-relaxed">
              If you have any questions about this privacy statement, or how we protect your information, you are welcome to consult our atelier director directly at <a href="mailto:kurushyarn@gmail.com" className="underline hover:text-[#D4A373] transition-colors">kurushyarn@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
