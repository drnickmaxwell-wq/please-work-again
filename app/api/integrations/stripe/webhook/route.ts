import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 });
  }

  if (!secretKey) {
    return NextResponse.json({ error: 'Payment service temporarily unavailable' }, { status: 503 });
  }

  const stripe = new Stripe(secretKey);

  try {
    const rawBody = await req.text();
    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    console.log('Stripe event', event.type);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error', error);
    return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 });
  }
}
