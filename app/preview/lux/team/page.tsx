'use client';
import StickyHeader from '@/components/layout/sticky-header';
import { FooterLuxe } from '@/components/footer-luxe';
import Link from 'next/link';

export default function TeamPage(){
  const team = [
    { slug:'dr-sarah', name:'Dr Sarah', role:'Principal Dentist' },
    { slug:'dr-liam', name:'Dr Liam', role:'Implant Dentist' },
    { slug:'anna', name:'Anna', role:'Hygienist' }
  ];
  return (
    <main className="min-h-screen bg-white dark:bg-[var(--smh-midnight)]">
      <StickyHeader />
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-bold">Our Team</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {team.map(m => (
            <Link key={m.slug} href={`/preview/lux/team/${m.slug}`} className="rounded-xl p-4 bg-white/70 dark:bg-white/5 border">
              <div className="aspect-square rounded-lg bg-white/50 dark:bg-white/10 border" />
              <h3 className="mt-3 font-semibold">{m.name}</h3>
              <p className="text-sm opacity-80">{m.role}</p>
            </Link>
          ))}
        </div>
      </section>
      <FooterLuxe />
    </main>
  );
}