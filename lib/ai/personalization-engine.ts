// AI-Powered Personalization Engine
// Brand Colors: Magenta var(--smh-primary-magenta), Turquoise var(--smh-primary-teal), Gold var(--smh-accent-gold)
// Fonts: Montserrat headings, Lora body text

import { TOKENS as NEUTRAL_TOKENS } from '@/styles/tokens/neutrals';

export interface UserProfile {
  id: string;
  demographics: {
    age?: number;
    location?: string;
    language?: string;
  };
  preferences: {
    treatmentInterests: string[];
    anxietyLevel: 'low' | 'medium' | 'high';
    budgetRange: 'budget' | 'standard' | 'premium';
    communicationStyle: 'formal' | 'friendly' | 'technical';
  };
  behavior: {
    visitCount: number;
    pagesVisited: string[];
    timeSpent: number;
    deviceType: 'mobile' | 'tablet' | 'desktop';
    referralSource: string;
  };
  interactions: {
    chatMessages: number;
    appointmentRequests: number;
    downloadedResources: string[];
    completedQuizzes: string[];
  };
  dentalHistory: {
    previousTreatments: string[];
    currentConcerns: string[];
    lastVisit?: Date;
    riskFactors: string[];
  };
}

export interface PersonalizationRule {
  id: string;
  name: string;
  condition: (profile: UserProfile) => boolean;
  action: PersonalizationAction;
  priority: number;
  brandConsistent: boolean;
}

export interface PersonalizationAction {
  type: 'content' | 'layout' | 'cta' | 'recommendation' | 'styling';
  target: string;
  modification: PersonalizationModification;
  brandColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface PersonalizationModification {
  brandColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  [key: string]: unknown;
}

interface RecommendationStyling {
  gradient: string;
  textColor: string;
  font: string;
}

interface PersonalizedRecommendation {
  type: 'treatment' | 'service' | 'emergency';
  title: string;
  description: string;
  cta: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  brandStyling: RecommendationStyling;
}

type InteractionValue = string | number | boolean | string[] | Record<string, unknown> | undefined;

// Brand-consistent personalization rules
export const PERSONALIZATION_RULES: PersonalizationRule[] = [
  // High anxiety patients - calming colors and messaging
  {
    id: 'anxiety-high',
    name: 'High Anxiety Patient Support',
    condition: (profile) => profile.preferences.anxietyLevel === 'high',
    action: {
      type: 'content',
      target: 'hero-message',
      modification: {
        title: 'Gentle, Anxiety-Free Dental Care',
        subtitle: 'Experience calm, comfortable dentistry in our peaceful coastal setting',
        cta: 'Book Anxiety-Free Consultation',
        brandColors: {
          primary: 'var(--smh-primary-teal)', // Calming turquoise
          secondary: 'var(--smh-primary-magenta)',
          accent: 'var(--smh-accent-gold)'
        }
      }
    },
    priority: 10,
    brandConsistent: true
  },

  // Emergency patients - urgent messaging
  {
    id: 'emergency-urgent',
    name: 'Emergency Patient Priority',
    condition: (profile) => 
      profile.behavior.referralSource.includes('emergency') ||
      profile.dentalHistory.currentConcerns.some(concern => 
        ['pain', 'emergency', 'urgent', 'broken'].some(keyword => 
          concern.toLowerCase().includes(keyword)
        )
      ),
    action: {
      type: 'layout',
      target: 'emergency-banner',
      modification: {
        visible: true,
        message: 'Emergency Dental Care Available Now',
        phone: '01273 453109',
        style: 'urgent',
        brandColors: {
          primary: 'var(--smh-primary-magenta)', // Urgent magenta
          secondary: 'var(--smh-primary-teal)',
          accent: 'var(--smh-accent-gold)'
        }
      }
    },
    priority: 15,
    brandConsistent: true
  },

  // Cosmetic treatment interest - luxury focus
  {
    id: 'cosmetic-luxury',
    name: 'Cosmetic Treatment Focus',
    condition: (profile) => 
      profile.preferences.treatmentInterests.some(interest =>
        ['veneers', 'whitening', 'cosmetic', 'smile'].includes(interest.toLowerCase())
      ),
    action: {
      type: 'content',
      target: 'featured-treatments',
      modification: {
        treatments: ['veneers', 'whitening', '3d-dentistry'],
        style: 'luxury',
        messaging: 'Transform Your Smile with Luxury Coastal Dentistry',
        brandColors: {
          primary: 'var(--smh-accent-gold)', // Luxury gold
          secondary: 'var(--smh-primary-magenta)',
          accent: 'var(--smh-primary-teal)'
        }
      }
    },
    priority: 8,
    brandConsistent: true
  },

  // Mobile users - touch-optimized interface
  {
    id: 'mobile-optimization',
    name: 'Mobile User Experience',
    condition: (profile) => profile.behavior.deviceType === 'mobile',
    action: {
      type: 'layout',
      target: 'interface',
      modification: {
        buttonSize: 'large',
        touchTargets: '48px',
        navigation: 'mobile-optimized',
        chatPosition: 'bottom-right',
        brandColors: {
          primary: 'var(--smh-primary-magenta)',
          secondary: 'var(--smh-primary-teal)',
          accent: 'var(--smh-accent-gold)'
        }
      }
    },
    priority: 12,
    brandConsistent: true
  },

  // Return visitors - personalized welcome
  {
    id: 'return-visitor',
    name: 'Returning Patient Welcome',
    condition: (profile) => profile.behavior.visitCount > 1,
    action: {
      type: 'content',
      target: 'welcome-message',
      modification: {
        message: 'Welcome back! Continue your dental journey with us.',
        showProgress: true,
        personalizedRecommendations: true,
        brandColors: {
          primary: 'var(--smh-primary-teal)', // Welcoming turquoise
          secondary: 'var(--smh-primary-magenta)',
          accent: 'var(--smh-accent-gold)'
        }
      }
    },
    priority: 6,
    brandConsistent: true
  },

  // Premium budget - luxury features
  {
    id: 'premium-budget',
    name: 'Premium Service Showcase',
    condition: (profile) => profile.preferences.budgetRange === 'premium',
    action: {
      type: 'content',
      target: 'service-showcase',
      modification: {
        features: ['3d-scanning', 'luxury-amenities', 'concierge-service'],
        messaging: 'Experience the pinnacle of luxury dental care',
        exclusiveOffers: true,
        brandColors: {
          primary: 'var(--smh-accent-gold)', // Premium gold
          secondary: 'var(--smh-primary-magenta)',
          accent: 'var(--smh-primary-teal)'
        }
      }
    },
    priority: 7,
    brandConsistent: true
  }
];

export class PersonalizationEngine {
  private userProfile: UserProfile;
  private activeRules: PersonalizationRule[] = [];

