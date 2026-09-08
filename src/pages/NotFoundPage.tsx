import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, ArrowUpRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#3D2B1F] flex items-center justify-center px-6 py-28">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#3D2B1F]/5 mx-auto flex items-center justify-center text-[#3D2B1F]/70">
          <Compass size={28} />
        </div>

        <div className="space-y-2">
          <span
            className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#3D2B1F]/60 block"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            404 / Missing Artifact
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#3D2B1F]">
            Exhibition Room Not Found
          </h1>
          <p className="text-sm text-[#3D2B1F]/70 leading-relaxed font-serif">
            The textile artifact, salon gallery, or atelier document you requested does not exist or has been reorganized in our archive.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3D2B1F] text-[#FDFCFB] px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#3D2B1F]/85 transition-all shadow-sm"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <span>Browse Collection</span>
            <ArrowUpRight size={14} />
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#3D2B1F]/20 text-[#3D2B1F] px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#3D2B1F]/5 transition-all"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <ArrowLeft size={14} />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
