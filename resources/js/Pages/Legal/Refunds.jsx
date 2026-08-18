import React from 'react';
import LegalLayout from '@/Layouts/LegalLayout';

export default function Refunds() {
  return (
    <LegalLayout title="Refund & Cancellation Policy" lastUpdated="August 18, 2026">
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">1. B2B Commercial Purchase Terms</h2>
        <p>
          Noirdrop is a B2B SaaS platform operated by <strong>HARTDELL LIMITED</strong> (Company Number <strong>16021824</strong>). Credit packages (€100 for 100 Drops, €500 for 500 Drops, €1,500 for 1,500 Drops) represent digital credit assets for immediate business generation.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">2. Unused Credit Refund Guarantee</h2>
        <p>
          If you purchase a credit package and have not utilized any of the purchased generation credits, you are eligible for a full refund within 14 days of purchase.
        </p>
        <p>
          Due to the instant compute resources consumed during AI processing, credits that have already been executed for product generation are non-refundable once processed.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">3. Requesting a Refund</h2>
        <p>
          To submit a refund request, please send your invoice number and account email to:
        </p>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 font-mono text-xs text-purple-300">
          HARTDELL LIMITED — Support Department<br />
          Email: support@noirdrop.com<br />
          Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF
        </div>
      </section>
    </LegalLayout>
  );
}
