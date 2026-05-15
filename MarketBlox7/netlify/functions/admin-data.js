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
    const { idToken, action } = JSON.parse(event.body);
    if (!idToken) return { statusCode: 401, headers: CORS, body: JSON.stringify({ error: 'Not authenticated' }) };

    const decoded = await admin.auth().verifyIdToken(idToken);
    if (decoded.email !== ADMIN_EMAIL) {
      return { statusCode: 403, headers: CORS, body: JSON.stringify({ error: 'Forbidden' }) };
    }

    const db = admin.firestore();

    if (action === 'stats') {
      const [ordersSnap, usersSnap, promosSnap] = await Promise.all([
        db.collection('orders').get(),
        db.collection('users').get(),
        db.collection('promoCodes').get(),
      ]);

      let totalRevenue = 0;
      let walletRevenue = 0;
      ordersSnap.forEach(d => {
        totalRevenue += d.data().total || 0;
        if (d.data().paymentMethod === 'wallet') walletRevenue += d.data().total || 0;
      });

      const activePromos = promosSnap.docs.filter(d => d.data().active).length;

      return {
        statusCode: 200, headers: CORS,
        body: JSON.stringify({
          totalOrders:  ordersSnap.size,
          totalRevenue, // in cents
          walletRevenue,
          totalUsers:   usersSnap.size,
          activePromos,
        }),
      };
    }

    if (action === 'orders') {
      const snap = await db.collection('orders').orderBy('createdAt', 'desc').limit(100).get();
      const orders = snap.docs.map(d => ({ id: d.id, ...d.data(), createdAt: d.data().createdAt?.toDate?.()?.toISOString() || null }));
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ orders }) };
    }

    if (action === 'top-buyers') {
      const snap = await db.collection('orders').get();
      const map  = {};
      snap.forEach(d => {
        const o = d.data();
        const uid = o.userId || 'unknown';
        if (!map[uid]) map[uid] = { userId: uid, email: o.email || '', robloxUsername: o.robloxUsername || '', total: 0, orderCount: 0 };
        map[uid].total      += o.total || 0;
        map[uid].orderCount += 1;
      });
      const buyers = Object.values(map).sort((a, b) => b.total - a.total).slice(0, 20);
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ buyers }) };
    }

    if (action === 'promos') {
      const snap   = await db.collection('promoCodes').get();
      const promos = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ promos }) };
    }

    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Unknown action' }) };

  } catch (err) {
    console.error('admin-data error:', err);
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: err.message }) };
  }
};
