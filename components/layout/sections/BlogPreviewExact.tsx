'use client';

export default function BlogPreviewExact(){
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-2xl md:text-3xl font-bold">From the Journal</h3>
          <a href="/preview/lux/blog" className="text-sm underline">All posts</a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {Array.from({length:3}).map((_, i) => (
            <article key={i} className="rounded-xl p-4 bg-white/70 dark:bg-white/5 border">
              <h4 className="font-semibold">Luxury Dentistry Insight {i+1}</h4>
              <p className="text-sm opacity-80 mt-1">A short preview that links to the full post layout.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
