import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AtelierPasskeyGate } from '../components/Analytics/AtelierPasskeyGate';
import { VisitorsAnalyticsView } from '../components/Analytics/VisitorsAnalyticsView';
import { usePageSEO } from '../hooks/useSEO';

export const VisitorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('kurush_analytics_auth') === 'unlocked';
  });

  usePageSEO({ route: 'visitors' });

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleLock = () => {
    sessionStorage.removeItem('kurush_analytics_auth');
    setIsUnlocked(false);
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  const handleSelectProduct = (slug: string) => {
    navigate(`/product/${slug}`);
  };

  if (!isUnlocked) {
    return (
      <AtelierPasskeyGate
        onUnlock={handleUnlock}
        onReturnHome={handleReturnHome}
      />
    );
  }

  return (
    <VisitorsAnalyticsView
      onBackToCatalog={handleReturnHome}
      onSelectProduct={handleSelectProduct}
      onLock={handleLock}
    />
  );
};
