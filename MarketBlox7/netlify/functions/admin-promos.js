const admin = require('firebase-admin');

if (!admin.apps.length) {
  const svc = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({ credential: admin.credential.cert(svc) });
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'profaze272@gmail.com';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { ...CORS, 'Access-Control-Allow-Headers': 'Content-Type' }, body: '' };
  }
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { idToken, action, code, discount, type, maxUses } = JSON.parse(event.body);
    if (!idToken) return { statusCode: 401, headers: CORS, body: JSON.stringify({ error: 'Not authenticated' }) };

    const decoded = await admin.auth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return { statusCode: 403, headers: CORS, body: JSON.stringify({ error: 'Forbidden' }) };
    }

    const db = admin.firestore();

    if (action === 'create') {
      if (!code || discount == null) return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'code and discount required' }) };
      const ref = db.collection('promoCodes').doc(code.toUpperCase());
      const existing = await ref.get();
      if (existing.exists) return { statusCode: 409, headers: CORS, body: JSON.stringify({ error: 'Code already exists' }) };
      await ref.set({
        active:    true,
        discount:  parseFloat(discount),
        type:      type || 'percent',
        maxUses:   parseInt(maxUses) || 0,
        usedCount: 0,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ success: true }) };
    }

    if (action === 'toggle') {
      const ref  = db.collection('promoCodes').doc(code.toUpperCase());
      const snap = await ref.get();
      if (!snap.exists) return { statusCode: 404, headers: CORS, body: JSON.stringify({ error: 'Not found' }) };
      await ref.update({ active: !snap.data().active });
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ success: true, active: !snap.data().active }) };
    }

    if (action === 'delete') {
      await db.collection('promoCodes').doc(code.toUpperCase()).delete();
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Unknown action' }) };

  } catch (err) {
    console.error('admin-promos error:', err);
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: err.message }) };
  }
};
