import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Sparkles, Wand2, Zap, ArrowRight, CheckCircle2, ShieldCheck, Cpu, FileText, Smartphone, Layers, ArrowLeft } from 'lucide-react';
import CurrencySwitcher from '@/Components/CurrencySwitcher';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Instant Provisioning & Account Setup',
      subtitle: 'Fast registration & B2B credit account allocation',
      description: 'Create your merchant account in under 30 seconds. Instant credit provisioning gives your store immediate access to the Noirdrop 1-Click B2B generation engine.',
      icon: Zap,
      badge: '< 30s Setup',
    },
    {
      num: '02',
      title: 'Supplier Specs & Computer Vision Parsing',
      subtitle: 'Instant parsing of product titles & supplier notes (< 1.2s)',
      description: 'Paste any raw title, manufacturer SKU, or unstructured supplier text. Our vision & text telemetry engines parse key product specs in under 1.2 seconds.',
      icon: Cpu,
      badge: '< 1.2s Latency',
    },
    {
      num: '03',
      title: 'Hands-Free Copy Telemetry & 4 Content Pillars',
      subtitle: 'SEO Title, Storytelling HTML, Bullets & Social Copy',
      description: 'Noirdrop packages 4 essential copy pillars simultaneously: SEO Headlines, 3-paragraph HTML storytelling descriptions, 4 high-impact bullets, and viral Instagram/TikTok captions.',
      icon: Wand2,
      badge: '4 Pillars in 1-Click',
    },
    {
      num: '04',
      title: 'Merchant Dashboards & B2B PDF Tax Invoices',
      subtitle: 'Conversion tracking & official UK PDF tax invoices',
      description: 'Track generation history from your dashboard and download official UK B2B PDF tax invoices (issued by INCHWARD LIMITED / HARTDELL LIMITED) with 1 click.',
      icon: FileText,
      badge: 'Official UK B2B PDF',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-500 selection:text-white flex flex-col justify-between">
      <Head title="How It Works — Noirdrop B2B SaaS" />

      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white">Noir<span className="text-purple-400">drop</span></span>
              <span className="text-[10px] text-zinc-400 -mt-1 font-medium">How It Works</span>
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>Interactive Workflow & Telemetry</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How The Magic Drop Engine Operates
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
            From raw supplier specifications to high-converting, SEO-optimized e-commerce drops in 4 simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="space-y-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 transition-all hover:border-purple-500/40 hover:bg-zinc-900 shadow-xl"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-start space-x-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-black text-xl shadow-lg shadow-purple-500/20">
                      <Icon className="h-7 w-7" />
                    </div>

                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-black text-purple-400 font-mono">STEP {step.num}</span>
                        <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-[10px] font-bold text-purple-300 border border-purple-500/20">
                          {step.badge}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-white mt-1">{step.title}</h2>
                      <p className="text-xs font-medium text-purple-300 mt-0.5">{step.subtitle}</p>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed max-w-2xl">{step.description}</p>
                    </div>
                  </div>

                  <Link
                    href={route('register')}
                    className="shrink-0 flex items-center space-x-2 rounded-xl bg-purple-600/20 border border-purple-500/30 px-4 py-2.5 text-xs font-bold text-purple-300 hover:bg-purple-600 hover:text-white transition"
                  >
                    <span>Try Step {step.num}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Box */}
        <div className="mt-16 text-center rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-zinc-900 to-indigo-950/40 p-10 shadow-2xl">
          <h3 className="text-2xl font-black text-white">Ready to Automate Your Product Drops?</h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto">
            Join high-ticket B2B merchants generating perfect product listings in seconds.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href={route('register')}
              className="flex items-center space-x-2 rounded-2xl bg-purple-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 transition"
            >
              <span>Get Started Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
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
