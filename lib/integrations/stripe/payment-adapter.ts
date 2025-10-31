import Stripe from 'stripe';

// Brand Colors: Magenta var(--smh-primary-magenta), Turquoise var(--smh-primary-teal), Gold var(--smh-accent-gold)
// Fonts: Montserrat headings, Lora body text

interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
}

interface TreatmentPricing {
  consultation: { price: number; description: string };
  whitening: { price: number; description: string };
  veneers: { price: number; description: string };
  implants: { price: number; description: string };
  emergency: { price: number; description: string };
}

class StripePaymentAdapter {
  private stripe: Stripe | null;
  private isConfigured: boolean;

  constructor() {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!secretKey) {
      console.warn('Stripe secret key not configured');
      this.isConfigured = false;
      this.stripe = null;
    } else {
      this.stripe = new Stripe(secretKey);
      this.isConfigured = true;
    }
  }

  async createPaymentIntent(
    amount: number,
    currency: string = 'gbp',
    treatmentType: string,
    patientInfo?: {
      name?: string;
      email?: string;
      phone?: string;
    }
  ): Promise<PaymentIntent> {
    if (!this.isConfigured || !this.stripe) {
      return this.getMockPaymentIntent(amount, currency);
    }

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100, // Convert to pence
        currency: currency.toLowerCase(),
        metadata: {
          treatmentType,
          practice: 'St Marys House Dental Care',
          location: 'Shoreham-by-Sea',
          patientName: patientInfo?.name || 'Unknown',
          patientEmail: patientInfo?.email || 'Unknown',
          patientPhone: patientInfo?.phone || 'Unknown',
        },
        description: `${treatmentType} treatment at St Mary's House Dental Care`,
        receipt_email: patientInfo?.email,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        id: paymentIntent.id,
        clientSecret: paymentIntent.client_secret ?? '',
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
      };
    } catch (error) {
      console.error('Stripe payment intent creation error:', error);
      return this.getMockPaymentIntent(amount, currency);
    }
  }

  async createSubscription(
    customerId: string,
    priceId: string,
    treatmentPlan: string
  ): Promise<{
    subscriptionId: string;
    clientSecret: string;
    status: string;
  }> {
    if (!this.isConfigured || !this.stripe) {
      return this.getMockSubscription();
    }

    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          treatmentPlan,
          practice: 'St Marys House Dental Care',
          location: 'Shoreham-by-Sea',
        },
      });

      const latestInvoice = subscription.latest_invoice;
      const paymentIntent =
        typeof latestInvoice === 'object' && latestInvoice !== null && 'payment_intent' in latestInvoice
          ? latestInvoice.payment_intent
          : null;
      const paymentIntentObject =
        typeof paymentIntent === 'object' && paymentIntent !== null
          ? (paymentIntent as Stripe.PaymentIntent)
          : null;

      return {
        subscriptionId: subscription.id,
        clientSecret: paymentIntentObject?.client_secret ?? '',
        status: subscription.status ?? 'incomplete',
      };
    } catch (error) {
      console.error('Stripe subscription creation error:', error);
      return this.getMockSubscription();
    }
  }

  async createCustomer(patientInfo: {
    name: string;
    email: string;
    phone?: string;
    address?: {
      line1: string;
      city: string;
      postal_code: string;
      country: string;
    };
  }): Promise<{ customerId: string; status: string }> {
    if (!this.isConfigured || !this.stripe) {
      return { customerId: 'mock_customer_id', status: 'mock' };
    }

    try {
      const customer = await this.stripe.customers.create({
        name: patientInfo.name,
        email: patientInfo.email,
        phone: patientInfo.phone,
        address: patientInfo.address,
        metadata: {
          practice: 'St Marys House Dental Care',
          location: 'Shoreham-by-Sea',
          registrationDate: new Date().toISOString(),
        },
      });

      return {
        customerId: customer.id,
        status: 'created',
      };
    } catch (error) {
      console.error('Stripe customer creation error:', error);
      return { customerId: 'mock_customer_id', status: 'error' };
    }
  }

  getTreatmentPricing(): TreatmentPricing {
    return {
      consultation: {
        price: 95,
        description: 'Comprehensive dental examination with 3D digital scanning'
      },
      whitening: {
        price: 450,
        description: 'Professional teeth whitening treatment (up to 8 shades lighter)'
      },
      veneers: {
        price: 950,
        description: 'Custom porcelain veneer per tooth (consultation required)'
      },
      implants: {
        price: 2500,
        description: 'Complete dental implant with crown (single tooth)'
      },
      emergency: {
        price: 150,
        description: 'Emergency dental consultation and immediate treatment'
      }
    };
  }

  async processRefund(
    paymentIntentId: string,
    amount?: number,
    reason?: Stripe.RefundCreateParams.Reason
  ): Promise<{ refundId: string; status: string; amount: number }> {
    if (!this.isConfigured || !this.stripe) {
      return {
        refundId: 'mock_refund_id',
        status: 'succeeded',
        amount: amount || 0
      };
    }

    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount ? amount * 100 : undefined, // Convert to pence if specified
        reason,
        metadata: {
          practice: 'St Marys House Dental Care',
          refundDate: new Date().toISOString(),
        },
      });

      return {
        refundId: refund.id,
        status: refund.status ?? 'unknown',
        amount: refund.amount / 100,
      };
    } catch (error) {
      console.error('Stripe refund error:', error);
      return {
        refundId: 'error_refund_id',
        status: 'failed',
        amount: 0
      };
    }
  }

  async getPaymentMethods(customerId: string): Promise<{
    paymentMethods: Array<{
      id: string;
      type: string;
      card?: {
        brand: string;
        last4: string;
        expMonth: number;
        expYear: number;
      };
    }>;
  }> {
    if (!this.isConfigured || !this.stripe) {
      return { paymentMethods: [] };
    }

    try {
      const paymentMethods = await this.stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      });

      return {
        paymentMethods: paymentMethods.data.map(pm => ({
          id: pm.id,
          type: pm.type,
          card: pm.card ? {
            brand: pm.card.brand,
            last4: pm.card.last4,
            expMonth: pm.card.exp_month,
            expYear: pm.card.exp_year,
          } : undefined,
        })),
      };
    } catch (error) {
      console.error('Stripe payment methods error:', error);
      return { paymentMethods: [] };
    }
  }

  private getMockPaymentIntent(amount: number, currency: string): PaymentIntent {
    return {
      id: `pi_mock_${Date.now()}`,
      clientSecret: `pi_mock_${Date.now()}_secret_mock`,
      amount,
      currency,
      status: 'requires_payment_method',
    };
  }

  private getMockSubscription(): {
    subscriptionId: string;
    clientSecret: string;
    status: string;
  } {
    return {
      subscriptionId: `sub_mock_${Date.now()}`,
      clientSecret: `pi_mock_${Date.now()}_secret_mock`,
      status: 'incomplete',
    };
  }

  isReady(): boolean {
    return this.isConfigured;
  }

  getPublishableKey(): string {
    return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_mock_key';
  }
}

export default StripePaymentAdapter;

