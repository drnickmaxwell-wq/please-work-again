'use client';
import StickyHeader from '@/components/layout/sticky-header';
import { FooterLuxe } from '@/components/footer-luxe';

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-[var(--smh-midnight)]">
      <StickyHeader />
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white" style={{fontFamily:'var(--font-playfair), Georgia, serif'}}>Referrals</h1>
        <div className="mt-6 text-slate-700 dark:text-slate-300" style={{fontFamily:'var(--font-inter), system-ui, Arial'}}>
          
<p>We welcome referrals for implants, veneers, and advanced restorative care.</p>
<form className="grid gap-3 max-w-xl mt-6" onSubmit={(e)=>{e.preventDefault(); alert('Referral submitted');}}>
  <input className="rounded-md border p-3 bg-white/70 dark:bg-white/5" placeholder="Referring Dentist / Practice" required />
  <input className="rounded-md border p-3 bg-white/70 dark:bg-white/5" placeholder="Patient Name" required />
  <input className="rounded-md border p-3 bg-white/70 dark:bg-white/5" placeholder="Contact Email" type="email" required />
  <textarea className="rounded-md border p-3 bg-white/70 dark:bg-white/5" placeholder="Clinical Details" />
  <button className="rounded-full px-6 py-3 text-white font-semibold bg-gradient-to-r from-pink-600 via-teal-500 to-yellow-500">Send Referral</button>
</form>

        </div>
      </section>
      <FooterLuxe />
    </main>
  );
}
