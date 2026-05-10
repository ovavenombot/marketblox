// ================================
//   MARKETBLOX — CART DRAWER JS
// ================================

let cart = JSON.parse(localStorage.getItem('mb_cart') || '[]');

const CATALOGUE = [
  { id: 'los-mobilis', name: 'Los Mobilis', price: '$3.67', priceNum: 3.67, original: '$4.99', emoji: '🧠', img: 'https://shoplox.fun/cdn/shop/files/893D78FA-11F1-49FF-8F55-01B98FF3F91A_L0_001_1772893035_transformed.png?v=1772894197&width=600', game: 'Steal A Brainrot' },
  { id: '67', name: '67', price: '$3.99', priceNum: 3.99, original: '$5.99', emoji: '🧠', img: 'https://shoplox.fun/cdn/shop/files/3259EDFA-F6E7-46C2-B754-14EC5A50E3F7_L0_001_1772892952_transformed_89db3a18-dcae-4929-95a1-4e255c02e871.png?v=1772894142&width=600', game: 'Steal A Brainrot' },
  { id: 'celestial-pegasus', name: 'Celestial Pegasus', price: '$29.99', priceNum: 29.99, original: '', emoji: '🦄', img: 'https://shoplox.fun/cdn/shop/files/B8436553-A201-4696-829E-275846CC601B_L0_001_1772893045_transformed_6d823985-692a-4d66-bf5c-d896fdf39dc7.png?v=1772899995&width=600', game: 'Steal A Brainrot' },
  { id: 'tic-tac-sahur', name: 'Tic Tac Sahur', price: '$14.99', priceNum: 14.99, original: '', emoji: '⏰', img: 'https://shoplox.fun/cdn/shop/files/1BA47741-08E2-499B-8F0C-939AC4D72980_L0_001_1772893039_transformed.png?v=1772894455&width=600', game: 'Steal A Brainrot' },
  { id: 'esok-sekolah', name: 'Esok Sekolah', price: '$4.99', priceNum: 4.99, original: '', emoji: '📚', img: 'https://shoplox.fun/cdn/shop/files/A44A802D-A2E7-491A-866A-5F914DDFDD22_L0_001_1772893043_transformed.png?v=1772894488&width=600', game: 'Steal A Brainrot' },
  { id: 'hydra-dragon', name: 'Hydra Dragon Cannelloni', price: '$82.99', priceNum: 82.99, original: '', emoji: '🐉', img: 'https://shoplox.fun/cdn/shop/files/rn-image_picker_lib_temp_c68b6230-5e72-401e-b654-791cefec5fa2.png?v=1773698190&width=600', game: 'Steal A Brainrot' },
  { id: 'cursed-burguru', name: 'Cursed Burguru & Fryuru', price: '$149.99', priceNum: 149.99, original: '', emoji: '👹', img: 'https://shoplox.fun/cdn/shop/files/592D66A2-CA6D-40BF-A5F6-4DA5F5800D9D_L0_001_1773433104_transformed.png?v=1773435717&width=600', game: 'Steal A Brainrot' },
  { id: 'money-puggy', name: 'Money Money Puggy', price: '$5.99', priceNum: 5.99, original: '', emoji: '💰', img: '', game: 'Steal A Brainrot' },
  { id: 'sigma-cat', name: 'Sigma Cat', price: '$12.99', priceNum: 12.99, original: '', emoji: '⚡', img: '', game: 'Steal A Brainrot' },
  // Rivals
  { id: 'rivals-legendary-key',    name: 'Legendary Key Bundle [x1.1k]', price: '$33.67', priceNum: 33.67, original: '',      emoji: '🗝️', img: 'https://shoplox.fun/cdn/shop/files/lengendary_key_bundle.png?v=1774785605&width=600',                                           game: 'Rivals' },
  { id: 'rivals-ultra-key',        name: 'Ultra Key Bundle [x450]',       price: '$15.67', priceNum: 15.67, original: '',      emoji: '🗝️', img: 'https://shoplox.fun/cdn/shop/files/ultra_key_bundle.png?v=1774785602&width=600',                                              game: 'Rivals' },
  { id: 'rivals-heavy-duty',       name: 'Heavy Duty Bundle',             price: '$13.99', priceNum: 13.99, original: '',      emoji: '⚔️', img: 'https://shoplox.fun/cdn/shop/files/heavy_duty_dunble_rival.png?v=1774785611&width=600',                                       game: 'Rivals' },
  { id: 'rivals-classic-bundle',   name: 'Classic Bundle',                price: '$8.49',  priceNum: 8.49,  original: '',      emoji: '⚔️', img: 'https://shoplox.fun/cdn/shop/files/class_bundle_rival.png?v=1774785615&width=600',                                           game: 'Rivals' },
  { id: 'rivals-season-pass-level',name: '+10 Season Pass Level',         price: '$7.49',  priceNum: 7.49,  original: '',      emoji: '🎫', img: 'https://shoplox.fun/cdn/shop/files/10_seasib_pass_rival.png?v=1774785600&width=600',                                          game: 'Rivals' },
  { id: 'rivals-pixel-bundle',     name: 'Pixel Bundle',                  price: '$6.99',  priceNum: 6.99,  original: '',      emoji: '⚔️', img: 'https://shoplox.fun/cdn/shop/files/pixel_bundle_rival_e781146f-5926-4a9e-af10-c3c6b6d07607.png?v=1774785614&width=600',     game: 'Rivals' },
  { id: 'rivals-skin-case-1',      name: 'Skin Case 1 [x3]',             price: '$5.89',  priceNum: 5.89,  original: '',      emoji: '🎁', img: 'https://shoplox.fun/cdn/shop/files/x3_skin_case.png?v=1774785609&width=600',                                                 game: 'Rivals' },
  { id: 'rivals-skin-case-2',      name: 'Skin Case 2 [x3]',             price: '$5.69',  priceNum: 5.69,  original: '',      emoji: '🎁', img: 'https://shoplox.fun/cdn/shop/files/x3_skin_case_2.png?v=1774785611&width=600',                                               game: 'Rivals' },
  { id: 'rivals-skin-case-3',      name: 'Skin Case 3 [x3]',             price: '$5.69',  priceNum: 5.69,  original: '',      emoji: '🎁', img: 'https://shoplox.fun/cdn/shop/files/skin_case_3x_3.png?v=1774785608&width=600',                                               game: 'Rivals' },
  { id: 'rivals-exogun-bundle',    name: 'ExoGun Bundle',                 price: '$4.99',  priceNum: 4.99,  original: '',      emoji: '🔫', img: 'https://shoplox.fun/cdn/shop/files/exogun_bundle.png?v=1774785614&width=600',                                                game: 'Rivals' },
  { id: 'rivals-prime-season-pass',name: 'Prime Season Pass',             price: '$4.99',  priceNum: 4.99,  original: '$6.99', emoji: '🎫', img: 'https://shoplox.fun/cdn/shop/files/prime_pass_rival.png?v=1774785599&width=600',                                             game: 'Rivals' },
  { id: 'rivals-medkit-bundle',    name: 'Medkit Bundle',                 price: '$1.99',  priceNum: 1.99,  original: '',      emoji: '💊', img: 'https://shoplox.fun/cdn/shop/files/medkit_bundle.png?v=1774785614&width=600',                                                game: 'Rivals' },
  { id: 'rivals-rpg-bundle',       name: 'RPG Bundle',                    price: '$0.99',  priceNum: 0.99,  original: '',      emoji: '🚀', img: 'https://shoplox.fun/cdn/shop/files/rpg_bundle.png?v=1774785613&width=600',                                                   game: 'Rivals' },
  // Blox Fruits
  { id: 'bf-permanent-dragon',   name: 'Permanent Dragon',   price: '$30.99', priceNum: 30.99, original: '', emoji: '🐉', img: 'https://shoplox.fun/cdn/shop/files/Dragon_1.webp?v=1774785573&width=600',                                                                                                  game: 'Blox Fruits' },
  { id: 'bf-permanent-control',  name: 'Permanent Control',  price: '$25.00', priceNum: 25.00, original: '', emoji: '🍎', img: 'https://shoplox.fun/cdn/shop/files/Control.webp?v=1774785571&width=600',                                                                                                   game: 'Blox Fruits' },
  { id: 'bf-permanent-kitsune',  name: 'Permanent Kitsune',  price: '$24.00', priceNum: 24.00, original: '', emoji: '🍎', img: 'https://shoplox.fun/cdn/shop/files/Kitsune.webp?v=1774785568&width=600',                                                                                                   game: 'Blox Fruits' },
  { id: 'bf-permanent-yeti',     name: 'Permanent Yeti',     price: '$18.00', priceNum: 18.00, original: '', emoji: '🍎', img: 'https://shoplox.fun/cdn/shop/files/Yeti.webp?v=1774785567&width=600',                                                                                                      game: 'Blox Fruits' },
  { id: 'bf-permanent-tiger',    name: 'Permanent Tiger',    price: '$17.00', priceNum: 17.00, original: '', emoji: '🐯', img: 'https://shoplox.fun/cdn/shop/files/Tiger.webp?v=1774785564&width=600',                                                                                                     game: 'Blox Fruits' },
  { id: 'bf-permanent-dough',    name: 'Permanent Dough',    price: '$15.00', priceNum: 15.00, original: '', emoji: '🍎', img: 'https://shoplox.fun/cdn/shop/files/Dough.webp?v=1774785566&width=600',                                                                                                     game: 'Blox Fruits' },
  { id: 'bf-permanent-mammoth',  name: 'Permanent Mammoth',  price: '$13.75', priceNum: 13.75, original: '', emoji: '🦣', img: 'https://shoplox.fun/cdn/shop/files/Mammoth_0c289336-ee44-4c57-be82-91bcca203002.webp?v=1774785575&width=600',                                                              game: 'Blox Fruits' },
  { id: 'bf-permanent-spirit',   name: 'Permanent Spirit',   price: '$13.75', priceNum: 13.75, original: '', emoji: '🍎', img: 'https://shoplox.fun/cdn/shop/files/Spirit.webp?v=1774785563&width=600',                                                                                                    game: 'Blox Fruits' },
  { id: 'bf-permanent-gas',      name: 'Permanent Gas',      price: '$13.50', priceNum: 13.50, original: '', emoji: '🍎', img: 'https://shoplox.fun/cdn/shop/files/Gemini_Generated_Image_35mub835mub835mu.png?v=1774785559&width=600',                                                                    game: 'Blox Fruits' },
  { id: 'bf-permanent-venom',    name: 'Permanent Venom',    price: '$13.25', priceNum: 13.25, original: '', emoji: '🍎', img: 'https://shoplox.fun/cdn/shop/files/Gemini_Generated_Image_6dr87w6dr87w6dr8_f0796a33-fbf3-4d3b-97de-862ae1561bd6.png?v=1774785558&width=600',                              game: 'Blox Fruits' },
  { id: 'bf-permanent-t-rex',    name: 'Permanent T-Rex',    price: '$12.75', priceNum: 12.75, original: '', emoji: '🦕', img: 'https://shoplox.fun/cdn/shop/files/Gemini_Generated_Image_az6esgaz6esgaz6e.png?v=1774785564&width=600',                                                                    game: 'Blox Fruits' },
  { id: 'bf-permanent-portal',   name: 'Permanent Portal',   price: '$11.00', priceNum: 11.00, original: '', emoji: '🌀', img: 'https://shoplox.fun/cdn/shop/files/Portal.webp?v=1774785561&width=600',                                                                                                    game: 'Blox Fruits' },
  { id: 'bf-permanent-creation', name: 'Permanent Creation', price: '$9.75',  priceNum: 9.75,  original: '', emoji: '✨', img: 'https://shoplox.fun/cdn/shop/files/Gemini_Generated_Image_a6tyifa6tyifa6ty.png?v=1774785561&width=600',                                                                    game: 'Blox Fruits' },
  { id: 'bf-permanent-buddha',   name: 'Permanent Buddha',   price: '$8.50',  priceNum: 8.50,  original: '', emoji: '🧘', img: 'https://shoplox.fun/cdn/shop/files/Gemini_Generated_Image_z7l0j4z7l0j4z7l0.png?v=1774785557&width=600',                                                                   game: 'Blox Fruits' },
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
          <div class="drawer-item-game">${item.game || 'Steal A Brainrot'}</div>
          <div class="drawer-item-price-row">
            <span class="drawer-item-price" data-usd="${item.priceNum}">${typeof MB_CURRENCY !== 'undefined' ? MB_CURRENCY.formatPrice(item.priceNum) : item.price}</span>
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
  const priceStr = typeof MB_CURRENCY !== 'undefined' ? MB_CURRENCY.formatPrice(totalPrice) : `$${totalPrice.toFixed(2)}`;
  if (subtotalEl) subtotalEl.textContent = priceStr;
  if (totalEl)    totalEl.textContent    = priceStr;
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
// CHECKOUT — REDIRECT TO CHECKOUT PAGE
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
  window.location.href = 'checkout';
}

