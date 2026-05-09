const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const admin  = require('firebase-admin');

if (!admin.apps.length) {
  const svc = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({ credential: admin.credential.cert(svc) });
}

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
    const { sessionId, idToken } = JSON.parse(event.body);

    // 1. Verify who is calling
    const decoded = await admin.auth().verifyIdToken(idToken);
    const userId  = decoded.uid;

    // 2. Retrieve Stripe session with line items
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    if (session.payment_status !== 'paid') {
      return { statusCode: 400, body: JSON.stringify({ error: 'Payment not completed' }) };
    }

    // Skip balance top-ups — those are handled by verify-topup
    if (session.metadata?.type === 'balance_topup') {
      return { statusCode: 200, body: JSON.stringify({ skip: true }) };
    }

    const db       = admin.firestore();
    const orderRef = db.collection('orders').doc(sessionId);

    // 3. Idempotency — don't save the same order twice
    const existing = await orderRef.get();
    if (existing.exists) {
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ already_saved: true, orderId: sessionId }),
      };
    }

    // 4. Map Stripe line items
    const items = (session.line_items?.data || []).map(li => ({
      name:   li.description || li.price?.product?.name || 'Item',
      amount: li.amount_total,
      qty:    li.quantity,
    }));

    // 5. Save order
    await orderRef.set({
      userId,
      email:           decoded.email,
      stripeSessionId: sessionId,
      items,
      total:           session.amount_total,
      currency:        session.currency,
      status:          'paid',
      robloxUsername:  session.metadata?.roblox_username || '',
      createdAt:       admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, orderId: sessionId }),
    };
  } catch (err) {
    console.error('save-order error:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
