'use client';
import StickyHeader from '@/components/layout/sticky-header';
import { FooterLuxe } from '@/components/footer-luxe';
import { motion } from 'framer-motion';
export default function Stories(){
  const list = [
    { quote:'So calm and professional — I finally love my smile.', name:'J. Carter' },
    { quote:'Same‑day crown was unbelievably smooth.', name:'H. Patel' },
    { quote:'The team are incredibly gentle and kind.', name:'R. Lawson' }
  ];
  return (
    <main className="min-h-screen bg-white dark:bg-[var(--smh-midnight)]">
      <StickyHeader />
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-bold">Patient Stories</h1>
        <div className="grid gap-6 md:grid-cols-3 mt-6">
          {list.map((t,i)=>(
            <motion.blockquote key={i} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.35, delay:i*0.06}}
              className="rounded-xl p-6 bg-white/70 dark:bg-white/5 border">
              <p>&ldquo;{t.quote}&rdquo;</p><footer className="mt-2 text-sm opacity-70">— {t.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </section>
      <FooterLuxe />
    </main>
  );
}