import Link from "next/link";

type TreatmentGridItem = {
  title: string;
  excerpt: string;
  ctaLabel: string;
  ctaHref: string;
};

type TreatmentGridProps = {
  items: TreatmentGridItem[];
};

export function TreatmentGrid({ items }: TreatmentGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="group flex flex-col rounded-2xl border border-slate-200/70 bg-white/70 p-8 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
        >
          <header className="mb-4">
            <h3 className="text-2xl font-semibold text-slate-900">
              {item.title}
            </h3>
          </header>
          <p className="mb-8 text-slate-600">{item.excerpt}</p>
          <div className="mt-auto">
            <Link
              href={item.ctaHref}
              className="inline-flex items-center gap-2 font-semibold text-sky-600 transition group-hover:text-sky-700"
            >
              {item.ctaLabel}
              <span aria-hidden className="transition group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
