// ================================
//   MARKETBLOX — CART DRAWER JS
// ================================

let cart = JSON.parse(localStorage.getItem('mb_cart') || '[]');

const CATALOGUE = [
  { id: 'los-mobilis', name: 'Los Mobilis', price: '$3.67', priceNum: 3.67, original: '$4.99', emoji: '🧠', img: 'https://shoplox.fun/cdn/shop/files/893D78FA-11F1-49FF-8F55-01B98FF3F91A_L0_001_1772893035_transformed.png?v=1772894197&width=600' },
  { id: '67', name: '67', price: '$3.99', priceNum: 3.99, original: '$5.99', emoji: '🧠', img: 'https://shoplox.fun/cdn/shop/files/3259EDFA-F6E7-46C2-B754-14EC5A50E3F7_L0_001_1772892952_transformed_89db3a18-dcae-4929-95a1-4e255c02e871.png?v=1772894142&width=600' },
  { id: 'celestial-pegasus', name: 'Celestial Pegasus', price: '$29.99', priceNum: 29.99, original: '', emoji: '🦄', img: 'https://shoplox.fun/cdn/shop/files/B8436553-A201-4696-829E-275846CC601B_L0_001_1772893045_transformed_6d823985-692a-4d66-bf5c-d896fdf39dc7.png?v=1772899995&width=600' },
  { id: 'tic-tac-sahur', name: 'Tic Tac Sahur', price: '$14.99', priceNum: 14.99, original: '', emoji: '⏰', img: 'https://shoplox.fun/cdn/shop/files/1BA47741-08E2-499B-8F0C-939AC4D72980_L0_001_1772893039_transformed.png?v=1772894455&width=600' },
  { id: 'esok-sekolah', name: 'Esok Sekolah', price: '$4.99', priceNum: 4.99, original: '', emoji: '📚', img: 'https://shoplox.fun/cdn/shop/files/A44A802D-A2E7-491A-866A-5F914DDFDD22_L0_001_1772893043_transformed.png?v=1772894488&width=600' },
  { id: 'hydra-dragon', name: 'Hydra Dragon Cannelloni', price: '$82.99', priceNum: 82.99, original: '', emoji: '🐉', img: 'https://shoplox.fun/cdn/shop/files/rn-image_picker_lib_temp_c68b6230-5e72-401e-b654-791cefec5fa2.png?v=1773698190&width=600' },
  { id: 'cursed-burguru', name: 'Cursed Burguru & Fryuru', price: '$149.99', priceNum: 149.99, original: '', emoji: '👹', img: 'https://shoplox.fun/cdn/shop/files/592D66A2-CA6D-40BF-A5F6-4DA5F5800D9D_L0_001_1773433104_transformed.png?v=1773435717&width=600' },
  { id: 'money-puggy', name: 'Money Money Puggy', price: '$5.99', priceNum: 5.99, original: '', emoji: '💰', img: '' },
  { id: 'sigma-cat', name: 'Sigma Cat', price: '$12.99', priceNum: 12.99, original: '', emoji: '⚡', img: '' },
];

function getProduct(id) { return CATALOGUE.find(p => p.id === id); }

function saveCart() { localStorage.setItem('mb_cart', JSON.stringify(cart)); }

