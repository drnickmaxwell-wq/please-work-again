import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Email schema
const emailSchema = z.object({
  to: z.string().email('Valid email address is required'),
  subject: z.string().min(1, 'Subject is required'),
  type: z.enum(['appointment_confirmation', 'appointment_reminder', 'treatment_info', 'emergency_response', 'payment_confirmation', 'newsletter', 'custom']),
  templateData: z.record(z.string(), z.any()).optional(),
  htmlContent: z.string().optional(),
  textContent: z.string().optional(),
});

// Email templates
type EmailTemplateContent = {
  subject: string;
  html: string;
  text: string;
};

const emailTemplates: Record<string, EmailTemplateContent> = {
  appointment_confirmation: {
    subject: 'Appointment Confirmation - St Mary\'s House Dental Care',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
        <div style="background: var(--smh-gradient); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">St Mary's House Dental Care</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Luxury Coastal Dentistry</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Appointment Confirmation</h2>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">Dear {{patientName}},</p>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">
            Thank you for booking your appointment with us. We're delighted to confirm your upcoming visit to our luxury coastal practice.
          </p>
          
          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Appointment Details</h3>
            <p style="margin: 5px 0; color: #475569;"><strong>Treatment:</strong> {{treatmentType}}</p>
            <p style="margin: 5px 0; color: #475569;"><strong>Date:</strong> {{appointmentDate}}</p>
            <p style="margin: 5px 0; color: #475569;"><strong>Time:</strong> {{appointmentTime}}</p>
            <p style="margin: 5px 0; color: #475569;"><strong>Duration:</strong> {{duration}} minutes</p>
            <p style="margin: 5px 0; color: #475569;"><strong>Appointment ID:</strong> {{appointmentId}}</p>
          </div>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">
            Our practice is located in beautiful Shoreham-by-Sea with stunning coastal views. We look forward to providing you with exceptional dental care in our calming, luxury environment.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{practiceWebsite}}" style="background: var(--gradient-cta); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">View Practice Information</a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
            <h4 style="color: #1e293b; margin-bottom: 10px;">Contact Information</h4>
            <p style="margin: 5px 0; color: #475569;">📞 01273 123456</p>
            <p style="margin: 5px 0; color: #475569;">📧 info@stmaryshousedental.co.uk</p>
            <p style="margin: 5px 0; color: #475569;">📍 Shoreham-by-Sea, West Sussex</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #64748b; font-size: 14px;">
          <p>St Mary's House Dental Care - Where luxury meets exceptional dental care</p>
        </div>
      </div>
    `,
    text: `
Dear {{patientName}},

Thank you for booking your appointment with St Mary's House Dental Care.

Appointment Details:
- Treatment: {{treatmentType}}
- Date: {{appointmentDate}}
- Time: {{appointmentTime}}
- Duration: {{duration}} minutes
- Appointment ID: {{appointmentId}}

We look forward to seeing you at our luxury coastal practice in Shoreham-by-Sea.

Contact us: 01273 123456 | info@stmaryshousedental.co.uk

Best regards,
St Mary's House Dental Care Team
    `
  },

  appointment_reminder: {
    subject: 'Appointment Reminder - Tomorrow at St Mary\'s House Dental Care',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: var(--smh-primary-magenta);">Appointment Reminder</h2>
        <p>Dear {{patientName}},</p>
        <p>This is a friendly reminder about your appointment tomorrow:</p>
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p><strong>Treatment:</strong> {{treatmentType}}</p>
          <p><strong>Date:</strong> {{appointmentDate}}</p>
          <p><strong>Time:</strong> {{appointmentTime}}</p>
        </div>
        <p>Please arrive 15 minutes early for check-in. If you need to reschedule, please call us at 01273 123456.</p>
        <p>We look forward to seeing you!</p>
      </div>
    `,
    text: `
Dear {{patientName}},

Appointment reminder for tomorrow:
- Treatment: {{treatmentType}}
- Date: {{appointmentDate}}
- Time: {{appointmentTime}}

Please arrive 15 minutes early. Call 01273 123456 to reschedule if needed.

St Mary's House Dental Care
    `
  },

  emergency_response: {
    subject: 'Emergency Dental Care - We\'re Here to Help',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #dc2626; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
          <h2 style="margin: 0;">Emergency Dental Care</h2>
          <p style="margin: 10px 0 0 0;">We're here to help you right away</p>
        </div>
        
        <p>Dear {{patientName}},</p>
        <p>We've received your emergency dental request and understand you need immediate care.</p>
        
        <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 15px 0;">
          <h3 style="color: #dc2626; margin-top: 0;">Immediate Actions:</h3>
          <ul style="color: #374151;">
            <li>We will contact you within 30 minutes</li>
            <li>Emergency appointment will be arranged today if possible</li>
            <li>Pain relief guidance will be provided over the phone</li>
          </ul>
        </div>
        
        <p><strong>Emergency Contact:</strong> 01273 123456</p>
        <p>If this is a life-threatening emergency, please call 999 immediately.</p>
        
        <p>We're committed to providing you with immediate relief and exceptional care.</p>
      </div>
    `,
    text: `
EMERGENCY DENTAL CARE

Dear {{patientName}},

We've received your emergency request and will contact you within 30 minutes.

Emergency actions:
- Phone consultation within 30 minutes
- Same-day appointment if possible
- Immediate pain relief guidance

Emergency contact: 01273 123456

For life-threatening emergencies, call 999.

St Mary's House Dental Care
    `
  }
};

// POST - Send email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = emailSchema.parse(body);

    // Get template if using predefined type
    let emailContent = {
      subject: validatedData.subject,
      html: validatedData.htmlContent || '',
      text: validatedData.textContent || ''
    };

    if (validatedData.type !== 'custom' && emailTemplates[validatedData.type]) {
      const template = emailTemplates[validatedData.type];
      emailContent = {
        subject: template.subject,
        html: template.html,
        text: template.text
      };

      // Replace template variables
      if (validatedData.templateData) {
        Object.entries(validatedData.templateData).forEach(([key, value]) => {
          const placeholder = `{{${key}}}`;
          emailContent.html = emailContent.html.replace(new RegExp(placeholder, 'g'), String(value));
          emailContent.text = emailContent.text.replace(new RegExp(placeholder, 'g'), String(value));
        });
      }
    }

    // In a real application, you would integrate with an email service:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Postmark
    // - etc.

    // Simulate email sending
    const emailResult = await sendEmail({
      to: validatedData.to,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
      type: validatedData.type
    });

    return NextResponse.json({
      success: true,
      messageId: emailResult.messageId,
      type: validatedData.type,
      to: validatedData.to,
      subject: emailContent.subject
    });

  } catch (error) {
    console.error('Email sending error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

// GET - Get email templates
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const templateType = searchParams.get('template');

  if (templateType && emailTemplates[templateType as keyof typeof emailTemplates]) {
    return NextResponse.json({
      template: emailTemplates[templateType as keyof typeof emailTemplates],
      type: templateType
    });
  }

  return NextResponse.json({
    templates: Object.keys(emailTemplates),
    availableTypes: ['appointment_confirmation', 'appointment_reminder', 'treatment_info', 'emergency_response', 'payment_confirmation', 'newsletter', 'custom']
  });
}

// Simulated email sending function
async function sendEmail(emailData: {
  to: string;
  subject: string;
  html: string;
  text: string;
  type: string;
}) {
  // In a real application, replace this with actual email service integration
  console.log('Sending email:', {
    to: emailData.to,
    subject: emailData.subject,
    type: emailData.type,
    timestamp: new Date().toISOString()
  });

  // Simulate email service response
  return {
    messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: 'sent',
    timestamp: new Date().toISOString()
  };
}

