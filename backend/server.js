require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const stripe   = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');
const { initDb, db } = require('./database');
const { createOrderTicket, dmUser } = require('./bot');

const app  = express();
const PORT = process.env.PORT || 3001;

// Stripe webhook needs raw body — register before express.json()
app.use('/api/stripe-webhook', express.raw({ type: 'application/json' }));

app.use(cors({ origin: '*' }));
app.use(express.json());

const FEE_RATE           = 0.0635;
const DISCORD_CLIENT_ID  = process.env.DISCORD_CLIENT_ID;
const DISCORD_SECRET     = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI       = `${process.env.BACKEND_URL}/api/discord/callback`;

// ── POST /api/create-checkout ─────────────────────────────────────────────────

app.post('/api/create-checkout', async (req, res) => {
  try {
    const { items, robloxUsername, email, discordId, discordUsername } = req.body;

    if (!items?.length || !robloxUsername || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const subtotal = items.reduce((s, i) => s + i.priceNum * i.qty, 0);
    const fee      = subtotal * FEE_RATE;
    const orderId  = uuidv4();

    const lineItems = items.map(item => ({
      price_data: {
        currency:     'usd',
        product_data: { name: item.name, description: item.game || 'MarketBlox' },
        unit_amount:  Math.round(item.priceNum * 100),
      },
      quantity: item.qty,
    }));

    // Processing fee as separate line item
    lineItems.push({
      price_data: {
        currency:     'usd',
        product_data: { name: 'Processing Fee' },
        unit_amount:  Math.round(fee * 100),
      },
      quantity: 1,
    });

    // Strip heavy fields (img, emoji) to stay under Stripe's 500-char metadata limit
    const slimItems = items.map(({ id, name, priceNum, qty, game }) => ({ id, name, priceNum, qty, game }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode:           'payment',
      customer_email: email,
      metadata: {
        orderId,
        robloxUsername,
        discordId:       discordId       || '',
        discordUsername: discordUsername || '',
        items:           JSON.stringify(slimItems),
      },
      success_url: `${process.env.SITE_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.SITE_URL}/checkout.html`,
    });

    // Save pending order
    db.prepare(`
      INSERT INTO orders
        (uuid, discord_id, discord_username, roblox_username, email, items, subtotal, fee, total, stripe_session_id, status)
      VALUES (?,?,?,?,?,?,?,?,?,?,'pending')
    `).run(
      orderId,
      discordId       || null,
      discordUsername || null,
      robloxUsername,
      email,
      JSON.stringify(items),
      subtotal,
      fee,
      subtotal + fee,
      session.id,
    );

    res.json({ url: session.url });
  } catch (err) {
    console.error('create-checkout error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Discord OAuth ─────────────────────────────────────────────────────────────

app.get('/api/discord/auth', (_req, res) => {
  const url = `https://discord.com/oauth2/authorize`
    + `?client_id=${DISCORD_CLIENT_ID}`
    + `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
    + `&response_type=code&scope=identify`;
  res.redirect(url);
});

app.get('/api/discord/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.send('<script>window.close();</script>');

  try {
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    new URLSearchParams({
        client_id:     DISCORD_CLIENT_ID,
        client_secret: DISCORD_SECRET,
        code,
        grant_type:    'authorization_code',
        redirect_uri:  REDIRECT_URI,
      }),
    });
    const token = await tokenRes.json();

    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
    const user = await userRes.json();

    // Escape values to prevent XSS
    const safeId   = String(user.id       || '').replace(/[^0-9]/g, '');
    const safeName = String(user.username || '').replace(/['"<>&]/g, '');

    res.send(`
      <!DOCTYPE html><html><body>
      <script>
        window.opener && window.opener.postMessage(
          { discordId: '${safeId}', discordUsername: '${safeName}' },
          '*'
        );
        window.close();
      </script>
      <p>Linked! You can close this window.</p>
      </body></html>
    `);
  } catch (err) {
    console.error('Discord callback error:', err);
    res.send('<script>window.close();</script>');
  }
});

// ── Stripe Webhook ────────────────────────────────────────────────────────────

app.post('/api/stripe-webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session  = event.data.object;
    const { orderId, robloxUsername, discordId, discordUsername, items } = session.metadata;

    db.prepare(`UPDATE orders SET status='paid', updated_at=datetime('now') WHERE uuid=?`).run(orderId);

    const order = db.prepare('SELECT * FROM orders WHERE uuid=?').get(orderId);
    if (!order) return res.json({ received: true });

    const parsedItems = JSON.parse(items || '[]');

    // Create ticket first, then DM with the channel link
    (async () => {
      try {
        console.log(`[Order ${orderId}] discordId="${discordId}" roblox="${robloxUsername}"`);
        await createOrderTicket(order, parsedItems);
        if (discordId) {
          const updatedOrder = db.prepare('SELECT * FROM orders WHERE uuid=?').get(orderId);
          console.log(`[Order ${orderId}] Sending DM to Discord ID: ${discordId}`);
          await dmUser(discordId, updatedOrder);
          console.log(`[Order ${orderId}] DM sent successfully`);
        } else {
          console.log(`[Order ${orderId}] No Discord ID — skipping DM`);
        }
      } catch (err) {
        console.error('Discord post-payment error:', err);
      }
    })();
  }

  res.json({ received: true });
});

// ── POST /api/chat (Groq proxy) ───────────────────────────────────────────────

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages?.length) return res.status(400).json({ error: 'No messages' });

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages, max_tokens: 300, temperature: 0.6 }),
    });

    const data = await groqRes.json();
    if (!groqRes.ok) return res.status(groqRes.status).json({ error: data?.error?.message || 'Groq error' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/order/by-session/:sessionId ─────────────────────────────────────

app.get('/api/order/by-session/:sessionId', (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE stripe_session_id=?').get(req.params.sessionId);
  if (!order) return res.status(404).json({ error: 'Not found' });
  res.json({ orderId: order.id, uuid: order.uuid, status: order.status });
});

// ── Start ─────────────────────────────────────────────────────────────────────

(async () => {
  await initDb();
  app.listen(PORT, () => {
    console.log(`MarketBlox backend running → http://localhost:${PORT}`);
  });
})();
