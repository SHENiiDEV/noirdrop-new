import React from 'react';
import LegalLayout from '@/Layouts/LegalLayout';

export default function Terms() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="August 18, 2026">
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">1. Company & Service Overview</h2>
        <p>
          These Terms of Service ("Terms") govern your access to and use of the Noirdrop website and B2B SaaS platform ("Service"), operated by <strong>HARTDELL LIMITED</strong> ("Company", "we", "us", or "our"), a company registered in England and Wales under Company Number <strong>16021824</strong>, with registered office at <strong>Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF</strong>.
        </p>
        <p>
          By creating an account or purchasing generation credits ("Drops"), you agree to be bound by these Terms.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">2. B2B Service Provision & Credits</h2>
        <p>
          Noirdrop is a B2B SaaS platform designed to generate e-commerce product listings, SEO titles, HTML descriptions, feature bullet points, and social media marketing copy based on user-provided input.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Credit Model:</strong> Services are billed on a credit package basis where 1 Drop Request = €1. Credit packages range from €100 for 100 Drops to €1,500 for 1,500 Drops.</li>
          <li><strong>Token Validity:</strong> Purchased tokens do not expire and remain active on your account balance until redeemed for generation requests.</li>
          <li><strong>B2B Commercial License:</strong> All generated product listings and copywriting output created via Noirdrop are granted to you under a non-exclusive, worldwide, royalty-free license for commercial use on your e-commerce storefronts, social media channels, and marketplaces.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">3. User Responsibilities & Acceptable Use</h2>
        <p>
          You agree not to use the Service for any unlawful purpose or to generate content that violates third-party intellectual property, trademark, or advertising regulations. You are solely responsible for reviewing and verifying the accuracy of AI-generated content before publication.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">4. Governing Law & Jurisdiction</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">5. Contact Information</h2>
        <p>
          For any legal or contractual inquiries, please contact:
        </p>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 font-mono text-xs text-purple-300">
          HARTDELL LIMITED<br />
          Company Number: 16021824<br />
          Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF<br />
          Email: legal@noirdrop.com
        </div>
      </section>
    </LegalLayout>
  );
}
