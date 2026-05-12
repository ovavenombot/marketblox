// ================================
//   MARKETBLOX — GAME SHOP PAGE
// ================================

const GAME_CONFIG = {
  sab: {
    name: 'Steal A Brainrot',
    emoji: '🧠',
    banner: 'https://tr.rbxcdn.com/180DAY-63cb108a7787e6f8d662cfee57d4ab51/768/432/Image/Webp/noFilter',
    catalogueGame: 'Steal A Brainrot',
    hasCategories: true,
  },
  bf: {
    name: 'Blox Fruits',
    emoji: '🍎',
    banner: 'https://tr.rbxcdn.com/180DAY-a6f22ab57d42fcb6dc72261932faf953/768/432/Image/Webp/noFilter',
    catalogueGame: 'Blox Fruits',
    hasCategories: false,
  },
  rivals: {
    name: 'Rivals',
    emoji: '⚔️',
    banner: 'https://tr.rbxcdn.com/180DAY-36fd690cbf4077d15d6689d8eb3d5875/768/432/Image/Webp/noFilter',
    catalogueGame: 'Rivals',
    hasCategories: false,
  },
};

const SAB_CATEGORIES = [
  {
    id: 'all', label: 'All Products',
    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/>
      <path d="M8 4v4l2.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'bs', label: 'Best Sellers',
    icon: `<svg class="cat-star" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5l1.8 3.6 4 .58-2.9 2.83.68 3.99L8 10.5l-3.58 1.98.68-3.99L2.2 5.68l4-.58L8 1.5z" fill="currentColor" opacity="0.9"/>
    </svg>`,
  },
  {
    id: 'new', label: 'New Brainrots',
    icon: `<svg class="cat-new" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1l1.2 2.8L13 4.5l-2.5 2.5.6 3.5L8 9l-3.1 1.5.6-3.5L3 4.5l3.8-.7L8 1z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" fill="none"/>
      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
    </svg>`,
  },
  {
    id: 'bundles', label: 'Bundles',
    icon: `<svg class="cat-bundle" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="7" width="12" height="7" rx="2" stroke="currentColor" stroke-width="1.4"/>
      <path d="M5 7V5.5a3 3 0 0 1 6 0V7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>
      <line x1="8" y1="7" x2="8" y2="14" stroke="currentColor" stroke-width="1.4"/>
      <line x1="2" y1="10.5" x2="14" y2="10.5" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>
    </svg>`,
  },
  {
    id: 'cyber', label: 'Cyber',
    icon: `<svg class="cat-cyber" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="5" width="10" height="7" rx="2" stroke="currentColor" stroke-width="1.4"/>
      <circle cx="5.5" cy="8.5" r="1" fill="currentColor"/>
      <circle cx="10.5" cy="8.5" r="1" fill="currentColor"/>
      <path d="M6.5 11h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M5 5V3.5M8 5V3M11 5V3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'divine', label: 'Divine',
    icon: `<svg class="cat-divine" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2l1.5 3h3l-2.5 2 1 3L8 8.5 5 10l1-3L3.5 5h3L8 2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" fill="none"/>
      <path d="M8 2v12M3 8.5h10" stroke="currentColor" stroke-width="1" opacity="0.35"/>
    </svg>`,
  },
  {
    id: 'index', label: 'Index Bases',
    icon: `<svg class="cat-index" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="10" width="3" height="4" rx="1" fill="currentColor" opacity="0.7"/>
      <rect x="6.5" y="7" width="3" height="7" rx="1" fill="currentColor" opacity="0.85"/>
      <rect x="11" y="4" width="3" height="10" rx="1" fill="currentColor"/>
      <path d="M3.5 10L8 7l4.5-3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'op', label: 'OP Brainrots',
    icon: `<svg class="cat-op" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L10 6H14L11 9L12.5 14L8 11.5L3.5 14L5 9L2 6H6L8 2Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" fill="none"/>
    </svg>`,
  },
];

const params = new URLSearchParams(window.location.search);
const gameKey = params.get('game') || 'sab';
const game = GAME_CONFIG[gameKey] || GAME_CONFIG['sab'];

let activeCategory = 'all';
let searchQuery = '';

const allProducts = CATALOGUE.filter(p => p.game === game.catalogueGame);

// Set page title & banner
document.getElementById('page-title').textContent = `${game.name} — MarketBlox`;
document.getElementById('shopBanner').src = game.banner;
document.getElementById('shopBanner').alt = game.name;
document.getElementById('shopGameName').textContent = `${game.emoji} ${game.name}`;
document.getElementById('shopGameMeta').textContent = `${allProducts.length} Items · Instant Delivery`;
document.getElementById('shopGridTitle').textContent = `${game.emoji} ${game.name}`;
document.getElementById('shopGridMeta').textContent = `${allProducts.length} Items · Instant Delivery`;

