const admin  = require('firebase-admin');
const { Resend } = require('resend');

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
}

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' }, body: '' };
  }
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { email } = JSON.parse(event.body || '{}');
    if (!email) return { statusCode: 400, body: JSON.stringify({ error: 'Email required.' }) };

    // Generate reset link via Firebase Admin (doesn't send any email itself)
    let resetLink;
    try {
      resetLink = await admin.auth().generatePasswordResetLink(email);
    } catch (ex) {
      // Don't reveal whether the email exists or not
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    await resend.emails.send({
      from:    'MarketBlox <noreply@marketblox.fun>',
      to:      email,
      subject: 'Reset your MarketBlox password',
      html: `
        <div style="font-family:'Segoe UI',sans-serif;max-width:480px;margin:0 auto;background:#f4f8f5;border-radius:16px;padding:36px 32px;">
          <div style="text-align:center;margin-bottom:28px;">
            <div style="display:inline-block;background:#00c853;border-radius:10px;padding:10px 20px;">
              <span style="color:#fff;font-size:22px;font-weight:900;letter-spacing:-0.5px;">Market<b>Blox</b></span>
            </div>
          </div>
          <h2 style="color:#0a2e14;text-align:center;margin:0 0 10px;">Reset your password</h2>
          <p style="color:#6b8a72;text-align:center;margin:0 0 28px;">We received a request to reset the password for your MarketBlox account. Click the button below to choose a new password.</p>
          <div style="text-align:center;margin-bottom:24px;">
            <a href="${resetLink}" style="display:inline-block;background:#00c853;color:#fff;text-decoration:none;font-weight:900;font-size:16px;padding:14px 36px;border-radius:12px;letter-spacing:0.3px;">Reset Password</a>
          </div>
          <p style="color:#9dbfa7;text-align:center;font-size:13px;margin:0 0 8px;">This link expires in <b>1 hour</b>.</p>
          <p style="color:#9dbfa7;text-align:center;font-size:13px;margin:0;">If you didn't request a password reset, you can safely ignore this email.</p>
        </div>
      `,
    });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('send-password-reset error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
