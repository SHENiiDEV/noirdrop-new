import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Sparkles, Mail, FileText, MessageSquare, ChevronDown, HelpCircle, ArrowRight, ShieldCheck, ArrowLeft, Zap } from 'lucide-react';
import CurrencySwitcher from '@/Components/CurrencySwitcher';

export default function Support({ supportEmail = 'support@noirdrop.co.uk' }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'What is the standard support response SLA?',
      a: 'Our executive support desk operates under a guaranteed Service Level Agreement (SLA) of 24–48 hours for all merchant tickets and inquiries.',
    },
    {
      q: 'How do B2B Drop token credit packages work?',
      a: 'Tokens represent digital execution credits where 1 Drop Request = 1€ (or currency equivalent). Packages range from €100 for 100 Drops to €1,500 for 1,500 Drops. Credits never expire and remain active on your account balance until redeemed.',
    },
    {
      q: 'What is the 14-day refund policy?',
      a: 'Under UK commercial regulations, any credit package purchase with unused generation tokens is eligible for a 100% refund within 14 days of purchase. Once credits are executed for AI generation, compute resources are consumed and cannot be reversed.',
    },
    {
      q: 'How do I download official UK B2B PDF tax invoices?',
      a: 'Official B2B tax invoices (issued by INCHWARD LIMITED / HARTDELL LIMITED) are generated automatically for every purchase and drop. You can download them anytime from your Dashboard history drawer or directly via the link attached to your email receipts.',
    },
    {
      q: 'How does Telegram & API sync integration work?',
      a: 'You can link your Telegram account or e-commerce storefront by pairing your 6-digit sync code generated in Profile Settings. Once paired, you can send product photo/text telemetry directly via Telegram or REST API to generate drops hands-free.',
    },
    {
      q: 'Can I export generated copy directly to Shopify or WooCommerce?',
      a: 'Yes! Storytelling descriptions are formatted directly with standard HTML (<p>, <b>, <ul>), allowing 1-click copy-pasting into Shopify, WooCommerce, Amazon, or custom webshops without re-formatting.',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-500 selection:text-white flex flex-col justify-between">
      <Head title="Support & Help Desk — Noirdrop B2B SaaS" />

      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white">Noir<span className="text-purple-400">drop</span></span>
              <span className="text-[10px] text-zinc-400 -mt-1 font-medium">Support & Help Desk</span>
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
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300 mb-4">
            <HelpCircle className="h-3.5 w-3.5 text-purple-400" />
            <span>Support & Documentation Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">How Can We Help You Today?</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Explore support channels, documentation, and frequently asked questions for Noirdrop B2B merchants.
          </p>
        </div>

        {/* 3 Support Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Channel 1: Email */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col justify-between hover:border-purple-500/40 transition">
            <div>
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="text-base font-bold text-white">Executive Email Support</h2>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Direct inquiry line with guaranteed support response SLA of 24–48 hours for merchant accounts.
              </p>
            </div>
            <a
              href={`mailto:${supportEmail}`}
              className="mt-6 flex items-center justify-center space-x-2 rounded-xl bg-purple-600/20 border border-purple-500/30 py-2.5 text-xs font-bold text-purple-300 hover:bg-purple-600 hover:text-white transition"
            >
              <span>Email Executive Desk</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Channel 2: B2B Invoices */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col justify-between hover:border-purple-500/40 transition">
            <div>
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-base font-bold text-white">B2B Invoices & Billing</h2>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Access your account activity drawer to download official UK PDF tax invoices for accounting.
              </p>
            </div>
            <Link
              href={route('dashboard')}
              className="mt-6 flex items-center justify-center space-x-2 rounded-xl bg-purple-600/20 border border-purple-500/30 py-2.5 text-xs font-bold text-purple-300 hover:bg-purple-600 hover:text-white transition"
            >
              <span>Open Invoice History</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Channel 3: Telegram & API Sync */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col justify-between hover:border-purple-500/40 transition">
            <div>
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h2 className="text-base font-bold text-white">Telegram & API Sync</h2>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Instructions for pairing 6-digit sync code with Telegram bot or REST API for automated drops.
              </p>
            </div>
            <Link
              href={route('profile.edit')}
              className="mt-6 flex items-center justify-center space-x-2 rounded-xl bg-purple-600/20 border border-purple-500/30 py-2.5 text-xs font-bold text-purple-300 hover:bg-purple-600 hover:text-white transition"
            >
              <span>View Sync Settings</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-zinc-400 mt-1">Everything you need to know about Noirdrop B2B services</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-xs sm:text-sm font-bold text-white hover:text-purple-300 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-purple-400 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/80">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA Button */}
          <div className="mt-12 text-center rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <h3 className="text-base font-bold text-white">Still Have Questions?</h3>
            <p className="text-xs text-zinc-400 mt-1">Our executive support desk is standing by to assist your store.</p>
            <Link
              href={route('contact')}
              className="mt-5 inline-flex items-center space-x-2 rounded-xl bg-purple-600 px-6 py-3 text-xs font-bold text-white shadow-lg hover:bg-purple-500 transition"
            >
              <span>Submit Support Ticket</span>
              <ArrowRight className="h-3.5 w-3.5" />
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
