const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const admin  = require('firebase-admin');

// Initialize Firebase Admin once per cold start
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

    // 1. Verify Firebase ID token → get userId
    const decoded = await admin.auth().verifyIdToken(idToken);
    const userId  = decoded.uid;

    // 2. Retrieve and verify the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return { statusCode: 400, body: JSON.stringify({ error: 'Payment not completed' }) };
    }
    if (session.metadata.type !== 'balance_topup' || session.metadata.userId !== userId) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Session does not belong to this user' }) };
    }

    const amountCents = parseInt(session.metadata.amount_eur, 10);
    const db = admin.firestore();

    // 3. Idempotency — don't credit the same session twice
    const sessionRef = db.collection('credited_sessions').doc(sessionId);
    const existing   = await sessionRef.get();
    if (existing.exists) {
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ already_credited: true }),
      };
    }

    // 4. Atomically add balance and mark session as credited
    await db.runTransaction(async (t) => {
      const userRef = db.collection('users').doc(userId);
      const userDoc = await t.get(userRef);
      const current = userDoc.exists ? (userDoc.data().balance || 0) : 0;

      t.set(userRef, {
        balance:   current + amountCents,
        email:     decoded.email,
      }, { merge: true });

      t.set(sessionRef, {
        credited:  true,
        sessionId,
        userId,
        amount:    amountCents,
        at:        admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, credited: amountCents }),
    };
  } catch (err) {
    console.error('verify-topup error:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
