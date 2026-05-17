const admin = require('firebase-admin');

if (!admin.apps.length) {
  const svc = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({ credential: admin.credential.cert(svc) });
}

const FEE_RATE = 0.0635;

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
    const { idToken, items, robloxUsername, email, discountAmt, discordId, discordUsername } = JSON.parse(event.body);

    if (!idToken) return { statusCode: 401, body: JSON.stringify({ error: 'Not authenticated' }) };
    if (!items || items.length === 0) return { statusCode: 400, body: JSON.stringify({ error: 'No items in cart' }) };
    if (!robloxUsername) return { statusCode: 400, body: JSON.stringify({ error: 'Roblox username required' }) };

    // Verify Firebase ID token
    const decoded = await admin.auth().verifyIdToken(idToken);
    const userId  = decoded.uid;

    // Calculate total in cents
    const subtotal    = items.reduce((s, i) => s + i.priceNum * i.qty, 0);
    const discount    = Math.min(parseFloat(discountAmt) || 0, subtotal);
    const discounted  = subtotal - discount;
    const fee         = discounted * FEE_RATE;
    const totalUSD    = discounted + fee;
    const totalCents  = Math.round(totalUSD * 100);

    const db      = admin.firestore();
    const userRef = db.collection('users').doc(userId);

    // Use a transaction to atomically check balance and deduct
    const orderId = db.collection('orders').doc().id;

    await db.runTransaction(async (t) => {
      const userDoc = await t.get(userRef);
      const balance = userDoc.exists ? (userDoc.data().balance || 0) : 0;

      if (balance < totalCents) {
        throw Object.assign(new Error('Insufficient balance'), { code: 'insufficient_balance', balance, totalCents });
      }

      const orderRef = db.collection('orders').doc(orderId);

      t.update(userRef, { balance: balance - totalCents });

      t.set(orderRef, {
        userId,
        email:           email || decoded.email || '',
        robloxUsername,
        discordId:       discordId       || null,
        discordUsername: discordUsername || null,
        items:           items.map(i => ({ name: i.name, amount: Math.round(i.priceNum * i.qty * 100), qty: i.qty })),
        total:           totalCents,
        currency:        'eur',
        status:          'paid',
        paymentMethod:   'wallet',
        createdAt:       admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    // Notify Railway backend to create Discord ticket
    // Must be awaited — Netlify Lambda freezes execution on return, killing fire-and-forget fetches
    const BACKEND_URL   = process.env.BACKEND_URL   || 'https://marketblox-production.up.railway.app';
    const TICKET_SECRET = process.env.TICKET_SECRET || '';
    if (TICKET_SECRET) {
      try {
        await fetch(`${BACKEND_URL}/api/wallet-order-complete`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', 'x-ticket-secret': TICKET_SECRET },
          body:    JSON.stringify({
            orderId,
            email:           email || decoded.email || '',
            robloxUsername,
            discordId:       discordId       || null,
            discordUsername: discordUsername || null,
            items,
            subtotal:        discounted,
            fee,
            total:           discounted + fee,
          }),
        });
      } catch (err) {
        console.error('[wallet-checkout] Railway notify failed:', err.message);
      }
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, orderId }),
    };

  } catch (err) {
    console.error('wallet-checkout error:', err);
    const status = err.code === 'insufficient_balance' ? 402 : 500;
    return {
      statusCode: status,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
