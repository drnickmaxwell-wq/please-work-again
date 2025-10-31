import { openai } from '@ai-sdk/openai';
import { generateText, streamText } from 'ai';

// Emotion Detection Types
export interface EmotionAnalysis {
  primary: string;
  confidence: number;
  secondary?: string;
  intensity: number; // 0-10
  context: 'dental' | 'general' | 'emergency';
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  emotion?: EmotionAnalysis;
  metadata?: {
    leadScore?: number;
    intent?: string;
    treatmentInterest?: string[];
    painLevel?: number;
    anxietyLevel?: number;
  };
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  patientProfile: {
    name?: string;
    email?: string;
    phone?: string;
    age?: number;
    previousPatient: boolean;
    treatmentHistory?: string[];
    preferences?: {
      communication: 'text' | 'voice' | 'both';
      appointmentTime: 'morning' | 'afternoon' | 'evening' | 'flexible';
      anxietyLevel: number; // 0-10
    };
  };
  leadScore: number; // 0-100
  status: 'active' | 'qualified' | 'booked' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

// Advanced AI Chatbot Class
export class AdvancedDentalChatbot {
  private model = openai('gpt-4-turbo');
  private systemPrompt = `You are Dr. Marina, the AI concierge for St Mary's House Dental Care in Shoreham-by-Sea. You embody the practice's "Going the Extra Smile" philosophy with warmth, professionalism, and coastal charm.

PERSONALITY & TONE:
- Warm, empathetic, and professional
- Use gentle coastal metaphors naturally ("smooth sailing", "calm waters", "anchored in excellence")
- British English with a refined, caring tone
- Acknowledge emotions and respond with appropriate empathy
- Never rush patients; create a sense of calm and luxury

PRACTICE INFORMATION:
- Location: St Mary's House, St Mary's Road, Shoreham-by-Sea, West Sussex
- Phone: 01273 453109
- Email: info@smhdental.co.uk
- Specialties: 3D Printed Veneers, Digital Implants, AI Diagnostics, Anxiety-Free Dentistry
- Setting: Luxury coastal practice with sea views and calming atmosphere
- Technology: Advanced 3D printing lab, CBCT scanning, digital impressions
- Sedation: IV sedation, oral sedation, nitrous oxide available

RESPONSE GUIDELINES:
1. Always acknowledge the patient's emotional state
2. For anxiety: Emphasize comfort, sedation options, and coastal setting
3. For pain: Show urgency while remaining calm, offer emergency slots
4. For cosmetic interests: Highlight 3D technology and natural results
5. For cost concerns: Mention payment plans and value of advanced technology
6. Always end with a clear next step or question

EMERGENCY PROTOCOL:
- Severe pain (8-10/10): Immediate emergency appointment
- Trauma/injury: Urgent same-day care
- Swelling/infection: Priority booking within 24 hours

Remember: You're not just booking appointments - you're creating a luxury experience that begins with this conversation.`;

  // Analyze emotion from text
  async analyzeEmotion(text: string): Promise<EmotionAnalysis> {
    try {
      const response = await generateText({
        model: this.model,
        prompt: `Analyze the emotional content of this dental patient message and return a JSON object with the following structure:
        {
          "primary": "emotion name",
          "confidence": 0.0-1.0,
          "secondary": "optional secondary emotion",
          "intensity": 0-10,
          "context": "dental|general|emergency",
          "urgency": "low|medium|high|critical"
        }

        Consider dental-specific emotions like dental anxiety, pain, embarrassment about teeth, excitement about cosmetic improvements.

        Patient message: "${text}"`,
        temperature: 0.3,
      });

      return JSON.parse(response.text);
    } catch (error) {
      console.error('Emotion analysis error:', error);
      // Fallback emotion analysis
      return this.fallbackEmotionAnalysis(text);
    }
  }

  // Fallback emotion analysis using keywords
  private fallbackEmotionAnalysis(text: string): EmotionAnalysis {
    const lowerText = text.toLowerCase();
    
    // Emergency keywords
    if (lowerText.includes('severe pain') || lowerText.includes('emergency') || lowerText.includes('broken tooth')) {
      return {
        primary: 'distress',
        confidence: 0.9,
        intensity: 9,
        context: 'emergency',
        urgency: 'critical'
      };
    }

    // Anxiety keywords
    if (lowerText.includes('nervous') || lowerText.includes('scared') || lowerText.includes('anxious') || lowerText.includes('afraid')) {
      return {
        primary: 'anxiety',
        confidence: 0.8,
        secondary: 'concern',
        intensity: 7,
        context: 'dental',
        urgency: 'medium'
      };
    }

    // Pain keywords
    if (lowerText.includes('pain') || lowerText.includes('hurt') || lowerText.includes('ache')) {
      return {
        primary: 'discomfort',
        confidence: 0.8,
        intensity: 6,
        context: 'dental',
        urgency: 'high'
      };
    }

    // Excitement keywords
    if (lowerText.includes('excited') || lowerText.includes('amazing') || lowerText.includes('perfect smile')) {
      return {
        primary: 'excitement',
        confidence: 0.7,
        intensity: 6,
        context: 'dental',
        urgency: 'low'
      };
    }

    // Default neutral
    return {
      primary: 'neutral',
      confidence: 0.6,
      intensity: 3,
      context: 'general',
      urgency: 'low'
    };
  }

