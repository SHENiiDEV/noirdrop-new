import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import {
  Sparkles,
  Wand2,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  Search,
  BookOpen,
  ListChecks,
  Share2,
  ArrowRight,
  ShieldCheck,
  Star,
  Layers,
  Clock,
  TrendingUp,
  ChevronDown,
} from 'lucide-react';

export default function Welcome({ auth, canLogin, canRegister }) {
  const user = auth?.user;

  // Interactive Live Sandbox State
  const [sandboxInput, setSandboxInput] = useState('Daft Punk - Random Access Memories (180g Vinyl 2LP)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [sandboxResult, setSandboxResult] = useState({
    title: 'Daft Punk: Random Access Memories (180g Audiophile Vinyl 2LP Edition)',
    description: '<p>Experience Daft Punk\'s iconic masterpiece <b>Random Access Memories</b> in crisp, analog warmth. Pressed on heavy 180-gram dual vinyl for supreme acoustic depth.</p><p>Featuring timeless classics like <i>"Get Lucky"</i> and <i>"Instant Crush"</i>, this release represents the pinnacle of modern disco engineering.</p><p>A must-have centerpiece for audiophiles and vinyl collectors worldwide.</p>',
    bullets: [
      'Audiophile 180g Heavyweight Vinyl: Premium pressing for maximum acoustic fidelity.',
      'Deluxe Gatefold Packaging: Includes full-color lyric booklet & protective sleeves.',
      'Grammy-Winning Album: Featuring Pharrell Williams & Julian Casablancas.',
      'Instant Analog Warmth: Mastered directly for high-fidelity turntable playback.'
    ],
    social_post: "Spinning perfection tonight. 🎶 Daft Punk's Random Access Memories on 180g vinyl hits different. Pure analog warmth. 📀✨\n\nGet your 2LP gatefold edition now before it sells out! Link in bio. 📦🚀\n\n#DaftPunk #VinylCollection #NowSpinning #Audiophile #Noirdrop"
  });

  const [copiedSection, setCopiedSection] = useState(null);

  const presets = [
    'Daft Punk - Random Access Memories (180g Vinyl 2LP)',
    'Minimalist Titanium Cardholder Wallet with RFID Protection',
    'Matte Black Noise-Canceling Wireless Headphones (40h Battery)',
  ];

  const handleSandboxGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!sandboxInput.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch(route('generate'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ input_prompt: sandboxInput }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSandboxResult({
          title: data.generation.seo_title,
          description: data.generation.description,
          bullets: Array.isArray(data.generation.features_json) 
            ? data.generation.features_json 
            : typeof data.generation.features_json === 'string'
            ? JSON.parse(data.generation.features_json)
            : [],
          social_post: data.generation.social_copy,
        });
        toast.success('Live Magic Drop generated! ✨');
      } else {
        toast.error('Generation failed. Please try again.');
      }
    } catch (err) {
      toast.error('Network error during sandbox test.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text, sectionName) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    toast.success(`${sectionName} copied!`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-500 selection:text-white">
      <Head title="Noirdrop — 1-Click Product Generator B2B SaaS" />
      <Toaster position="top-right" theme="dark" richColors />

      {/* Background Neon Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-purple-600/15 blur-[140px] rounded-full" />
        <div className="absolute top-96 -left-40 h-[400px] w-[500px] bg-indigo-600/10 blur-[140px] rounded-full" />
      </div>

      {/* Navbar Header */}
      <nav className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white">Noir<span className="text-purple-400">drop</span></span>
              <span className="text-[10px] text-zinc-400 -mt-1">1-Click Product Engine</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-xs font-medium text-zinc-300">
            <a href="#demo" className="hover:text-purple-400 transition">Live Demo</a>
            <a href="#features" className="hover:text-purple-400 transition">Features</a>
            <a href="#pricing" className="hover:text-purple-400 transition">Pricing</a>
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <Link
                href={route('dashboard')}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-purple-600/25 hover:opacity-95 transition"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  href={route('login')}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:border-zinc-700 hover:text-white transition"
                >
                  Log In
                </Link>
                <Link
                  href={route('register')}
                  className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-purple-600/25 hover:opacity-95 transition"
                >
                  <Zap className="h-3.5 w-3.5 fill-white/20" />
                  <span>Get Started</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="inline-flex items-center space-x-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-ping" />
          <span>High-Ticket B2B E-Commerce AI</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          Turn Raw Supplier Specs Into <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
            High-Converting Product Drops
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Stop writing e-commerce product pages by hand. Paste a basic title or SKU — Noirdrop instantly generates perfect SEO headlines, HTML storytelling descriptions, and viral social posts.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pricing"
            className="w-full sm:w-auto flex items-center justify-center space-x-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all duration-300"
          >
            <Wand2 className="h-5 w-5 text-purple-200" />
            <span>Get Started — Buy Drops</span>
          </a>
          <a
            href="#demo"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-2xl border border-zinc-800 bg-zinc-900/80 px-7 py-4 text-sm font-semibold text-zinc-300 hover:border-zinc-700 hover:text-white transition"
          >
            <span>Try Interactive Demo</span>
            <ChevronDown className="h-4 w-4" />
          </a>
        </div>

        {/* Social Proof */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500">
          <div className="flex items-center space-x-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400" />
            ))}
            <span className="text-zinc-300 font-semibold ml-1">4.9/5 Rating</span>
          </div>
          <span>•</span>
          <span>⚡ 3-Second AI Drops</span>
          <span>•</span>
          <span>📦 Ready for Shopify, WooCommerce & Amazon</span>
        </div>
      </section>

      {/* Live Interactive Sandbox Section */}
      <section id="demo" className="py-16 bg-zinc-900/40 border-y border-zinc-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Interactive Sandbox</span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mt-1">Test "The Magic Drop" Live</h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Select a preset or enter your product name below to watch Noirdrop package your content in real-time.
            </p>
          </div>

          {/* Sandbox Controls */}
          <div className="max-w-3xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-2xl">
            <form onSubmit={handleSandboxGenerate} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={sandboxInput}
                  onChange={(e) => setSandboxInput(e.target.value)}
                  placeholder="Enter product title or SKU..."
                  className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="flex items-center justify-center space-x-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white hover:bg-purple-500 transition disabled:opacity-50"
                >
                  {isGenerating ? (
                    <span>Generating...</span>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      <span>Drop Magic</span>
                    </>
                  )}
                </button>
              </div>

              {/* Presets */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] text-zinc-500">Quick presets:</span>
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSandboxInput(p)}
                    className="rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] text-zinc-400 hover:border-purple-500/40 hover:text-purple-300 transition"
                  >
                    {p.length > 30 ? p.substring(0, 30) + '...' : p}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* Live Bento Output Demo */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-5 max-w-5xl mx-auto">
            {/* SEO Title */}
            <div className="md:col-span-12 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-purple-400" />
                  <h4 className="text-xs font-bold text-white">1. SEO Title</h4>
                </div>
                <button
                  onClick={() => handleCopy(sandboxResult.title, 'SEO Title')}
                  className="flex items-center space-x-1 text-xs text-purple-300 hover:text-white"
                >
                  {copiedSection === 'SEO Title' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>Copy</span>
                </button>
              </div>
              <p className="text-sm font-semibold text-white">{sandboxResult.title}</p>
            </div>

            {/* Storytelling Description */}
            <div className="md:col-span-7 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-purple-400" />
                  <h4 className="text-xs font-bold text-white">2. Storytelling HTML Description</h4>
                </div>
                <button
                  onClick={() => handleCopy(sandboxResult.description, 'Description')}
                  className="flex items-center space-x-1 text-xs text-purple-300 hover:text-white"
                >
                  {copiedSection === 'Description' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>Copy HTML</span>
                </button>
              </div>
              <div
                className="text-xs text-zinc-300 space-y-2 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sandboxResult.description }}
              />
            </div>

            {/* Bullets */}
            <div className="md:col-span-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
                <div className="flex items-center space-x-2">
                  <ListChecks className="h-4 w-4 text-purple-400" />
                  <h4 className="text-xs font-bold text-white">3. Bullet Points</h4>
                </div>
                <button
                  onClick={() => handleCopy(sandboxResult.bullets.join('\n'), 'Bullets')}
                  className="flex items-center space-x-1 text-xs text-purple-300 hover:text-white"
                >
                  {copiedSection === 'Bullets' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>Copy Bullets</span>
                </button>
              </div>
              <ul className="space-y-2 text-xs text-zinc-300">
                {sandboxResult.bullets.map((b, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Post */}
            <div className="md:col-span-12 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
                <div className="flex items-center space-x-2">
                  <Share2 className="h-4 w-4 text-purple-400" />
                  <h4 className="text-xs font-bold text-white">4. Social Media Caption (Instagram/TikTok)</h4>
                </div>
                <button
                  onClick={() => handleCopy(sandboxResult.social_post, 'Social Post')}
                  className="flex items-center space-x-1 text-xs text-purple-300 hover:text-white"
                >
                  {copiedSection === 'Social Post' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>Copy Post</span>
                </button>
              </div>
              <p className="whitespace-pre-wrap text-xs text-zinc-300 font-sans leading-relaxed">{sandboxResult.social_post}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Features</span>
          <h2 className="text-3xl font-bold text-white mt-1">Built For High-Ticket E-Commerce Merchants</h2>
          <p className="text-sm text-zinc-400 mt-2">
            Noirdrop generates everything you need to launch high-converting product pages in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">SEO Title Optimization</h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Keywords placed strategically to boost organic rankings on Google and internal marketplace search engines.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Storytelling HTML Descriptions</h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              3-paragraph narrative formatted directly with HTML tags ready for instant pasting into Shopify or WooCommerce.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
              <Share2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Viral Social Media Copy</h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Ready-to-post captions for Instagram, TikTok, and Facebook with targeted hashtags and call-to-actions.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section (€100 - €1,500 High Ticket) */}
      <section id="pricing" className="py-20 bg-zinc-900/40 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">High-Ticket B2B Packages</span>
            <h2 className="text-3xl font-bold text-white mt-1">1 Product Drop = €1</h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">Select a package from €100 to €1,500 (€1 per product request).</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Starter Pack (€100) */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Starter Pack</span>
                <div className="mt-3 flex items-baseline">
                  <span className="text-4xl font-black text-white">€100</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">100 Product Drops (€1 / request).</p>

                <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                    <span>100 Full Product Drops</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                    <span>All 4 Content Pillars Output</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                    <span>Proprietary B2B AI Engine</span>
                  </li>
                </ul>
              </div>

              <Link
                href={user ? route('dashboard') : route('register')}
                className="mt-8 block text-center rounded-xl border border-zinc-800 bg-zinc-900 py-3 text-xs font-bold text-white hover:border-zinc-700 transition"
              >
                Get 100 Drops (€100)
              </Link>
            </div>

            {/* Pro Pack (€500) */}
            <div className="rounded-2xl border border-purple-500/40 bg-gradient-to-b from-purple-950/20 to-zinc-950 p-6 flex flex-col justify-between shadow-2xl relative">
              <div className="absolute -top-3 right-6 rounded-full bg-purple-600 px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow">
                Best Value
              </div>

              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Pro Merchant</span>
                <div className="mt-3 flex items-baseline">
                  <span className="text-4xl font-black text-white">€500</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">500 Product Drops (€1 / request).</p>

                <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                    <span>500 Full Product Drops</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                    <span>Priority Processing Speed</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                    <span>Tokens Never Expire</span>
                  </li>
                </ul>
              </div>

              <Link
                href={user ? route('dashboard') : route('register')}
                className="mt-8 block text-center rounded-xl bg-purple-600 py-3 text-xs font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 transition"
              >
                Get 500 Drops (€500)
              </Link>
            </div>

            {/* Enterprise Pack (€1,500) */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Enterprise Suite</span>
                <div className="mt-3 flex items-baseline">
                  <span className="text-4xl font-black text-white">€1,500</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">1,500 Product Drops (€1 / request).</p>

                <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                    <span>1,500 Full Product Drops</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                    <span>Dedicated Priority Account Support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />
                    <span>Generation History Export</span>
                  </li>
                </ul>
              </div>

              <Link
                href={user ? route('dashboard') : route('register')}
                className="mt-8 block text-center rounded-xl border border-zinc-800 bg-zinc-900 py-3 text-xs font-bold text-white hover:border-zinc-700 transition"
              >
                Get 1,500 Drops (€1,500)
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Footer with HARTDELL LIMITED details */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-10 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm">Noirdrop</span>
                <span className="text-[10px] text-purple-400 font-semibold">1-Click Product Engine</span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-4 text-xs font-medium text-zinc-400">
              <Link href={route('legal.terms')} className="hover:text-purple-300 transition">Terms of Service</Link>
              <Link href={route('legal.privacy')} className="hover:text-purple-300 transition">Privacy Policy</Link>
              <Link href={route('legal.refunds')} className="hover:text-purple-300 transition">Refund Policy</Link>
              <Link href={route('legal.imprint')} className="hover:text-purple-300 transition">Legal Notice (Imprint)</Link>
            </div>
          </div>

          <div className="text-center md:text-right space-y-1 text-[11px] text-zinc-400">
            <p className="font-bold text-zinc-200">HARTDELL LIMITED — Company number 16021824</p>
            <p>Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF</p>
            <p>© 2026 Noirdrop. All rights reserved. Driven by Proprietary AI Engine & Laravel 13.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
