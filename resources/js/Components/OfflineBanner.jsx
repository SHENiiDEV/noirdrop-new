import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, AlertTriangle } from 'lucide-react';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    function handleOffline() {
      setIsOffline(true);
      setShowRestored(false);
    }

    function handleOnline() {
      setIsOffline(false);
      setShowRestored(true);
      const timer = setTimeout(() => setShowRestored(false), 4000);
      return () => clearTimeout(timer);
    }

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline && !showRestored) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
      {isOffline ? (
        <div className="flex items-center space-x-2.5 rounded-full border border-rose-500/40 bg-rose-950/90 px-4 py-2 text-xs font-semibold text-rose-200 shadow-2xl backdrop-blur-xl">
          <WifiOff className="h-4 w-4 text-rose-400 animate-pulse" />
          <span>Connection Disrupted. Operating in Offline Mode.</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2.5 rounded-full border border-emerald-500/40 bg-emerald-950/90 px-4 py-2 text-xs font-semibold text-emerald-200 shadow-2xl backdrop-blur-xl">
          <Wifi className="h-4 w-4 text-emerald-400" />
          <span>Network Connection Restored!</span>
        </div>
      )}
    </div>
  );
}
