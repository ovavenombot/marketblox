// Runs on every page — updates the navbar Login/Account button
import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  const wrap     = document.getElementById('authNavWrap');
  const btn      = document.getElementById('authNavBtn');
  const dropdown = document.getElementById('authNavDropdown');
  if (!btn) return;

  if (user) {
    const initial  = (user.displayName || user.email || '?')[0].toUpperCase();
    const name     = user.displayName || user.email?.split('@')[0] || 'User';
    const email    = user.email || '';
    const chevron  = `<svg class="auth-nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5l3.5 3.5 3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    btn.removeAttribute('href');
    btn.innerHTML = `<span class="auth-avatar">${initial}</span><span>${name.split(' ')[0]}</span>${chevron}`;
    btn.classList.add('auth-logged-in');
    btn.style.cursor = 'pointer';

    if (dropdown) {
      dropdown.innerHTML = `
        <div class="auth-dd-header">
          <div class="auth-dd-avatar">${initial}</div>
          <div class="auth-dd-info">
            <div class="auth-dd-name">${name}</div>
            <div class="auth-dd-email">${email}</div>
          </div>
        </div>
        <div class="auth-dd-divider"></div>
        <a href="account" class="auth-dd-item">
          <span class="auth-dd-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </span>
          Profile
        </a>
        <a href="account" class="auth-dd-item">
          <span class="auth-dd-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
          </span>
          My Orders
        </a>
        <div class="auth-dd-divider"></div>
        <button class="auth-dd-item auth-dd-logout" id="authLogoutBtn">
          <span class="auth-dd-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </span>
          Logout
        </button>`;

      document.getElementById('authLogoutBtn')?.addEventListener('click', async () => {
        await signOut(auth);
        window.location.href = 'login';
      });
    }

    let outsideHandler;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!wrap || !dropdown) return;
      const isOpen = wrap.classList.toggle('open');
      dropdown.classList.toggle('open', isOpen);
      if (isOpen) {
        outsideHandler = (ev) => {
          if (!wrap.contains(ev.target)) {
            wrap.classList.remove('open');
            dropdown.classList.remove('open');
            document.removeEventListener('click', outsideHandler);
          }
        };
        setTimeout(() => document.addEventListener('click', outsideHandler), 0);
      } else {
        document.removeEventListener('click', outsideHandler);
      }
    });

  } else {
    btn.href = 'login.html';
    btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span>Login</span>`;
    btn.classList.remove('auth-logged-in');
    btn.style.cursor = '';
  }
});