  constructor(userProfile: UserProfile) {
    this.userProfile = userProfile;
    this.evaluateRules();
  }

  private evaluateRules() {
    this.activeRules = PERSONALIZATION_RULES
      .filter(rule => rule.condition(this.userProfile))
      .sort((a, b) => b.priority - a.priority);
  }

  getPersonalizedContent(target: string) {
    const applicableRules = this.activeRules.filter(rule => 
      rule.action.target === target || rule.action.target === 'global'
    );

    if (applicableRules.length === 0) {
      return this.getDefaultContent(target);
    }

    // Apply highest priority rule with brand consistency
    const primaryRule = applicableRules[0];
    return this.applyBrandConsistentModification(primaryRule.action.modification);
  }

  private applyBrandConsistentModification(modification: PersonalizationModification) {
    // Ensure all modifications maintain brand consistency
    const brandConsistentModification: PersonalizationModification & {
      fonts: { heading: string; body: string };
      waveBackground: string;
    } = {
      ...modification,
      brandColors: modification.brandColors || {
        primary: 'var(--smh-primary-magenta)',
        secondary: 'var(--smh-primary-teal)',
        accent: 'var(--smh-accent-gold)'
      },
      fonts: {
        heading: 'var(--font-playfair), Georgia, serif',
        body: 'var(--font-inter), system-ui, Arial'
      },
      waveBackground: '/waves-bg-2560.jpg'
    };

    return brandConsistentModification;
  }

  private getDefaultContent(target: string) {
    const defaultContent: Record<string, PersonalizationModification> = {
      'hero-message': {
        title: 'Your Perfect Smile is Just One Click Away',
        subtitle: 'Experience the future of dentistry with our AI-powered 3D treatments, luxury coastal setting, and award-winning patient care.',
        cta: 'Book Free Consultation',
        brandColors: {
          primary: 'var(--smh-primary-magenta)',
          secondary: 'var(--smh-primary-teal)',
          accent: 'var(--smh-accent-gold)'
        }
      },
      'featured-treatments': {
        treatments: ['3d-dentistry', 'veneers', 'implants', 'whitening'],
        style: 'coastal-luxury',
        messaging: 'Discover Advanced Dental Care',
        brandColors: {
          primary: 'var(--smh-primary-magenta)',
          secondary: 'var(--smh-primary-teal)',
          accent: 'var(--smh-accent-gold)'
        }
      }
    };

    return this.applyBrandConsistentModification(defaultContent[target] || {});
  }

