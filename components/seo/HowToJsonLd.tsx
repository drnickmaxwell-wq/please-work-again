'use client';
export default function HowToJsonLd({ name, steps }:{ name:string, steps:string[] }){
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "step": steps.map(s => ({ "@type": "HowToStep", "text": s }))
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
