import Image from "next/image";
import Link from "next/link";

import "@/styles/champagne/services-grid.css";

const services = [
  {
    icon: "/assets/champagne/icons/dental-implants.svg",
    title: "Dental Implants",
    body: "Precise, custom implants restore form & function with Champagne-level craftsmanship.",
    href: "/treatments/dental-implants",
    cta: "See implant options",
  },
  {
    icon: "/assets/champagne/icons/same-day-crowns.svg",
    title: "Same-Day Crowns",
    body: "Craft and seat your crown in a single visit with digital scanning and in-house milling.",
    href: "/treatments/3d-dentistry",
    cta: "Explore same-day crowns",
  },
  {
    icon: "/assets/champagne/icons/invisalign-aligners.svg",
    title: "Invisalign & Spark Aligners",
    body: "Subtle aligner therapies paired with orthodontic expertise to craft your perfect smile.",
    href: "/treatments/orthodontics",
    cta: "Start your aligner journey",
  },
  {
    icon: "/assets/champagne/icons/composite-bonding.svg",
    title: "Composite Bonding",
    body: "Artisanal bonding and contouring to refine shape and symmetry with minimal intervention.",
    href: "/treatments/composite-bonding",
    cta: "Discover bonding artistry",
  },
  {
    icon: "/assets/champagne/icons/hygiene-airflow.svg",
    title: "Hygiene & Airflow",
    body: "Advanced airflow hygiene to polish and detoxify, leaving you with a truly luminous smile.",
    href: "/treatments/general",
    cta: "Book a hygiene visit",
  },
  {
    icon: "/assets/champagne/icons/emergency-care.svg",
    title: "Emergency Care",
    body: "Urgent attention with a gentle touch, restoring calm and comfort when you need it most.",
    href: "/emergency-dentist",
    cta: "Get emergency help",
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
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="servicesGrid__ctaIcon"
                >
                  <path
                    d="M5 12h14m0 0-5-5m5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