function renderCart() {
  const items = document.getElementById('drawerItems');
  const empty = document.getElementById('drawerEmpty');
  const footer = document.getElementById('drawerFooter');
  const count = document.getElementById('cartCount');
  const suggestions = document.getElementById('drawerSuggestions');

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.priceNum * i.qty, 0);

  if (count) {
    count.textContent = totalItems;
    count.classList.toggle('visible', totalItems > 0);
  }
  const titleCount = document.getElementById('drawerCount');
  if (titleCount) titleCount.textContent = totalItems;

  if (cart.length === 0) {
    if (items) items.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    if (footer) footer.style.display = 'none';
    if (suggestions) suggestions.style.display = 'none';
    return;
  }

  if (empty) empty.style.display = 'none';
  if (footer) footer.style.display = 'block';
  if (suggestions) suggestions.style.display = 'block';

  if (items) {
    items.innerHTML = cart.map((item, idx) => `
      <div class="drawer-item">
        ${idx === cart.length - 1 ? '<div class="di-new-badge">NEW</div>' : ''}
        <div class="drawer-item-img">
          ${item.img ? `<img src="${item.img}" alt="${item.name}" onerror="this.parentElement.innerHTML='${item.emoji}'"/>` : item.emoji}
        </div>
        <div class="drawer-item-info">
          <div class="drawer-item-name">${item.name}</div>
          <div class="drawer-item-game">Steal A Brainrot</div>
          <div class="drawer-item-price-row">
            <span class="drawer-item-price">${item.price}</span>
            ${item.original ? `<span class="drawer-item-original">${item.original}</span>` : ''}
          </div>
        </div>
        <div class="drawer-item-qty">
          <button class="qty-btn" onclick="changeQty(${idx}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
        </div>
        <button class="drawer-item-remove" onclick="removeItem(${idx})">🗑</button>
      </div>
    `).join('');
  }

  const subtotalEl = document.getElementById('drawerSubtotal');
  const totalEl = document.getElementById('drawerTotal');
  if (subtotalEl) subtotalEl.textContent = `$${totalPrice.toFixed(2)} USD`;
  if (totalEl) totalEl.textContent = `$${totalPrice.toFixed(2)} USD`;
}

function addToCart(productId, showDrawer = true) {
  const product = getProduct(productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) { existing.qty++; } else { cart.push({ ...product, qty: 1 }); }
  saveCart();
  renderCart();
  if (showDrawer) openCart();
  showToast(`✅ ${product.name} added!`);
}

function removeItem(idx) { cart.splice(idx, 1); saveCart(); renderCart(); }

function changeQty(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart();
  renderCart();
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ================================
// STRIPE CHECKOUT — COMBINED CART
// ================================
async function drawerCheckout() {
  const termsChecked = document.getElementById('drawerTerms').checked;
  if (!termsChecked) {
    const label = document.getElementById('drawerTermsLabel');
    if (label) { label.style.color = '#ff5252'; setTimeout(() => label.style.color = '', 2000); }
    showToast('⚠️ Please agree to the terms first');
    return;
  }
  if (cart.length === 0) return;

  // Set button to loading
  const btn = document.querySelector('.drawer-checkout-btn');
  const originalText = btn.innerHTML;
  btn.innerHTML = '⏳ Processing...';
  btn.disabled = true;

  try {
    // Call Netlify function to create Stripe session
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart,
        customerEmail: '',
        robloxUsername: '',
      }),
    });

    const data = await response.json();

    if (data.url) {
      // Redirect to Stripe checkout
      window.location.href = data.url;
    } else {
      throw new Error(data.error || 'Checkout failed');
    }
  } catch (err) {
    console.error('Checkout error:', err);
    showToast('❌ Checkout error — please try again');
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

function showToast(msg) {
  const toast = document.getElementById('cartToast');
  if (!toast) return;
  toast.innerHTML = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function renderSuggestions(currentId) {
  const row = document.getElementById('suggestionsRow');
  if (!row) return;
  const suggestions = CATALOGUE.filter(p => p.id !== currentId).slice(0, 6);
  row.innerHTML = suggestions.map(p => `
    <div class="suggestion-card" onclick="addToCart('${p.id}')">
      <div class="suggestion-img">
        ${p.img ? `<img src="${p.img}" alt="${p.name}" onerror="this.parentElement.innerHTML='${p.emoji}'"/>` : p.emoji}
      </div>
      <div class="suggestion-info">
        <div class="suggestion-name">${p.name}</div>
        <div class="suggestion-price">${p.price}</div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  renderSuggestions('');
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
});
