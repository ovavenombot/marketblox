const admin = require('firebase-admin');

if (!admin.apps.length) {
  const svc = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({ credential: admin.credential.cert(svc) });
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'profaze272@gmail.com';
const MAX_ADJUST_CENTS = 50000; // €500

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
    const { idToken, action, ...body } = JSON.parse(event.body);
    if (!idToken) return { statusCode: 401, headers: CORS, body: JSON.stringify({ error: 'Not authenticated' }) };

    const decoded = await admin.auth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return { statusCode: 403, headers: CORS, body: JSON.stringify({ error: 'Forbidden' }) };
    }

    const db = admin.firestore();

    if (action === 'lookup') {
      const { email } = body;
      if (!email) return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Email required' }) };

      try {
        const userRecord = await admin.auth().getUserByEmail(email);
        const userDoc = await db.collection('users').doc(userRecord.uid).get();
        const balance = userDoc.exists ? (userDoc.data().balance || 0) : 0;
        return {
          statusCode: 200, headers: CORS,
          body: JSON.stringify({
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName || '',
            balance,
          }),
        };
      } catch (e) {
        if (e.code === 'auth/user-not-found') {
          return { statusCode: 404, headers: CORS, body: JSON.stringify({ error: 'No user found with that email' }) };
        }
        throw e;
      }
    }

    if (action === 'adjust') {
      const { userId, userEmail, amountCents, reason } = body;
      if (!userId || !userEmail) {
        return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'userId and userEmail required' }) };
      }
      if (!amountCents || amountCents === 0) {
        return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Amount cannot be zero' }) };
      }
      if (Math.abs(amountCents) > MAX_ADJUST_CENTS) {
        return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Maximum single adjustment is €500' }) };
      }
      if (!reason || reason.trim().length < 3) {
        return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Reason is required (min 3 characters)' }) };
      }

      const userRef = db.collection('users').doc(userId);
      const logRef  = db.collection('wallet_adjustments').doc();
      let newBalance;

      await db.runTransaction(async (t) => {
        const userDoc    = await t.get(userRef);
        const prevBalance = userDoc.exists ? (userDoc.data().balance || 0) : 0;
        newBalance = prevBalance + amountCents;
        if (newBalance < 0) throw new Error('Balance cannot go below zero');

        t.set(userRef, { balance: newBalance }, { merge: true });
        t.set(logRef, {
          userId,
          userEmail,
          amountCents,
          reason: reason.trim(),
          adminEmail: decoded.email,
          prevBalance,
          newBalance,
          at: admin.firestore.FieldValue.serverTimestamp(),
        });
      });

      return {
        statusCode: 200, headers: CORS,
        body: JSON.stringify({ success: true, newBalance }),
      };
    }

    if (action === 'log') {
      const snap = await db.collection('wallet_adjustments').orderBy('at', 'desc').limit(50).get();
      const entries = snap.docs.map(d => ({
        id: d.id,
        ...d.data(),
        at: d.data().at?.toDate?.()?.toISOString() || null,
      }));
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ entries }) };
    }

    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Unknown action' }) };

  } catch (err) {
    console.error('admin-wallet error:', err);
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: err.message }) };
  }
};
