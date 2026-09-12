import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <aside
      aria-live="polite"
      className="fixed bottom-5 left-5 z-[90] flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#3D2B1F] text-[#FDFCFB] text-xs font-medium shadow-xl border border-[#FDFCFB]/10 animate-in slide-in-from-bottom-3 duration-300 backdrop-blur-md"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
      </span>
      <WifiOff className="w-3.5 h-3.5 text-amber-300" />
      <span>Offline Mode — Cached Exhibition Available</span>
    </aside>
  );
};
