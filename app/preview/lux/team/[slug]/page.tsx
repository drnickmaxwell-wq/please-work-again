'use client';
import { useParams } from 'next/navigation';
import StickyHeader from '@/components/layout/sticky-header';
import { FooterLuxe } from '@/components/footer-luxe';

export default function TeamMember(){
  const { slug } = useParams();
  return (
    <main className="min-h-screen bg-white dark:bg-[var(--smh-midnight)]">
      <StickyHeader />
      <section className="max-w-4xl mx-auto px-6 py-14">
        <div className="grid gap-6 md:grid-cols-[240px_1fr] items-start">
          <div className="aspect-square rounded-lg bg-white/50 dark:bg-white/10 border" />
          <div>
            <h1 className="text-3xl font-bold capitalize">{String(slug).replace('-', ' ')}</h1>
            <p className="mt-2 opacity-80">Biography and qualifications coming soon.</p>
          </div>
        </div>
      </section>
      <FooterLuxe />
    </main>
  );
}