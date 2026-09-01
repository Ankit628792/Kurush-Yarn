import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../../types/product';
import { getProductPieceUrl, getAbsoluteAssetUrl } from '../../utils/url';
import QRCode from 'qrcode';
import {
  X,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Pin,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Send,
  QrCode,
  Sparkles,
  ExternalLink,
  Heart,
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
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'platforms' | 'qr' | 'caption'>('platforms');
  const [canNativeShare, setCanNativeShare] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

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

  // Detect native share capability
  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setCanNativeShare(true);
    }
  }, []);

  // Generate QR Code on mount or when product changes
  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(shareUrl, {
      width: 280,
      margin: 2,
      color: {
        dark: '#3D2B1F',
        light: '#FDFCFB'
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR code', err));
  }, [shareUrl, isOpen]);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Copy Link Handler
  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  // Copy Caption Handler
  const handleCopyCaption = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullCaptionText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = fullCaptionText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2500);
    } catch (err) {
      console.error('Failed to copy caption', err);
    }
  };

  // Native Device Share
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
          console.error('Error sharing', err);
        }
      }
    }
  };

  // Platform Links
  const platformLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'hover:bg-[#25D366]/10 hover:border-[#25D366] text-[#128C7E]',
      badge: 'Chat / Status',
      action: () => {
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
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
        const body = `Hello,\n\nI wanted to share this handcrafted textile piece from Kurush Yarn Atelier:\n\n${product.name} — Piece No. ${product.number}\n${product.subtitle}\nPrice: ${product.price}\n\nView details & craftsmanship:\n${shareUrl}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#3D2B1F]/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-250">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-lg bg-[#FDFCFB] rounded-3xl border border-[#3D2B1F]/15 shadow-2xl overflow-hidden text-[#3D2B1F] animate-in zoom-in-95 duration-250 flex flex-col my-auto"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#3D2B1F]/10 flex items-center justify-between bg-[#FAF7F2]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#3D2B1F] text-[#FDFCFB] flex items-center justify-center">
              <Share2 size={15} />
            </div>
            <div>
              <h2
                className="font-editorial text-xl text-[#3D2B1F] leading-tight"
                style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
              >
                Share Creation
              </h2>
              <p
                className="text-[9px] uppercase tracking-[0.2em] text-[#3D2B1F]/60 font-semibold"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Kurush Yarn Atelier Piece No. {product.number}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#3D2B1F]/60 hover:text-[#3D2B1F] hover:bg-[#3D2B1F]/10 transition-colors cursor-pointer"
            title="Close Share Window"
          >
            <X size={16} />
          </button>
        </div>

        {/* Product Mini Dossier Preview Card */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-[#3D2B1F]/10 shadow-sm">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F5EBE0] flex-shrink-0 border border-[#3D2B1F]/10">
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
                  className="text-[8.5px] uppercase tracking-[0.2em] text-[#3D2B1F]/60 font-bold"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                  Piece No. {product.number} • {product.categoryLabel}
                </span>
                <span className="font-editorial text-sm text-[#3D2B1F] font-medium">
                  {product.price}
                </span>
              </div>
              <h3
                className="font-editorial text-base text-[#3D2B1F] truncate leading-snug mt-0.5"
                style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
              >
                {product.name}
              </h3>
              <p className="text-[11px] text-[#3D2B1F]/70 truncate font-sans mt-0.5">
                {product.subtitle || product.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Copy Direct Link Bar */}
        <div className="px-6 pb-4">
          <label
            className="text-[9px] uppercase tracking-[0.2em] text-[#3D2B1F]/70 font-bold block mb-2"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            Direct Product Link
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-[#3D2B1F]/15 text-xs text-[#3D2B1F]/80 font-mono overflow-hidden">
              <span className="truncate selection:bg-[#3D2B1F] selection:text-white select-all">
                {shareUrl}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyLink}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm flex-shrink-0 cursor-pointer ${
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
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Direct Platforms / QR Code / Atelier Caption) */}
        <div className="px-6 border-b border-[#3D2B1F]/10 flex gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('platforms')}
            className={`pb-2.5 px-1 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'platforms'
                ? 'border-[#3D2B1F] text-[#3D2B1F]'
                : 'border-transparent text-[#3D2B1F]/50 hover:text-[#3D2B1F]'
            }`}
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            Direct Platforms
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`pb-2.5 px-1 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
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
            className={`pb-2.5 px-1 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
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

        {/* Tab 1: Direct Social Media Platforms */}
        {activeTab === 'platforms' && (
          <div className="p-6 space-y-4 max-h-[290px] overflow-y-auto" data-lenis-prevent>
            {/* Native device share button if supported */}
            {canNativeShare && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full p-3.5 rounded-2xl bg-[#3D2B1F]/5 hover:bg-[#3D2B1F]/10 border border-[#3D2B1F]/15 flex items-center justify-between text-xs font-semibold text-[#3D2B1F] transition-all group cursor-pointer"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#3D2B1F] text-white flex items-center justify-center">
                    <Share2 size={13} />
                  </div>
                  <span className="uppercase tracking-wider text-[10px]">
                    Share via Device Sheet (AirDrop, Messages, Instagram)
                  </span>
                </div>
                <ExternalLink size={13} className="text-[#3D2B1F]/50 group-hover:text-[#3D2B1F]" />
              </button>
            )}

            {/* Social Platform Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {platformLinks.map((p) => {
                const IconComponent = p.icon;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={p.action}
                    className={`p-3 rounded-2xl bg-white border border-[#3D2B1F]/10 shadow-xs flex flex-col items-start gap-2 text-left transition-all ${p.color} group cursor-pointer`}
                  >
                    <div className="w-full flex items-center justify-between">
                      <div className="p-1.5 rounded-lg bg-[#FAF7F2] group-hover:bg-white transition-colors">
                        <IconComponent size={16} />
                      </div>
                      <span className="text-[8px] uppercase tracking-wider text-[#3D2B1F]/50 font-bold">
                        {p.badge}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#3D2B1F] block">{p.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Instagram Atelier Callout */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#3D2B1F]/10 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-[#3D2B1F]">
                <Instagram size={16} className="text-[#D4A373] flex-shrink-0" />
                <span className="text-[11px] text-[#3D2B1F]/80 font-sans">
                  Tag <strong className="font-semibold text-[#3D2B1F]">@kurush.yarn</strong> in your stories or send via Instagram DM.
                </span>
              </div>
              <a
                href="https://instagram.com/kurush.yarn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] uppercase tracking-wider font-bold text-[#3D2B1F] hover:underline flex-shrink-0 cursor-pointer"
              >
                Visit @kurush.yarn
              </a>
            </div>
          </div>
        )}

        {/* Tab 2: QR Code */}
        {activeTab === 'qr' && (
          <div className="p-6 flex flex-col items-center text-center space-y-4" data-lenis-prevent>
            <div className="p-4 bg-white rounded-2xl border border-[#3D2B1F]/15 shadow-sm inline-block">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`QR Code for ${product.name}`}
                  className="w-44 h-44 object-contain rounded-lg"
                />
              ) : (
                <div className="w-44 h-44 flex items-center justify-center text-xs text-[#3D2B1F]/40">
                  Generating QR...
                </div>
              )}
            </div>

            <div className="space-y-1">
              <p
                className="font-editorial text-base text-[#3D2B1F]"
                style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
              >
                Scan with any mobile camera
              </p>
              <p className="text-xs text-[#3D2B1F]/60 max-w-xs font-sans">
                Instantly reveals Piece No. {product.number} on phones for in-person exhibition sharing.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Story Caption */}
        {activeTab === 'caption' && (
          <div className="p-6 space-y-3" data-lenis-prevent>
            <div className="p-3.5 rounded-2xl bg-white border border-[#3D2B1F]/15 shadow-sm text-xs font-sans text-[#3D2B1F]/80 whitespace-pre-line leading-relaxed max-h-[190px] overflow-y-auto select-all">
              {fullCaptionText}
            </div>

            <button
              type="button"
              onClick={handleCopyCaption}
              className={`w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
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

        {/* Footer */}
        <div className="px-6 py-4 bg-[#FAF7F2]/60 border-t border-[#3D2B1F]/10 flex items-center justify-between text-[10px] text-[#3D2B1F]/60">
          <span className="flex items-center gap-1.5">
            <Sparkles size={11} className="text-[#D4A373]" />
            <span>Kurush Yarn Atelier Exhibition</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="font-semibold uppercase tracking-wider text-[#3D2B1F] hover:opacity-75 cursor-pointer"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
