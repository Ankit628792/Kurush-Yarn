import React, { useEffect, useState } from 'react';
import {
  PreloadStats,
  startGalleryImagePreload,
  subscribePreloadProgress,
  getGalleryImageUrls,
} from '../../utils/imagePreloader';
import { Check, Sparkles, Image as ImageIcon } from 'lucide-react';

export interface GalleryImagePreloaderProps {
  /** Optional custom array of image URLs; defaults to all textile imagery across products */
  images?: string[];
  /** Callback fired whenever an image finishes loading or failing */
  onProgress?: (stats: PreloadStats) => void;
  /** Callback fired when all high-resolution textile images have resolved */
  onComplete?: () => void;
  /** Whether to render a visual badge/indicator */
  showIndicator?: boolean;
  /** Positioning style when indicator is rendered */
  indicatorVariant?: 'floating' | 'inline' | 'minimal';
  /** Optional render prop for custom visualization */
  children?: (stats: PreloadStats) => React.ReactNode;
  className?: string;
}

/**
 * Custom hook to monitor gallery image preloading anywhere in the application
 */
export function useGalleryImagePreloader(customUrls?: string[]) {
  const [stats, setStats] = useState<PreloadStats>(() => {
    const urls = customUrls || getGalleryImageUrls();
    return {
      loaded: 0,
      failed: 0,
      total: urls.length,
      progress: 0,
      isComplete: false,
    };
  });

  useEffect(() => {
    // Subscribe to updates from global preloader
    const unsubscribe = subscribePreloadProgress((newStats) => {
      setStats(newStats);
    });

    // Initiate preloading in background
    startGalleryImagePreload(customUrls);

    return () => {
      unsubscribe();
    };
  }, [customUrls]);

  return stats;
}

/**
 * Lightweight image preloader component that monitors and warms the browser cache
 * for all high-resolution textile imagery in the ProductGallery.
 */
export const GalleryImagePreloader: React.FC<GalleryImagePreloaderProps> = ({
  images,
  onProgress,
  onComplete,
  showIndicator = false,
  indicatorVariant = 'inline',
  children,
  className = '',
}) => {
  const stats = useGalleryImagePreloader(images);

  useEffect(() => {
    if (onProgress) {
      onProgress(stats);
    }
    if (stats.isComplete && onComplete) {
      onComplete();
    }
  }, [stats, onProgress, onComplete]);

  // If custom render prop provided, delegate to children
  if (children) {
    return <>{children(stats)}</>;
  }

  // If no visual indicator requested, render nothing (invisible preloader)
  if (!showIndicator) {
    return null;
  }

  if (indicatorVariant === 'minimal') {
    return (
      <div
        className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 ${className}`}
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#6E3F3A] animate-pulse" />
        <span>
          {stats.isComplete
            ? `Textile Archive Ready (${stats.loaded})`
            : `Buffering Textile Imagery · ${stats.progress}%`}
        </span>
      </div>
    );
  }

  if (indicatorVariant === 'floating') {
    return (
      <div
        className={`fixed bottom-6 right-6 z-30 bg-[#FDFCFB]/95 backdrop-blur-md border border-[#3D2B1F]/15 px-4 py-2.5 rounded-full shadow-[0_8px_30px_rgba(61,43,31,0.08)] flex items-center gap-3 text-[#3D2B1F] transition-all duration-500 ${
          stats.isComplete ? 'opacity-90 hover:opacity-100' : 'opacity-100'
        } ${className}`}
      >
        {stats.isComplete ? (
          <div className="w-5 h-5 rounded-full bg-[#3D2B1F] text-[#FDFCFB] flex items-center justify-center">
            <Check size={12} strokeWidth={2.5} />
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full bg-[#6E3F3A]/10 text-[#6E3F3A] flex items-center justify-center">
            <Sparkles size={12} className="animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        )}

        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-[0.2em] font-semibold">
            {stats.isComplete ? 'Exhibition Preloaded' : 'Buffering Fiber Archive'}
          </span>
          <span className="text-[10px] text-[#3D2B1F]/60 font-sans">
            {stats.loaded} of {stats.total} pieces ready ({stats.progress}%)
          </span>
        </div>
      </div>
    );
  }

  // Inline subtle badge (e.g. for section headers)
  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#3D2B1F]/5 border border-[#3D2B1F]/10 text-[#3D2B1F] ${className}`}
    >
      <ImageIcon size={12} className="text-[#6E3F3A]" />
      <span
        className="text-[9px] uppercase tracking-[0.18em] font-medium"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        {stats.isComplete
          ? `All ${stats.total} Textile Works Cached`
          : `Buffering Works (${stats.loaded}/${stats.total})`}
      </span>
      {!stats.isComplete && (
        <div className="w-10 h-1 bg-[#3D2B1F]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#6E3F3A] transition-all duration-200"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
      )}
    </div>
  );
};
