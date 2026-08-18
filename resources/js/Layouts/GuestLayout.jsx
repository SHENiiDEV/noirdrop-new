import React from 'react';
import { Link } from '@inertiajs/react';
import { Sparkles } from 'lucide-react';

export default function GuestLayout({ children, maxWidthClass = 'max-w-md' }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4 sm:p-6 text-zinc-100 font-sans selection:bg-purple-500 selection:text-white overflow-hidden">
      
      {/* Background Neon Ambient Lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[450px] w-[600px] bg-purple-600/20 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[350px] w-[450px] bg-indigo-600/15 blur-[130px] rounded-full" />

      {/* Brand Header */}
      <div className="relative mb-6 text-center">
        <Link href="/" className="group inline-flex items-center space-x-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-xl shadow-purple-500/25 transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-6 w-6 text-white animate-pulse" />
            <div className="absolute -inset-0.5 rounded-2xl bg-purple-500/30 opacity-0 blur transition-opacity group-hover:opacity-100" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-2xl font-black tracking-tight text-white">Noir<span className="text-purple-400">drop</span></span>
            <span className="text-xs text-zinc-400 font-medium">1-Click Product Engine</span>
          </div>
        </Link>
      </div>

      {/* Glassmorphic Auth Form Container */}
      <div className={`relative w-full ${maxWidthClass} overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl`}>
        {children}
      </div>

      {/* Footer */}
      <div className="relative mt-8 text-center text-[11px] text-zinc-500 max-w-md space-y-1.5">
        <div className="flex justify-center space-x-3 text-xs font-medium text-zinc-400 pb-1">
          <Link href={route('legal.terms')} className="hover:text-purple-300 transition">Terms</Link>
          <Link href={route('legal.privacy')} className="hover:text-purple-300 transition">Privacy</Link>
          <Link href={route('legal.refunds')} className="hover:text-purple-300 transition">Refunds</Link>
          <Link href={route('legal.imprint')} className="hover:text-purple-300 transition">Legal Notice</Link>
        </div>
        <p className="font-semibold text-zinc-300">HARTDELL LIMITED — Company number 16021824</p>
        <p>Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF</p>
        <p>© 2026 Noirdrop. All rights reserved.</p>
      </div>

    </div>
  );
}
