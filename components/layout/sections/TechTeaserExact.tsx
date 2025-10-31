'use client';

export default function TechTeaserExact(){
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold">3-D & Digital</h3>
          <p className="mt-2 opacity-80">
            Precision scanners, same-day crowns, AR smile previews and gentle comfort tech.
          </p>
          <a href="/preview/lux/technology"
             className="mt-4 inline-flex items-center rounded-full px-5 py-2 bg-[var(--gradient-cta)] text-white shadow-lg">
            Explore Technology
          </a>
        </div>
        <div className="aspect-[16/10] rounded-2xl border bg-white/60 dark:bg-white/5 grid place-items-center">
          <span className="opacity-60">3-D viewer teaser (lazy)</span>
        </div>
      </div>
    </section>
  );
}
