// Runs on every page — updates the navbar Login/Account button
import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const app = getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  const btn = document.getElementById('authNavBtn');
  if (!btn) return;
  if (user) {
    const initial = (user.displayName || user.email || '?')[0].toUpperCase();
    btn.href = 'account.html';
    btn.innerHTML = `<span class="auth-avatar">${initial}</span><span>Account</span>`;
    btn.classList.add('auth-logged-in');
    btn.title = user.email;
  } else {
    btn.href = 'login.html';
    btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span>Login</span>`;
    btn.classList.remove('auth-logged-in');
    btn.title = '';
  }
});