function showToast(msg) {
  const toast = document.getElementById('cartToast');
  if (!toast) return;
  toast.innerHTML = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function getGameKey(item) {
  if (!item.game) return 'sab';
  if (item.game.includes('Blox Fruits')) return 'bf';
  if (item.game.includes('Grand Piece')) return 'gpo';
  if (item.game.includes('Rivals') || item.game === 'Rivals') return 'rivals';
  return 'sab';
}

function renderSuggestions(currentId) {
  const row = document.getElementById('suggestionsRow');
  if (!row) return;

  const gameViews = JSON.parse(localStorage.getItem('mb_game_views') || '{}');
  const gameRank = Object.entries(gameViews).sort((a, b) => b[1] - a[1]).map(e => e[0]);

  const available = CATALOGUE.filter(p => p.id !== currentId);

  const sorted = gameRank.length === 0 ? available : [...available].sort((a, b) => {
    const aRank = gameRank.indexOf(getGameKey(a));
    const bRank = gameRank.indexOf(getGameKey(b));
    return (aRank === -1 ? 999 : aRank) - (bRank === -1 ? 999 : bRank);
  });

  const suggestions = sorted.slice(0, 6);

  row.innerHTML = suggestions.map(p => `
    <div class="suggestion-card" onclick="addToCart('${p.id}')">
      <div class="suggestion-img">
        ${p.img ? `<img src="${p.img}" alt="${p.name}" onerror="this.parentElement.innerHTML='${p.emoji}'"/>` : p.emoji}
      </div>
      <div class="suggestion-info">
        <div class="suggestion-name">${p.name}</div>
        <div class="suggestion-price" data-usd="${p.priceNum}">${typeof MB_CURRENCY !== 'undefined' ? MB_CURRENCY.formatPrice(p.priceNum) : p.price}</div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  renderSuggestions('');
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
});
