const admin  = require('firebase-admin');
const { Resend } = require('resend');

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
}

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { name, email, password } = JSON.parse(event.body || '{}');
    if (!name || !email || !password) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields.' }) };
    }

    const db   = admin.firestore();
    const auth = admin.auth();
    let uid;

    // Create user or re-use existing unverified user
    try {
      const user = await auth.createUser({ email, password, displayName: name, emailVerified: false });
      uid = user.uid;
      await db.collection('users').doc(uid).set({
        email,
        displayName: name,
        balance: 0,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (ex) {
      if (ex.code === 'auth/email-already-exists') {
        const existing = await auth.getUserByEmail(email);
        if (existing.emailVerified) {
          return { statusCode: 400, body: JSON.stringify({ error: 'auth/email-already-in-use' }) };
        }
        // Unverified — update password/name and resend code
        await auth.updateUser(existing.uid, { password, displayName: name });
        uid = existing.uid;
      } else {
        throw ex;
      }
    }

    // Generate 6-digit code, expires in 15 min
    const code      = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await db.collection('pending_verifications').doc(email).set({ code, uid, name, expiresAt });

    await resend.emails.send({
      from:    'MarketBlox <noreply@marketblox.fun>',
      to:      email,
      subject: 'Your MarketBlox verification code',
      html: `
        <div style="font-family:'Segoe UI',sans-serif;max-width:480px;margin:0 auto;background:#f4f8f5;border-radius:16px;padding:36px 32px;">
          <div style="text-align:center;margin-bottom:28px;">
            <div style="display:inline-block;background:#00c853;border-radius:10px;padding:10px 20px;">
              <span style="color:#fff;font-size:22px;font-weight:900;letter-spacing:-0.5px;">Market<b>Blox</b></span>
            </div>
          </div>
          <h2 style="color:#0a2e14;text-align:center;margin:0 0 10px;">Verify your email</h2>
          <p style="color:#6b8a72;text-align:center;margin:0 0 28px;">Hi ${name}, enter this code in the MarketBlox app to activate your account:</p>
          <div style="background:#fff;border:2.5px solid #00c853;border-radius:14px;padding:32px 20px;text-align:center;margin-bottom:24px;">
            <span style="font-size:48px;font-weight:900;letter-spacing:14px;color:#0a2e14;font-family:monospace;">${code}</span>
          </div>
          <p style="color:#9dbfa7;text-align:center;font-size:13px;margin:0;">This code expires in <b>15 minutes</b>. If you didn't create a MarketBlox account, ignore this email.</p>
        </div>
      `,
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('send-verification-code error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
