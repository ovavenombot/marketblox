// ================================
//   MARKETBLOX — BEST SELLERS BY GAME
// ================================
import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, collection, getDocs, doc, setDoc, increment } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
const db  = getFirestore(app);

// ── Games config ──────────────────────────────────────────────────────────
const GAMES = [
  { id: 'sab',    name: 'Steal A Brainrot',  catalogueGame: 'Steal A Brainrot',  color: '#00c853', shopUrl: 'shop.html?game=sab',    thumb: 'https://tr.rbxcdn.com/180DAY-63cb108a7787e6f8d662cfee57d4ab51/768/432/Image/Webp/noFilter' },
  { id: 'rivals', name: 'Rivals',            catalogueGame: 'Rivals',            color: '#7c3aed', shopUrl: 'shop.html?game=rivals', thumb: 'https://tr.rbxcdn.com/180DAY-36fd690cbf4077d15d6689d8eb3d5875/768/432/Image/Webp/noFilter' },
  { id: 'bf',     name: 'Blox Fruits',       catalogueGame: 'Blox Fruits',       color: '#ff7d35', shopUrl: 'shop.html?game=bf',     thumb: 'https://tr.rbxcdn.com/180DAY-a6f22ab57d42fcb6dc72261932faf953/768/432/Image/Webp/noFilter' },
  { id: 'gpo',    name: 'Sailor Piece', catalogueGame: 'Sailor Piece', color: '#0ea5e9', shopUrl: 'shop.html?game=gpo',  thumb: 'https://tr.rbxcdn.com/180DAY-33fe4e3dfcce376ad216aa402643b993/768/432/Image/Webp/noFilter' },
];

let activeGame  = GAMES[0].id;
let allCounts   = {};

// ── Fetch purchase counts from Firestore ──────────────────────────────────
async function fetchCounts() {
  try {
    const snap = await getDocs(collection(db, 'product_stats'));
    const counts = {};
    snap.forEach(d => { counts[d.id] = d.data().purchaseCount || 0; });
    return counts;
  } catch { return {}; }
}

// ── Track purchases (called from success.html) ────────────────────────────
export async function trackPurchases(productIds) {
  for (const id of productIds) {
    try {
      await setDoc(doc(db, 'product_stats', id), { purchaseCount: increment(1) }, { merge: true });
    } catch { /* ignore */ }
  }
}

// ── Render game tabs ──────────────────────────────────────────────────────
function renderTabs() {
  const tabsEl = document.getElementById('bsGameTabs');
  if (!tabsEl) return;

  tabsEl.innerHTML = GAMES.map(g => `
    <button class="bs-tab${g.id === activeGame ? ' active' : ''}"
            data-game="${g.id}"
            style="--tab-color:${g.color}"
            onclick="window.__bsSwitchGame('${g.id}')">
      <img class="bs-tab-thumb" src="${g.thumb}" alt="${g.name}" loading="lazy"/>
      ${g.name}
    </button>
  `).join('');

  // Tab scroll arrows
  const wrap  = tabsEl.parentElement;
  const left  = document.getElementById('bsNavLeft');
  const right = document.getElementById('bsNavRight');
  if (left)  left.onclick  = () => { wrap.scrollBy({ left: -200, behavior: 'smooth' }); };
  if (right) right.onclick = () => { wrap.scrollBy({ left:  200, behavior: 'smooth' }); };
}

// ── Switch active game tab ────────────────────────────────────────────────
window.__bsSwitchGame = function(gameId) {
  activeGame = gameId;
  renderTabs();
  renderGrid();
  updateViewAll();
};

// ── Update "View all" link ────────────────────────────────────────────────
function updateViewAll() {
  const g   = GAMES.find(g => g.id === activeGame);
  const btn = document.getElementById('bsViewAll');
  if (btn && g) {
    btn.href        = g.shopUrl;
    btn.innerHTML   = `View all ${g.name} products <span>→</span>`;
  }
}

