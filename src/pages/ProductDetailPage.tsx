import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductDetailView } from '../components/ProductDetail/ProductDetailView';
import { analyticsTracker } from '../utils/analyticsTracker';
import { useProductSEO } from '../hooks/useSEO';
import { ArrowLeft, Sparkles, Compass } from 'lucide-react';
import { Product } from '../types/product';

interface ProductDetailPageProps {
  savedProductIds: string[];
  onToggleSave: (id: string) => void;
  onOpenInquiry: (product?: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  savedProductIds,
  onToggleSave,
  onOpenInquiry
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find product by slug, id, or number
  const product = products.find((p) => {
    if (!slug) return false;
    const cleanSlug = slug.toLowerCase();
    return (
      p.slug.toLowerCase() === cleanSlug ||
      p.id.toLowerCase() === cleanSlug ||
      p.number === cleanSlug ||
      `piece-${p.number}` === cleanSlug
    );
  });

  // Dynamic SEO for this product
  useProductSEO(product || null);

  // Track product view in analytics
  useEffect(() => {
    if (product) {
      analyticsTracker.trackProductView(product);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] text-[#3D2B1F] flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#3D2B1F]/5 mx-auto flex items-center justify-center text-[#3D2B1F]">
            <Compass size={28} className="opacity-70" />
          </div>
          <div className="space-y-2">
            <span
              className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#3D2B1F]/60 block"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Archival Inquiry
            </span>
            <h1 className="text-2xl md:text-3xl font-serif text-[#3D2B1F]">
              Piece Not Found
            </h1>
            <p className="text-sm text-[#3D2B1F]/70 leading-relaxed font-serif">
              The textile piece or artifact you are looking for may have been re-cataloged or retired to the atelier archive.
            </p>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3D2B1F] text-[#FDFCFB] px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#3D2B1F]/85 transition-all shadow-sm"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <ArrowLeft size={14} />
              <span>Browse Collection</span>
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#3D2B1F]/20 text-[#3D2B1F] px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#3D2B1F]/5 transition-all"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleClose = () => {
    // If the user arrived from elsewhere in the app, go back; otherwise go to /works
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/works');
    }
  };

  const handleSelectProduct = (nextProduct: Product) => {
    navigate(`/product/${nextProduct.slug}`);
  };

  return (
    <ProductDetailView
      product={product}
      onClose={handleClose}
      onSelectProduct={handleSelectProduct}
      onInquire={onOpenInquiry}
      isSaved={savedProductIds.includes(product.id)}
      onToggleSave={onToggleSave}
    />
  );
};
