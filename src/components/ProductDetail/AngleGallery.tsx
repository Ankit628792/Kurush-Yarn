import React, { useState } from 'react';
import { Product, ProductAngle } from '../../types/product';
import { LazyImage } from '../Common/LazyImage';
import { useReducedMotion } from '../../context/MotionContext';
import { Sparkles, Eye, RotateCw, ZoomIn } from 'lucide-react';

interface AngleGalleryProps {
  product: Product;
}

export const AngleGallery: React.FC<AngleGalleryProps> = ({ product }) => {
  const [selectedAngleIndex, setSelectedAngleIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const reducedMotion = useReducedMotion();

  const currentAngle: ProductAngle = product.gallery[selectedAngleIndex] || product.gallery[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="space-y-6">
      {/* Main Studio Viewport with LazyImage */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F7F5F2] border border-[#3D2B1F]/20 shadow-md group">
        <div
          onMouseMove={handleMouseMove}
          onClick={() => setIsZoomed(!isZoomed)}
          className={`w-full h-full cursor-zoom-in relative overflow-hidden transition-all duration-300 ${
            isZoomed ? 'cursor-zoom-out' : ''
          }`}
        >
          <LazyImage
            src={currentAngle.src}
            alt={currentAngle.alt}
            aspectRatio="aspect-square"
            style={{
              transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
              transform: isZoomed ? (reducedMotion ? 'scale(1.5)' : 'scale(2.2)') : 'scale(1)'
            }}
            className={`w-full h-full object-cover transition-transform ${
              reducedMotion ? 'duration-0' : 'duration-200 ease-out'
            }`}
          />
        </div>

        {/* Viewport Floating Info */}
        <div className="absolute top-4 left-4 pointer-events-none z-10">
          <span
            className="bg-[#FFFFFF]/90 backdrop-blur-md text-[#3D2B1F] text-[9px] uppercase tracking-[0.25em] font-semibold px-3 py-1.5 rounded-full border border-[#3D2B1F]/10 shadow-sm flex items-center gap-2"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <Eye size={12} className="text-[#3D2B1F]" />
            {currentAngle.label}
          </span>
        </div>

        {/* Zoom Hint Button */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute bottom-4 right-4 bg-[#FFFFFF]/90 backdrop-blur-md text-[#3D2B1F] hover:bg-[#FFFFFF] text-[10px] uppercase tracking-[0.2em] font-medium px-4 py-2 rounded-full border border-[#3D2B1F]/10 shadow-sm flex items-center gap-1.5 transition-all"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          <ZoomIn size={12} />
          <span>{isZoomed ? 'Reset View' : 'Inspect Stitches'}</span>
        </button>
      </div>

      {/* Angle Selector Thumbnails */}
      <div className="space-y-2">
        <div
          className="flex items-center justify-between text-[10px] text-[#3D2B1F]/70 uppercase tracking-wider font-semibold"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          <span className="flex items-center gap-1.5">
            <RotateCw size={12} className="text-[#3D2B1F]" /> Studio Angle Sequence
          </span>
          <span>
            {selectedAngleIndex + 1} of {product.gallery.length} Perspective Views
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {product.gallery.map((angle, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedAngleIndex(idx);
                setIsZoomed(false);
              }}
              className={`p-2 rounded-xl border text-left transition-all duration-300 flex items-center gap-3 ${
                selectedAngleIndex === idx
                  ? 'bg-white border-[#3D2B1F] shadow-sm ring-1 ring-[#3D2B1F]'
                  : 'bg-[#F7F5F2] border-[#3D2B1F]/15 hover:border-[#3D2B1F]/40'
              }`}
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#F7F5F2] flex-shrink-0 border border-[#3D2B1F]/10">
                <LazyImage src={angle.src} alt={angle.alt} className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <span
                  className="text-[11px] font-semibold text-[#3D2B1F] block truncate"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                >
                  {angle.label}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#3D2B1F]/60 block truncate">
                  {angle.type}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Angle Description Callout */}
      {currentAngle.description && (
        <div className="p-4 rounded-xl bg-white border border-[#3D2B1F]/10 text-xs text-[#3D2B1F]/80 flex items-start gap-2.5 shadow-sm">
          <Sparkles size={13} className="text-[#D4A373] flex-shrink-0 mt-0.5" />
          <p className="font-sans leading-relaxed">{currentAngle.description}</p>
        </div>
      )}
    </div>
  );
};
