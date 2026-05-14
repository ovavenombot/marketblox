// ================================
//   MARKETBLOX V4 — SCRIPT.JS
// ================================


// FLOATING STARS IN HERO
const heroStars = document.getElementById('heroStars');
if (heroStars) {
  for (let i = 0; i < 20; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 14 + 6;
    star.style.cssText = `position:absolute;left:${Math.random()*100}%;top:${Math.random()*100}%;font-size:${size}px;line-height:1;animation:starTwinkle ${2+Math.random()*3}s ${Math.random()*3}s ease-in-out infinite;pointer-events:none;user-select:none;opacity:0.4;color:${Math.random()>0.6?'#00c853':'#c8e6c9'};`;
    star.textContent = ['✦','✧','⋆','★','✶'][Math.floor(Math.random()*5)];
    heroStars.appendChild(star);
  }
}

// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}
function closeMobile() {
  if (hamburger) hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

// GAME SWITCHER
const gameInfo = {
  sab:    { title: 'Steal A Brainrot', meta: '12 Items · Instant Delivery' },
  gpo:    { title: 'Sailor Piece', meta: 'Coming Soon' },
  bf:     { title: 'Blox Fruits', meta: 'Coming Soon' },
  rivals: { title: 'Rivals', meta: 'Coming Soon' }
};

function selectGame(game) {
  document.querySelectorAll('.game-tab').forEach(t => t.classList.remove('active'));
  const tab = document.querySelector(`.game-tab[data-game="${game}"]`);
  if (tab) tab.classList.add('active');
  const gt = document.getElementById('gameTitle');
  const pc = document.getElementById('productsCount');
  if (gt) gt.textContent = gameInfo[game].title;
  if (pc) pc.textContent = gameInfo[game].meta;
  document.querySelectorAll('.products-grid').forEach(g => g.classList.add('hidden'));
  const grid = document.getElementById(`${game}-products`);
  if (grid) {
    grid.classList.remove('hidden');
    grid.querySelectorAll('[data-aos]').forEach((el, i) => {
      el.classList.remove('aos-visible');
      setTimeout(() => el.classList.add('aos-visible'), i * 60);
    });
    document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function scrollToShop() {
  document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
}

// SCROLL ANIMATIONS
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.aosDelay || 0);
      setTimeout(() => entry.target.classList.add('aos-visible'), delay);
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('[data-aos]').forEach((el, i) => {
  el.dataset.aosDelay = i * 55;
  aosObserver.observe(el);
});

// MAGNETIC BUTTONS
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x*0.14}px,${y*0.14}px)`;
  });
  btn.addEventListener('mouseleave', () => btn.style.transform = '');
});

// PRODUCT CARD TILT
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-8px) scale(1.01) rotateX(${-y*5}deg) rotateY(${x*5}deg)`;
    card.style.transition = 'transform 0.1s, box-shadow 0.3s, border-color 0.3s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.3s cubic-bezier(0.175,0.885,0.32,1.275), box-shadow 0.3s, border-color 0.3s';
  });
});

// CLICK TO OPEN DROPDOWN
const dropdownBtn = document.querySelector('.dropdown-btn');
const gameDropdown = document.querySelector('.game-dropdown');
if (dropdownBtn && gameDropdown) {
  dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    gameDropdown.classList.toggle('open');
  });
  document.addEventListener('click', () => {
    gameDropdown.classList.remove('open');
  });
  gameDropdown.addEventListener('click', (e) => e.stopPropagation());
}

// GAME PICKER MODAL
function openGamePicker() {
  document.getElementById('gamePickerModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeGamePicker() {
  document.getElementById('gamePickerModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeGamePicker();
});

console.log('%c MarketBlox 🟢 v4 ', 'background:#00c853;color:#fff;font-weight:bold;font-size:14px;padding:4px 12px;border-radius:20px;');
