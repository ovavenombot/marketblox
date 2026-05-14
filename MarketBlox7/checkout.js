// ================================
//   MARKETBLOX — CHECKOUT PAGE JS
// ================================

// Change this to your deployed backend URL in production
const BACKEND_URL = 'https://marketblox-production.up.railway.app';
const FEE_RATE = 0.0635;

let cart = JSON.parse(localStorage.getItem('mb_cart') || '[]');
let discordId       = localStorage.getItem('mb_discord_id')       || null;
let discordUsername = localStorage.getItem('mb_discord_username') || null;
let appliedPromo    = null; // { code, discount, type: 'percent'|'fixed' }

const FB_PROJECT = 'marketblox-ed6a3';

function init() {
  if (cart.length === 0) {
    window.location.href = '/';
    return;
  }
  renderItems();
  updatePricing();
  if (discordId) showDiscordLinked();
}

// ── Render cart items ─────────────────────────────────────────────────────────

function fmt(usd) {
  return window.MB_CURRENCY ? window.MB_CURRENCY.formatPrice(usd) : `$${usd.toFixed(2)}`;
}

function renderItems() {
  const list  = document.getElementById('cartItemsList');
  const badge = document.getElementById('itemsCount');

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  badge.textContent = totalQty;

  list.innerHTML = cart.map(item => `
    <div class="co-item-row">
      <div class="co-item-img">
        ${item.img
          ? `<img src="${item.img}" alt="${item.name}" onerror="this.parentElement.innerHTML='<span style=font-size:1.6rem>${item.emoji || '📦'}</span>'"/>`
          : `<span style="font-size:1.6rem">${item.emoji || '📦'}</span>`
        }
        ${item.qty > 1 ? `<div class="co-item-qty-badge">x${item.qty}</div>` : ''}
      </div>
      <div class="co-item-info">
        <div class="co-item-name">${item.name}</div>
        <div class="co-item-game">${item.game || 'MarketBlox'}</div>
      </div>
      <div class="co-item-price">${fmt(item.priceNum * item.qty)}</div>
    </div>
  `).join('');
}

// Called by currency.js whenever the user switches currency
function renderCart() {
  renderItems();
  updatePricing();
}

// ── Pricing ───────────────────────────────────────────────────────────────────

function updatePricing() {
  const subtotal = cart.reduce((s, i) => s + i.priceNum * i.qty, 0);

  let discountAmt = 0;
  if (appliedPromo) {
    discountAmt = appliedPromo.type === 'percent'
      ? subtotal * (appliedPromo.discount / 100)
      : Math.min(appliedPromo.discount, subtotal);
  }

  const discounted = subtotal - discountAmt;
  const fee        = discounted * FEE_RATE;
  const total      = discounted + fee;

  document.getElementById('subtotalVal').textContent = fmt(subtotal);
  document.getElementById('feeVal').textContent      = fmt(fee);
  document.getElementById('totalVal').textContent    = fmt(total);

  const discRow = document.getElementById('discountRow');
  if (discRow) {
    discRow.style.display = discountAmt > 0 ? 'flex' : 'none';
    document.getElementById('discountVal').textContent    = `-${fmt(discountAmt)}`;
    document.getElementById('discountLabel').textContent  = `Discount (${appliedPromo?.code})`;
  }
}

// ── Promo code ────────────────────────────────────────────────────────────────

async function applyPromo() {
  const raw  = document.getElementById('promoInput').value.trim();
  const code = raw.toUpperCase();
  if (!code) return;

  const btn = document.querySelector('.co-promo-btn');
  btn.textContent = '...';
  btn.disabled = true;

  // Clear old promo
  appliedPromo = null;
  const existingBadge = document.getElementById('promoBadge');
  if (existingBadge) existingBadge.remove();

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${FB_PROJECT}/databases/(default)/documents/promoCodes/${code}`;
    const res = await fetch(url);

    if (!res.ok) { showFieldError('promoInput', 'Invalid or expired code'); return; }

    const data   = await res.json();
    const fields = data.fields || {};
    const active   = fields.active?.booleanValue;
    const discount = parseFloat(fields.discount?.doubleValue ?? fields.discount?.integerValue ?? 0);
    const type     = fields.type?.stringValue || 'percent';
    const maxUses  = parseInt(fields.maxUses?.integerValue  ?? 0);
    const usedCount= parseInt(fields.usedCount?.integerValue ?? 0);

    if (!active)                              { showFieldError('promoInput', 'This code is no longer active'); return; }
    if (maxUses > 0 && usedCount >= maxUses)  { showFieldError('promoInput', 'This code has reached its limit'); return; }

    appliedPromo = { code, discount, type };
    updatePricing();

    // Show green success badge
    const promoWrap = document.querySelector('.co-promo');
    const badge = document.createElement('div');
    badge.id = 'promoBadge';
    badge.style.cssText = 'color:#00c853;font-size:.82rem;font-weight:700;margin-top:.5rem;display:flex;align-items:center;gap:.35rem';
    const discStr = type === 'percent' ? `${discount}% off` : fmt(discount) + ' off';
    badge.innerHTML = `<svg width="14" height="14" viewBox="0 0 20 20" fill="#00c853"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg> Code applied — ${discStr}`;
    promoWrap.appendChild(badge);

    // Increment usedCount atomically
    await fetch(`https://firestore.googleapis.com/v1/projects/${FB_PROJECT}/databases/(default)/documents:commit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ writes: [{ transform: {
        document: `projects/${FB_PROJECT}/databases/(default)/documents/promoCodes/${code}`,
        fieldTransforms: [{ fieldPath: 'usedCount', increment: { integerValue: '1' } }]
      }}]})
    });

  } catch(e) {
    showFieldError('promoInput', 'Could not validate code. Try again.');
  } finally {
    btn.textContent = 'Apply';
    btn.disabled = false;
  }
}

