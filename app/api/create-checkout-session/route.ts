import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';

export async function POST() {
  const priceId = process.env.STRIPE_PRICE_ID;
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  if (!priceId || !baseUrl) {
    return NextResponse.json(
      { error: 'Missing STRIPE_PRICE_ID or NEXT_PUBLIC_URL' },
      { status: 500 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
