import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  console.log('[stripe-webhook] supabase url', { supabaseUrl });

  return createClient<any>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
}

function unwrapStripeResponse<T>(response: T | Stripe.Response<T>) {
  return response as T;
}

function getSubscriptionPeriod(subscription: Stripe.Subscription) {
  const anySub = subscription as unknown as {
    current_period_start?: number;
    current_period_end?: number;
    currentPeriodStart?: number;
    currentPeriodEnd?: number;
  };

  return {
    currentPeriodStart: anySub.current_period_start ?? anySub.currentPeriodStart ?? null,
    currentPeriodEnd: anySub.current_period_end ?? anySub.currentPeriodEnd ?? null,
  };
}

async function findUserIdByEmail(
  supabaseAdmin: SupabaseClient<any>,
  email: string
) {
  const perPage = 200;
  let page = 1;

  for (;;) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage });
    if (error) {
      throw error;
    }

    const match = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (match?.id) {
      return match.id;
    }

    if (data.users.length < perPage) {
      return null;
    }

    page += 1;
  }
}

async function getOrCreateUserIdByEmail(
  supabaseAdmin: SupabaseClient<any>,
  email: string
) {
  const existing = await findUserIdByEmail(supabaseAdmin, email);
  if (existing) {
    console.log('[stripe-webhook] supabase user exists', { email, userId: existing });
    return existing;
  }

  const randomPassword = `ml_${randomUUID()}`;
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: randomPassword,
    email_confirm: true,
  });

  if (error || !data.user) {
    throw error ?? new Error('Failed to create user');
  }

  console.log('[stripe-webhook] supabase user created', { email, userId: data.user.id });
  return data.user.id;
}

async function getUserIdByStripeCustomerId(
  supabaseAdmin: SupabaseClient<any>,
  stripeCustomerId: string
) {
  const { data, error } = await supabaseAdmin
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_customer_id', stripeCustomerId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data?.user_id as string | null) ?? null;
}

async function upsertSubscriptionByUserId(
  supabaseAdmin: SupabaseClient<any>,
  userId: string,
  stripeCustomerId: string,
  subscription: Stripe.Subscription
) {
  const { currentPeriodStart, currentPeriodEnd } = getSubscriptionPeriod(subscription);

  const payload = {
    user_id: userId,
    stripe_customer_id: stripeCustomerId,
    stripe_subscription_id: subscription.id,
    status: subscription.status,
    current_period_start: currentPeriodStart
      ? new Date(currentPeriodStart * 1000).toISOString()
      : null,
    current_period_end: currentPeriodEnd ? new Date(currentPeriodEnd * 1000).toISOString() : null,
    cancel_at_period_end: subscription.cancel_at_period_end,
  };

  const { error } = await supabaseAdmin.from('subscriptions').upsert(payload, {
    onConflict: 'user_id',
  });

  if (error) {
    throw error;
  }
}

async function handleCheckoutSessionCompleted(
  supabaseAdmin: SupabaseClient<any>,
  session: Stripe.Checkout.Session
) {
  let email: string | null = session.customer_details?.email ?? session.customer_email ?? null;
  const customerId = typeof session.customer === 'string' ? session.customer : null;
  const subscriptionId = typeof session.subscription === 'string' ? session.subscription : null;

  if (!customerId) {
    throw new Error('Missing customerId on checkout.session.completed');
  }

  if (!subscriptionId) {
    console.log('[stripe-webhook] checkout.session.completed without subscription - skipping', {
      sessionId: session.id,
      mode: session.mode,
    });
    return;
  }

  if (!email) {
    const customer = (await stripe.customers.retrieve(
      customerId
    )) as Stripe.Customer | Stripe.DeletedCustomer;

    if ('deleted' in customer && customer.deleted) {
      throw new Error('Stripe customer is deleted');
    }

    email = customer.email ?? null;
  }

  if (!email) {
    throw new Error('Missing customer email for checkout.session.completed');
  }

  console.log('[stripe-webhook] checkout.session.completed resolved email', {
    sessionId: session.id,
    email,
  });

  const userId = await getOrCreateUserIdByEmail(supabaseAdmin, email);

  const subscriptionResponse = await stripe.subscriptions.retrieve(subscriptionId);
  const subscription = unwrapStripeResponse(subscriptionResponse);

  await upsertSubscriptionByUserId(supabaseAdmin, userId, customerId, subscription);

  console.log('[stripe-webhook] subscription upserted', {
    userId,
    customerId,
    subscriptionId: subscription.id,
    status: subscription.status,
  });
}

async function handleSubscriptionUpdatedOrCreated(
  supabaseAdmin: SupabaseClient<any>,
  subscription: Stripe.Subscription
) {
  const customerId = typeof subscription.customer === 'string' ? subscription.customer : null;
  if (!customerId) {
    console.log('[stripe-webhook] subscription event without string customer - skipping', {
      subscriptionId: subscription.id,
    });
    return;
  }

  let userId = await getUserIdByStripeCustomerId(supabaseAdmin, customerId);
  if (!userId) {
    const customer = (await stripe.customers.retrieve(
      customerId
    )) as Stripe.Customer | Stripe.DeletedCustomer;

    if ('deleted' in customer && customer.deleted) {
      console.log('[stripe-webhook] subscription event with deleted customer - skipping', {
        subscriptionId: subscription.id,
        customerId,
      });
      return;
    }

    const email = customer.email ?? null;
    if (!email) {
      console.log('[stripe-webhook] subscription event with customer missing email - skipping', {
        subscriptionId: subscription.id,
        customerId,
      });
      return;
    }

    console.log('[stripe-webhook] subscription event resolved email (no mapping yet)', {
      subscriptionId: subscription.id,
      customerId,
      email,
    });

    userId = await getOrCreateUserIdByEmail(supabaseAdmin, email);
  }

  await upsertSubscriptionByUserId(supabaseAdmin, userId, customerId, subscription);
}

async function handleSubscriptionDeleted(
  supabaseAdmin: SupabaseClient<any>,
  subscription: Stripe.Subscription
) {
  const customerId = typeof subscription.customer === 'string' ? subscription.customer : null;
  if (!customerId) {
    return;
  }

  let userId = await getUserIdByStripeCustomerId(supabaseAdmin, customerId);
  if (!userId) {
    const customer = (await stripe.customers.retrieve(
      customerId
    )) as Stripe.Customer | Stripe.DeletedCustomer;

    if ('deleted' in customer && customer.deleted) {
      return;
    }

    const email = customer.email ?? null;
    if (!email) {
      return;
    }

    userId = await getOrCreateUserIdByEmail(supabaseAdmin, email);
  }

  await upsertSubscriptionByUserId(supabaseAdmin, userId, customerId, subscription);
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[stripe-webhook] Missing STRIPE_WEBHOOK_SECRET');
    return NextResponse.json({ error: 'Missing STRIPE_WEBHOOK_SECRET' }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[stripe-webhook] signature verification failed', message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  console.log('[stripe-webhook] received', { type: event.type, id: event.id });

  let supabaseAdmin: SupabaseClient<any>;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[stripe-webhook] supabase init failed', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(
          supabaseAdmin,
          event.data.object as Stripe.Checkout.Session
        );
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdatedOrCreated(
          supabaseAdmin,
          event.data.object as Stripe.Subscription
        );
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(
          supabaseAdmin,
          event.data.object as Stripe.Subscription
        );
        break;

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[stripe-webhook] handler error', {
      eventType: event.type,
      message,
    });
    return NextResponse.json(
      { error: 'Webhook handler error', eventType: event.type, message },
      { status: 500 }
    );
  }
}
