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
    const { items, robloxUsername, email, discordId, discordUsername, promoCode, discountAmt } = req.body;

    if (!items?.length || !robloxUsername || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const subtotal   = items.reduce((s, i) => s + i.priceNum * i.qty, 0);
    const discount   = Math.min(parseFloat(discountAmt) || 0, subtotal);
    const discounted = subtotal - discount;
    const fee        = discounted * FEE_RATE;
    const orderId    = uuidv4();

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

    // Create a one-time Stripe coupon for the discount
    let stripeCoupon = null;
    if (discount > 0) {
      stripeCoupon = await stripe.coupons.create({
        amount_off: Math.round(discount * 100),
        currency:   'usd',
        duration:   'once',
        name:       `Discount (${promoCode || 'CODE'})`,
      });
    }

    // Strip heavy fields (img, emoji) to stay under Stripe's 500-char metadata limit
    const slimItems = items.map(({ id, name, priceNum, qty, game }) => ({ id, name, priceNum, qty, game }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode:           'payment',
      customer_email: email,
      ...(stripeCoupon ? { discounts: [{ coupon: stripeCoupon.id }] } : {}),
      metadata: {
        orderId,
        robloxUsername,
        discordId:       discordId       || '',
        discordUsername: discordUsername || '',
        items:           JSON.stringify(slimItems),
        promoCode:       promoCode       || '',
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
      discounted,
      fee,
      discounted + fee,
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
    const safeId     = String(user.id       || '').replace(/[^0-9]/g, '');
    const safeName   = String(user.username || '').replace(/['"<>&]/g, '');
    const safeAvatar = String(user.avatar   || '').replace(/[^a-zA-Z0-9_]/g, '');

    res.send(`
      <!DOCTYPE html><html><body>
      <script>
        window.opener && window.opener.postMessage(
          { discordId: '${safeId}', discordUsername: '${safeName}', discordAvatar: '${safeAvatar}' },
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
    const { orderId, robloxUsername, discordId, discordUsername, items, promoCode } = session.metadata;

    // Increment promo code usage after confirmed payment
    if (promoCode) {
      const FB_PROJECT = 'marketblox-ed6a3';
      fetch(`https://firestore.googleapis.com/v1/projects/${FB_PROJECT}/databases/(default)/documents:commit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ writes: [{ transform: {
          document: `projects/${FB_PROJECT}/databases/(default)/documents/promoCodes/${promoCode}`,
          fieldTransforms: [{ fieldPath: 'usedCount', increment: { integerValue: '1' } }]
        }}]})
      }).catch(err => console.error('Promo usedCount increment failed:', err));
    }

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

// ── POST /api/wallet-order-complete ──────────────────────────────────────────
// Called by the Netlify wallet-checkout function after a successful wallet
// payment so we can create the Discord ticket and send the buyer a DM.

app.post('/api/wallet-order-complete', async (req, res) => {
  const secret = req.headers['x-ticket-secret'];
  if (!process.env.TICKET_SECRET || secret !== process.env.TICKET_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { orderId, email, robloxUsername, discordId, discordUsername, items, subtotal, fee, total } = req.body;

    if (!orderId || !robloxUsername || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Avoid duplicate inserts if the request is retried
    const existing = db.prepare('SELECT * FROM orders WHERE uuid=?').get(orderId);
    if (!existing) {
      db.prepare(`
        INSERT INTO orders
          (uuid, discord_id, discord_username, roblox_username, email, items, subtotal, fee, total, payment_method, status)
        VALUES (?,?,?,?,?,?,?,?,?,'wallet','paid')
      `).run(
        orderId,
        discordId       || null,
        discordUsername || null,
        robloxUsername,
        email,
        JSON.stringify(items || []),
        subtotal || 0,
        fee      || 0,
        total    || 0,
      );
    }

    const order = db.prepare('SELECT * FROM orders WHERE uuid=?').get(orderId);
    if (!order) return res.status(500).json({ error: 'Order insert failed' });

    const parsedItems = JSON.parse(order.items || '[]');

    // Fire-and-forget ticket + DM (don't block the HTTP response)
    (async () => {
      try {
        await createOrderTicket(order, parsedItems);
        if (discordId) {
          const updated = db.prepare('SELECT * FROM orders WHERE uuid=?').get(orderId);
          await dmUser(discordId, updated);
        }
      } catch (err) {
        console.error('[wallet-order-complete] Discord error:', err);
      }
    })();

    res.json({ success: true });
  } catch (err) {
    console.error('wallet-order-complete error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────

(async () => {
  await initDb();
  app.listen(PORT, () => {
    console.log(`MarketBlox backend running → http://localhost:${PORT}`);
  });
})();
