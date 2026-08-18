import React from 'react';
import LegalLayout from '@/Layouts/LegalLayout';

export default function Imprint() {
  return (
    <LegalLayout title="Legal Notice & Imprint" lastUpdated="August 18, 2026">
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">Company Registration Details</h2>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-3 font-mono text-xs text-zinc-300">
          <p><strong className="text-white">Company Name:</strong> HARTDELL LIMITED</p>
          <p><strong className="text-white">Company Registration Number:</strong> 16021824</p>
          <p><strong className="text-white">Registered Office Address:</strong> Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF</p>
          <p><strong className="text-white">Jurisdiction:</strong> England and Wales (United Kingdom)</p>
          <p><strong className="text-white">General Inquiry Email:</strong> contact@noirdrop.com</p>
          <p><strong className="text-white">Support Email:</strong> support@noirdrop.com</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">Online Dispute Resolution</h2>
        <p>
          The European Commission provides a platform for online dispute resolution (ODR) accessible at <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer" className="text-purple-400 underline">https://ec.europa.eu/consumers/odr/</a>. We are open to resolving any customer queries directly via our dedicated support channel.
        </p>
      </section>
    </LegalLayout>
  );
}
