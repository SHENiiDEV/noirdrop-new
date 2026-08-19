import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, CURRENCIES } from './CurrencyContext';
import { ChevronDown, Globe } from 'lucide-react';

export default function CurrencySwitcher() {
  const { currency, setCurrency, currentCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center space-x-2 rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:border-purple-500/50 hover:bg-zinc-800 transition shadow-lg backdrop-blur-md"
      >
        <span className="text-sm">{currentCurrency.flag}</span>
        <span className="font-bold text-white">{currentCurrency.code}</span>
        <span className="text-purple-400 font-mono text-[11px]">{currentCurrency.symbol}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-xl border border-zinc-800 bg-zinc-950/95 p-1.5 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-900 mb-1 flex items-center space-x-1">
            <Globe className="h-3 w-3 text-purple-400" />
            <span>Select Currency</span>
          </div>

          {Object.values(CURRENCIES).map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                setCurrency(c.code);
                setIsOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                currency === c.code
                  ? 'bg-purple-600/20 text-purple-300 font-bold border border-purple-500/30'
                  : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>{c.flag}</span>
                <span>{c.code}</span>
              </div>
              <span className="font-mono text-zinc-400">{c.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
