import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Sparkles, Building, ShieldCheck, Zap, ArrowRight, Layers, ArrowLeft, Cpu, Globe } from 'lucide-react';
import CurrencySwitcher from '@/Components/CurrencySwitcher';

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-500 selection:text-white flex flex-col justify-between">
      <Head title="About Us — Noirdrop B2B SaaS" />

      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white">Noir<span className="text-purple-400">drop</span></span>
              <span className="text-[10px] text-zinc-400 -mt-1 font-medium">About Us</span>
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            <CurrencySwitcher />
            <Link
              href="/"
              className="flex items-center space-x-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300 mb-4">
            <Building className="h-3.5 w-3.5 text-purple-400" />
            <span>Official Corporate Entity</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Building The Next Generation Of B2B E-Commerce Copy Engines
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
            Noirdrop replaces complex, tedious product uploads with an ultra-minimalist single-window AI drop system built for modern merchants.
          </p>
        </div>

        {/* Mission & Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Zap className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-white">Our Mission: "The Magic Drop"</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Instead of spending hours writing product descriptions by hand, e-commerce owners paste a basic product title, raw supplier specs, or SKU. Noirdrop instantly drops a complete, beautifully formatted package ready for immediate storefront deployment.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Cpu className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-white">High-Speed B2B Telemetry</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Engineered on top of Laravel 13, React 19, and DeepSeek AI, Noirdrop processes supplier telemetry in under 1.2 seconds, returning SEO headlines, HTML storytelling descriptions, feature bullet points, and social captions.
            </p>
          </div>
        </div>

        {/* Corporate Entity Details Box */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Official Merchant of Record</h3>
                <p className="text-xs text-zinc-400">Registered in England & Wales</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
              Verified Entity
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs text-zinc-300">
            <div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Company Name</span>
              <strong className="text-white text-sm">HARTDELL LIMITED</strong>
            </div>

            <div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Company Number</span>
              <strong className="text-purple-300 text-sm">16021824</strong>
            </div>

            <div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">Jurisdiction</span>
              <strong className="text-zinc-200 text-sm">United Kingdom</strong>
            </div>
          </div>

          <div className="pt-2 text-xs text-zinc-400 border-t border-zinc-900">
            <strong>Registered Office Address:</strong> Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <Link
            href={route('register')}
            className="inline-flex items-center space-x-2 rounded-2xl bg-purple-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 transition"
          >
            <span>Get Started with Noirdrop</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-1">
          <p className="font-semibold text-zinc-300">HARTDELL LIMITED — Company number 16021824</p>
          <p>Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF</p>
          <p>© 2026 Noirdrop B2B SaaS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
