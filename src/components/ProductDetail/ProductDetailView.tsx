import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Product } from '../../types/product';
import { AngleGallery } from './AngleGallery';
import { ShareModal } from './ShareModal';
import { products } from '../../data/products';
import { useProductSEO } from '../../hooks/useSEO';
import { ErrorBoundary } from '../Common/ErrorBoundary';
import { getProductPieceUrl, getAbsoluteAssetUrl } from '../../utils/url';
import {
  X,
  ArrowLeft,
  ArrowRight,
  Heart,
  Sparkles,
  Layers,
  ShieldCheck,
  Feather,
  Instagram,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Pin,
  Twitter
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onInquire: (product: Product) => void;
  isSaved?: boolean;
  onToggleSave?: (productId: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onClose,
  onSelectProduct,
  onInquire,
  isSaved = false,
  onToggleSave
}) => {
  const modalScrollerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const mainContentRef = useRef<HTMLElement | null>(null);
  const isClosingRef = useRef(false);

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copiedQuickLink, setCopiedQuickLink] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants && product.variants.length > 0 ? product.variants[0].name : ''
  );
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);

  // Sync selected variant when product changes
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0].name);
    } else {
      setSelectedVariant('');
    }
    setActiveGalleryIndex(0);
  }, [product.id]);

  const handleSelectVariant = (variantName: string) => {
    setSelectedVariant(variantName);
    if (!product.variants || !product.gallery) return;
    const targetVariant = product.variants.find((v) => v.name === variantName);
    if (targetVariant && targetVariant.images.length > 0) {
      const imgPath = targetVariant.images[0];
      const matchIndex = product.gallery.findIndex((g) => g.src === imgPath);
      if (matchIndex !== -1) {
        setActiveGalleryIndex(matchIndex);
      }
    }
  };

  // Dynamically update document head, OpenGraph, and Twitter tags for this product
  useProductSEO(product);

  // Find current index for prev/next navigation
  const currentIndex = products.findIndex((p) => p.id === product.id);
  const prevProduct = products[(currentIndex - 1 + products.length) % products.length];
  const nextProduct = products[(currentIndex + 1) % products.length];

  // GSAP Entrance Animation: Smooth fade-in and subtle scale-up on mount & product switch
  useEffect(() => {
    if (!modalScrollerRef.current || !mainContentRef.current) return;

    isClosingRef.current = false;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // Set initial starting states
      gsap.set(modalScrollerRef.current, {
        opacity: 0
      });
      gsap.set(mainContentRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 24,
        transformOrigin: '50% 20%'
      });

      if (headerRef.current) {
        gsap.set(headerRef.current, {
          opacity: 0,
          y: -15
        });
      }

      // 1. Fade in the backdrop overlay
      tl.to(modalScrollerRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      })
      // 2. Animate modal content: fade in and subtly scale up
      .to(
        mainContentRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          clearProps: 'transform' // Clear inline transform so sticky gallery & children layout accurately
        },
        '-=0.25'
      );

      // 3. Stagger header controls smoothly
      if (headerRef.current) {
        tl.to(
          headerRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            clearProps: 'transform'
          },
          '-=0.5'
        );
      }
    }, modalScrollerRef);

    return () => {
      ctx.revert();
    };
  }, [product.id]);

  // Smooth exit animation
  const handleAnimatedClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    if (!modalScrollerRef.current || !mainContentRef.current) {
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
      }
    });

    tl.to(mainContentRef.current, {
      opacity: 0,
      scale: 0.97,
      y: 16,
      duration: 0.25,
      ease: 'power2.in'
    })
    .to(
      modalScrollerRef.current,
      {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in'
      },
      '-=0.15'
    );
  };

  // Quick link copy
  const handleQuickCopyLink = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const shareUrl = getProductPieceUrl(product.slug);

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
      setCopiedQuickLink(true);
      setTimeout(() => setCopiedQuickLink(false), 2200);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  // Quick WhatsApp Share
  const handleQuickWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = getProductPieceUrl(product.slug);
    const text = `🧶 Discover "${product.name}" (Piece No. ${product.number}) — Handcrafted crochet ${product.categoryLabel.toLowerCase()} by Kurush Yarn Atelier:\n\n${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  // Quick Pinterest Share
  const handleQuickPinterest = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = getProductPieceUrl(product.slug);
    const fullImageUrl = getAbsoluteAssetUrl(product.heroImage);
    const text = `${product.name} — Handcrafted Crochet Piece No. ${product.number} | Kurush Yarn Atelier`;
    const pinUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      shareUrl
    )}&media=${encodeURIComponent(fullImageUrl)}&description=${encodeURIComponent(text)}`;
    window.open(pinUrl, '_blank', 'noopener,noreferrer');
  };

  // Lock body scroll and listen for escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (shareModalOpen) {
          setShareModalOpen(false);
        } else {
          handleAnimatedClose();
        }
      }
      if (!shareModalOpen) {
        if (e.key === 'ArrowLeft') onSelectProduct(prevProduct);
        if (e.key === 'ArrowRight') onSelectProduct(nextProduct);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onSelectProduct, prevProduct, nextProduct, shareModalOpen]);

  return (
    <div
      ref={modalScrollerRef}
      data-lenis-prevent
      tabIndex={-1}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#FDFCFB]/95 backdrop-blur-xl flex flex-col justify-between selection:bg-[#3D2B1F] selection:text-[#FDFCFB] text-[#3D2B1F] scroll-smooth outline-none"
    >
      {/* Top Floating Control Bar */}
      <header
        ref={headerRef}
        className="sticky top-0 z-30 bg-[#FDFCFB]/85 backdrop-blur-md border-b border-[#3D2B1F]/15 px-6 md:px-12 py-4 flex items-center justify-between"
      >
        <button
          type="button"
          onClick={handleAnimatedClose}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#3D2B1F] hover:opacity-60 transition-opacity py-2 cursor-pointer"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Exhibition</span>
        </button>

        {/* Center Product Indicator */}
        <div className="hidden sm:flex items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <span>Piece No. {product.number}</span>
          <span className="w-1 h-1 rounded-full bg-[#3D2B1F]" />
          <span>{product.categoryLabel}</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShareModalOpen(true)}
            className="p-2.5 rounded-full bg-white text-[#3D2B1F] border border-[#3D2B1F]/20 hover:border-[#3D2B1F] hover:bg-[#FAF7F2] transition-all flex items-center gap-1.5 shadow-xs group cursor-pointer"
            title="Share Creation to Social Media or Copy Link"
          >
            <Share2 size={14} className="group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline text-[9px] uppercase tracking-wider font-semibold pr-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              Share
            </span>
          </button>

          {onToggleSave && (
            <button
              type="button"
              onClick={() => onToggleSave(product.id)}
              className={`p-2.5 rounded-full border transition-all cursor-pointer transform active:scale-90 hover:scale-105 shadow-sm ${
                isSaved
                  ? 'bg-[#3D2B1F] text-[#FDFCFB] border-[#3D2B1F]'
                  : 'bg-white text-[#3D2B1F] border-[#3D2B1F]/20 hover:border-[#3D2B1F]'
              }`}
              title={isSaved ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={14} className={isSaved ? 'fill-current text-[#FDFCFB]' : 'text-[#3D2B1F]'} />
            </button>
          )}

          <button
            type="button"
            onClick={handleAnimatedClose}
            className="p-2.5 rounded-full bg-[#3D2B1F] text-[#FDFCFB] hover:bg-[#3D2B1F]/80 transition-colors cursor-pointer"
            title="Close View"
          >
            <X size={15} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        ref={mainContentRef}
        className="max-w-7xl mx-auto w-full px-6 md:px-12 py-10 flex-grow"
      >
        <ErrorBoundary sectionName="Product Detail Exhibition View" isolateSection={true}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Multi-Angle Studio Gallery with Scroll-Driven Parallax Sequence */}
            <div className="lg:col-span-6 lg:sticky lg:top-24 z-10">
              <AngleGallery
                product={product}
                scrollerRef={modalScrollerRef}
                activeImageIndex={activeGalleryIndex}
                onImageIndexChange={(idx) => {
                  setActiveGalleryIndex(idx);
                  // Check if this image matches any variant
                  if (product.variants && product.gallery && product.gallery[idx]) {
                    const activeSrc = product.gallery[idx].src;
                    const matchedVariant = product.variants.find((v) => v.images.includes(activeSrc));
                    if (matchedVariant) {
                      setSelectedVariant(matchedVariant.name);
                    }
                  }
                }}
              />
            </div>

            {/* Right Column: Editorial Dossier, Story, Craft Specifications */}
            <div className="lg:col-span-6 space-y-8">
            {/* Header Title Block */}
            <div className="space-y-3 border-b border-[#3D2B1F]/15 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  {product.edition || 'Atelier Series'}
                </span>
                <span className="font-editorial text-2xl text-[#3D2B1F]">
                  {product.price}
                </span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl text-[#3D2B1F] leading-tight" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
                {product.name}
              </h1>

              <p className="text-xs uppercase tracking-[0.2em] text-[#3D2B1F]/70 font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                {product.subtitle}
              </p>
            </div>

            {/* Color Variant Selector (If Product Has Multiple Color Options) */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3 bg-white p-5 rounded-2xl border border-[#3D2B1F]/15 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F]/70 font-bold block" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    Color Variant
                  </span>
                  <span className="text-xs font-semibold text-[#3D2B1F]">
                    {selectedVariant || product.variants[0].name}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant === v.name;
                    return (
                      <button
                        key={v.name}
                        type="button"
                        onClick={() => handleSelectVariant(v.name)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2.5 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#3D2B1F] text-[#FDFCFB] border-[#3D2B1F] shadow-sm'
                            : 'bg-[#F7F5F2] hover:bg-[#EFECE6] text-[#3D2B1F] border-[#3D2B1F]/15'
                        }`}
                      >
                        {v.images[0] && (
                          <img
                            src={v.images[0]}
                            alt={v.name}
                            className="w-4 h-4 rounded-full object-cover border border-white/40"
                          />
                        )}
                        <span>{v.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Narrative Story */}
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-bold flex items-center gap-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <Feather size={13} className="text-[#3D2B1F]" /> The Object Narrative
              </h3>
              <p className="text-[#3D2B1F]/85 text-base leading-relaxed font-normal font-sans">
                {product.description}
              </p>
              <div className="p-4 rounded-xl bg-white border-l-2 border-[#3D2B1F] text-sm italic text-[#3D2B1F]/80 shadow-sm">
                "{product.details.story}"
              </div>
            </div>

            {/* Tactile Craft Blueprint & Metrics */}
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-bold flex items-center gap-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <Sparkles size={13} className="text-[#3D2B1F]" /> Craft Technical Specifications
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#3D2B1F]/15 shadow-sm">
                  <span className="text-[9px] uppercase tracking-wider text-[#3D2B1F]/60 block font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    Stitch Count
                  </span>
                  <span className="font-editorial text-xl text-[#3D2B1F] block mt-1" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
                    {product.stitchCount}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#3D2B1F]/15 shadow-sm">
                  <span className="text-[9px] uppercase tracking-wider text-[#3D2B1F]/60 block font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    Atelier Time
                  </span>
                  <span className="font-editorial text-xl text-[#3D2B1F] block mt-1" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
                    {product.craftTime}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#3D2B1F]/15 shadow-sm col-span-2 sm:col-span-1">
                  <span className="text-[9px] uppercase tracking-wider text-[#3D2B1F]/60 block font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                    Physical Weight
                  </span>
                  <span className="font-editorial text-xl text-[#3D2B1F] block mt-1" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
                    {product.weight}
                  </span>
                </div>
              </div>
            </div>

            {/* Material & Fiber Origins Table */}
            <div className="space-y-3 bg-white p-6 rounded-2xl border border-[#3D2B1F]/15 shadow-sm">
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F] font-bold flex items-center gap-2" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <Layers size={13} className="text-[#3D2B1F]" /> Material Composition
              </h4>

              <div className="divide-y divide-[#3D2B1F]/10 text-xs text-[#3D2B1F] font-sans">
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#3D2B1F]/60">Yarn &amp; Fibers</span>
                  <span className="font-semibold text-right max-w-[60%]">{product.material}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#3D2B1F]/60">Dimensions</span>
                  <span className="font-semibold text-right">{product.dimensions}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#3D2B1F]/60">Fiber Origin</span>
                  <span className="font-semibold text-right max-w-[60%]">{product.details.fiberOrigin}</span>
                </div>
                {product.details.hardware && (
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#3D2B1F]/60">Hardware</span>
                    <span className="font-semibold text-right max-w-[60%]">{product.details.hardware}</span>
                  </div>
                )}
                <div className="py-2.5 flex justify-between">
                  <span className="text-[#3D2B1F]/60">Care Routine</span>
                  <span className="font-semibold text-right max-w-[60%]">{product.details.careInstructions}</span>
                </div>
              </div>
            </div>

            {/* Color Palette Swatches */}
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-semibold block" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                Artisan Dye Palette
              </span>
              <div className="flex items-center gap-3">
                {product.palette.map((color, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border border-black/10 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[10px] font-mono text-[#3D2B1F]/70">{color}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={() => onInquire(product)}
                className="w-full sm:w-auto flex-1 bg-[#3D2B1F] hover:bg-[#3D2B1F]/85 text-[#FDFCFB] py-4 px-8 rounded-full text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <Instagram size={14} />
                <span>Inquire on Instagram (@kurush.yarn)</span>
                <Sparkles size={12} />
              </button>

              <button
                type="button"
                onClick={() => onToggleSave && onToggleSave(product.id)}
                className="w-full sm:w-auto py-4 px-6 rounded-full border border-[#3D2B1F]/25 hover:border-[#3D2B1F] hover:bg-white text-[#3D2B1F] text-[10px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                <Heart size={14} className={isSaved ? 'fill-[#3D2B1F] text-[#3D2B1F]' : 'text-[#3D2B1F]'} />
                <span>{isSaved ? 'Favorited Piece' : 'Add to Favorites'}</span>
              </button>
            </div>

            {/* Social Media Sharing & Deep Link Bar */}
            <div className="p-5 rounded-2xl bg-white border border-[#3D2B1F]/15 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#3D2B1F] font-bold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  <Share2 size={13} className="text-[#3D2B1F]" />
                  <span>Share This Creation</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShareModalOpen(true)}
                  className="text-[9px] uppercase tracking-[0.15em] font-bold text-[#3D2B1F]/70 hover:text-[#3D2B1F] hover:underline cursor-pointer"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                  More Platforms / QR →
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {/* 1. Quick Copy Link Button */}
                <button
                  type="button"
                  onClick={handleQuickCopyLink}
                  className={`flex-1 min-w-[130px] py-2.5 px-3.5 rounded-xl border text-[10px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer ${
                    copiedQuickLink
                      ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                      : 'bg-[#FAF7F2] hover:bg-white text-[#3D2B1F] border-[#3D2B1F]/15 hover:border-[#3D2B1F]'
                  }`}
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  title="Copy link to this handcrafted piece"
                >
                  {copiedQuickLink ? (
                    <>
                      <Check size={13} />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                {/* 2. Direct WhatsApp Button */}
                <button
                  type="button"
                  onClick={handleQuickWhatsApp}
                  className="py-2.5 px-3.5 rounded-xl bg-[#FAF7F2] hover:bg-[#25D366]/10 text-[#128C7E] border border-[#3D2B1F]/15 hover:border-[#25D366] text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  title="Share directly via WhatsApp"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp</span>
                </button>

                {/* 3. Direct Pinterest Button */}
                <button
                  type="button"
                  onClick={handleQuickPinterest}
                  className="py-2.5 px-3.5 rounded-xl bg-[#FAF7F2] hover:bg-[#E60023]/10 text-[#BD081C] border border-[#3D2B1F]/15 hover:border-[#E60023] text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  title="Save Pin on Pinterest"
                >
                  <Pin size={14} />
                  <span>Pin</span>
                </button>

                {/* 4. Full Modal Trigger */}
                <button
                  type="button"
                  onClick={() => setShareModalOpen(true)}
                  className="py-2.5 px-3 rounded-xl bg-[#3D2B1F] text-[#FDFCFB] hover:bg-[#3D2B1F]/85 text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1 transition-all shadow-2xs cursor-pointer"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  title="Open full share dialog with QR code and all platforms"
                >
                  <Share2 size={13} />
                  <span className="hidden sm:inline">All</span>
                </button>
              </div>
            </div>

            {/* Studio Guarantee */}
            <div className="p-4 rounded-xl bg-white border border-[#3D2B1F]/15 flex items-center gap-3 text-xs text-[#3D2B1F]/75 font-sans shadow-sm">
              <ShieldCheck size={18} className="text-[#D4A373] flex-shrink-0" />
              <span>
                Each Kurush Yarn creation is hand-checked, steam-stabilized, and delivered in a protective cotton dust pouch with a signed atelier certificate of authenticity.
              </span>
            </div>
          </div>
        </div>
      </ErrorBoundary>

        {/* Exhibition Next/Prev Walkthrough Bar */}
        <div className="mt-20 pt-8 border-t border-[#3D2B1F]/15 flex items-center justify-between">
          <button
            onClick={() => onSelectProduct(prevProduct)}
            className="flex items-center gap-3 text-left group hover:opacity-75 transition-opacity"
          >
            <div className="p-3 rounded-full bg-white border border-[#3D2B1F]/15 group-hover:bg-[#3D2B1F] group-hover:text-white transition-all shadow-sm">
              <ArrowLeft size={14} />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 block font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Previous Piece</span>
              <span className="font-editorial text-lg text-[#3D2B1F] transition-colors" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
                {prevProduct.name}
              </span>
            </div>
          </button>

          <button
            onClick={() => onSelectProduct(nextProduct)}
            className="flex items-center gap-3 text-right group hover:opacity-75 transition-opacity"
          >
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 block font-semibold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Next Piece</span>
              <span className="font-editorial text-lg text-[#3D2B1F] transition-colors" style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}>
                {nextProduct.name}
              </span>
            </div>
            <div className="p-3 rounded-full bg-white border border-[#3D2B1F]/15 group-hover:bg-[#3D2B1F] group-hover:text-white transition-all shadow-sm">
              <ArrowRight size={14} />
            </div>
          </button>
        </div>
      </main>

      {/* Social Media Sharing Modal */}
      <ShareModal
        product={product}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
};
