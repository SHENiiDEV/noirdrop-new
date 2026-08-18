import React from 'react';
import LegalLayout from '@/Layouts/LegalLayout';

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="August 18, 2026">
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">1. Data Controller</h2>
        <p>
          This Privacy Policy explains how <strong>HARTDELL LIMITED</strong> ("Company", "we", "us"), registered in England and Wales under Company Number <strong>16021824</strong> (Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF), collects, uses, and protects your personal information when using the Noirdrop platform.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Account Information:</strong> Name, email address, password hash, and company details when registering.</li>
          <li><strong>Usage & Input Data:</strong> Product titles, raw specifications, and generation prompts submitted to the AI engine.</li>
          <li><strong>Billing Information:</strong> Payment processing transaction IDs, credit balance records, and purchase history. Payment details are processed securely via PCI-compliant payment gateways.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">3. How We Use Your Data</h2>
        <p>
          We process personal data under UK GDPR / EU GDPR legal bases for the performance of our contract with you (delivering AI copy generations, managing credit balances) and fulfilling legal accounting obligations.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">4. Data Rights & Inquiries</h2>
        <p>
          You have the right to access, rectify, or request the deletion of your personal data at any time. To exercise your data rights under UK GDPR, contact our Data Protection Officer at:
        </p>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 font-mono text-xs text-purple-300">
          HARTDELL LIMITED — Privacy Department<br />
          Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF<br />
          Email: privacy@noirdrop.com
        </div>
      </section>
    </LegalLayout>
  );
}
