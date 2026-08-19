import React, { useState } from 'react';
import { X, Zap, Check, ShieldCheck, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { useCurrency } from './CurrencyContext';

export default function BuyTokensModal({ isOpen, onClose, onBuySuccess }) {
  const { formatPrice, currentCurrency } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [selectedPack, setSelectedPack] = useState(500); // Default 500 drops for €500

  if (!isOpen) return null;

  const packages = [
    { drops: 100, price: 100, label: 'Starter Pack', popular: false },
    { drops: 500, price: 500, label: 'Pro Merchant', popular: true },
    { drops: 1500, price: 1500, label: 'Enterprise Suite', popular: false },
  ];

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const response = await fetch(route('buy-tokens'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ amount: selectedPack }),
      });

      const data = await response.json();
      if (data.success) {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#6366f1', '#10b981'],
        });
        toast.success(data.message || `Added +${selectedPack} Drops (€${selectedPack}) to your balance!`);
        onBuySuccess(data.tokens_balance);
        onClose();
      } else {
        toast.error('Payment failed. Please try again.');
      }
    } catch (err) {
      toast.error('Network error processing purchase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        
        {/* Ambient glow */}
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-indigo-600/20 blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="relative text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25">
            <Zap className="h-6 w-6 text-white fill-white/20" />
          </div>

          <h3 className="mt-3 text-xl font-bold text-white">Top Up Drop Tokens</h3>
          <p className="mt-1 text-xs text-zinc-400">
            High-Ticket B2B Packages: <b className="text-purple-300">€1 = 1 Product Generation Request</b>.
          </p>

          {/* Package Selection Cards */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-left">
            {packages.map((pkg) => (
              <div
                key={pkg.drops}
                onClick={() => setSelectedPack(pkg.drops)}
                className={`relative cursor-pointer rounded-xl border p-3.5 transition-all ${
                  selectedPack === pkg.drops
                    ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10'
                    : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-2 py-0.2 text-[9px] font-bold text-white uppercase tracking-wider">
                    Best Value
                  </span>
                )}
                <span className="text-[11px] font-bold text-zinc-400 block">{pkg.label}</span>
                <span className="mt-1 text-lg font-black text-white block">{pkg.drops} Drops</span>
                <span className="text-xs font-semibold text-purple-400 block mt-0.5">{formatPrice(pkg.price)}</span>
              </div>
            ))}
          </div>

          {/* Feature List for Selected Pack */}
          <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left shadow-inner">
            <ul className="space-y-2 text-xs text-zinc-300">
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-purple-400 shrink-0" />
                <span><b>{selectedPack} Product Drops</b> ({formatPrice(1)} per high-ticket generation)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-purple-400 shrink-0" />
                <span>Includes SEO Title + HTML Storytelling + Social Media Copy</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-purple-400 shrink-0" />
                <span>Proprietary B2B AI Engine — Tokens Never Expire</span>
              </li>
            </ul>

            <button
              onClick={handlePurchase}
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] py-3 text-sm font-bold text-white shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  <span>Confirm Purchase ({formatPrice(selectedPack)})</span>
                </>
              )}
            </button>

            <div className="mt-3 flex items-center justify-center space-x-1.5 text-[11px] text-zinc-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Instant credit. High conversion return on investment.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
