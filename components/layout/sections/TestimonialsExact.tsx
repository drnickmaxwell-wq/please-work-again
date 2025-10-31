'use client';

const items = [
  { q:'So calm and professional — I finally love my smile.', a:'— J. Carter' },
  { q:'Same-day crown was unbelievably smooth.', a:'— H. Patel' },
  { q:'The team are incredibly gentle and kind.', a:'— R. Lawson' },
];

export default function TestimonialsExact(){
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl p-8 bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10">
          <h2 className="text-2xl md:text-3xl font-bold">Patient Stories</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {items.map((t, i) => (
              <blockquote key={i} className="rounded-xl p-6 bg-white/70 dark:bg-white/5 border">
                <p>&ldquo;{t.q}&rdquo;</p>
                <footer className="mt-2 text-sm opacity-70">{t.a}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
