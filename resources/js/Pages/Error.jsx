import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Sparkles, ArrowLeft, RefreshCw, AlertTriangle, ShieldAlert, Moon, Wrench } from 'lucide-react';

export default function Error({ status }) {
  const errorMap = {
    404: {
      code: '404',
      title: 'Lost in the Night Routine',
      subtitle: 'Page Not Found or Asleep',
      description: 'The product drop or route you are searching for does not exist or has drifted into the night routine.',
      icon: Moon,
      color: 'from-purple-600 to-indigo-600',
    },
    500: {
      code: '500',
      title: 'Temporary Clinical Rest',
      subtitle: 'Internal System Hiccup',
      description: 'Our B2B AI engines are undergoing a brief medical/clinical rest cycle. We are actively tuning the system.',
      icon: RefreshCw,
      color: 'from-amber-600 to-rose-600',
    },
    403: {
      code: '403',
      title: 'Restricted Medical & B2B Section',
      subtitle: 'Access Forbidden',
      description: 'You do not have administrative permissions to view this medical/B2B section.',
      icon: ShieldAlert,
      color: 'from-rose-600 to-red-600',
    },
    503: {
      code: '503',
      title: 'Scheduled System Care',
      subtitle: 'Maintenance in Progress',
      description: 'Noirdrop is currently undergoing scheduled care & upgrades. We will be right back shortly.',
      icon: Wrench,
      color: 'from-blue-600 to-purple-600',
    },
  };

  const current = errorMap[status] || errorMap[500];
  const IconComponent = current.icon;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-purple-500 selection:text-white">
      <Head title={`${current.code} — ${current.title}`} />

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[700px] bg-purple-600/20 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[400px] w-[500px] bg-indigo-600/15 blur-[140px] rounded-full" />

      {/* Brand Header */}
      <div className="relative mb-8 text-center">
        <Link href="/" className="inline-flex items-center space-x-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-xl shadow-purple-500/25 transition-transform group-hover:scale-105">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-2xl font-black text-white">Noir<span className="text-purple-400">drop</span></span>
            <span className="text-xs text-zinc-400 font-medium">HARTDELL LIMITED</span>
          </div>
        </Link>
      </div>

      {/* Glassmorphic Error Container */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl text-center">
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${current.color} shadow-xl shadow-purple-500/20 mb-6`}>
          <IconComponent className="h-8 w-8 text-white" />
        </div>

        <span className="inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-bold text-purple-300 mb-3">
          Error {current.code} — {current.subtitle}
        </span>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
          {current.title}
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-8">
          {current.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-purple-600/25 hover:opacity-95 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-xs font-semibold text-zinc-300 hover:border-zinc-700 hover:text-white transition"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retry Connection</span>
          </button>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="relative mt-8 text-center text-xs text-zinc-500 space-y-1">
        <p className="font-semibold text-zinc-300">HARTDELL LIMITED — Company number 16021824</p>
        <p>Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, UK (CF31 1JF)</p>
      </div>
    </div>
  );
}
