// ================================
//   MARKETBLOX — PRODUCT PAGE JS
// ================================

// PRODUCT DATABASE — Add your Stripe/NOWPayments links here
const PRODUCTS = {
  'los-mobilis': {
    name: 'Los Mobilis',
    game: '🧠 Steal A Brainrot',
    price: '$3.67',
    priceNum: 3.67,
    original: '$4.99',
    discount: '26% OFF',
    badge: '🔥 POPULAR',
    img: 'https://shoplox.fun/cdn/shop/files/893D78FA-11F1-49FF-8F55-01B98FF3F91A_L0_001_1772893035_transformed.png?v=1772894197&width=600',
    stripeLink: 'YOUR_STRIPE_LINK_HERE',   // 👈 paste your Stripe link
    cryptoLink: 'YOUR_CRYPTO_LINK_HERE',   // 👈 paste your NOWPayments link
  },
  '67': {
    name: '67',
    game: '🧠 Steal A Brainrot',
    price: '$3.99',
    priceNum: 3.99,
    original: '$5.99',
    discount: '33% OFF',
    badge: '⭐ BEST SELLER',
    img: 'https://shoplox.fun/cdn/shop/files/3259EDFA-F6E7-46C2-B754-14EC5A50E3F7_L0_001_1772892952_transformed_89db3a18-dcae-4929-95a1-4e255c02e871.png?v=1772894142&width=600',
    stripeLink: 'YOUR_STRIPE_LINK_HERE',
    cryptoLink: 'YOUR_CRYPTO_LINK_HERE',
  },
  'celestial-pegasus': {
    name: 'Celestial Pegasus',
    game: '🧠 Steal A Brainrot',
    price: '$29.99',
    priceNum: 29.99,
    original: '',
    discount: '',
    badge: '🦄 RARE',
    img: 'https://shoplox.fun/cdn/shop/files/B8436553-A201-4696-829E-275846CC601B_L0_001_1772893045_transformed_6d823985-692a-4d66-bf5c-d896fdf39dc7.png?v=1772899995&width=600',
    stripeLink: 'YOUR_STRIPE_LINK_HERE',
    cryptoLink: 'YOUR_CRYPTO_LINK_HERE',
  },
  'tic-tac-sahur': {
    name: 'Tic Tac Sahur',
    game: '🧠 Steal A Brainrot',
    price: '$14.99',
    priceNum: 14.99,
    original: '',
    discount: '',
    badge: '🔥 POPULAR',
    img: 'https://shoplox.fun/cdn/shop/files/1BA47741-08E2-499B-8F0C-939AC4D72980_L0_001_1772893039_transformed.png?v=1772894455&width=600',
    stripeLink: 'YOUR_STRIPE_LINK_HERE',
    cryptoLink: 'YOUR_CRYPTO_LINK_HERE',
  },
  'esok-sekolah': {
    name: 'Esok Sekolah',
    game: '🧠 Steal A Brainrot',
    price: '$4.99',
    priceNum: 4.99,
    original: '',
    discount: '',
    badge: '🔥 POPULAR',
    img: 'https://shoplox.fun/cdn/shop/files/A44A802D-A2E7-491A-866A-5F914DDFDD22_L0_001_1772893043_transformed.png?v=1772894488&width=600',
    stripeLink: 'YOUR_STRIPE_LINK_HERE',
    cryptoLink: 'YOUR_CRYPTO_LINK_HERE',
  },
  'hydra-dragon': {
    name: 'Hydra Dragon Cannelloni',
    game: '🧠 Steal A Brainrot',
    price: '$82.99',
    priceNum: 82.99,
    original: '',
    discount: '',
    badge: '🐉 LEGENDARY',
    img: 'https://shoplox.fun/cdn/shop/files/rn-image_picker_lib_temp_c68b6230-5e72-401e-b654-791cefec5fa2.png?v=1773698190&width=600',
    stripeLink: 'YOUR_STRIPE_LINK_HERE',
    cryptoLink: 'YOUR_CRYPTO_LINK_HERE',
  },
  'cursed-burguru': {
    name: 'Cursed Burguru & Fryuru',
    game: '🧠 Steal A Brainrot',
    price: '$149.99',
    priceNum: 149.99,
    original: '',
    discount: '',
    badge: '👹 ULTRA RARE',
    img: 'https://shoplox.fun/cdn/shop/files/592D66A2-CA6D-40BF-A5F6-4DA5F5800D9D_L0_001_1773433104_transformed.png?v=1773435717&width=600',
    stripeLink: 'YOUR_STRIPE_LINK_HERE',
    cryptoLink: 'YOUR_CRYPTO_LINK_HERE',
  },
  'money-puggy': {
    name: 'Money Money Puggy',
    game: '🧠 Steal A Brainrot',
    price: '$5.99',
    priceNum: 5.99,
    original: '',
    discount: '',
    badge: '💰 NEW',
    img: '',
    stripeLink: 'YOUR_STRIPE_LINK_HERE',
    cryptoLink: 'YOUR_CRYPTO_LINK_HERE',
  },
  'sigma-cat': {
    name: 'Sigma Cat',
    game: '🧠 Steal A Brainrot',
    price: '$12.99',
    priceNum: 12.99,
    original: '',
    discount: '',
    badge: '⚡ HOT',
    img: '',
    stripeLink: 'YOUR_STRIPE_LINK_HERE',
    cryptoLink: 'YOUR_CRYPTO_LINK_HERE',
  },
};

