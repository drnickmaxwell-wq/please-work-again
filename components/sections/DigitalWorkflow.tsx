export default function DigitalWorkflow() {
  const workflowSteps = [
    {
      icon: '/assets/champagne/icons/scan.svg',
      title: 'Scan',
      description: 'Precision digital imaging captures every detail of your smile.',
      link: '/treatments/technology#scan'
    },
    {
      icon: '/assets/champagne/icons/smile-curve.svg',
      title: 'Design',
      description: 'AI-powered design creates your perfect smile blueprint.',
      link: '/treatments/technology#design'
    },
    {
      icon: '/assets/champagne/icons/implant.svg',
      title: 'Make',
      description: 'Same-day fabrication brings your new smile to life.',
      link: '/treatments/technology#make'
    }
  ];

  return (
    <section
      id="workflow"
      className="sectionPorcelainLite digitalWorkflow relative py-24 md:py-32"
      aria-label="Digital Workflow"
    >
      {/* Film grain texture */}
      <div className="digitalWorkflow__grain" aria-hidden="true" />
      
      {/* Particles overlay */}
      <div className="digitalWorkflow__particles" aria-hidden="true" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="digitalWorkflow__heading font-playfair text-4xl md:text-5xl font-semibold">
            Digital Workflow
          </h2>
          <p className="digitalWorkflow__subheading mt-4 text-lg">
            Three seamless steps to your perfect smile
          </p>
        </div>
        
        {/* Workflow cards */}
        <div className="digitalWorkflow__grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {workflowSteps.map((step, index) => (
            <div key={index} className="digitalWorkflow__card">
              {/* Icon */}
              <div className="digitalWorkflow__iconWrapper">
                <img 
                  src={step.icon} 
                  alt="" 
                  aria-hidden="true"
                  className="digitalWorkflow__icon"
                  width="48"
                  height="48"
                />
              </div>
              
              {/* Content */}
              <h3 className="digitalWorkflow__cardTitle font-playfair text-2xl font-semibold mt-6">
                {step.title}
              </h3>
              <p className="digitalWorkflow__cardDescription mt-3 text-base">
                {step.description}
              </p>
              
              {/* Optional link */}
              {step.link && (
                <a 
                  href={step.link} 
                  className="digitalWorkflow__cardLink mt-4 inline-flex items-center text-sm font-medium"
                  aria-label={`Learn more about ${step.title}`}
                >
                  Learn more
                  <svg 
                    className="ml-2 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
