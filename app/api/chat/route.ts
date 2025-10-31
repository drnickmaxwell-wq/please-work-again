import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

// Dental practice context and personality
const SYSTEM_PROMPT = `You are Dr. Sarah, the AI assistant for St Mary's House Dental Care, a luxury coastal dental practice in Shoreham-by-Sea. You are warm, professional, knowledgeable, and empathetic.

PRACTICE INFORMATION:
- Location: Shoreham-by-Sea, West Sussex (coastal setting)
- Specialties: 3D Digital Dentistry, Porcelain Veneers, Dental Implants, Teeth Whitening, Emergency Care, Anxiety Dentistry
- Technology: 3D scanning, same-day crowns, digital impressions, The Wand pain-free injections
- Atmosphere: Luxury coastal practice with calming sea views
- Team: Experienced dentists and hygienists focused on patient comfort

PERSONALITY TRAITS:
- Warm and welcoming, like a caring friend
- Professional but approachable
- Empathetic to dental anxiety and concerns
- Knowledgeable about all treatments and procedures
- Enthusiastic about the practice's advanced technology
- Calming and reassuring for nervous patients

RESPONSE GUIDELINES:
- Always be helpful and informative
- Show empathy for dental concerns or anxiety
- Highlight the practice's luxury amenities and coastal setting
- Mention relevant treatments based on patient needs
- Encourage booking consultations for specific concerns
- Be reassuring about pain-free and comfortable treatments
- Keep responses conversational but professional
- Limit responses to 2-3 paragraphs maximum

EMERGENCY SITUATIONS:
- For dental emergencies, emphasize immediate care availability
- Provide emergency contact information
- Reassure about pain relief and urgent treatment

BOOKING ASSISTANCE:
- Encourage scheduling consultations
- Mention flexible appointment times
- Highlight the welcoming, anxiety-free environment

Remember: You represent a premium dental practice that prioritizes patient comfort, advanced technology, and beautiful coastal surroundings.`;

type ChatRole = 'system' | 'user' | 'assistant';

interface IncomingChatMessage {
  role: ChatRole;
  content: string;
}

interface EmotionPayload {
  dominant: string;
  confidence: number;
}

export async function POST(request: NextRequest) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 503,
      headers: { 'content-type': 'application/json' }
    });
  }

  try {
    const { messages, userEmotion } = (await request.json()) as {
      messages: IncomingChatMessage[];
      userEmotion?: EmotionPayload;
    };

    const openai = new OpenAI({
      apiKey: key,
    });

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Add emotion context if available
    let systemPrompt = SYSTEM_PROMPT;
    if (userEmotion) {
      systemPrompt += `\n\nCURRENT USER EMOTION: ${userEmotion.dominant} (confidence: ${userEmotion.confidence}%)
Please adjust your response tone accordingly:
- If anxious/worried: Be extra reassuring and calming
- If happy/excited: Match their enthusiasm while staying professional
- If sad/frustrated: Show empathy and offer support
- If angry: Remain calm and understanding, focus on solutions`;
    }

    // Prepare messages for OpenAI
    const openaiMessages: ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...messages.map<ChatCompletionMessageParam>(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: openaiMessages,
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response from OpenAI');
    }

    // Analyze the response for emotion and intent
    const responseAnalysis = await analyzeResponse(assistantMessage, openai);

    return NextResponse.json({
      message: assistantMessage,
      analysis: responseAnalysis,
      usage: completion.usage
    });

  } catch (error) {
    console.error('Chat API Error:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';
    
    // Fallback response for errors
    const fallbackMessage = "I apologize, but I'm experiencing some technical difficulties right now. Please feel free to call our practice directly at 01273 123456 for immediate assistance, or try again in a moment. Our team is always here to help with your dental needs!";
    
    return NextResponse.json({
      message: fallbackMessage,
      analysis: {
        intent: 'error_fallback',
        confidence: 1.0,
        suggestedActions: ['call_practice', 'try_again']
      },
      error: process.env.NODE_ENV === 'development' ? message : 'Service temporarily unavailable'
    }, { status: 500 });
  }
}

// Analyze assistant response for intent and suggested actions
async function analyzeResponse(message: string, client: OpenAI) {
  try {
    const analysisPrompt = `Analyze this dental assistant response and determine:
1. Primary intent (consultation, emergency, information, booking, etc.)
2. Confidence level (0-1)
3. Suggested actions for the user

Response: "${message}"

Return JSON format:
{
  "intent": "string",
  "confidence": number,
  "suggestedActions": ["action1", "action2"]
}

Possible intents: consultation, emergency, information, booking, treatment_info, anxiety_support, cost_inquiry
Possible actions: book_consultation, call_emergency, schedule_appointment, learn_more, contact_practice, view_treatments`;

    const analysis = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: analysisPrompt }],
      max_tokens: 150,
      temperature: 0.3,
    });

    const result = analysis.choices[0]?.message?.content;
    if (result) {
      try {
        return JSON.parse(result);
      } catch {
        // Fallback if JSON parsing fails
        return {
          intent: 'information',
          confidence: 0.8,
          suggestedActions: ['contact_practice']
        };
      }
    }
  } catch (error) {
    console.error('Response analysis error:', error);
  }

  // Default analysis
  return {
    intent: 'information',
    confidence: 0.8,
    suggestedActions: ['contact_practice']
  };
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'chat-api',
    timestamp: new Date().toISOString()
  });
}