// ================================
// LOAD PRODUCT FROM URL
// ================================
const params = new URLSearchParams(window.location.search);
const productId = params.get('id') || 'los-mobilis';
const product = PRODUCTS[productId] || PRODUCTS['los-mobilis'];

// Populate page
document.getElementById('page-title').textContent = `${product.name} — MarketBlox`;
document.getElementById('bc-name').textContent = product.name;
document.getElementById('prod-name').textContent = product.name;
document.getElementById('prod-game').textContent = product.game;
document.getElementById('prod-price').textContent = product.price;
document.getElementById('prod-badge').textContent = product.badge;
document.getElementById('order-name').textContent = product.name;
document.getElementById('order-price').textContent = product.price;
document.getElementById('order-total-price').textContent = product.price;

// Original price & discount
if (product.original) {
  document.getElementById('prod-original').textContent = product.original;
  document.getElementById('prod-discount').textContent = product.discount;
} else {
  document.getElementById('prod-original').style.display = 'none';
  document.getElementById('prod-discount').style.display = 'none';
}

// Image
const mainImg = document.getElementById('main-img');
if (product.img) {
  mainImg.src = product.img;
  mainImg.alt = product.name;
  // Order image
  const orderImg = document.getElementById('order-img');
  orderImg.innerHTML = `<img src="${product.img}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;"/>`;
} else {
  mainImg.style.display = 'none';
  mainImg.parentElement.innerHTML += `<div class="img-fallback">🧠</div>`;
}

// ================================
// CHECKOUT MODAL
// ================================
let selectedPayment = 'card';
let selectedCrypto = 'BTC';

function openCheckout(type) {
  selectedPayment = type;
  switchPayment(type);
  document.getElementById('checkoutModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
  document.body.style.overflow = '';
}

function switchPayment(type) {
  selectedPayment = type;
  document.getElementById('panel-card').classList.toggle('hidden', type !== 'card');
  document.getElementById('panel-crypto').classList.toggle('hidden', type !== 'crypto');
  document.getElementById('tab-card').classList.toggle('active', type === 'card');
  document.getElementById('tab-crypto').classList.toggle('active', type === 'crypto');
}

function selectCrypto(el, coin) {
  document.querySelectorAll('.crypto-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  selectedCrypto = coin;
}

function proceedPayment(type) {
  // Validate fields
  if (type === 'card') {
    const name = document.getElementById('input-name').value.trim();
    const email = document.getElementById('input-email').value.trim();
    const roblox = document.getElementById('input-roblox').value.trim();
    if (!name || !email || !roblox) {
      shakeForm();
      return;
    }
    // Redirect to Stripe
    if (product.stripeLink && product.stripeLink !== 'YOUR_STRIPE_LINK_HERE') {
      window.open(`${product.stripeLink}?prefilled_email=${encodeURIComponent(email)}`, '_blank');
    } else {
      // Demo mode — show success
      closeCheckout();
      showSuccess();
    }
  } else {
    const email = document.getElementById('input-email-crypto').value.trim();
    const roblox = document.getElementById('input-roblox-crypto').value.trim();
    if (!email || !roblox) {
      shakeForm();
      return;
    }
    // Redirect to crypto payment
    if (product.cryptoLink && product.cryptoLink !== 'YOUR_CRYPTO_LINK_HERE') {
      window.open(product.cryptoLink, '_blank');
    } else {
      // Demo mode
      closeCheckout();
      showSuccess();
    }
  }
}

function shakeForm() {
  const modal = document.querySelector('.checkout-modal');
  modal.style.animation = 'shake 0.4s ease';
  setTimeout(() => modal.style.animation = '', 400);

  const style = document.createElement('style');
  style.textContent = `@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }`;
  document.head.appendChild(style);
}

// ================================
// SUCCESS MODAL
// ================================
function showSuccess() {
  document.getElementById('successModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSuccess() {
  document.getElementById('successModal').classList.remove('open');
  document.body.style.overflow = '';
  window.location.href = 'index.html';
}

// Close modals on overlay click
document.getElementById('checkoutModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeCheckout();
});
document.getElementById('successModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeSuccess();
});

// Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeCheckout(); closeSuccess(); }
});

