import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import {
  Sparkles,
  Wand2,
  Search,
  BookOpen,
  ListChecks,
  Share2,
  ArrowRight,
  RefreshCw,
  Zap,
  Flame,
  CheckCircle2,
} from 'lucide-react';

import HeaderNav from '@/Components/HeaderNav';
import HistoryDrawer from '@/Components/HistoryDrawer';
import BuyTokensModal from '@/Components/BuyTokensModal';
import BentoCard from '@/Components/BentoCard';

export default function Dashboard({ tokensBalance: initialTokens, initialHistory, payments: initialPayments }) {
  const { auth } = usePage().props;
  const user = auth.user;

  const [inputPrompt, setInputPrompt] = useState('');
  const [tokensBalance, setTokensBalance] = useState(initialTokens ?? 0);
  const [history, setHistory] = useState(initialHistory || []);
  const [payments, setPayments] = useState(initialPayments || []);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentDrop, setCurrentDrop] = useState(null);

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  // Loading animation phase text
  const [loadingPhase, setLoadingPhase] = useState(0);
  const loadingMessages = [
    "⚡ Analyzing product features & technical specs...",
    "✨ Crafting storytelling narrative & SEO headline...",
    "🚀 Formatting social media copy & bullet points...",
  ];

  useEffect(() => {
    let interval;
    if (isGenerating) {
      setLoadingPhase(0);
      interval = setInterval(() => {
        setLoadingPhase((prev) => (prev + 1) % loadingMessages.length);
      }, 1200);
    } else {
      setLoadingPhase(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Preset prompts for quick demo testing
  const presets = [
    "Daft Punk - Random Access Memories (180g Vinyl 2LP)",
    "Noir Desk Mat: Ultra-smooth waterproof felt, non-slip rubber base (900x400mm)",
    "Titanium Minimalist Cardholder Wallet with RFID Protection",
  ];

  const handlePresetClick = (promptText) => {
    setInputPrompt(promptText);
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!inputPrompt.trim()) {
      toast.error('Please enter a product title or specification.');
      return;
    }

    if (tokensBalance <= 0) {
      toast.error('Out of tokens! Please top up to generate more drops.');
      setIsBuyModalOpen(true);
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch(route('generate'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ input_prompt: inputPrompt }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCurrentDrop(data.generation);
        setTokensBalance(data.tokens_balance);
        setHistory((prev) => [data.generation, ...prev]);
        toast.success('Magic Drop generated successfully! ✨');
      } else if (response.status === 402) {
        toast.error(data.error || 'Out of Drop tokens.');
        setIsBuyModalOpen(true);
      } else {
        toast.error(data.error || 'Failed to generate product drop.');
      }
    } catch (err) {
      toast.error('An unexpected error occurred during generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectHistoryDrop = (dropItem) => {
    setCurrentDrop(dropItem);
    setInputPrompt(dropItem.input_prompt);
    toast.info('Loaded drop from history');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      <Head title="Noirdrop — 1-Click Product Generator" />

      {/* Toast Notifications */}
      <Toaster position="top-right" theme="dark" richColors />

      {/* Top Header Navigation */}
      <HeaderNav
        user={user}
        tokensBalance={tokensBalance}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenBuyTokens={() => setIsBuyModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col space-y-12">
        
        {/* Hero Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300">
            <Flame className="h-3.5 w-3.5 text-purple-400 fill-purple-400" />
            <span>AI E-Commerce Copywriting Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Transform Raw Specs Into <br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
              High-Converting Product Drops
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Paste a simple item title, SKU, or supplier notes. Noirdrop outputs perfect SEO headlines, storytelling HTML descriptions, bullet points, and social posts in 3 seconds.
          </p>
        </div>

        {/* Hero Drop Input Zone (Magic UI Glow Input) */}
        <div className="max-w-3xl w-full mx-auto relative group">
          
          {/* Neon Glow Outer Effect */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 opacity-40 blur-xl transition-all duration-500 group-hover:opacity-75 animate-pulse-glow" />

          {/* Input Box Shell */}
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
            
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="relative">
                <textarea
                  rows={3}
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  placeholder="Paste product title, specs, or raw details... (e.g. Daft Punk - Random Access Memories 180g Vinyl 2LP)"
                  disabled={isGenerating}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 text-sm text-white placeholder-zinc-500 focus:border-purple-500/60 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition resize-none disabled:opacity-50"
                />

                {inputPrompt && (
                  <button
                    type="button"
                    onClick={() => setInputPrompt('')}
                    className="absolute right-3 top-3 text-xs text-zinc-500 hover:text-zinc-300 transition"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Presets & Generate Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                
                {/* Sample Prompt Pills */}
                <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                  <span className="text-[11px] text-zinc-500 font-medium whitespace-nowrap">Try preset:</span>
                  {presets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePresetClick(preset)}
                      className="whitespace-nowrap rounded-lg border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-400 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-300 transition shrink-0"
                    >
                      {preset.length > 25 ? preset.substring(0, 25) + '...' : preset}
                    </button>
                  ))}
                </div>

                {/* Generate Drop Button */}
                <button
                  type="submit"
                  disabled={isGenerating || !inputPrompt.trim()}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-purple-600/30 hover:opacity-95 hover:shadow-purple-600/50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin text-white" />
                      <span>Generating Drop...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 text-purple-200" />
                      <span>Generate Drop</span>
                    </>
                  )}
                </button>

              </div>
            </form>

          </div>
        </div>

        {/* Shimmer Loading State (Magic UI) */}
        {isGenerating && (
          <div className="max-w-3xl w-full mx-auto rounded-2xl border border-purple-500/30 bg-zinc-900/60 p-8 text-center animate-shimmer backdrop-blur-md">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-400 mb-4 animate-bounce">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Creating Magic Product Drop</h3>
            <p className="text-xs text-purple-300 font-medium transition-all duration-300">
              {loadingMessages[loadingPhase]}
            </p>
          </div>
        )}

        {/* Bento Results Output Cards */}
        {currentDrop && !isGenerating && (
          <div className="space-y-6 animate-in fade-in duration-500">
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">Generated Drop Output</h2>
              </div>
              <span className="text-xs text-zinc-500">
                Created {new Date(currentDrop.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

              {/* Bento Item 1: SEO Title (Span 12) */}
              <BentoCard
                icon={Search}
                title="SEO Optimized Title"
                badgeText={`${(currentDrop.seo_title || '').length} / 200 chars`}
                copyText={currentDrop.seo_title}
                className="md:col-span-12"
              >
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <p className="text-sm font-semibold text-white tracking-wide">
                    {currentDrop.seo_title}
                  </p>
                </div>
              </BentoCard>

              {/* Bento Item 2: Storytelling Description (Span 7) */}
              <BentoCard
                icon={BookOpen}
                title="Storytelling Product Description"
                badgeText="HTML Format (<p>, <b>)"
                copyText={currentDrop.description}
                isHtml={true}
                className="md:col-span-7"
              >
                <div 
                  className="prose prose-invert prose-xs max-w-none text-zinc-300 space-y-3 p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: currentDrop.description }}
                />
              </BentoCard>

              {/* Bento Item 3: Bullet Points (Span 5) */}
              <BentoCard
                icon={ListChecks}
                title="Key Feature Highlights"
                badgeText="4 High-Impact Points"
                copyText={
                  Array.isArray(currentDrop.features_json)
                    ? currentDrop.features_json.map((b) => `• ${b}`).join('\n')
                    : currentDrop.features_json
                }
                className="md:col-span-5"
              >
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <ul className="space-y-2.5">
                    {(Array.isArray(currentDrop.features_json)
                      ? currentDrop.features_json
                      : typeof currentDrop.features_json === 'string'
                      ? JSON.parse(currentDrop.features_json || '[]')
                      : []
                    ).map((bullet, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-zinc-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BentoCard>

              {/* Bento Item 4: Social Media Copy (Span 12) */}
              <BentoCard
                icon={Share2}
                title="Social Media Copy (Instagram / TikTok)"
                badgeText="Includes Emojis & Hashtags"
                copyText={currentDrop.social_copy}
                className="md:col-span-12"
              >
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <p className="whitespace-pre-wrap text-xs text-zinc-200 font-sans leading-relaxed">
                    {currentDrop.social_copy}
                  </p>
                </div>
              </BentoCard>

            </div>

          </div>
        )}

      </main>

      {/* History Slide-over Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        payments={payments}
        onSelectDrop={handleSelectHistoryDrop}
      />

      {/* Buy Tokens Modal */}
      <BuyTokensModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        onBuySuccess={(newBalance) => setTokensBalance(newBalance)}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-6 text-center text-xs text-zinc-500 space-y-2">
        <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-zinc-400">
          <Link href={route('how-it-works')} className="hover:text-purple-300 transition">How It Works</Link>
          <Link href={route('about')} className="hover:text-purple-300 transition">About Us</Link>
          <Link href={route('support')} className="hover:text-purple-300 transition">Support</Link>
          <Link href={route('contact')} className="hover:text-purple-300 transition">Contact Us</Link>
          <Link href={route('legal.terms')} className="hover:text-purple-300 transition">Terms</Link>
          <Link href={route('legal.privacy')} className="hover:text-purple-300 transition">Privacy</Link>
          <Link href={route('legal.refunds')} className="hover:text-purple-300 transition">Refunds</Link>
          <Link href={route('legal.imprint')} className="hover:text-purple-300 transition">Legal Notice</Link>
        </div>
        <p className="font-semibold text-zinc-300">HARTDELL LIMITED — Company number 16021824</p>
        <p className="text-[11px] text-zinc-400">Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF</p>
        <p className="text-[10px] text-zinc-600">© 2026 Noirdrop B2B SaaS. All rights reserved.</p>
      </footer>
    </div>
  );
}