// ── Discord OAuth popup ───────────────────────────────────────────────────────

function showDiscordLinked() {
  document.getElementById('discordBtn').style.display = 'none';
  document.getElementById('discordUserDisplay').textContent = discordUsername;
  document.getElementById('discordLinked').style.display = 'flex';
}

function linkDiscord() {
  const w = 500, h = 700;
  const left = Math.round((screen.width  - w) / 2);
  const top  = Math.round((screen.height - h) / 2);

  window.open(
    `${BACKEND_URL}/api/discord/auth`,
    'Discord Auth',
    `width=${w},height=${h},left=${left},top=${top},toolbar=no,menubar=no`
  );

  window.addEventListener('message', function onMsg(e) {
    if (!e.data || !e.data.discordId) return;
    discordId       = e.data.discordId;
    discordUsername = e.data.discordUsername;

    localStorage.setItem('mb_discord_id',       discordId);
    localStorage.setItem('mb_discord_username', discordUsername);

    showDiscordLinked();
    window.removeEventListener('message', onMsg);
  });
}

// ── Payment ───────────────────────────────────────────────────────────────────

async function proceedToPayment() {
  clearErrors();

  const roblox = document.getElementById('robloxInput').value.trim();
  const email  = document.getElementById('emailInput').value.trim();

  let valid = true;
  if (!roblox) { showFieldError('robloxInput', 'Roblox username is required'); valid = false; }
  if (!email || !email.includes('@')) { showFieldError('emailInput', 'A valid email is required'); valid = false; }
  if (!valid) return;

  const btn = document.getElementById('payBtn');
  btn.textContent = '⏳ Processing…';
  btn.disabled = true;

  try {
    const res = await fetch(`${BACKEND_URL}/api/create-checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items:           cart,
        robloxUsername:  roblox,
        email,
        discordId:       discordId       || null,
        discordUsername: discordUsername || null,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server error ${res.status}`);
    }

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No checkout URL returned');
    }
  } catch (err) {
    console.error('Checkout error:', err);
    btn.textContent = 'Complete Payment';
    btn.disabled = false;
    showGlobalError(err.message);
  }
}

// ── Error helpers ─────────────────────────────────────────────────────────────

function showFieldError(inputId, msg) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.classList.add('error');
  const existing = input.parentElement.querySelector('.co-error-msg');
  if (existing) existing.remove();
  const el = document.createElement('span');
  el.className = 'co-error-msg';
  el.textContent = msg;
  input.insertAdjacentElement('afterend', el);
}

function clearErrors() {
  document.querySelectorAll('.co-error-msg').forEach(e => e.remove());
  document.querySelectorAll('.co-input.error').forEach(e => e.classList.remove('error'));
  const ge = document.getElementById('globalError');
  if (ge) ge.remove();
}

function showGlobalError(msg) {
  const existing = document.getElementById('globalError');
  if (existing) existing.remove();
  const div = document.createElement('div');
  div.id = 'globalError';
  div.style.cssText = 'background:#fef2f2;border:1.5px solid #ef4444;border-radius:10px;padding:.75rem 1rem;color:#b91c1c;font-size:.9rem;font-weight:600;margin-bottom:1rem;text-align:center;';
  div.textContent = `${msg}`;
  const payBtn = document.getElementById('payBtn');
  payBtn.parentElement.insertBefore(div, payBtn);
}

// ── Navbar scroll shadow ──────────────────────────────────────────────────────

window.addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 10);
});

document.addEventListener('DOMContentLoaded', init);