// ── Category + Search bar ──────────────────────────────────────────
function buildFilterUI() {
  const section = document.getElementById('shopFilterBar');
  if (!section) return;

  if (game.hasCategories) {
    // Category tabs
    const tabs = SAB_CATEGORIES.map(c => `
      <button class="cat-tab ${c.id === activeCategory ? 'active' : ''}" data-cat="${c.id}">
        <span class="cat-tab-icon">${c.icon}</span>
        ${c.label}
      </button>
    `).join('');

    // Search bar
    const search = `
      <div class="shop-search-wrap">
        <svg class="shop-search-ico" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="1.6"/>
          <path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
        <input class="shop-search-input" id="shopSearchInput" type="text" placeholder="Search items…" value="${searchQuery}"/>
        ${searchQuery ? `<button class="shop-search-clear" id="shopSearchClear">✕</button>` : ''}
      </div>
    `;

    section.innerHTML = `
      <div class="cat-tabs-wrap"><div class="cat-tabs" id="catTabs">${tabs}</div></div>
      ${search}
    `;

    // Event listeners
    section.querySelectorAll('.cat-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.cat;
        searchQuery = '';
        buildFilterUI();
        renderShopGrid();
      });
    });

    const inp = document.getElementById('shopSearchInput');
    if (inp) {
      inp.addEventListener('input', e => {
        searchQuery = e.target.value;
        buildFilterUI();
        renderShopGrid();
      });
      inp.focus();
    }

    const clr = document.getElementById('shopSearchClear');
    if (clr) {
      clr.addEventListener('click', () => {
        searchQuery = '';
        buildFilterUI();
        renderShopGrid();
      });
    }
  } else {
    section.innerHTML = '';
  }
}

// ── Filtered products ──────────────────────────────────────────────
function getFilteredProducts() {
  let list = allProducts;

  if (game.hasCategories && activeCategory !== 'all') {
    list = list.filter(p => p.category === activeCategory);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q));
  }

  return list;
}

// ── Card renderer ──────────────────────────────────────────────────
function cardHTML(p) {
  const badge = '';

  const img = p.img
    ? `<img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=pc-emoji>${p.emoji}</div>'"/>`
    : `<div class="pc-emoji">${p.emoji}</div>`;

  const original = p.original ? `<span class="pc-original">${p.original}</span>` : '';
  const discount = p.original
    ? `<span class="pc-disc">-${Math.round((1 - p.priceNum / parseFloat(p.original.replace('$',''))) * 100)}%</span>`
    : '';

  return `
    <div class="product-card" onclick="window.location='product?id=${p.id}'">
      <div class="pc-img-wrap">
        ${img}
        ${badge}
        <div class="pc-img-shine"></div>
      </div>
      <div class="pc-body">
        <div class="pc-name">${p.name}</div>
        <div class="pc-price-row">
          <span class="pc-price" data-usd="${p.priceNum}">${p.price}</span>
          ${original}${discount}
        </div>
      </div>
      <div class="pc-actions">
        <a href="product?id=${p.id}" class="pc-btn-buy" onclick="event.stopPropagation()">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 2.5h1.5l1.8 5.5h4.5l1.2-4H4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6.5" cy="10.5" r="1" fill="currentColor"/><circle cx="9.5" cy="10.5" r="1" fill="currentColor"/></svg>
          BUY NOW
        </a>
        <button class="pc-btn-cart" onclick="addToCart('${p.id}');event.stopPropagation()">+ Cart</button>
      </div>
    </div>
  `;
}

// ── Grid renderer ──────────────────────────────────────────────────
function renderShopGrid() {
  const grid = document.getElementById('shopGrid');
  const filtered = getFilteredProducts();

  // Update meta
  document.getElementById('shopGridMeta').textContent = `${filtered.length} Items · Instant Delivery`;

  if (allProducts.length === 0) {
    grid.innerHTML = `<div class="coming-soon-box"><div class="cs-emoji">${game.emoji}</div><h3>${game.name}</h3><p>Coming soon! Join our Discord to be notified first.</p><a href="#support" class="btn-primary magnetic"><span class="btn-bg"></span><span class="btn-content">Join Discord</span></a></div>`;
    return;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="shop-no-results"><div style="font-size:2.5rem">🔍</div><h3>No results found</h3><p>Try a different search or category.</p></div>`;
    return;
  }

  grid.innerHTML = filtered.map(cardHTML).join('');

  // Animate in
  grid.querySelectorAll('.product-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.35s ease ${i * 0.03}s, transform 0.35s ease ${i * 0.03}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }));
  });
}

// ── Cyber promo banner (SAB only) ──────────────────────────────────
function buildPromoBanner() {
  const wrap = document.getElementById('shopPromoBanner');
  if (!wrap || gameKey !== 'sab') return;
  wrap.innerHTML = `
    <div class="cyber-banner" onclick="activeCategory='cyber';buildFilterUI();renderShopGrid();document.getElementById('shopGrid').scrollIntoView({behavior:'smooth'})">
      <div class="cyber-banner-bg"></div>
      <div class="cyber-banner-content container">
        <div class="cyber-banner-left">
          <div class="cyber-banner-tag">NEW DROP</div>
          <h2 class="cyber-banner-title">Cyber Brainrots</h2>
          <p class="cyber-banner-sub">The most powerful mutations are here — get yours before they're gone.</p>
        </div>
        <button class="cyber-banner-btn">SHOP CYBER →</button>
      </div>
      <div class="cyber-banner-glow"></div>
    </div>
  `;
}

// ── Init ───────────────────────────────────────────────────────────
buildPromoBanner();
buildFilterUI();
renderShopGrid();

// Navbar scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});