  generatePersonalizedRecommendations() {
    const recommendations: PersonalizedRecommendation[] = [];

    // Treatment recommendations based on interests and history
    if (this.userProfile.preferences.treatmentInterests.includes('cosmetic')) {
      recommendations.push({
        type: 'treatment',
        title: 'Porcelain Veneers Consultation',
        description: 'Transform your smile with custom-crafted veneers',
        cta: 'Learn More',
        priority: 'high',
        brandStyling: {
          gradient: 'from-pink-500 to-teal-500',
          textColor: 'text-white',
          font: 'font-montserrat'
        }
      });
    }

    // Anxiety-specific recommendations
    if (this.userProfile.preferences.anxietyLevel === 'high') {
      recommendations.push({
        type: 'service',
        title: 'Anxiety-Free Dentistry',
        description: 'Experience calm, comfortable dental care with our specialized approach',
        cta: 'Book Consultation',
        priority: 'high',
        brandStyling: {
          gradient: 'from-teal-500 to-yellow-500',
          textColor: 'text-white',
          font: 'font-montserrat'
        }
      });
    }

    // Emergency recommendations
    if (this.userProfile.dentalHistory.currentConcerns.some(concern => 
      concern.toLowerCase().includes('pain'))) {
      recommendations.push({
        type: 'emergency',
        title: 'Emergency Dental Care',
        description: 'Get immediate relief from dental pain',
        cta: 'Call Now: 01273 453109',
        priority: 'urgent',
        brandStyling: {
          gradient: 'from-red-500 to-pink-500',
          textColor: 'text-white',
          font: 'font-montserrat'
        }
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { urgent: 3, high: 2, medium: 1, low: 0 };
      return priorityOrder[b.priority as keyof typeof priorityOrder] -
             priorityOrder[a.priority as keyof typeof priorityOrder];
    });
  }

  getPersonalizedChatbotBehavior() {
    const behavior = {
      greeting: 'Hello! How can I help you with your dental care today?',
      tone: 'professional',
      suggestedQuestions: [
        'What treatments do you offer?',
        'How can I book an appointment?',
        'Do you accept my insurance?'
      ],
      brandStyling: {
        primaryColor: 'var(--smh-primary-magenta)',
        secondaryColor: 'var(--smh-primary-teal)',
        accentColor: 'var(--smh-accent-gold)',
        font: 'var(--font-playfair), Georgia, serif'
      }
    };

    // Customize based on anxiety level
    if (this.userProfile.preferences.anxietyLevel === 'high') {
      behavior.greeting = 'Welcome! I\'m here to help make your dental experience as comfortable as possible.';
      behavior.tone = 'gentle';
      behavior.suggestedQuestions = [
        'Do you offer sedation dentistry?',
        'How do you help anxious patients?',
        'What is The Wand system?'
      ];
    }

    // Customize for emergency situations
    if (this.userProfile.behavior.referralSource.includes('emergency')) {
      behavior.greeting = 'I see you may need urgent dental care. How can I help you right away?';
      behavior.tone = 'urgent-helpful';
      behavior.suggestedQuestions = [
        'I have severe tooth pain',
        'I broke a tooth',
        'I need emergency care'
      ];
    }

    return behavior;
  }

  trackUserInteraction(interaction: {
    type: string;
    target: string;
    value?: InteractionValue;
    timestamp: Date;
  }) {
    // Update user profile based on interactions
    this.userProfile.behavior.timeSpent += 1;
    
    if (interaction.type === 'page_view') {
      this.userProfile.behavior.pagesVisited.push(interaction.target);
    }

    if (interaction.type === 'treatment_interest') {
      if (typeof interaction.value === 'string' && !this.userProfile.preferences.treatmentInterests.includes(interaction.value)) {
        this.userProfile.preferences.treatmentInterests.push(interaction.value);
      }
    }

    if (interaction.type === 'chat_message') {
      this.userProfile.interactions.chatMessages += 1;
    }

    // Re-evaluate rules after interaction
    this.evaluateRules();
  }

  generatePersonalizedSEO() {
    const seoPersonalization = {
      title: "St Mary's House Dental Care | Luxury Coastal Dentistry",
      description: "Experience luxury coastal dental care in Shoreham-by-Sea",
      keywords: ['dentist Shoreham-by-Sea', 'luxury dentistry', 'coastal dental care']
    };

    // Personalize based on treatment interests
    if (this.userProfile.preferences.treatmentInterests.includes('emergency')) {
      seoPersonalization.title = "Emergency Dentist Shoreham-by-Sea | St Mary's House Dental Care";
      seoPersonalization.description = "24/7 emergency dental care in Shoreham-by-Sea. Immediate pain relief and urgent dental treatments.";
      seoPersonalization.keywords.push('emergency dentist', 'urgent dental care', 'dental pain relief');
    }

    if (this.userProfile.preferences.treatmentInterests.includes('cosmetic')) {
      seoPersonalization.title = "Cosmetic Dentistry Shoreham | Veneers & Smile Makeovers";
      seoPersonalization.description = "Transform your smile with luxury cosmetic dentistry. Porcelain veneers, teeth whitening, and smile makeovers.";
      seoPersonalization.keywords.push('cosmetic dentistry', 'porcelain veneers', 'smile makeover');
    }

    return seoPersonalization;
  }

  getPersonalizedLoadingStrategy() {
    // Optimize loading based on user behavior and device
    const strategy = {
      priorityResources: ['/waves-bg-2560.jpg'],
      lazyLoadThreshold: '50px',
      preloadHints: [] as string[]
    };

    // Mobile users - prioritize mobile-optimized resources
    if (this.userProfile.behavior.deviceType === 'mobile') {
      strategy.priorityResources.push('/mobile-hero-poster.jpg');
      strategy.lazyLoadThreshold = '100px';
    }

    // Return visitors - preload likely next pages
    if (this.userProfile.behavior.visitCount > 1) {
      const commonPages = this.userProfile.behavior.pagesVisited
        .reduce((acc: { [key: string]: number }, page) => {
          acc[page] = (acc[page] || 0) + 1;
          return acc;
        }, {});
      
      const likelyNextPages = Object.entries(commonPages)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([page]) => page);
      
      strategy.preloadHints.push(...likelyNextPages);
    }

    return strategy;
  }
}

// AI-powered content adaptation
export function adaptContentForUser(content: string, userProfile: UserProfile): string {
  let adaptedContent = content;

  // Simplify language for high anxiety users
  if (userProfile.preferences.anxietyLevel === 'high') {
    adaptedContent = adaptedContent
      .replace(/procedure/gi, 'treatment')
      .replace(/surgery/gi, 'care')
      .replace(/pain/gi, 'discomfort');
  }

  // Add urgency for emergency users
  if (userProfile.behavior.referralSource.includes('emergency')) {
    adaptedContent = `🚨 URGENT CARE AVAILABLE 🚨\n\n${adaptedContent}`;
  }

  // Enhance technical details for technical communication style
  if (userProfile.preferences.communicationStyle === 'technical') {
    adaptedContent += '\n\n*Technical details and specifications available upon request.*';
  }

  return adaptedContent;
}

// Brand-consistent styling generator
export function generateBrandConsistentStyling(context: string) {
  const brandStyling = {
    colors: {
      primary: 'var(--smh-primary-magenta)',
      secondary: 'var(--smh-primary-teal)',
      accent: 'var(--smh-accent-gold)',
      background: NEUTRAL_TOKENS.white,
      text: NEUTRAL_TOKENS.navy
    },
    fonts: {
      heading: 'var(--font-playfair), Georgia, serif',
      body: 'var(--font-inter), system-ui, Arial'
    },
      effects: {
        gradient: 'var(--smh-gradient)',
      shadow: '0 10px 25px rgba(194, 24, 91, 0.15)',
      borderRadius: '12px',
      backdropBlur: 'blur(10px)'
    },
    animations: {
      hover: 'transform: translateY(-2px); box-shadow: 0 15px 35px rgba(194, 24, 91, 0.25);',
      focus: 'outline: 2px solid var(--smh-primary-teal); outline-offset: 2px;',
      active: 'transform: translateY(0px); box-shadow: 0 5px 15px rgba(194, 24, 91, 0.2);'
    }
  };

  // Context-specific adjustments while maintaining brand
  switch (context) {
    case 'emergency':
      brandStyling.colors.primary = NEUTRAL_TOKENS.urgent; // Red for urgency
      brandStyling.effects.gradient = 'var(--smh-gradient)';
      break;
    case 'luxury':
      brandStyling.colors.primary = 'var(--smh-accent-gold)'; // Gold for luxury
      brandStyling.effects.gradient = 'var(--smh-gradient)';
      break;
    case 'calming':
      brandStyling.colors.primary = 'var(--smh-primary-teal)'; // Turquoise for calm
      brandStyling.effects.gradient = 'var(--smh-gradient)';
      break;
  }

  return brandStyling;
}

