const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { items, customerEmail, robloxUsername } = JSON.parse(event.body);

    if (!items || items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No items in cart' })
      };
    }

    // Build Stripe line items from cart
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: `Steal A Brainrot — ${item.name}`,
          images: item.img ? [item.img] : [],
          metadata: {
            game: 'Steal A Brainrot',
            product_id: item.id,
          }
        },
        unit_amount: Math.round(item.priceNum * 100), // Stripe uses cents
      },
      quantity: item.qty,
    }));

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}/`,
      customer_email: customerEmail || undefined,
      metadata: {
        roblox_username: robloxUsername || 'Not provided',
        source: 'MarketBlox',
      },
      custom_fields: [
        {
          key: 'roblox_username',
          label: { type: 'custom', custom: 'Roblox Username' },
          type: 'text',
          optional: false,
        }
      ],
      billing_address_collection: 'auto',
      phone_number_collection: { enabled: false },
      invoice_creation: { enabled: true },
      locale: 'auto',
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: session.url }),
    };

  } catch (err) {
    console.error('Stripe error:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
