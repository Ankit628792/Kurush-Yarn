import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { ProductDetailView } from '../components/ProductDetail/ProductDetailView';
import { analyticsTracker } from '../utils/analyticsTracker';
import { useProductSEO } from '../hooks/useSEO';
import { Product } from '../types/product';
import { NotFoundPage } from './NotFoundPage';

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
    let cleanSlug = '';
    try {
      cleanSlug = decodeURIComponent(slug).toLowerCase().trim().replace(/^\/+|\/+$/g, '');
    } catch {
      cleanSlug = slug.toLowerCase().trim();
    }
    return (
      p.slug.toLowerCase() === cleanSlug ||
      p.id.toLowerCase() === cleanSlug ||
      p.number === cleanSlug ||
      `piece-${p.number}` === cleanSlug ||
      `piece-${parseInt(p.number, 10)}` === cleanSlug ||
      parseInt(p.number, 10).toString() === cleanSlug
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
      <NotFoundPage
        missingType="piece"
        missingIdentifier={slug}
        onOpenInquiry={() => onOpenInquiry()}
      />
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
