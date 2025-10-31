// Advanced SEO and AI Search Optimization
// Maintaining brand consistency: Magenta var(--smh-primary-magenta), Turquoise var(--smh-primary-teal), Gold var(--smh-accent-gold)

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage?: string;
  structuredData?: Record<string, unknown>;
  localBusiness?: LocalBusinessData;
}

export interface LocalBusinessData {
  name: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  email: string;
  url: string;
  openingHours: string[];
  priceRange: string;
  paymentAccepted: string[];
  currenciesAccepted: string;
  areaServed: string[];
  specialties: string[];
}

// St Mary's House Dental Care Business Data
export const SMH_BUSINESS_DATA: LocalBusinessData = {
  name: "St Mary's House Dental Care",
  description: "Luxury coastal dental practice in Shoreham-by-Sea, specializing in 3D digital dentistry, porcelain veneers, dental implants, and anxiety-free treatments.",
  address: {
    streetAddress: "1 St Mary's House",
    addressLocality: "Shoreham-by-Sea",
    addressRegion: "West Sussex",
    postalCode: "BN43 5ZA",
    addressCountry: "GB"
  },
  telephone: "+441273453109",
  email: "info@stmaryshousedental.co.uk",
  url: "https://www.stmaryshousedental.co.uk",
  openingHours: [
    "Mo-Th 09:00-17:00",
    "Fr 09:00-16:00",
    "Sa 09:00-13:00"
  ],
  priceRange: "£££",
  paymentAccepted: ["Cash", "Credit Card", "Debit Card", "Finance Plans"],
  currenciesAccepted: "GBP",
  areaServed: [
    "Shoreham-by-Sea",
    "Brighton",
    "Hove",
    "Worthing",
    "Lancing",
    "Steyning",
    "Henfield",
    "West Sussex",
    "East Sussex"
  ],
  specialties: [
    "3D Digital Dentistry",
    "Porcelain Veneers",
    "Dental Implants",
    "Teeth Whitening",
    "Emergency Dentistry",
    "Anxiety-Free Dentistry",
    "Cosmetic Dentistry",
    "Preventive Dentistry"
  ]
};

// Generate comprehensive structured data
export function generateMedicalBusinessSchema(businessData: LocalBusinessData) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": businessData.url,
    "name": businessData.name,
    "description": businessData.description,
    "url": businessData.url,
    "logo": `${businessData.url}/logo.png`,
    "image": [
      `${businessData.url}/hero-poster.jpg`,
      `${businessData.url}/practice-exterior.jpg`,
      `${businessData.url}/practice-interior.jpg`
    ],
    "telephone": businessData.telephone,
    "email": businessData.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessData.address.streetAddress,
      "addressLocality": businessData.address.addressLocality,
      "addressRegion": businessData.address.addressRegion,
      "postalCode": businessData.address.postalCode,
      "addressCountry": businessData.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "50.8333",
      "longitude": "-0.2667"
    },
    "openingHoursSpecification": businessData.openingHours.map(hours => {
      const [days, time] = hours.split(' ');
      const [opens, closes] = time.split('-');
      
      let dayOfWeek: string[];
      if (days === "Mo-Th") {
        dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday"];
      } else if (days === "Fr") {
        dayOfWeek = ["Friday"];
      } else if (days === "Sa") {
        dayOfWeek = ["Saturday"];
      } else {
        dayOfWeek = [days];
      }

      return {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": dayOfWeek,
        "opens": opens,
        "closes": closes
      };
    }),
    "sameAs": [
      "https://www.facebook.com/stmaryshousedental",
      "https://www.instagram.com/stmaryshousedental",
      "https://www.linkedin.com/company/stmaryshousedental",
      "https://twitter.com/smhdental"
    ],
    "medicalSpecialty": businessData.specialties,
    "priceRange": businessData.priceRange,
    "currenciesAccepted": businessData.currenciesAccepted,
    "paymentAccepted": businessData.paymentAccepted,
    "areaServed": businessData.areaServed.map(area => ({
      "@type": "City",
      "name": area
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Dental Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "3D Digital Dentistry",
            "description": "Advanced 3D scanning and digital treatment planning"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Porcelain Veneers",
            "description": "Custom-crafted porcelain veneers for smile transformation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Dental Implants",
            "description": "Permanent tooth replacement with titanium implants"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalProcedure",
            "name": "Emergency Dentistry",
            "description": "24/7 emergency dental care for urgent situations"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "247",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Absolutely exceptional service! The 3D scanning technology made my implant procedure so much easier. The coastal setting is beautiful and calming."
      }
    ]
  };
}

