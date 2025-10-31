import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Appointment booking schema
const appointmentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().min(1, 'Preferred time is required'),
  treatmentType: z.string().min(1, 'Treatment type is required'),
  message: z.string().optional(),
  isEmergency: z.boolean().default(false),
  hasAnxiety: z.boolean().default(false),
  isNewPatient: z.boolean().default(true),
});

type AppointmentRequest = z.infer<typeof appointmentSchema>;

interface AppointmentRecord extends AppointmentRequest {
  id: string;
  status: 'pending_confirmation';
  createdAt: string;
  estimatedDuration: number;
  priority: 'high' | 'normal';
}

// Available appointment slots (in a real app, this would come from a calendar system)
const availableSlots: Record<string, string[]> = {
  monday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  tuesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  wednesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  thursday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  friday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
  saturday: ['09:00', '10:00', '11:00', '12:00'],
  sunday: [] // Closed
};

const treatmentTypes = [
  'General Consultation',
  '3D Digital Dentistry',
  'Porcelain Veneers',
  'Dental Implants',
  'Teeth Whitening',
  'Orthodontics',
  'Root Canal Therapy',
  'Crowns & Bridges',
  'Preventive Care',
  'Emergency Treatment',
  'Anxiety Dentistry',
  'Hygienist Appointment'
];

// POST - Book an appointment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request data
    const validatedData = appointmentSchema.parse(body);

    // Check if treatment type is valid
    if (!treatmentTypes.includes(validatedData.treatmentType)) {
      return NextResponse.json(
        { error: 'Invalid treatment type' },
        { status: 400 }
      );
    }

    // Generate appointment ID
    const appointmentId = `SMH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // In a real application, you would:
    // 1. Check availability in your calendar system
    // 2. Save to database
    // 3. Send confirmation emails
    // 4. Integrate with practice management software
    // 5. Send SMS confirmations

    // Simulate appointment booking
    const appointment: AppointmentRecord = {
      id: appointmentId,
      ...validatedData,
      status: 'pending_confirmation',
      createdAt: new Date().toISOString(),
      estimatedDuration: getEstimatedDuration(validatedData.treatmentType),
      priority: validatedData.isEmergency ? 'high' : 'normal'
    };

    // Send confirmation email (simulated)
    await sendAppointmentConfirmation(appointment);

    // If it's an emergency, also send urgent notification
    if (validatedData.isEmergency) {
      await sendEmergencyNotification(appointment);
    }

    return NextResponse.json({
      success: true,
      appointment,
      message: validatedData.isEmergency 
        ? 'Emergency appointment request received. We will contact you within 30 minutes.'
        : 'Appointment request received. We will confirm your appointment within 2 hours.'
    });

  } catch (error) {
    console.error('Appointment booking error:', error);

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
      { error: 'Failed to book appointment. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}

// GET - Get available slots
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const treatmentType = searchParams.get('treatmentType');

  if (!date) {
    return NextResponse.json(
      { error: 'Date parameter is required' },
      { status: 400 }
    );
  }

  try {
    const requestedDate = new Date(date);
    const dayOfWeek = requestedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    
    // Get base available slots for the day
    let slots: string[] = availableSlots[dayOfWeek] || [];

    // Filter out past slots if it's today
    const today = new Date();
    if (requestedDate.toDateString() === today.toDateString()) {
      const currentHour = today.getHours();
      slots = slots.filter((slot: string) => {
        const slotHour = parseInt(slot.split(':')[0]);
        return slotHour > currentHour;
      });
    }

    // Adjust duration based on treatment type
    const duration = getEstimatedDuration(treatmentType || 'General Consultation');

    return NextResponse.json({
      date,
      dayOfWeek,
      availableSlots: slots,
      treatmentDuration: duration,
      treatmentTypes
    });

  } catch (error) {
    console.error('Error fetching available slots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch available slots' },
      { status: 500 }
    );
  }
}

// Helper function to get estimated treatment duration
function getEstimatedDuration(treatmentType: string): number {
  const durations: Record<string, number> = {
    'General Consultation': 30,
    '3D Digital Dentistry': 90,
    'Porcelain Veneers': 120,
    'Dental Implants': 180,
    'Teeth Whitening': 90,
    'Orthodontics': 60,
    'Root Canal Therapy': 120,
    'Crowns & Bridges': 90,
    'Preventive Care': 45,
    'Emergency Treatment': 60,
    'Anxiety Dentistry': 90,
    'Hygienist Appointment': 45
  };

  return durations[treatmentType] || 60;
}

// Simulated email confirmation
async function sendAppointmentConfirmation(appointment: AppointmentRecord) {
  // In a real app, integrate with email service (SendGrid, Mailgun, etc.)
  console.log('Sending appointment confirmation email:', {
    to: appointment.email,
    subject: 'Appointment Request Confirmation - St Mary\'s House Dental Care',
    appointmentId: appointment.id
  });

  // You would implement actual email sending here
  return true;
}

// Simulated emergency notification
async function sendEmergencyNotification(appointment: AppointmentRecord) {
  // In a real app, this would:
  // 1. Send SMS to practice emergency number
  // 2. Send email to on-call dentist
  // 3. Create high-priority alert in practice management system
  
  console.log('Sending emergency notification:', {
    appointmentId: appointment.id,
    patient: `${appointment.firstName} ${appointment.lastName}`,
    phone: appointment.phone,
    urgency: 'high'
  });

  return true;
}

