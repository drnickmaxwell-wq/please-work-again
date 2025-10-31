import Image from "next/image";
import Link from "next/link";

import "@/styles/champagne/services-grid.css";

const services = [
  {
    icon: "/assets/champagne/icons/scan.svg",
    title: "4K Smile Scans",
    body: "Comprehensive AI-guided diagnostics capture every nuance of your smile for precise treatment planning.",
    href: "/treatments/3d-dentistry",
    cta: "Explore 3D dentistry",
  },
  {
    icon: "/assets/champagne/icons/implant.svg",
    title: "Same-Day Restorations",
    body: "Digital implant placement and handcrafted veneers delivered with meticulous, comfort-first protocols.",
    href: "/treatments/dental-implants",
    cta: "View implant care",
  },
  {
    icon: "/assets/champagne/icons/smile-curve.svg",
    title: "Artful Cosmetics",
    body: "Subtle composite artistry and porcelain enhancements curated to harmonise with your natural features.",
    href: "/treatments/cosmetic",
    cta: "Discover cosmetic options",
  },
  {
    icon: "/assets/champagne/icons/sparkle.svg",
    title: "Champagne Whitening",
    body: "Gentle, accelerated whitening rituals paired with tailored aftercare to keep brilliance beautifully balanced.",
    href: "/treatments/whitening",
    cta: "Book whitening",
  },
];

export default function ServicesGrid() {
  return (
    <section
      id="signature-services"
      aria-labelledby="services-heading"
      className="servicesGrid"
    >
      <div className="servicesGrid__backdrop" aria-hidden="true" />
      <div className="servicesGrid__container">
        <div className="servicesGrid__intro">
          <span className="servicesGrid__eyebrow">Signature services</span>
          <h2 id="services-heading" className="servicesGrid__title">
            Refinement in every detail
          </h2>
          <p className="servicesGrid__description">
            Designed for discerning patients seeking precision, serenity, and luminous results under the Champagne guard.
          </p>
        </div>

        <div className="servicesGrid__layout">
          {services.map((service) => (
            <article key={service.title} className="servicesGrid__card">
              <div className="servicesGrid__iconWrap" aria-hidden="true">
                <span className="servicesGrid__icon">
                  <Image src={service.icon} alt="" width={36} height={36} />
                </span>
              </div>

              <div className="servicesGrid__content">
                <h3 className="servicesGrid__cardTitle">{service.title}</h3>
                <p className="servicesGrid__cardBody">{service.body}</p>
              </div>

              <Link href={service.href} className="servicesGrid__cta">
                <span>{service.cta}</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="servicesGrid__ctaIcon">
                  <path d="M5 12h14m0 0-5-5m5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
