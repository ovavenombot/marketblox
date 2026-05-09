// ================================
//   MARKETBLOX V4 — SCRIPT.JS
// ================================

// 3D ANIMATED BACKGROUND with Three.js via CDN
(function() {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  script.onload = init3D;
  document.head.appendChild(script);
})();

function init3D() {
  const canvas = document.getElementById('particles');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  // FLOATING CUBES (Roblox-style blocks)
  const cubes = [];
  const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
  const colors = [0x00c853, 0x00a846, 0x69f0ae, 0x1b5e20, 0x004d40];

  for (let i = 0; i < 40; i++) {
    const mat = new THREE.MeshPhongMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      transparent: true,
      opacity: Math.random() * 0.25 + 0.05,
      shininess: 80,
    });
    const cube = new THREE.Mesh(cubeGeo, mat);
    const scale = Math.random() * 2 + 0.5;
    cube.scale.set(scale, scale, scale);
    cube.position.set(
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 60,
      (Math.random() - 0.5) * 30
    );
    cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    cube.userData = {
      rotX: (Math.random() - 0.5) * 0.008,
      rotY: (Math.random() - 0.5) * 0.008,
      floatSpeed: Math.random() * 0.003 + 0.001,
      floatOffset: Math.random() * Math.PI * 2,
    };
    scene.add(cube);
    cubes.push(cube);
  }

  // DOTS / PARTICLES
  const dotGeo = new THREE.SphereGeometry(0.12, 6, 6);
  for (let i = 0; i < 80; i++) {
    const dot = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({
      color: Math.random() > 0.5 ? 0x00c853 : 0xcccccc,
      transparent: true,
      opacity: Math.random() * 0.3 + 0.05,
    }));
    dot.position.set(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 40
    );
    dot.userData = {
      floatSpeed: Math.random() * 0.002 + 0.0005,
      floatOffset: Math.random() * Math.PI * 2,
    };
    scene.add(dot);
    cubes.push(dot);
  }

  // LIGHTS
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dirLight = new THREE.DirectionalLight(0x00c853, 1);
  dirLight.position.set(10, 20, 10);
  scene.add(dirLight);
  const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
  dirLight2.position.set(-10, -10, 10);
  scene.add(dirLight2);

  // MOUSE PARALLAX
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.01;
    camera.position.x += (mouseX * 3 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);
    cubes.forEach(c => {
      if (c.userData.rotX) {
        c.rotation.x += c.userData.rotX;
        c.rotation.y += c.userData.rotY;
      }
      c.position.y += Math.sin(t * c.userData.floatSpeed * 100 + c.userData.floatOffset) * 0.01;
    });
    renderer.render(scene, camera);
  }
  animate();
}

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
  sab:    { title: '🧠 Steal A Brainrot', meta: '12 Items · Instant Delivery' },
  gpo:    { title: '🌊 Grand Piece Online', meta: 'Coming Soon' },
  bf:     { title: '🍎 Blox Fruits', meta: 'Coming Soon' },
  rivals: { title: '⚔️ Rivals', meta: 'Coming Soon' }
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
