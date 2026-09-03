import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { Product } from '../../types/product';
import { getProductPieceUrl, getAbsoluteAssetUrl } from '../../utils/url';
import QRCode from 'qrcode';
import {
  X,
  Share2,
  Copy,
  Check,
  Pin,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Send,
  QrCode,
  Sparkles,
  ExternalLink,
  Download,
  Instagram
} from 'lucide-react';

interface ShareModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'platforms' | 'qr' | 'caption'>('platforms');
  const [canNativeShare, setCanNativeShare] = useState(false);

  const backdropRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const isClosingRef = useRef(false);

  // Sync render state with isOpen
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      isClosingRef.current = false;
    }
  }, [isOpen]);

  // Canonical shareable deep link URL dynamically derived from current origin
  const shareUrl = getProductPieceUrl(product.slug);

  // Image absolute URL for Pinterest / OpenGraph dynamically derived from current origin
  const fullImageUrl = getAbsoluteAssetUrl(product.heroImage);

  // Curated social sharing message
  const shareText = `🧶 Discover "${product.name}" (Piece No. ${product.number}) — Handcrafted crochet ${product.categoryLabel.toLowerCase()} in ${product.material} by Kurush Yarn Atelier.`;

  // Curated long caption for Instagram / social posts
  const fullCaptionText = `✨ Piece No. ${product.number}: ${product.name}
🧵 Material: ${product.material}
⏳ Craftsmanship: ${product.craftTime} (${product.stitchCount})
🏷️ Atelier Edition: ${product.edition || 'Open Edition'} • ${product.price || ''}

"${product.details.story || product.tagline || product.description}"

Handcrafted with intention at Kurush Yarn Atelier.
Explore the exhibition: ${shareUrl}

#kurushyarn #crochet #textileart #fiberart #botanicalcrochet #handmade #craftsmanship`;

  // Detect native share capability across mobile & desktop browsers
  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        if (typeof navigator.canShare === 'function') {
          setCanNativeShare(navigator.canShare({ url: window.location.href }));
        } else {
          setCanNativeShare(true);
        }
      } catch {
        setCanNativeShare(true);
      }
    }
  }, []);

  // Generate high-resolution QR Code on mount or when product changes
  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(shareUrl, {
      width: 360,
      margin: 2,
      color: {
        dark: '#3D2B1F',
        light: '#FDFCFB'
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR code', err));
  }, [shareUrl, isOpen]);

  // Robust cross-platform clipboard copy helper (works in iOS Safari, Chrome, iframes, and legacy WebViews)
  const copyTextToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Continue to fallback
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      // Position off-screen without triggering mobile scroll jumps or zooms
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '-9999px';
      textarea.style.opacity = '0';
      textarea.setAttribute('readonly', '');
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, 99999);
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    } catch (err) {
      console.error('Cross-device clipboard copy failed', err);
      return false;
    }
  };

  // GSAP Hover-scale handler for social media cards and buttons
  const handleCardMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.gsap-icon-target');
    const badge = card.querySelector('.gsap-badge-target');

    if (icon) {
      gsap.to(icon, {
        scale: 1.2,
        y: -2,
        rotate: 5,
        duration: 0.35,
        ease: 'back.out(2.2)',
        overwrite: 'auto'
      });
    }

    if (badge) {
      gsap.to(badge, {
        x: 2,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    gsap.to(card, {
      y: -3,
      scale: 1.025,
      boxShadow: '0 12px 24px -6px rgba(61, 43, 31, 0.14)',
      borderColor: 'rgba(61, 43, 31, 0.25)',
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const icon = card.querySelector('.gsap-icon-target');
    const badge = card.querySelector('.gsap-badge-target');

    if (icon) {
      gsap.to(icon, {
        scale: 1,
        y: 0,
        rotate: 0,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    if (badge) {
      gsap.to(badge, {
        x: 0,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    gsap.to(card, {
      y: 0,
      scale: 1,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      borderColor: 'rgba(61, 43, 31, 0.1)',
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLElement>, scale = 1.05) => {
    gsap.to(e.currentTarget, {
      scale,
      y: -1,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.2,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  // Animate Entrance when rendered with fade and translate effects
  useEffect(() => {
    if (!shouldRender || !isOpen) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      if (backdropRef.current) {
        gsap.set(backdropRef.current, { opacity: 0 });
        tl.to(backdropRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (modalRef.current) {
        gsap.set(modalRef.current, {
          opacity: 0,
          scale: 0.94,
          y: 28
        });
        tl.to(
          modalRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.42,
            ease: 'power3.out',
            clearProps: 'transform'
          },
          '-=0.22'
        );

        // Subtle stagger for header and inner sections
        const staggerItems = modalRef.current.querySelectorAll('.gsap-fade-translate-item');
        if (staggerItems.length > 0) {
          gsap.set(staggerItems, { opacity: 0, y: 10 });
          tl.to(
            staggerItems,
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.05,
              ease: 'power2.out',
              clearProps: 'transform'
            },
            '-=0.25'
          );
        }
      }
    });

    return () => {
      ctx.revert();
    };
  }, [shouldRender, isOpen]);

  // Tab switch fade & translate transition
  const tabContentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (tabContentRef.current) {
      gsap.fromTo(
        tabContentRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out', clearProps: 'transform' }
      );
    }
  }, [activeTab]);

  // Animated exit handler
  const handleAnimatedClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    if (!backdropRef.current || !modalRef.current) {
      setShouldRender(false);
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setShouldRender(false);
        isClosingRef.current = false;
        onClose();
      }
    });

    tl.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 18,
      duration: 0.22,
      ease: 'power2.in'
    }).to(
      backdropRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      },
      '-=0.15'
    );
  };

  // Handle ESC key press & backdrop lock
  useEffect(() => {
    if (!shouldRender || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleAnimatedClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shouldRender, isOpen]);

  if (!shouldRender) return null;

  // Copy Link Handler
  const handleCopyLink = async () => {
    const success = await copyTextToClipboard(shareUrl);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Copy Caption Handler
  const handleCopyCaption = async () => {
    const success = await copyTextToClipboard(fullCaptionText);
    if (success) {
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2500);
    }
  };

  // Download QR Code Image
  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const downloadLink = document.createElement('a');
    downloadLink.href = qrDataUrl;
    downloadLink.download = `kurush-yarn-piece-${product.number}-${product.slug}-qr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Native Device Share (iOS / Android Share Sheet)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} — Piece No. ${product.number} | Kurush Yarn`,
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Device share failed', err);
        }
      }
    }
  };

  // Direct Social Platform Links & Handlers
  const platformLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'hover:bg-[#E1306C]/10 hover:border-[#E1306C] text-[#C13584]',
      badge: 'DM / Story',
      action: () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
        }
        window.open('https://ig.me/m/kurush.yarn', '_blank', 'noopener,noreferrer');
      }
    },
    {
      name: 'Pinterest',
      icon: Pin,
      color: 'hover:bg-[#E60023]/10 hover:border-[#E60023] text-[#BD081C]',
      badge: 'Save Pin',
      action: () => {
        const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
          shareUrl
        )}&media=${encodeURIComponent(fullImageUrl)}&description=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    {
      name: 'X / Twitter',
      icon: Twitter,
      color: 'hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2] text-[#1DA1F2]',
      badge: 'Post',
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareUrl)}&hashtags=crochet,kurushyarn,textileart`;
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'hover:bg-[#1877F2]/10 hover:border-[#1877F2] text-[#1877F2]',
      badge: 'Share',
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'hover:bg-[#0A66C2]/10 hover:border-[#0A66C2] text-[#0A66C2]',
      badge: 'Feed',
      action: () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'hover:bg-[#229ED9]/10 hover:border-[#229ED9] text-[#229ED9]',
      badge: 'Message',
      action: () => {
        const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'hover:bg-[#3D2B1F]/10 hover:border-[#3D2B1F] text-[#3D2B1F]',
      badge: 'Send Dossier',
      action: () => {
        const subject = `Kurush Yarn Atelier: ${product.name} (Piece No. ${product.number})`;
        const body = `Hello,\n\nI wanted to share this handcrafted textile piece from Kurush Yarn Atelier:\n\n${product.name} — Piece No. ${product.number}\n${product.subtitle || ''}\nPrice: ${product.price || ''}\n\nView details & craftsmanship:\n${shareUrl}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
    }
  ];

  if (!isOpen) return null;

  const modalContent = (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[9999] overflow-y-auto bg-[#3D2B1F]/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      {/* Click outside backdrop */}
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={handleAnimatedClose}
        aria-hidden="true"
      />

      {/* Modal Container with Responsive Constraints */}
      <div
        ref={modalRef}
        data-lenis-prevent
        className="relative z-10 w-full max-w-lg max-h-[min(90vh,680px)] bg-[#FDFCFB] rounded-3xl border border-[#3D2B1F]/15 shadow-2xl overflow-hidden text-[#3D2B1F] flex flex-col m-auto"
      >
        {/* Header - Fixed Top */}
        <div className="gsap-fade-translate-item px-5 sm:px-6 py-4 sm:py-5 border-b border-[#3D2B1F]/10 flex items-center justify-between bg-[#FAF7F2]/80 flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#3D2B1F] text-[#FDFCFB] flex items-center justify-center shadow-xs flex-shrink-0">
              <Share2 size={15} />
            </div>
            <div>
              <h2
                id="share-modal-title"
                className="font-editorial text-lg sm:text-xl text-[#3D2B1F] leading-tight"
                style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
              >
                Share Creation
              </h2>
              <p
                className="text-[8.5px] sm:text-[9px] uppercase tracking-[0.2em] text-[#3D2B1F]/60 font-semibold"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Kurush Yarn Atelier Piece No. {product.number}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAnimatedClose}
            onMouseEnter={(e) => handleButtonHover(e, 1.12)}
            onMouseLeave={handleButtonLeave}
            className="p-2 sm:p-2.5 rounded-full text-[#3D2B1F]/60 hover:text-[#3D2B1F] hover:bg-[#3D2B1F]/10 transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
            title="Close Share Window"
            aria-label="Close Share Window"
          >
            <X size={17} />
          </button>
        </div>

        {/* Scrollable Center Body Area */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#3D2B1F]/10" data-lenis-prevent>
          {/* Product Mini Dossier Preview Card */}
          <div className="gsap-fade-translate-item p-4 sm:p-6 pb-4">
            <div className="flex items-center gap-3.5 sm:gap-4 p-3 sm:p-3.5 rounded-2xl bg-white border border-[#3D2B1F]/10 shadow-xs">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-[#F5EBE0] flex-shrink-0 border border-[#3D2B1F]/10">
                <img
                  src={product.heroImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-[8px] sm:text-[8.5px] uppercase tracking-[0.2em] text-[#3D2B1F]/60 font-bold truncate"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    Piece No. {product.number} • {product.categoryLabel}
                  </span>
                  {product.price && (
                    <span className="font-editorial text-xs sm:text-sm text-[#3D2B1F] font-semibold flex-shrink-0">
                      {product.price}
                    </span>
                  )}
                </div>
                <h3
                  className="font-editorial text-sm sm:text-base text-[#3D2B1F] truncate leading-snug mt-0.5"
                  style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
                >
                  {product.name}
                </h3>
                <p className="text-[10.5px] sm:text-[11px] text-[#3D2B1F]/70 truncate font-sans mt-0.5">
                  {product.subtitle || product.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Copy Direct Link Bar */}
          <div className="gsap-fade-translate-item p-4 sm:px-6 sm:py-4">
            <label
              className="text-[8.5px] sm:text-[9px] uppercase tracking-[0.2em] text-[#3D2B1F]/70 font-bold block mb-2"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Direct Exhibition Link
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 sm:px-3.5 py-2.5 rounded-xl bg-white border border-[#3D2B1F]/15 text-[11px] sm:text-xs text-[#3D2B1F]/80 font-mono overflow-hidden">
                <span className="truncate selection:bg-[#3D2B1F] selection:text-white select-all">
                  {shareUrl}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                onMouseEnter={(e) => handleButtonHover(e, 1.04)}
                onMouseLeave={handleButtonLeave}
                className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs flex-shrink-0 cursor-pointer active:scale-95 ${
                  copiedLink
                    ? 'bg-[#2E7D32] text-white'
                    : 'bg-[#3D2B1F] hover:bg-[#3D2B1F]/85 text-[#FDFCFB]'
                }`}
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                {copiedLink ? (
                  <>
                    <Check size={14} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Tabs (Direct Platforms / QR Code / Atelier Caption) */}
          <div className="gsap-fade-translate-item px-4 sm:px-6 pt-3 bg-[#FAF7F2]/40">
            <div className="flex gap-1.5 sm:gap-2 text-[9.5px] sm:text-[10px] uppercase tracking-[0.18em] font-semibold border-b border-[#3D2B1F]/10">
              <button
                type="button"
                onClick={() => setActiveTab('platforms')}
                className={`pb-2.5 px-2 border-b-2 transition-colors cursor-pointer min-h-[36px] flex items-center gap-1.5 ${
                  activeTab === 'platforms'
                    ? 'border-[#3D2B1F] text-[#3D2B1F]'
                    : 'border-transparent text-[#3D2B1F]/50 hover:text-[#3D2B1F]'
                }`}
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <Share2 size={12} />
                <span>Direct Platforms</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('qr')}
                className={`pb-2.5 px-2 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer min-h-[36px] ${
                  activeTab === 'qr'
                    ? 'border-[#3D2B1F] text-[#3D2B1F]'
                    : 'border-transparent text-[#3D2B1F]/50 hover:text-[#3D2B1F]'
                }`}
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <QrCode size={12} />
                <span>Scan QR</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('caption')}
                className={`pb-2.5 px-2 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer min-h-[36px] ${
                  activeTab === 'caption'
                    ? 'border-[#3D2B1F] text-[#3D2B1F]'
                    : 'border-transparent text-[#3D2B1F]/50 hover:text-[#3D2B1F]'
                }`}
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <Sparkles size={12} />
                <span>Story Caption</span>
              </button>
            </div>
          </div>

          {/* Active Tab Animated Content Container */}
          <div ref={tabContentRef}>
            {/* Tab 1: Direct Social Media Platforms */}
            {activeTab === 'platforms' && (
              <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
                {/* Native device share button if supported (iOS / Android / macOS) */}
                {canNativeShare && (
                  <button
                    type="button"
                    onClick={handleNativeShare}
                    onMouseEnter={handleCardMouseEnter}
                    onMouseLeave={handleCardMouseLeave}
                    className="w-full p-3 sm:p-3.5 rounded-2xl bg-[#3D2B1F]/5 hover:bg-[#3D2B1F]/10 border border-[#3D2B1F]/15 flex items-center justify-between text-xs font-semibold text-[#3D2B1F] transition-all group cursor-pointer active:scale-[0.99]"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="gsap-icon-target w-7 h-7 rounded-full bg-[#3D2B1F] text-white flex items-center justify-center transition-colors">
                        <Share2 size={13} />
                      </div>
                      <span className="uppercase tracking-wider text-[9.5px] sm:text-[10px]">
                        Share via Native Device Sheet (AirDrop, Messages, Stories)
                      </span>
                    </div>
                    <ExternalLink size={13} className="gsap-badge-target text-[#3D2B1F]/50 group-hover:text-[#3D2B1F] transition-transform" />
                  </button>
                )}

                {/* Social Platform Grid with GSAP hover-scaling icons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                  {platformLinks.map((p) => {
                    const IconComponent = p.icon;
                    return (
                      <button
                        key={p.name}
                        type="button"
                        onClick={p.action}
                        onMouseEnter={handleCardMouseEnter}
                        onMouseLeave={handleCardMouseLeave}
                        className={`p-2.5 sm:p-3 rounded-2xl bg-white border border-[#3D2B1F]/10 shadow-2xs flex flex-col items-start gap-1.5 sm:gap-2 text-left transition-all ${p.color} group cursor-pointer active:scale-95`}
                      >
                        <div className="w-full flex items-center justify-between">
                          <div className="gsap-icon-target p-1.5 rounded-lg bg-[#FAF7F2] group-hover:bg-white transition-colors">
                            <IconComponent size={16} />
                          </div>
                          <span className="gsap-badge-target text-[7.5px] sm:text-[8px] uppercase tracking-wider text-[#3D2B1F]/50 font-bold truncate">
                            {p.badge}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11.5px] sm:text-xs font-semibold text-[#3D2B1F] block">{p.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Instagram Atelier Callout */}
                <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#3D2B1F]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-center gap-2.5 text-[#3D2B1F]">
                    <Instagram size={16} className="text-[#D4A373] flex-shrink-0" />
                    <span className="text-[11px] text-[#3D2B1F]/80 font-sans leading-snug">
                      Tag <strong className="font-semibold text-[#3D2B1F]">@kurush.yarn</strong> in stories or send via DM.
                    </span>
                  </div>
                  <a
                    href="https://instagram.com/kurush.yarn"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={(e) => handleButtonHover(e, 1.05)}
                    onMouseLeave={handleButtonLeave}
                    className="text-[9px] uppercase tracking-wider font-bold text-[#3D2B1F] hover:underline flex-shrink-0 cursor-pointer inline-flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>Visit @kurush.yarn</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            )}

            {/* Tab 2: QR Code */}
            {activeTab === 'qr' && (
              <div className="p-4 sm:p-6 flex flex-col items-center text-center space-y-3.5 sm:space-y-4">
                <div className="p-3 sm:p-4 bg-white rounded-2xl border border-[#3D2B1F]/15 shadow-sm inline-block">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt={`QR Code for ${product.name}`}
                      className="w-36 h-36 sm:w-44 sm:h-44 object-contain rounded-lg mx-auto"
                    />
                  ) : (
                    <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center text-xs text-[#3D2B1F]/40">
                      Generating QR...
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <p
                    className="font-editorial text-sm sm:text-base text-[#3D2B1F]"
                    style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
                  >
                    Scan with any mobile camera
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#3D2B1F]/60 max-w-xs font-sans">
                    Instantly opens Piece No. {product.number} on any phone or tablet for in-person exhibition sharing.
                  </p>
                </div>

                {qrDataUrl && (
                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    onMouseEnter={(e) => handleButtonHover(e, 1.05)}
                    onMouseLeave={handleButtonLeave}
                    className="py-2 px-4 rounded-xl border border-[#3D2B1F]/20 hover:border-[#3D2B1F] bg-white text-[#3D2B1F] text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    <Download size={13} />
                    <span>Save QR Image</span>
                  </button>
                )}
              </div>
            )}

            {/* Tab 3: Story Caption */}
            {activeTab === 'caption' && (
              <div className="p-4 sm:p-6 space-y-3">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#3D2B1F]/15 shadow-2xs text-[11.5px] sm:text-xs font-sans text-[#3D2B1F]/80 whitespace-pre-line leading-relaxed max-h-[160px] sm:max-h-[190px] overflow-y-auto select-all">
                  {fullCaptionText}
                </div>

                <button
                  type="button"
                  onClick={handleCopyCaption}
                  onMouseEnter={(e) => handleButtonHover(e, 1.02)}
                  onMouseLeave={handleButtonLeave}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer active:scale-98 ${
                    copiedCaption
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-[#3D2B1F] hover:bg-[#3D2B1F]/85 text-[#FDFCFB]'
                  }`}
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                  {copiedCaption ? (
                    <>
                      <Check size={14} />
                      <span>Caption Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Formatted Caption &amp; Story</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Fixed Bottom */}
        <div className="gsap-fade-translate-item px-5 sm:px-6 py-3.5 sm:py-4 bg-[#FAF7F2]/80 border-t border-[#3D2B1F]/10 flex items-center justify-between text-[9.5px] sm:text-[10px] text-[#3D2B1F]/60 flex-shrink-0">
          <span className="flex items-center gap-1.5">
            <Sparkles size={11} className="text-[#D4A373]" />
            <span>Kurush Yarn Atelier Exhibition</span>
          </span>
          <button
            type="button"
            onClick={handleAnimatedClose}
            onMouseEnter={(e) => handleButtonHover(e, 1.08)}
            onMouseLeave={handleButtonLeave}
            className="font-semibold uppercase tracking-wider text-[#3D2B1F] hover:opacity-75 cursor-pointer py-1 px-2"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
};

