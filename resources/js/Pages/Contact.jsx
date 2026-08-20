import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Sparkles, Mail, Building, MapPin, Send, CheckCircle2, ShieldCheck, ArrowLeft, Phone } from 'lucide-react';
import CurrencySwitcher from '@/Components/CurrencySwitcher';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Contact({ companyName, companyNumber, companyAddress, supportEmail }) {
  const { flash } = usePage().props;
  const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('contact.send'), {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-500 selection:text-white flex flex-col justify-between">
      <Head title="Contact Us — Noirdrop Executive Support" />

      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white">Noir<span className="text-purple-400">drop</span></span>
              <span className="text-[10px] text-zinc-400 -mt-1 font-medium">Contact Us</span>
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
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300 mb-4">
            <Mail className="h-3.5 w-3.5 text-purple-400" />
            <span>Executive Support Ticket Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Get in Touch with Our Team</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Have questions about your B2B account, token packages, or custom enterprise setup? We respond within hours.
          </p>
        </div>

        {/* Success Alert Banner */}
        {(recentlySuccessful || flash?.success) && (
          <div className="mb-8 flex items-center space-x-3 rounded-2xl border border-emerald-500/40 bg-emerald-950/80 p-4 text-xs text-emerald-200 shadow-2xl backdrop-blur-xl animate-in fade-in">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-sm text-white">Ticket Submitted Successfully!</p>
              <p className="mt-0.5">{flash?.success || 'Thank you! Your ticket has been logged and sent to our support desk.'}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Company Details Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-5">
              <h2 className="text-base font-bold text-white border-b border-zinc-800 pb-3 flex items-center space-x-2">
                <Building className="h-4 w-4 text-purple-400" />
                <span>Corporate Registration</span>
              </h2>

              <div className="space-y-4 text-xs text-zinc-300">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Company Name</span>
                  <span className="font-bold text-white text-sm">{companyName}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Company Number</span>
                  <span className="font-mono text-purple-300 font-semibold">{companyNumber}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Registered Address</span>
                  <span className="text-zinc-300 leading-relaxed block mt-0.5">{companyAddress}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Direct Support Email</span>
                  <a href={`mailto:${supportEmail}`} className="font-semibold text-purple-400 hover:underline">
                    {supportEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-purple-500/20 bg-purple-950/20 p-5 text-xs text-purple-200 flex items-start space-x-3">
              <ShieldCheck className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-bold">14-Day Refund & Support Policy</strong>
                <span>All B2B purchases are backed by our 14-day unused credit guarantee under UK commercial regulations.</span>
              </div>
            </div>
          </div>

          {/* Support Ticket Form Column */}
          <div className="md:col-span-7">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-4">Submit a Support Ticket</h3>

              <form onSubmit={submit} className="space-y-4">
                <div>
                  <InputLabel htmlFor="name" value="Your Full Name" />
                  <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    placeholder="e.g. Alex Smith"
                    className="mt-1 block w-full"
                    onChange={(e) => setData('name', e.target.value)}
                    required
                  />
                  <InputError message={errors.name} className="mt-1 text-xs text-rose-400" />
                </div>

                <div>
                  <InputLabel htmlFor="email" value="Email Address" />
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    placeholder="alex@company.com"
                    className="mt-1 block w-full"
                    onChange={(e) => setData('email', e.target.value)}
                    required
                  />
                  <InputError message={errors.email} className="mt-1 text-xs text-rose-400" />
                </div>

                <div>
                  <InputLabel htmlFor="subject" value="Subject / Topic" />
                  <TextInput
                    id="subject"
                    name="subject"
                    value={data.subject}
                    placeholder="e.g. Question about B2B PDF Tax Invoice"
                    className="mt-1 block w-full"
                    onChange={(e) => setData('subject', e.target.value)}
                    required
                  />
                  <InputError message={errors.subject} className="mt-1 text-xs text-rose-400" />
                </div>

                <div>
                  <InputLabel htmlFor="message" value="Message Details" />
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={data.message}
                    placeholder="Please describe your inquiry in detail..."
                    className="mt-1 block w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    onChange={(e) => setData('message', e.target.value)}
                    required
                  />
                  <InputError message={errors.message} className="mt-1 text-xs text-rose-400" />
                </div>

                <PrimaryButton className="w-full flex items-center justify-center space-x-2 py-3.5 text-sm font-bold mt-2" disabled={processing}>
                  <Send className="h-4 w-4" />
                  <span>Send Support Message</span>
                </PrimaryButton>
              </form>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-1">
          <p className="font-semibold text-zinc-300">{companyName} — Company number {companyNumber}</p>
          <p>{companyAddress}</p>
          <p>© 2026 Noirdrop B2B SaaS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
