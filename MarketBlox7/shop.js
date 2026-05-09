// ================================
//   MARKETBLOX — GAME SHOP PAGE
// ================================

const GAME_CONFIG = {
  sab: {
    name: 'Steal A Brainrot',
    emoji: '🧠',
    banner: 'https://tr.rbxcdn.com/180DAY-63cb108a7787e6f8d662cfee57d4ab51/768/432/Image/Webp/noFilter',
    catalogueGame: 'Steal A Brainrot',
  },
  bf: {
    name: 'Blox Fruits',
    emoji: '🍎',
    banner: 'https://tr.rbxcdn.com/180DAY-a6f22ab57d42fcb6dc72261932faf953/768/432/Image/Webp/noFilter',
    catalogueGame: 'Blox Fruits',
  },
  rivals: {
    name: 'Rivals',
    emoji: '⚔️',
    banner: 'https://tr.rbxcdn.com/180DAY-36fd690cbf4077d15d6689d8eb3d5875/768/432/Image/Webp/noFilter',
    catalogueGame: 'Rivals',
  },
};

const params = new URLSearchParams(window.location.search);
const gameKey = params.get('game') || 'sab';
const game = GAME_CONFIG[gameKey] || GAME_CONFIG['sab'];

// Set page title & banner
document.getElementById('page-title').textContent = `${game.name} — MarketBlox`;
document.getElementById('shopBanner').src = game.banner;
document.getElementById('shopBanner').alt = game.name;
document.getElementById('shopGameName').textContent = `${game.emoji} ${game.name}`;

// Filter products from the shared CATALOGUE (loaded by cart.js)
const products = CATALOGUE.filter(p => p.game === game.catalogueGame);

document.getElementById('shopGameMeta').textContent = `${products.length} Items · Instant Delivery`;
document.getElementById('shopGridTitle').textContent = `${game.emoji} ${game.name}`;
document.getElementById('shopGridMeta').textContent = `${products.length} Items · Instant Delivery`;

// Render product cards
function renderShopGrid() {
  const grid = document.getElementById('shopGrid');
  if (products.length === 0) {
    grid.innerHTML = `<div class="coming-soon-box"><div class="cs-emoji">${game.emoji}</div><h3>${game.name}</h3><p>Coming soon! Join our Discord to be notified first.</p><a href="#support" class="btn-primary magnetic"><span class="btn-bg"></span><span class="btn-content">Join Discord</span></a></div>`;
    return;
  }

  grid.innerHTML = products.map((p, i) => `
    <div class="product-card" data-aos onclick="window.location='product.html?id=${p.id}'">
      <div class="product-img">
        ${p.img
          ? `<img src="${p.img}" alt="${p.name}" onerror="this.parentElement.innerHTML='<div class=ef>${p.emoji}</div>'"/>`
          : `<div class="ef">${p.emoji}</div>`}
      </div>
      <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-price">${p.price}</div>
      </div>
      <div class="card-btns">
        <a href="product.html?id=${p.id}" class="product-btn-buy">⚡ BUY NOW</a>
        <button class="product-btn-cart" onclick="addToCart('${p.id}');event.stopPropagation()">Add to Cart</button>
      </div>
    </div>
  `).join('');

  // Simple AOS-like fade-in
  document.querySelectorAll('[data-aos]').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }));
  });
}

renderShopGrid();

// Navbar scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});