// Generate FAQ schema for voice search optimization
export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes St Mary's House Dental Care different?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We combine luxury coastal aesthetics with cutting-edge 3D digital dentistry technology. Our practice specializes in anxiety-free treatments, AI-powered diagnostics, and personalized patient care in a stunning seaside setting."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer emergency dental services in Shoreham-by-Sea?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide 24/7 emergency dental care. Call 01273 453109 for immediate assistance with dental emergencies, severe pain, or urgent dental problems."
        }
      },
      {
        "@type": "Question",
        "name": "What is 3D digital dentistry?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "3D digital dentistry uses advanced scanning technology to create precise 3D models of your teeth and mouth. This allows for more accurate diagnoses, better treatment planning, and superior results for procedures like implants and veneers."
        }
      },
      {
        "@type": "Question",
        "name": "How much do dental implants cost at St Mary's House?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dental implant costs vary based on individual needs. We offer comprehensive consultations with transparent pricing and flexible payment plans. Contact us for a personalized quote and treatment plan."
        }
      },
      {
        "@type": "Question",
        "name": "Do you treat dental anxiety?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! We specialize in anxiety-free dentistry with sedation options, The Wand pain-free injection system, and a calming coastal environment designed to reduce dental anxiety."
        }
      }
    ]
  };
}

// Generate service-specific schema
export function generateServiceSchema(serviceName: string, description: string, price?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "MedicalBusiness",
      "name": "St Mary's House Dental Care",
      "url": "https://www.stmaryshousedental.co.uk"
    },
    "location": {
      "@type": "Place",
      "name": "St Mary's House Dental Care",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1 St Mary's House",
        "addressLocality": "Shoreham-by-Sea",
        "addressRegion": "West Sussex",
        "postalCode": "BN43 5ZA",
        "addressCountry": "GB"
      }
    },
    ...(price && {
      "offers": {
        "@type": "Offer",
        "price": price,
        "priceCurrency": "GBP"
      }
    })
  };
}

