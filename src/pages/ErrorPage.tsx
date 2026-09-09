import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertTriangle,
  RefreshCw,
  Home,
  Compass,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Instagram,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { getInstagramHandle, getInstagramUrl } from '../utils/url';
import { useSEO } from '../hooks/useSEO';

export interface ErrorPageProps {
  error?: Error | null;
  resetErrorBoundary?: () => void;
  onOpenInquiry?: () => void;
  statusCode?: number | string;
  customTitle?: string;
  customMessage?: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  error,
  resetErrorBoundary,
  onOpenInquiry,
  statusCode = '500',
  customTitle,
  customMessage
}) => {
  // Safe location & navigation resolution even if rendered outside Router
  let pathname = '/';
  try {
    pathname = window.location.pathname;
  } catch {
    // ignore
  }

  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [copied, setCopied] = useState(false);

  // Set document title & SEO
  useSEO({
    title: `Exhibition Notice (${statusCode}) — Kurush Yarn Atelier`,
    description: 'An unexpected weaving disruption occurred in the digital salon exhibition. Our artisans are preserving your session.',
    robots: 'noindex, nofollow'
  });

  const errorMessage = error?.message || 'An unexpected rendering disruption occurred while displaying the exhibition.';
  const errorStack = error?.stack || 'No detailed stack trace available for this event.';
  const timestamp = new Date().toISOString();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const diagnosticPayload = `--- KURUSH YARN ATELIER ERROR REPORT ---
Status Code: ${statusCode}
Timestamp: ${timestamp}
URL: ${currentUrl}
Path: ${pathname}
Message: ${errorMessage}
User Agent: ${typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'}
Stack:
${errorStack}
----------------------------------------`;

  const handleCopyDiagnostics = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(diagnosticPayload).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      });
    }
  };

  const handleReload = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const instagramHandle = getInstagramHandle();
  const instagramUrl = getInstagramUrl();

  return (
    <div
      className="min-h-screen bg-[#FDFCFB] text-[#3D2B1F] flex items-center justify-center px-4 sm:px-6 py-20 sm:py-28 relative overflow-hidden"
      id="atelier-error-page"
    >
      {/* Decorative ambient blurred glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-xl w-full mx-auto"
      >
        <div className="bg-white rounded-3xl border border-[#3D2B1F]/15 shadow-xl p-7 sm:p-10 space-y-6">
          {/* Header Icon & Status Pill */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D2B1F]/5 border border-[#3D2B1F]/10 text-[9.5px] uppercase tracking-[0.25em] font-semibold text-[#3D2B1F]/70">
              <Sparkles size={11} className="text-[#D4A373] animate-pulse" />
              <span>Studio Exhibition Notice</span>
            </div>

            <span
              className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#3D2B1F]/10 text-[#3D2B1F]"
              title="HTTP / System Status Code"
            >
              {statusCode}
            </span>
          </div>

          {/* Central Artistic Emblem */}
          <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] border border-[#3D2B1F]/15 flex items-center justify-center text-[#3D2B1F] mx-auto shadow-xs">
            <AlertTriangle size={28} className="stroke-[1.6] text-[#B85D36]" />
          </div>

          {/* Headline & Editorial Context */}
          <div className="text-center space-y-2">
            <h1
              className="font-editorial text-2xl sm:text-3xl text-[#3D2B1F] tracking-tight"
              style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
            >
              {customTitle || 'Visual Loom Interrupted'}
            </h1>
            <p className="text-xs sm:text-sm text-[#3D2B1F]/70 font-sans leading-relaxed max-w-md mx-auto">
              {customMessage ||
                'Our digital gallery experienced an unexpected tension irregularity while weaving this exhibition view. Your session and saved favorites remain safe.'}
            </p>
          </div>

          {/* Primary Action Button Cluster */}
          <div className="pt-2 space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReload}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-[#3D2B1F] hover:bg-[#2A1D15] text-[#FDFCFB] text-[10px] uppercase tracking-[0.25em] font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <RefreshCw size={13} />
                <span>Reload Exhibition</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoHome}
                className="w-full sm:w-auto py-3.5 px-6 rounded-full border border-[#3D2B1F]/20 hover:border-[#3D2B1F] hover:bg-[#3D2B1F]/5 text-[#3D2B1F] text-[10px] uppercase tracking-[0.25em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <Home size={13} />
                <span>Return Home</span>
              </motion.button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs pt-1 text-[#3D2B1F]/70">
              <Link
                to="/works"
                className="inline-flex items-center gap-1.5 hover:text-[#3D2B1F] hover:underline transition-colors"
              >
                <Compass size={13} />
                <span>Browse Permanent Collection</span>
              </Link>

              <span className="hidden sm:inline text-[#3D2B1F]/30">•</span>

              {onOpenInquiry ? (
                <button
                  onClick={onOpenInquiry}
                  className="inline-flex items-center gap-1.5 hover:text-[#3D2B1F] hover:underline transition-colors cursor-pointer"
                >
                  <Instagram size={13} />
                  <span>Notify Atelier Concierge</span>
                </button>
              ) : (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#3D2B1F] hover:underline transition-colors cursor-pointer"
                >
                  <Instagram size={13} />
                  <span>Contact Atelier ({instagramHandle})</span>
                </a>
              )}
            </div>
          </div>

          {/* Collapsible Technical Diagnostics Drawer */}
          <div className="pt-3 border-t border-[#3D2B1F]/10">
            <button
              onClick={() => setShowDiagnostics(!showDiagnostics)}
              className="w-full flex items-center justify-between text-[10px] uppercase tracking-wider text-[#3D2B1F]/60 hover:text-[#3D2B1F] py-1 cursor-pointer transition-colors"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <span>Atelier Diagnostic Details</span>
              <div className="flex items-center gap-1 text-[9.5px]">
                <span>{showDiagnostics ? 'Hide Report' : 'Inspect Report'}</span>
                {showDiagnostics ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </div>
            </button>

            <AnimatePresence>
              {showDiagnostics && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden pt-2 space-y-2"
                >
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#3D2B1F]/10 text-[10px] font-mono space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#3D2B1F]/50">Path: {pathname}</span>
                      <button
                        onClick={handleCopyDiagnostics}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white border border-[#3D2B1F]/15 hover:bg-[#3D2B1F]/5 text-[#3D2B1F] text-[9.5px] cursor-pointer transition-colors"
                      >
                        {copied ? <Check size={11} className="text-green-700" /> : <Copy size={11} />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <p className="font-semibold text-red-900 break-words">{errorMessage}</p>

                    {errorStack && (
                      <pre className="text-[9px] text-[#3D2B1F]/60 overflow-x-auto max-h-32 p-2 bg-white/70 rounded border border-[#3D2B1F]/5 whitespace-pre-wrap">
                        {errorStack}
                      </pre>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quiet footer reassurance */}
        <div className="mt-6 text-center text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F]/40">
          <span>Kurush Yarn Atelier • Handcrafted in Pure Fiber</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
