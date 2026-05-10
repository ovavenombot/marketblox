const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { email, code } = JSON.parse(event.body || '{}');
    if (!email || !code) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields.' }) };
    }

    const db  = admin.firestore();
    const ref = db.collection('pending_verifications').doc(email);
    const doc = await ref.get();

    if (!doc.exists) {
      return { statusCode: 400, body: JSON.stringify({ error: 'No pending verification for this email.' }) };
    }

    const data = doc.data();

    if (new Date() > data.expiresAt.toDate()) {
      await ref.delete();
      return { statusCode: 400, body: JSON.stringify({ error: 'Code expired. Please register again.' }) };
    }

    if (data.code !== code.trim()) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid code. Please try again.' }) };
    }

    // Mark verified in Firebase Auth
    await admin.auth().updateUser(data.uid, { emailVerified: true });
    await ref.delete();

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('verify-code error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