// Navbar scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// ================================
// CART & NEW CHECKOUT LOGIC
// ================================
let currentPayMethod = 'card';
let currentCrypto = 'BTC';

function addToCart() {
  const btn = document.getElementById('addCartBtn');
  btn.style.background = 'var(--green)';
  btn.style.color = 'white';
  btn.style.borderColor = 'var(--green)';
  btn.innerHTML = '✅ Added!';
  const toast = document.getElementById('cartToast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    btn.style.background = '';
    btn.style.color = '';
    btn.style.borderColor = '';
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.66a2 2 0 001.99-1.61L23 6H6"/></svg> Add to Cart';
  }, 2500);
}

function openCheckout(type) {
  if (type) selectPayMethod(type);
  document.getElementById('checkoutModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
  document.body.style.overflow = '';
}

function selectPayMethod(method) {
  currentPayMethod = method;
  document.querySelectorAll('.pay-method').forEach(m => m.classList.remove('active'));
  document.getElementById(`pm-${method}`).classList.add('active');
  const picker = document.getElementById('crypto-picker');
  if (picker) picker.classList.toggle('hidden', method !== 'crypto');
  const btnText = document.getElementById('checkout-btn-text');
  if (btnText) {
    if (method === 'card') btnText.textContent = '⚡ Pay with Card';
    else if (method === 'paypal') btnText.textContent = '🅿️ Pay with PayPal';
    else btnText.textContent = `₿ Pay with ${currentCrypto}`;
  }
}

function selectCrypto(el, coin) {
  document.querySelectorAll('.crypto-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  currentCrypto = coin;
  const btnText = document.getElementById('checkout-btn-text');
  if (btnText) btnText.textContent = `₿ Pay with ${coin}`;
}

function proceedPayment() {
  const email = document.getElementById('input-email').value.trim();
  const roblox = document.getElementById('input-roblox').value.trim();
  if (!email || !roblox) {
    shakeForm();
    // Highlight empty fields
    [document.getElementById('input-email'), document.getElementById('input-roblox')].forEach(inp => {
      if (!inp.value.trim()) {
        inp.style.borderColor = '#ff5252';
        inp.style.boxShadow = '0 0 0 3px rgba(255,82,82,0.1)';
        setTimeout(() => { inp.style.borderColor = ''; inp.style.boxShadow = ''; }, 2000);
      }
    });
    return;
  }
  if (currentPayMethod === 'card' || currentPayMethod === 'paypal') {
    if (product.stripeLink && product.stripeLink !== 'YOUR_STRIPE_LINK_HERE') {
      window.open(`${product.stripeLink}?prefilled_email=${encodeURIComponent(email)}`, '_blank');
    } else {
      closeCheckout();
      showSuccess();
    }
  } else {
    if (product.cryptoLink && product.cryptoLink !== 'YOUR_CRYPTO_LINK_HERE') {
      window.open(product.cryptoLink, '_blank');
    } else {
      closeCheckout();
      showSuccess();
    }
  }
}

// Add to cart from product page
function addToCartFromPage() {
  if (typeof addToCart === 'function') {
    addToCart(productId, true);
  }
}
