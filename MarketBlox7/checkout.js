// ================================
//   MARKETBLOX — CHECKOUT PAGE JS
// ================================

// Change this to your deployed backend URL in production
const BACKEND_URL = 'https://marketblox-production.up.railway.app';
const FEE_RATE = 0.0635;

let cart = JSON.parse(localStorage.getItem('mb_cart') || '[]');
let discordId       = localStorage.getItem('mb_discord_id')       || null;
let discordUsername = localStorage.getItem('mb_discord_username') || null;

function init() {
  if (cart.length === 0) {
    window.location.href = 'index.html';
    return;
  }
  renderItems();
  updatePricing();
  if (discordId) showDiscordLinked();
}

// ── Render cart items ─────────────────────────────────────────────────────────

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
      <div class="co-item-price">$${(item.priceNum * item.qty).toFixed(2)}</div>
    </div>
  `).join('');
}

// ── Pricing ───────────────────────────────────────────────────────────────────

function updatePricing() {
  const subtotal = cart.reduce((s, i) => s + i.priceNum * i.qty, 0);
  const fee      = subtotal * FEE_RATE;
  const total    = subtotal + fee;

  document.getElementById('subtotalVal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('feeVal').textContent      = `$${fee.toFixed(2)}`;
  document.getElementById('totalVal').textContent    = `$${total.toFixed(2)}`;
}

// ── Promo code ────────────────────────────────────────────────────────────────

function applyPromo() {
  const code = document.getElementById('promoInput').value.trim();
  if (!code) return;
  showFieldError('promoInput', 'Invalid or expired code');
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
