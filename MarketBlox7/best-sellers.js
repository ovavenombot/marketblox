// ================================
//   MARKETBLOX — BEST SELLERS
// ================================
import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, collection, getDocs, doc, setDoc, increment } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
const db  = getFirestore(app);

const GAME_META = {
  'Steal A Brainrot': { label: '🧠 Steal A Brainrot', cls: 'tag-sab',     color: '#00c853' },
  'Blox Fruits':      { label: '🍎 Blox Fruits',       cls: 'tag-bf',      color: '#ff7d35' },
  'Rivals':           { label: '⚔️ Rivals',            cls: 'tag-rivals',  color: '#7c3aed' },
};

// Default priority if no Firestore data yet
const DEFAULT_ORDER = [
  'celestial-pegasus', 'bf-permanent-dragon', 'rivals-legendary-key',
  'hydra-dragon', 'bf-permanent-control', 'rivals-heavy-duty',
  'bf-permanent-kitsune', 'rivals-ultra-key', 'bf-permanent-yeti',
  'tic-tac-sahur', 'rivals-classic-bundle', 'rivals-skin-case-1',
];

async function fetchCounts() {
  try {
    const snap = await getDocs(collection(db, 'product_stats'));
    const counts = {};
    snap.forEach(d => { counts[d.id] = d.data().purchaseCount || 0; });
    return counts;
  } catch { return {}; }
}

export async function trackPurchases(productIds) {
  for (const id of productIds) {
    try {
      await setDoc(doc(db, 'product_stats', id), { purchaseCount: increment(1) }, { merge: true });
    } catch { /* ignore */ }
  }
}

function renderCard(p, rank) {
  const gm      = GAME_META[p.game] || GAME_META['Steal A Brainrot'];
  const isBest  = rank <= 3;
  const priceStr = typeof MB_CURRENCY !== 'undefined'
    ? MB_CURRENCY.formatPrice(p.priceNum)
    : p.price;

  return `
    <div class="bs-card${isBest ? ' bs-card--top' : ''}" data-id="${p.id}"
         onclick="window.location='product?id=${p.id}'">
      <div class="bs-card-shine"></div>
      <div class="bs-card-top">
        ${isBest ? `<div class="bs-badge">⭐ BEST SELLER</div>` : '<div></div>'}
        <div class="bs-game-tag ${gm.cls}">${gm.label}</div>
      </div>
      <div class="bs-img-wrap">
        ${p.img
          ? `<img src="${p.img}" alt="${p.name}" onerror="this.parentElement.innerHTML='<div class=bs-emoji>${p.emoji}</div>'" loading="lazy"/>`
          : `<div class="bs-emoji">${p.emoji}</div>`}
        ${isBest ? `<div class="bs-rank-badge">#${rank}</div>` : ''}
      </div>
      <div class="bs-body">
        <div class="bs-name">${p.name}</div>
        <div class="bs-price" data-usd="${p.priceNum}">${priceStr}</div>
      </div>
      <div class="bs-btns">
        <a href="product?id=${p.id}" class="bs-btn-buy" onclick="event.stopPropagation()">⚡ BUY NOW</a>
        <button class="bs-btn-cart" onclick="addToCart('${p.id}');event.stopPropagation()">Add to Cart</button>
      </div>
    </div>`;
}

function addTilt(card) {
  const inner = card;
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    inner.style.transition = 'none';
    inner.style.transform  = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(10px)`;
    const shine = card.querySelector('.bs-card-shine');
    if (shine) {
      shine.style.opacity = '1';
      shine.style.background = `radial-gradient(circle at ${(x+.5)*100}% ${(y+.5)*100}%, rgba(255,255,255,.18) 0%, transparent 65%)`;
    }
  });
  card.addEventListener('mouseleave', () => {
    inner.style.transition = 'transform .55s cubic-bezier(.22,1,.36,1)';
    inner.style.transform  = 'perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    const shine = card.querySelector('.bs-card-shine');
    if (shine) shine.style.opacity = '0';
  });
}

export async function renderBestSellers() {
  const grid = document.getElementById('bestSellersGrid');
  if (!grid || typeof CATALOGUE === 'undefined') return;

  const counts = await fetchCounts();

  // Sort: by Firestore count first, then default order
  const ranked = [...CATALOGUE]
    .filter(p => p.img)
    .sort((a, b) => {
      const ca = counts[a.id] ?? (DEFAULT_ORDER.indexOf(a.id) >= 0 ? 1000 - DEFAULT_ORDER.indexOf(a.id) * 10 : 0);
      const cb = counts[b.id] ?? (DEFAULT_ORDER.indexOf(b.id) >= 0 ? 1000 - DEFAULT_ORDER.indexOf(b.id) * 10 : 0);
      return cb - ca;
    })
    .slice(0, 8);

  grid.innerHTML = ranked.map((p, i) => renderCard(p, i + 1)).join('');

  // Apply 3D tilt to each card
  grid.querySelectorAll('.bs-card').forEach(addTilt);

  // Apply currency if already loaded
  if (typeof MB_CURRENCY !== 'undefined') {
    grid.querySelectorAll('[data-usd]').forEach(el => {
      const n = parseFloat(el.dataset.usd);
      if (!isNaN(n)) el.textContent = MB_CURRENCY.formatPrice(n);
    });
  }
}

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderBestSellers);
} else {
  renderBestSellers();
}
