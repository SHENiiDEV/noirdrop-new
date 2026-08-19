import React, { useState, useEffect } from 'react';
import { Cookie, X, Check, ShieldCheck, Settings } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('noirdrop_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('noirdrop_cookie_consent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('noirdrop_cookie_consent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 left-5 md:left-auto md:max-w-md z-50 animate-in slide-in-from-bottom-6 duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/95 p-5 shadow-2xl backdrop-blur-2xl text-zinc-100">
        
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-purple-600/20 blur-2xl" />

        <div className="flex items-start justify-between space-x-3">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400">
              <Cookie className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Cookie & Privacy Choices</h4>
              <span className="text-[10px] text-purple-300 font-semibold">HARTDELL LIMITED (UK)</span>
            </div>
          </div>

          <button
            onClick={handleEssentialOnly}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
          We use essential cookies to maintain your authenticated session and secure token balance. Read our{' '}
          <Link href={route('legal.privacy')} className="text-purple-400 hover:underline">
            Privacy Policy
          </Link>.
        </p>

        {showDetails && (
          <div className="mt-3 space-y-2 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-xs text-zinc-300">
            <div className="flex items-center justify-between">
              <span>Essential Session & Security</span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase">Required</span>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-800 pt-2">
              <span>Performance & Analytics</span>
              <span className="text-[10px] font-semibold text-zinc-400">Optional</span>
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="flex-1 flex items-center justify-center space-x-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-2.5 px-3 text-xs font-bold text-white shadow-lg shadow-purple-600/25 hover:opacity-95 transition"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Accept All</span>
          </button>

          <button
            type="button"
            onClick={handleEssentialOnly}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-xs font-semibold text-zinc-300 hover:border-zinc-700 hover:text-white transition"
          >
            Essential Only
          </button>

          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-zinc-400 hover:text-white transition"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
