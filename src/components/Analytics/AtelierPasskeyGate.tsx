import React, { useState, useEffect } from 'react';
import { Lock, ArrowLeft, KeyRound, Eye, EyeOff, Sparkles, ShieldCheck } from 'lucide-react';

interface AtelierPasskeyGateProps {
  onUnlock: () => void;
  onReturnHome: () => void;
}

const VALID_PASSKEYS = ['kurush', 'atelier', 'ankit'];

export const AtelierPasskeyGate: React.FC<AtelierPasskeyGateProps> = ({
  onUnlock,
  onReturnHome,
}) => {
  const [inputKey, setInputKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check URL parameters for instant authorization: e.g. /visitors?key=kurush
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const keyParam = params.get('key') || params.get('admin') || params.get('pass');
      if (keyParam && VALID_PASSKEYS.includes(keyParam.toLowerCase().trim())) {
        sessionStorage.setItem('kurush_analytics_auth', 'unlocked');
        onUnlock();
      }
    } catch {}
  }, [onUnlock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setIsSubmitting(true);

    const sanitized = inputKey.trim().toLowerCase();
    setTimeout(() => {
      if (VALID_PASSKEYS.includes(sanitized)) {
        sessionStorage.setItem('kurush_analytics_auth', 'unlocked');
        onUnlock();
      } else {
        setError(true);
        setIsSubmitting(false);
      }
    }, 250);
  };

  return (
    <div
      id="atelier-passkey-gate"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F2] p-4 sm:p-6 overflow-y-auto"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* Background Subtle Gradient & Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40 texture-bg" />

      <div className="relative w-full max-w-md bg-[#FDFCFB] border border-[#3D2B1F]/15 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6">
        {/* Emblem */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-[#3D2B1F]/5 border border-[#3D2B1F]/15 flex items-center justify-center text-[#3D2B1F]">
          <Lock size={22} className="text-[#3D2B1F]" />
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#D4A373] font-semibold">
            <Sparkles size={11} />
            <span>Private Atelier Registry</span>
          </div>
          <h2
            className="font-editorial text-2xl sm:text-3xl text-[#3D2B1F]"
            style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
          >
            Atelier Intelligence
          </h2>
          <p className="text-xs text-[#3D2B1F]/60 max-w-xs mx-auto leading-relaxed">
            This chamber is reserved for atelier curators. Enter the passkey to review visitor engagement and inquiries.
          </p>
        </div>

        {/* Passcode Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label
              htmlFor="atelier-passkey-input"
              className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3D2B1F]/70 mb-2"
            >
              Atelier Passkey
            </label>
            <div className="relative">
              <input
                id="atelier-passkey-input"
                type={showKey ? 'text' : 'password'}
                autoFocus
                value={inputKey}
                onChange={(e) => {
                  setInputKey(e.target.value);
                  setError(false);
                }}
                placeholder="Enter passkey"
                className={`w-full bg-[#FAF7F2] border text-sm text-[#3D2B1F] rounded-xl px-4 py-3 pr-11 focus:outline-none transition-all ${
                  error
                    ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/40'
                    : 'border-[#3D2B1F]/20 focus:border-[#3D2B1F] focus:ring-1 focus:ring-[#3D2B1F]/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#3D2B1F]/40 hover:text-[#3D2B1F] transition-colors cursor-pointer"
                aria-label={showKey ? 'Hide passkey' : 'Show passkey'}
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && (
              <p className="text-[11px] text-rose-600 mt-1.5 animate-in fade-in duration-150">
                Invalid passkey.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !inputKey.trim()}
            className="w-full bg-[#3D2B1F] hover:bg-[#3D2B1F]/90 text-[#FDFCFB] py-3 px-4 rounded-xl text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <KeyRound size={14} />
            <span>{isSubmitting ? 'Verifying...' : 'Access Intelligence'}</span>
          </button>
        </form>

        {/* Return Button */}
        <div className="pt-2 border-t border-[#3D2B1F]/10 flex items-center justify-center">
          <button
            type="button"
            onClick={onReturnHome}
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#3D2B1F]/60 hover:text-[#3D2B1F] transition-colors py-1 cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Return to Public Exhibition</span>
          </button>
        </div>
      </div>
    </div>
  );
};