  // Generate AI response with emotion awareness
  async generateResponse(
    message: string,
    emotion: EmotionAnalysis,
    sessionHistory: ChatMessage[] = []
  ): Promise<string> {
    try {
      // Build context from session history
      const conversationContext = sessionHistory
        .slice(-5) // Last 5 messages for context
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      // Emotion-specific prompt additions
      let emotionPrompt = '';
      switch (emotion.primary) {
        case 'anxiety':
          emotionPrompt = 'The patient is feeling anxious. Emphasize comfort, sedation options, and the calming coastal environment. Be extra reassuring.';
          break;
        case 'distress':
          emotionPrompt = 'The patient is in distress. Show urgency while remaining calm. Offer immediate solutions and emergency care.';
          break;
        case 'discomfort':
          emotionPrompt = 'The patient is experiencing discomfort. Acknowledge their pain and offer prompt relief options.';
          break;
        case 'excitement':
          emotionPrompt = 'The patient is excited about treatment. Match their enthusiasm while providing detailed information about advanced options.';
          break;
        default:
          emotionPrompt = 'Maintain a warm, professional tone while addressing their needs.';
      }

      const response = await generateText({
        model: this.model,
        prompt: `${this.systemPrompt}

EMOTION CONTEXT: ${emotionPrompt}
DETECTED EMOTION: ${emotion.primary} (${Math.round(emotion.confidence * 100)}% confidence, intensity: ${emotion.intensity}/10)
URGENCY LEVEL: ${emotion.urgency}

CONVERSATION HISTORY:
${conversationContext}

CURRENT MESSAGE: "${message}"

Respond as Dr. Marina with appropriate emotional awareness. Keep responses conversational (2-3 sentences), end with a question or clear next step, and naturally incorporate coastal language where appropriate.`,
        temperature: 0.7,
        maxOutputTokens: 200,
      });

      return response.text;
    } catch (error) {
      console.error('AI response generation error:', error);
      return this.fallbackResponse(emotion);
    }
  }

  // Fallback response when AI is unavailable
  private fallbackResponse(emotion: EmotionAnalysis): string {
    switch (emotion.primary) {
      case 'anxiety':
        return "I understand you're feeling nervous about dental treatment - that's completely natural! At St Mary's House, we specialize in anxiety-free dentistry with sedation options and our calming coastal setting. Would you like to know more about how we help nervous patients feel at ease? 🌊";
      
      case 'distress':
        return "I can hear the urgency in your message, and I want to help you right away. Please call us immediately at 01273 453109 for emergency care, or would you prefer I arrange an urgent callback within the next few minutes?";
      
      case 'discomfort':
        return "I'm sorry you're experiencing discomfort. Pain is never something you should have to endure. We have same-day emergency slots available and can provide immediate relief. Shall I check our emergency availability for today?";
      
      case 'excitement':
        return "I love your enthusiasm! Our advanced 3D technology and coastal luxury setting make achieving your perfect smile an amazing journey. What specific improvements are you most excited about exploring? ✨";
      
      default:
        return "Thank you for reaching out to St Mary's House Dental Care! I'm Dr. Marina, your AI concierge, and I'm here to help you navigate your dental journey with our luxury coastal practice. How can I assist you today? 🌊";
    }
  }

  // Calculate lead score based on conversation
  calculateLeadScore(session: ChatSession): number {
    let score = 0;

    // Base engagement score
    score += Math.min(session.messages.length * 5, 30);

    // Treatment interest
    const treatmentKeywords = ['veneers', 'implants', 'whitening', 'cosmetic', 'smile makeover'];
    const hasInterest = session.messages.some(msg => 
      treatmentKeywords.some(keyword => msg.content.toLowerCase().includes(keyword))
    );
    if (hasInterest) score += 25;

    // Contact information provided
    if (session.patientProfile.email) score += 15;
    if (session.patientProfile.phone) score += 15;
    if (session.patientProfile.name) score += 10;

    // Urgency indicators
    const urgentMessages = session.messages.filter(msg => 
      msg.emotion?.urgency === 'high' || msg.emotion?.urgency === 'critical'
    );
    score += urgentMessages.length * 10;

    // Booking intent
    const bookingKeywords = ['appointment', 'booking', 'schedule', 'consultation'];
    const hasBookingIntent = session.messages.some(msg =>
      bookingKeywords.some(keyword => msg.content.toLowerCase().includes(keyword))
    );
    if (hasBookingIntent) score += 20;

    return Math.min(score, 100);
  }

  // Stream response for real-time chat
  async streamResponse(
    message: string,
    emotion: EmotionAnalysis,
    sessionHistory: ChatMessage[] = []
  ) {
    try {
      const conversationContext = sessionHistory
        .slice(-5)
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      return streamText({
        model: this.model,
        prompt: `${this.systemPrompt}

DETECTED EMOTION: ${emotion.primary} (${Math.round(emotion.confidence * 100)}% confidence)
CONVERSATION HISTORY:
${conversationContext}

CURRENT MESSAGE: "${message}"

Respond as Dr. Marina with emotional awareness and coastal charm.`,
        temperature: 0.7,
        maxOutputTokens: 200,
      });
    } catch (error) {
      console.error('Stream response error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const dentalChatbot = new AdvancedDentalChatbot();

