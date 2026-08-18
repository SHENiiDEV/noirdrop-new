import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-500 selection:text-white flex flex-col">
      <Head title={`${title} — Noirdrop (HARTDELL LIMITED)`} />

      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white">Noir<span className="text-purple-400">drop</span></span>
              <span className="text-[10px] text-zinc-400 -mt-1">HARTDELL LIMITED</span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
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

      {/* Main Legal Content Wrapper */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 border-b border-zinc-800 pb-6">
          <div className="inline-flex items-center space-x-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300 mb-3">
            <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
            <span>Official Legal Document • HARTDELL LIMITED</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">{title}</h1>
          {lastUpdated && (
            <p className="text-xs text-zinc-500 mt-2">Last updated: {lastUpdated}</p>
          )}
        </div>

        <div className="prose prose-invert prose-purple max-w-none text-xs sm:text-sm leading-relaxed text-zinc-300 space-y-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-10 text-xs text-zinc-500 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-sm">Noirdrop</span>
              <span className="text-[10px] text-purple-400 font-semibold">HARTDELL LIMITED</span>
            </div>
          </div>

          <div className="text-center md:text-right space-y-1 text-[11px] text-zinc-400">
            <p className="font-bold text-zinc-200">HARTDELL LIMITED — Company number 16021824</p>
            <p>Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF</p>
            <p>© 2026 Noirdrop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
