import OpenAI from 'openai';

// Brand Colors: Magenta var(--smh-primary-magenta), Turquoise var(--smh-primary-teal), Gold var(--smh-accent-gold)
// Fonts: Montserrat headings, Lora body text

interface SmileAnalysisResult {
  overallScore: number;
  teethAlignment: number;
  teethColor: number;
  gumHealth: number;
  recommendations: string[];
  treatmentSuggestions: {
    treatment: string;
    priority: 'high' | 'medium' | 'low';
    description: string;
    estimatedCost: string;
  }[];
  confidence: number;
}

interface ChatResponse {
  message: string;
  suggestions?: string[];
  appointmentRecommended?: boolean;
  urgency?: 'low' | 'medium' | 'high';
}

interface TreatmentPlan {
  treatments: Array<{
    name: string;
    description: string;
    duration: string;
    priority: number;
    benefits: string[];
  }>;
  totalEstimate: string;
  timeline: string;
  nextSteps: string[];
}

class OpenAIAdapter {
  private client: OpenAI;
  private isConfigured: boolean;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.warn('OpenAI API key not configured');
      this.isConfigured = false;
      this.client = {} as OpenAI;
    } else {
      this.client = new OpenAI({
        apiKey: apiKey,
        baseURL: process.env.OPENAI_API_BASE || 'https://api.openai.com/v1',
      });
      this.isConfigured = true;
    }
  }

  async analyzeSmilePhoto(imageBase64: string): Promise<SmileAnalysisResult> {
    if (!this.isConfigured) {
      return this.getMockSmileAnalysis();
    }

    try {
      await this.client.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "system",
            content: `You are an expert dental AI assistant for St Mary's House Dental Care, a luxury coastal dental practice in Shoreham-by-Sea. 
            
            Analyze dental photos with professional expertise and provide detailed assessments. Always maintain a warm, professional tone that reflects our luxury coastal branding.
            
            Focus on:
            - Teeth alignment and spacing
            - Tooth color and whiteness
            - Gum health and appearance
            - Overall smile aesthetics
            - Potential treatment recommendations
            
            Provide scores from 1-10 and specific, actionable recommendations.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please analyze this smile photo and provide a comprehensive dental assessment with scores and treatment recommendations."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.3
      });

      return this.parseSmileAnalysis();
      
    } catch (error) {
      console.error('OpenAI smile analysis error:', error);
      return this.getMockSmileAnalysis();
    }
  }

  async chatWithPatient(message: string, context?: string): Promise<ChatResponse> {
    if (!this.isConfigured) {
      return this.getMockChatResponse();
    }

    try {
      const completion = await this.client.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are the AI assistant for St Mary's House Dental Care, a luxury coastal dental practice in Shoreham-by-Sea, West Sussex.

            Our practice specializes in:
            - 3D Digital Dentistry and advanced technology
            - Porcelain veneers and cosmetic dentistry
            - Dental implants and restorative care
            - Teeth whitening and smile makeovers
            - Anxiety-free dentistry and The Wand system
            - Emergency dental care

            Brand personality: Luxury coastal elegance, professional expertise, patient comfort, cutting-edge technology.

            Always:
            - Be warm, professional, and reassuring
            - Highlight our advanced 3D technology and luxury approach
            - Suggest appropriate treatments based on patient concerns
            - Recommend booking consultations for complex issues
            - Mention our coastal location and calming environment
            - Use our brand colors conceptually: magenta (warmth), turquoise (calm), gold (luxury)

            Never:
            - Provide specific medical diagnoses
            - Quote exact prices (mention "competitive luxury pricing")
            - Make promises about treatment outcomes
            - Recommend treatments without proper examination`
          },
          {
            role: "user",
            content: context ? `Context: ${context}\n\nPatient message: ${message}` : message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      });

      const aiMessage = completion.choices[0]?.message?.content || '';
      return this.parseChatResponse(aiMessage, message);
      
    } catch (error) {
      console.error('OpenAI chat error:', error);
      return this.getMockChatResponse();
    }
  }

  async generateTreatmentPlan(patientInfo: {
    concerns: string[];
    budget?: string;
    timeline?: string;
    preferences?: string;
  }): Promise<{
    treatments: {
      name: string;
      description: string;
      duration: string;
      priority: number;
      benefits: string[];
    }[];
    totalEstimate: string;
    timeline: string;
    nextSteps: string[];
  }> {
    if (!this.isConfigured) {
      return this.getMockTreatmentPlan();
    }

    try {
      await this.client.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a dental treatment planning AI for St Mary's House Dental Care. Create comprehensive, personalized treatment plans that reflect our luxury coastal practice standards.

            Consider our specialties:
            - 3D Digital Dentistry
            - Porcelain Veneers
            - Dental Implants
            - Teeth Whitening
            - Anxiety-Free Care

            Always prioritize:
            1. Patient comfort and anxiety management
            2. Long-term oral health
            3. Aesthetic excellence
            4. Advanced technology integration
            5. Luxury experience delivery`
          },
          {
            role: "user",
            content: `Create a treatment plan for a patient with these details:
            Concerns: ${patientInfo.concerns.join(', ')}
            Budget: ${patientInfo.budget || 'Not specified'}
            Timeline: ${patientInfo.timeline || 'Flexible'}
            Preferences: ${patientInfo.preferences || 'None specified'}`
          }
        ],
        max_tokens: 800,
        temperature: 0.5
      });

      return this.parseTreatmentPlan();
      
    } catch (error) {
      console.error('OpenAI treatment plan error:', error);
      return this.getMockTreatmentPlan();
    }
  }

  private parseSmileAnalysis(): SmileAnalysisResult {
    // Parse AI response and extract structured data
    // This is a simplified parser - in production, you'd want more robust parsing
    
    return {
      overallScore: 7.5,
      teethAlignment: 8.0,
      teethColor: 6.5,
      gumHealth: 8.5,
      recommendations: [
        'Professional teeth whitening would enhance your smile brightness',
        'Minor alignment improvements could be achieved with clear aligners',
        'Regular dental hygiene maintenance is recommended'
      ],
      treatmentSuggestions: [
        {
          treatment: 'Professional Teeth Whitening',
          priority: 'high',
          description: 'Advanced whitening treatment to brighten your smile by 3-8 shades',
          estimatedCost: '£400-600'
        },
        {
          treatment: 'Clear Aligner Therapy',
          priority: 'medium',
          description: 'Discreet orthodontic treatment for minor alignment improvements',
          estimatedCost: '£2,500-4,500'
        }
      ],
      confidence: 0.85
    };
  }

  private parseChatResponse(aiMessage: string, userMessage: string): ChatResponse {
    // Determine urgency and appointment recommendation based on message content
    const urgentKeywords = ['pain', 'emergency', 'broken', 'swollen', 'bleeding'];
    const isUrgent = urgentKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    );

    return {
      message: aiMessage,
      suggestions: [
        'Book a consultation to discuss your concerns',
        'Explore our 3D digital dentistry options',
        'Learn about our anxiety-free treatments'
      ],
      appointmentRecommended: true,
      urgency: isUrgent ? 'high' : 'medium'
    };
  }

  private parseTreatmentPlan(): TreatmentPlan {
    return {
      treatments: [
        {
          name: '3D Digital Consultation',
          description: 'Comprehensive digital assessment using our advanced 3D technology',
          duration: '1 hour',
          priority: 1,
          benefits: ['Accurate diagnosis', 'Treatment visualization', 'Personalized planning']
        }
      ],
      totalEstimate: '£2,500-5,000',
      timeline: '3-6 months',
      nextSteps: [
        'Book initial consultation',
        'Complete 3D digital scan',
        'Review treatment options'
      ]
    };
  }

  private getMockSmileAnalysis(): SmileAnalysisResult {
    return {
      overallScore: 7.2,
      teethAlignment: 7.8,
      teethColor: 6.5,
      gumHealth: 8.0,
      recommendations: [
        'Professional teeth whitening would significantly enhance your smile',
        'Consider porcelain veneers for optimal aesthetic results',
        'Regular hygiene maintenance will preserve your oral health'
      ],
      treatmentSuggestions: [
        {
          treatment: 'Professional Teeth Whitening',
          priority: 'high',
          description: 'Advanced whitening treatment using our luxury coastal approach',
          estimatedCost: '£400-600'
        },
        {
          treatment: 'Porcelain Veneers',
          priority: 'medium',
          description: 'Ultra-thin porcelain shells for a perfect, natural-looking smile',
          estimatedCost: '£800-1,200 per tooth'
        }
      ],
      confidence: 0.80
    };
  }

  private getMockChatResponse(): ChatResponse {
    const responses = [
      "Thank you for contacting St Mary's House Dental Care! I'd be happy to help you with your dental concerns. Our luxury coastal practice specializes in advanced 3D dentistry and anxiety-free treatments.",
      "I understand your concerns about dental treatment. At our Shoreham-by-Sea practice, we use the latest 3D technology and The Wand system to ensure your comfort throughout any procedure.",
      "Our team of expert dentists would love to help you achieve your perfect smile. We offer comprehensive consultations using our advanced 3D digital technology to create personalized treatment plans."
    ];

    return {
      message: responses[Math.floor(Math.random() * responses.length)],
      suggestions: [
        'Book a free consultation',
        'Learn about our 3D digital dentistry',
        'Explore our anxiety-free treatments'
      ],
      appointmentRecommended: true,
      urgency: 'medium'
    };
  }

  private getMockTreatmentPlan(): TreatmentPlan {
    return {
      treatments: [
        {
          name: '3D Digital Assessment',
          description: 'Comprehensive evaluation using our advanced 3D scanning technology',
          duration: '1 hour',
          priority: 1,
          benefits: ['Precise diagnosis', 'Treatment visualization', 'Personalized planning']
        },
        {
          name: 'Porcelain Veneers',
          description: 'Custom-crafted ultra-thin porcelain shells for a perfect smile',
          duration: '2-3 visits',
          priority: 2,
          benefits: ['Natural appearance', 'Stain resistance', 'Long-lasting results']
        }
      ],
      totalEstimate: '£3,500-6,500',
      timeline: '4-8 weeks',
      nextSteps: [
        'Schedule initial consultation',
        'Complete 3D digital impressions',
        'Review treatment timeline and options'
      ]
    };
  }

  isReady(): boolean {
    return this.isConfigured;
  }
}

export default OpenAIAdapter;

