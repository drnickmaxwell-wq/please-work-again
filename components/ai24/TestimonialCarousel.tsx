type Testimonial = {
  quote: string;
  name: string;
};

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  if (!testimonials.length) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-8 shadow-sm backdrop-blur">
      <div className="grid gap-12 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.name} className="flex flex-col gap-6">
            <blockquote className="text-lg leading-relaxed text-slate-700">
              <span className="text-4xl text-sky-500">“</span>
              {testimonial.quote}
              <span className="text-4xl text-sky-500">”</span>
            </blockquote>
            <figcaption className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              {testimonial.name}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-white via-transparent to-white/80 md:block" />
    </div>
  );
}
