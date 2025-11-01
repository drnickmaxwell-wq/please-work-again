import Image from 'next/image';

export default function EquipmentGallery() {
  const equipment = [
    {
      image: '/assets/champagne/equipment/itero-element-5d.webp',
      label: 'iTero Element 5D',
      sublabel: 'AI-powered scanner',
      alt: 'iTero Element 5D digital scanner'
    },
    {
      image: '/assets/champagne/equipment/cerec-primemill.webp',
      label: 'CEREC Primemill',
      sublabel: 'Same-day fabrication',
      alt: 'CEREC Primemill milling system'
    },
    {
      image: '/assets/champagne/equipment/3shape-trios.webp',
      label: '3Shape TRIOS',
      sublabel: 'Precision imaging',
      alt: '3Shape TRIOS intraoral scanner'
    }
  ];

  return (
    <section
      id="equipment"
      className="sectionPorcelain equipmentGallery relative py-24 md:py-32"
      aria-label="Equipment Gallery"
    >
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="equipmentGallery__heading font-playfair text-4xl md:text-5xl font-semibold">
            Advanced Technology
          </h2>
          <p className="equipmentGallery__subheading mt-4 text-lg">
            State-of-the-art equipment for exceptional results
          </p>
        </div>
        
        {/* Equipment cards */}
        <div className="equipmentGallery__grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {equipment.map((item, index) => (
            <div key={index} className="equipmentGallery__card">
              {/* Image with gradient overlay */}
              <div className="equipmentGallery__imageWrapper">
                <div className="equipmentGallery__imageGradient" aria-hidden="true" />
                <div className="equipmentGallery__imageVignette" aria-hidden="true" />
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  loading="lazy"
                  className="equipmentGallery__image"
                />
              </div>
              
              {/* Labels */}
              <div className="equipmentGallery__labels">
                <h3 className="equipmentGallery__label font-playfair text-xl font-semibold">
                  {item.label}
                </h3>
                <p className="equipmentGallery__sublabel text-sm mt-1">
                  {item.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
