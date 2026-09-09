import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Compass,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Search,
  Instagram,
  Layers,
  Feather,
  Clock,
  Heart
} from 'lucide-react';
import { products } from '../data/products';
import { LazyImage } from '../components/Common/LazyImage';
import { useSEO } from '../hooks/useSEO';
import { getInstagramHandle, getInstagramUrl } from '../utils/url';

export interface NotFoundPageProps {
  missingType?: 'page' | 'piece' | 'collection';
  missingIdentifier?: string;
  onOpenInquiry?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  missingType = 'page',
  missingIdentifier,
  onOpenInquiry
}) => {
  const navigate = useNavigate();
  const [quickSearch, setQuickSearch] = useState('');

  // SEO configuration for 404
  useSEO({
    title: '404 — Exhibition Artifact Not Found | Kurush Yarn Atelier',
    description: 'The requested exhibition room, textile piece, or atelier document is not located in our active archive.',
    robots: 'noindex, follow'
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/works?search=${encodeURIComponent(quickSearch.trim())}`);
    } else {
      navigate('/works');
    }
  };

  // Curated fallback pieces to recommend to visitors
  const featuredPieces = products.slice(0, 3);
  const instagramHandle = getInstagramHandle();
  const instagramUrl = getInstagramUrl();

  return (
    <div
      className="min-h-screen bg-[#FDFCFB] text-[#3D2B1F] px-4 sm:px-6 md:px-12 py-24 sm:py-32 relative overflow-hidden"
      id="not-found-exhibition-page"
    >
      {/* Decorative ambient background accents */}
      <div
        className="absolute top-20 right-10 w-80 h-80 bg-[#E3D5CA]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 left-10 w-96 h-96 bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Main 404 Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto space-y-6"
        >
          {/* Status Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D2B1F]/5 border border-[#3D2B1F]/10 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#3D2B1F]/70">
            <Compass size={13} className="text-[#D4A373]" />
            <span>404 / Missing Archival Room</span>
          </div>

          {/* Large Editorial Headline */}
          <div className="space-y-3">
            <h1
              className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#3D2B1F] tracking-tight leading-tight"
              style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
            >
              {missingType === 'piece' && missingIdentifier
                ? `Artifact "${missingIdentifier}" Not Found`
                : 'Exhibition Room Not Found'}
            </h1>
            <p className="text-sm sm:text-base text-[#3D2B1F]/75 font-serif leading-relaxed max-w-xl mx-auto">
              {missingType === 'piece'
                ? 'The specific handcrafted creation you requested may have been reorganized into our private collection or cataloged under a different series number.'
                : 'The salon gallery, botanical piece, or atelier path you navigated to does not exist in our active collection.'}
            </p>
          </div>

          {/* Search Archival Collection Directly */}
          <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto relative pt-2">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D2B1F]/40 pointer-events-none mt-1" />
            <input
              type="text"
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              placeholder="Search botanical pieces, series number, fibers..."
              className="w-full bg-white border border-[#3D2B1F]/20 rounded-full pl-11 pr-24 py-3 text-xs text-[#3D2B1F] placeholder:text-[#3D2B1F]/40 focus:outline-none focus:border-[#3D2B1F] shadow-sm font-sans"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#3D2B1F] hover:bg-[#2A1D15] text-[#FDFCFB] px-4 py-2 rounded-full text-[9.5px] uppercase tracking-wider font-semibold transition-all mt-1 cursor-pointer"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Search
            </button>
          </form>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3D2B1F] hover:bg-[#2A1D15] text-[#FDFCFB] px-7 py-3.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-medium transition-all shadow-md cursor-pointer"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <span>Explore Permanent Collection</span>
              <ArrowUpRight size={14} />
            </Link>

            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#3D2B1F]/20 hover:border-[#3D2B1F] hover:bg-white text-[#3D2B1F] px-6 py-3.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-medium transition-all cursor-pointer"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <ArrowLeft size={14} />
              <span>Return to Salon</span>
            </Link>
          </div>
        </motion.div>

        {/* Curated Archive Quick Directory */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6 border-t border-[#3D2B1F]/10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span
                className="text-[9.5px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-semibold block"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Atelier Directory
              </span>
              <h2
                className="font-editorial text-xl text-[#3D2B1F]"
                style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
              >
                Key Exhibition Rooms
              </h2>
            </div>

            {onOpenInquiry ? (
              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-1.5 text-xs text-[#3D2B1F]/70 hover:text-[#3D2B1F] hover:underline cursor-pointer"
              >
                <Instagram size={13} />
                <span>Contact Atelier Concierge</span>
              </button>
            ) : (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#3D2B1F]/70 hover:text-[#3D2B1F] hover:underline cursor-pointer"
              >
                <Instagram size={13} />
                <span>Contact Atelier ({instagramHandle})</span>
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <Link
              to="/works"
              className="p-4 rounded-2xl bg-white border border-[#3D2B1F]/15 hover:border-[#3D2B1F]/40 hover:shadow-md transition-all group"
            >
              <Layers size={18} className="text-[#D4A373] mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-semibold text-[#3D2B1F] font-serif">Permanent Works</div>
              <div className="text-[10px] text-[#3D2B1F]/60 font-sans mt-0.5">22 Handcrafted Pieces</div>
            </Link>

            <Link
              to="/material"
              className="p-4 rounded-2xl bg-white border border-[#3D2B1F]/15 hover:border-[#3D2B1F]/40 hover:shadow-md transition-all group"
            >
              <Feather size={18} className="text-[#D4A373] mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-semibold text-[#3D2B1F] font-serif">Fiber Materiality</div>
              <div className="text-[10px] text-[#3D2B1F]/60 font-sans mt-0.5">Merino &amp; Combed Cotton</div>
            </Link>

            <Link
              to="/process"
              className="p-4 rounded-2xl bg-white border border-[#3D2B1F]/15 hover:border-[#3D2B1F]/40 hover:shadow-md transition-all group"
            >
              <Clock size={18} className="text-[#D4A373] mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-semibold text-[#3D2B1F] font-serif">Atelier Process</div>
              <div className="text-[10px] text-[#3D2B1F]/60 font-sans mt-0.5">Slow Handcraft Heritage</div>
            </Link>

            <Link
              to="/saved"
              className="p-4 rounded-2xl bg-white border border-[#3D2B1F]/15 hover:border-[#3D2B1F]/40 hover:shadow-md transition-all group"
            >
              <Heart size={18} className="text-[#D4A373] mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-semibold text-[#3D2B1F] font-serif">Curated Favorites</div>
              <div className="text-[10px] text-[#3D2B1F]/60 font-sans mt-0.5">Personal Salon Selection</div>
            </Link>
          </div>
        </motion.div>

        {/* Recommended Archival Pieces Preview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6 border-t border-[#3D2B1F]/10 space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <span
                className="text-[9.5px] uppercase tracking-[0.25em] text-[#3D2B1F]/60 font-semibold block"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              >
                Selected Highlights
              </span>
              <h2
                className="font-editorial text-xl sm:text-2xl text-[#3D2B1F]"
                style={{ fontFamily: 'Georgia, "Playfair Display", serif' }}
              >
                Discover Archival Creations
              </h2>
            </div>

            <Link
              to="/works"
              className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3D2B1F] hover:text-[#D4A373] transition-colors inline-flex items-center gap-1"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <span>View All 22</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredPieces.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.slug}`}
                className="group bg-white rounded-2xl border border-[#3D2B1F]/15 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-[#FAF7F2]">
                  <LazyImage
                    src={p.heroImage || p.originalImage}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[9px] font-mono text-[#3D2B1F] border border-[#3D2B1F]/10">
                    No. {p.number}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#3D2B1F]/60 block font-sans">
                      {p.categoryLabel || p.category}
                    </span>
                    <h3 className="font-editorial text-sm sm:text-base text-[#3D2B1F] group-hover:text-[#D4A373] transition-colors">
                      {p.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#3D2B1F]/10">
                    <span className="font-mono text-[11px] text-[#3D2B1F]/80">{p.price}</span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#3D2B1F] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      <span>Examine</span>
                      <ArrowUpRight size={10} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
