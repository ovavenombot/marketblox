const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' },
      body: '',
    };
  }
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { amount, userId, userEmail } = JSON.parse(event.body);

    if (!amount || amount < 1 || amount > 500 || !userId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request' }) };
    }

    const amountCents = Math.round(parseFloat(amount) * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: `MarketBlox Wallet — €${parseFloat(amount).toFixed(2)} Credit`,
            description: 'Store credit added to your MarketBlox account',
          },
          unit_amount: amountCents,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.URL}/account?topup=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.URL}/account.html`,
      customer_email: userEmail || undefined,
      metadata: {
        type:       'balance_topup',
        userId:     userId,
        amount_eur: String(amountCents),
      },
    });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('create-topup error:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