// ── Render the product grid for the active game ───────────────────────────
function renderGrid() {
  const grid = document.getElementById('bestSellersGrid');
  if (!grid || typeof CATALOGUE === 'undefined') return;

  const game     = GAMES.find(g => g.id === activeGame);
  const products = CATALOGUE.filter(p => p.game === game.catalogueGame && p.img);

  // Only show items that have at least 1 purchase
  const withCounts = products
    .map(p => ({ ...p, count: allCounts[p.id] || 0 }))
    .filter(p => p.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  if (withCounts.length === 0) {
    grid.innerHTML = `
      <div class="bs-empty">
        <div class="bs-empty-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="14" fill="rgba(0,200,83,0.08)"/>
            <path d="M24 14l2.9 8.9H36l-7.5 5.5 2.9 8.9L24 32l-7.5 5.4 2.9-8.9L12 23l9.1-.1L24 14z"
                  fill="none" stroke="#00c853" stroke-width="1.8" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="bs-empty-title">No top picks yet</div>
        <div class="bs-empty-sub">Rankings update automatically after the first purchases</div>
        <a href="${game.shopUrl}" class="bs-empty-btn">Browse ${game.name} →</a>
      </div>`;
    return;
  }

  grid.innerHTML = withCounts.map((p, i) => renderCard(p, i + 1, game.color)).join('');
  grid.querySelectorAll('.bs-card').forEach(addTilt);
  refreshPrices(grid);
}

// ── Render a single card ──────────────────────────────────────────────────
function renderCard(p, rank, accentColor) {
  const isBest   = rank <= 3;
  const priceStr = typeof MB_CURRENCY !== 'undefined'
    ? MB_CURRENCY.formatPrice(p.priceNum) : p.price;

  return `
    <div class="bs-card${isBest ? ' bs-card--top' : ''}" data-id="${p.id}"
         onclick="window.location='product?id=${p.id}'">
      <div class="bs-card-shine"></div>
      <div class="bs-card-top">
        ${isBest ? `<div class="bs-badge" style="background:${accentColor}">BEST SELLER</div>` : '<div></div>'}
      </div>
      <div class="bs-img-wrap">
        <img src="${p.img}" alt="${p.name}"
             onerror="this.style.display='none'" loading="lazy"/>
        ${isBest ? `<div class="bs-rank-badge" style="background:${accentColor}">#${rank}</div>` : ''}
      </div>
      <div class="bs-body">
        <div class="bs-name">${p.name}</div>
        <div class="bs-price" data-usd="${p.priceNum}">${priceStr}</div>
      </div>
      <div class="bs-btns">
        <a href="product?id=${p.id}" class="bs-btn-buy" onclick="event.stopPropagation()"
           style="background:${accentColor}">⚡ BUY NOW</a>
        <button class="bs-btn-cart" onclick="addToCart('${p.id}');event.stopPropagation()">Add to Cart</button>
      </div>
    </div>`;
}

// ── 3D tilt on hover ─────────────────────────────────────────────────────
function addTilt(card) {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transition = 'none';
    card.style.transform  = `perspective(700px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateZ(10px)`;
    const shine = card.querySelector('.bs-card-shine');
    if (shine) {
      shine.style.opacity    = '1';
      shine.style.background = `radial-gradient(circle at ${(x+.5)*100}% ${(y+.5)*100}%, rgba(255,255,255,.18) 0%, transparent 65%)`;
    }
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform .55s cubic-bezier(.22,1,.36,1)';
    card.style.transform  = 'perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    const shine = card.querySelector('.bs-card-shine');
    if (shine) shine.style.opacity = '0';
  });
}

// ── Refresh prices after currency switch ──────────────────────────────────
function refreshPrices(grid) {
  if (typeof MB_CURRENCY === 'undefined') return;
  grid.querySelectorAll('[data-usd]').forEach(el => {
    const n = parseFloat(el.dataset.usd);
    if (!isNaN(n)) el.textContent = MB_CURRENCY.formatPrice(n);
  });
}

// ── Main init ─────────────────────────────────────────────────────────────
export async function renderBestSellers() {
  const grid = document.getElementById('bestSellersGrid');
  if (!grid || typeof CATALOGUE === 'undefined') return;

  allCounts = await fetchCounts();
  renderTabs();
  renderGrid();
  updateViewAll();
}

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderBestSellers);
} else {
  renderBestSellers();
}
