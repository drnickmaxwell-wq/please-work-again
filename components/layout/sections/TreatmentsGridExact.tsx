'use client';
const cards=[
  {h:'Porcelain Veneers',p:'Subtle, natural transformations.'},
  {h:'Dental Implants',p:'Confident smiles that last.'},
  {h:'3‑D Digital Dentistry',p:'Same‑day precision & comfort.'},
  {h:'Teeth Whitening',p:'Brighten with care & science.'},
  {h:'Emergency Dentist',p:'Urgent care 24/7 hotline.'},
  {h:'Anxiety Dentistry',p:'Comfort‑first, pain‑managed.'},
];
export default function TreatmentsGridExact(){
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold">Our Treatments</h2>
        <p className="mt-2 opacity-80">Calm, precise and beautifully natural outcomes.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {cards.map((c,i)=>(
            <div key={i} className="rounded-2xl p-6 bg-white/70 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold">{c.h}</h3>
              <p className="mt-2 opacity-80">{c.p}</p>
              <div className="mt-4 inline-flex items-center rounded-full px-4 py-2 text-white font-semibold bg-gradient-to-r from-pink-600 via-teal-500 to-yellow-500">Explore</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
