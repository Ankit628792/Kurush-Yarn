import React, { useState } from 'react';
import { Download, Share2, PlusSquare, X, Smartphone, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'nav' | 'banner' | 'pill' | 'compact';
  label?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'nav',
  label = 'Install App'
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // If already running as an installed standalone PWA, suppress prompt
  if (isInstalled) {
    return null;
  }

  // Only render if browser supports beforeinstallprompt OR if user is on iOS Safari
  if (!isInstallable && !isIOS) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }
    if (isInstallable) {
      setIsInstalling(true);
      try {
        await install();
      } finally {
        setIsInstalling(false);
      }
    }
  };

  const renderButtonContent = () => {
    if (variant === 'compact') {
      return (
        <button
          onClick={handleInstallClick}
          disabled={isInstalling}
          title="Install Kurush Yarn Web App"
          aria-label="Install Kurush Yarn Web App"
          className={`flex items-center justify-center w-9 h-9 rounded-full bg-[#6E3F3A]/10 hover:bg-[#6E3F3A]/20 text-[#6E3F3A] transition-all duration-200 border border-[#6E3F3A]/20 hover:scale-105 active:scale-95 ${className}`}
        >
          <Download className="w-4 h-4" />
        </button>
      );
    }

    if (variant === 'pill') {
      return (
        <button
          onClick={handleInstallClick}
          disabled={isInstalling}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 shadow-xs border bg-[#6E3F3A] text-[#FDFCFB] hover:bg-[#5A332F] border-[#6E3F3A] hover:shadow-md active:scale-98 ${className}`}
        >
          <Download className="w-3.5 h-3.5 animate-bounce-subtle" />
          <span>{label}</span>
        </button>
      );
    }

    // Default 'nav' variant
    return (
      <button
        onClick={handleInstallClick}
        disabled={isInstalling}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#3D2B1F] hover:text-[#6E3F3A] bg-[#3D2B1F]/5 hover:bg-[#6E3F3A]/10 border border-[#3D2B1F]/10 hover:border-[#6E3F3A]/30 transition-all duration-200 active:scale-95 ${className}`}
      >
        <Download className="w-3.5 h-3.5 text-[#6E3F3A]" />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <>
      {renderButtonContent()}

      {/* iOS Safari Installation Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-sm rounded-2xl bg-[#FDFCFB] text-[#3D2B1F] p-6 shadow-2xl border border-[#3D2B1F]/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#3D2B1F]/60 hover:text-[#3D2B1F] hover:bg-[#3D2B1F]/5 transition-colors"
              aria-label="Close installation guide"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#6E3F3A]/10 text-[#6E3F3A] flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#3D2B1F]">
                  Install Kurush Atelier
                </h3>
                <p className="text-xs text-[#3D2B1F]/70">Add to iPhone / iPad Home Screen</p>
              </div>
            </div>

            {/* Instruction Steps */}
            <div className="space-y-3.5 my-5 text-sm text-[#3D2B1F]/85">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F7F4F0] border border-[#3D2B1F]/5">
                <div className="mt-0.5 p-1 rounded-md bg-[#6E3F3A] text-white">
                  <Share2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-semibold text-[#3D2B1F]">1. Tap Share</span>
                  <p className="text-xs text-[#3D2B1F]/70 mt-0.5">
                    Tap the Share button in Safari's bottom toolbar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F7F4F0] border border-[#3D2B1F]/5">
                <div className="mt-0.5 p-1 rounded-md bg-[#6E3F3A] text-white">
                  <PlusSquare className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-semibold text-[#3D2B1F]">2. Add to Home Screen</span>
                  <p className="text-xs text-[#3D2B1F]/70 mt-0.5">
                    Scroll down the options and select <strong>Add to Home Screen</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F7F4F0] border border-[#3D2B1F]/5">
                <div className="mt-0.5 p-1 rounded-md bg-[#6E3F3A] text-white">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-semibold text-[#3D2B1F]">3. Enjoy Fast Standalone Mode</span>
                  <p className="text-xs text-[#3D2B1F]/70 mt-0.5">
                    Launch directly from your home screen with offline catalog access.
                  </p>
                </div>
              </div>
            </div>

            {/* Done Action */}
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#3D2B1F] text-[#FDFCFB] text-sm font-medium hover:bg-[#6E3F3A] transition-colors shadow-sm"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};