// SEO optimization utilities
export class SEOOptimizer {
  static generateMetaTags(config: SEOConfig) {
    return {
      title: config.title,
      description: config.description,
      keywords: config.keywords.join(', '),
      canonical: config.canonicalUrl,
      openGraph: {
        title: config.title,
        description: config.description,
        url: config.canonicalUrl,
        siteName: "St Mary's House Dental Care",
        images: config.ogImage ? [
          {
            url: config.ogImage,
            width: 1200,
            height: 630,
            alt: config.title
          }
        ] : [],
        locale: 'en_GB',
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        title: config.title,
        description: config.description,
        images: config.ogImage ? [config.ogImage] : []
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1
        }
      }
    };
  }

  static generateLocalSEOKeywords(location: string, service: string) {
    const baseKeywords = [
      `${service} ${location}`,
      `${service} near ${location}`,
      `best ${service} ${location}`,
      `private ${service} ${location}`,
      `luxury ${service} ${location}`,
      `${service} clinic ${location}`,
      `${service} practice ${location}`,
      `${service} specialist ${location}`
    ];

    const urgencyKeywords = [
      `emergency ${service} ${location}`,
      `urgent ${service} ${location}`,
      `same day ${service} ${location}`,
      `24 hour ${service} ${location}`
    ];

    const qualityKeywords = [
      `experienced ${service} ${location}`,
      `qualified ${service} ${location}`,
      `professional ${service} ${location}`,
      `expert ${service} ${location}`
    ];

    return [...baseKeywords, ...urgencyKeywords, ...qualityKeywords];
  }

  static generateContentOptimization(content: string, targetKeywords: string[]) {
    // AI-powered content optimization suggestions
    const suggestions = {
      keywordDensity: this.calculateKeywordDensity(content, targetKeywords),
      readabilityScore: this.calculateReadabilityScore(content),
      semanticKeywords: this.generateSemanticKeywords(targetKeywords),
      contentStructure: this.analyzeContentStructure(content),
      optimizationTips: this.generateOptimizationTips(content, targetKeywords)
    };

    return suggestions;
  }

  private static calculateKeywordDensity(content: string, keywords: string[]) {
    const wordCount = content.split(/\s+/).length;
    const keywordCounts = keywords.map(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = content.match(regex) || [];
      return {
        keyword,
        count: matches.length,
        density: (matches.length / wordCount) * 100
      };
    });

    return keywordCounts;
  }

  private static calculateReadabilityScore(content: string) {
    // Simplified Flesch Reading Ease calculation
    const sentences = content.split(/[.!?]+/).length - 1;
    const words = content.split(/\s+/).length;
    const syllables = content.split(/[aeiouAEIOU]/).length - 1;

    const avgSentenceLength = words / sentences;
    const avgSyllablesPerWord = syllables / words;

    const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
    
    return {
      score: Math.round(score),
      level: score >= 90 ? 'Very Easy' :
             score >= 80 ? 'Easy' :
             score >= 70 ? 'Fairly Easy' :
             score >= 60 ? 'Standard' :
             score >= 50 ? 'Fairly Difficult' :
             score >= 30 ? 'Difficult' : 'Very Difficult'
    };
  }

  private static generateSemanticKeywords(targetKeywords: string[]) {
    // Generate semantically related keywords for better SEO
    const semanticMap: { [key: string]: string[] } = {
      'dentist': ['dental care', 'oral health', 'dental practice', 'dental clinic', 'dental surgery'],
      'implants': ['tooth replacement', 'dental restoration', 'missing teeth', 'permanent teeth'],
      'veneers': ['smile makeover', 'cosmetic dentistry', 'tooth whitening', 'smile design'],
      'emergency': ['urgent care', 'dental pain', 'toothache', 'dental trauma', 'broken tooth'],
      'anxiety': ['nervous patients', 'dental phobia', 'sedation dentistry', 'comfortable dentistry']
    };

    const semanticKeywords: string[] = [];
    targetKeywords.forEach(keyword => {
      Object.keys(semanticMap).forEach(key => {
        if (keyword.toLowerCase().includes(key)) {
          semanticKeywords.push(...semanticMap[key]);
        }
      });
    });

    return [...new Set(semanticKeywords)];
  }

  private static analyzeContentStructure(content: string) {
    const headings = content.match(/#{1,6}\s.+/g) || [];
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
    const lists = content.match(/^\s*[-*+]\s/gm) || [];

    return {
      headingCount: headings.length,
      paragraphCount: paragraphs.length,
      listCount: lists.length,
      averageParagraphLength: paragraphs.reduce((sum, p) => sum + p.length, 0) / paragraphs.length,
      hasProperStructure: headings.length >= 2 && paragraphs.length >= 3
    };
  }

  private static generateOptimizationTips(content: string, targetKeywords: string[]) {
    const tips: string[] = [];
    
    // Check keyword usage
    const keywordDensity = this.calculateKeywordDensity(content, targetKeywords);
    keywordDensity.forEach(kd => {
      if (kd.density < 0.5) {
        tips.push(`Consider using "${kd.keyword}" more frequently (current density: ${kd.density.toFixed(2)}%)`);
      } else if (kd.density > 3) {
        tips.push(`Reduce usage of "${kd.keyword}" to avoid keyword stuffing (current density: ${kd.density.toFixed(2)}%)`);
      }
    });

    // Check content length
    const wordCount = content.split(/\s+/).length;
    if (wordCount < 300) {
      tips.push('Consider expanding content to at least 300 words for better SEO');
    }

    // Check structure
    const structure = this.analyzeContentStructure(content);
    if (!structure.hasProperStructure) {
      tips.push('Add more headings and structure to improve readability');
    }

    return tips;
  }
}

// Voice search optimization
export function optimizeForVoiceSearch(content: string) {
  const voiceSearchPatterns = [
    /what is/gi,
    /how to/gi,
    /where can i/gi,
    /who is/gi,
    /when should/gi,
    /why do/gi
  ];

  const hasVoiceSearchOptimization = voiceSearchPatterns.some(pattern => 
    pattern.test(content)
  );

  return {
    isOptimized: hasVoiceSearchOptimization,
    suggestions: hasVoiceSearchOptimization ? [] : [
      'Add FAQ sections with natural language questions',
      'Include conversational phrases and long-tail keywords',
      'Structure content to answer specific questions',
      'Use location-based question patterns'
    ]
  };
}

// Core Web Vitals optimization
export function generateCoreWebVitalsOptimization() {
  return {
    LCP: {
      target: '< 2.5s',
      optimizations: [
        'Optimize hero video loading with poster images',
        'Preload critical resources (fonts, images)',
        'Use efficient image formats (WebP, AVIF)',
        'Implement lazy loading for below-fold content'
      ]
    },
    FID: {
      target: '< 100ms',
      optimizations: [
        'Minimize JavaScript execution time',
        'Use code splitting for large bundles',
        'Defer non-critical JavaScript',
        'Optimize third-party scripts'
      ]
    },
    CLS: {
      target: '< 0.1',
      optimizations: [
        'Set explicit dimensions for images and videos',
        'Reserve space for dynamic content',
        'Avoid inserting content above existing content',
        'Use transform animations instead of layout changes'
      ]
    }
  };
}

