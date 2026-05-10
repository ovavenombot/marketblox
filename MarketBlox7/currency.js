// ================================
//   MARKETBLOX — CURRENCY MODULE
// ================================

(function () {
  const CURRENCIES = {
    USD: { symbol: '$',   name: 'US Dollar'        },
    EUR: { symbol: '€',   name: 'Euro'              },
    GBP: { symbol: '£',   name: 'British Pound'     },
    CAD: { symbol: 'C$',  name: 'Canadian Dollar'   },
    AUD: { symbol: 'A$',  name: 'Australian Dollar' },
    BRL: { symbol: 'R$',  name: 'Brazilian Real'    },
    MXN: { symbol: 'MX$', name: 'Mexican Peso'      },
    INR: { symbol: '₹',   name: 'Indian Rupee'      },
  };

  const FALLBACK = { USD:1, EUR:0.92, GBP:0.79, CAD:1.36, AUD:1.53, BRL:5.05, MXN:17.15, INR:83.5 };

  let rates   = { ...FALLBACK };
  let current = localStorage.getItem('mb_currency') || 'USD';

  // Inject styles once
  const style = document.createElement('style');
  style.textContent = `
    .currency-picker { position: relative; }
    .cp-btn {
      display: flex; align-items: center; gap: 5px;
      background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2);
      border-radius: 8px; padding: 6px 10px; cursor: pointer;
      color: #fff; font-family: inherit; font-size: .82rem; font-weight: 700;
      transition: background .15s, border-color .15s;
      white-space: nowrap;
    }
    .cp-btn:hover { background: rgba(255,255,255,.18); border-color: rgba(255,255,255,.35); }
    .cp-symbol { font-size: .9rem; }
    .cp-dropdown {
      position: absolute; top: calc(100% + 6px); right: 0;
      background: #111c14; border: 1px solid rgba(0,200,83,.25);
      border-radius: 12px; padding: 6px; min-width: 210px;
      box-shadow: 0 12px 40px rgba(0,0,0,.5);
      display: none; z-index: 9999;
    }
    .cp-dropdown.open { display: block; }
    .cp-option {
      display: flex; align-items: center; gap: 10px;
      width: 100%; padding: 8px 10px; border-radius: 8px;
      background: none; border: none; cursor: pointer;
      font-family: inherit; font-size: .82rem; text-align: left;
      color: rgba(255,255,255,.75); transition: background .12s, color .12s;
    }
    .cp-option:hover, .cp-option.active { background: rgba(0,200,83,.12); color: #fff; }
    .cp-option.active .cp-opt-code { color: #00c853; }
    .cp-opt-symbol { width: 22px; font-weight: 700; color: #00c853; }
    .cp-opt-code   { font-weight: 800; min-width: 36px; }
    .cp-opt-name   { color: rgba(255,255,255,.45); font-size: .78rem; }
  `;
  document.head.appendChild(style);

  async function fetchRates() {
    try {
      const controller = new AbortController();
      const timeout    = setTimeout(() => controller.abort(), 4000);
      const res  = await fetch('https://open.er-api.com/v6/latest/USD', { signal: controller.signal });
      clearTimeout(timeout);
      const data = await res.json();
      if (data.result === 'success' && data.rates) { rates = data.rates; rates.USD = 1; }
    } catch (_) { /* keep fallback */ }
  }

  function formatPrice(usdAmount) {
    const cur  = CURRENCIES[current];
    const rate = rates[current] || 1;
    const val  = usdAmount * rate;
    const str  = current === 'INR'
      ? Math.round(val).toLocaleString('en-IN')
      : val.toFixed(2);
    return `${cur.symbol}${str}`;
  }

  function applyToAll() {
    document.querySelectorAll('[data-usd]').forEach(el => {
      const n = parseFloat(el.dataset.usd);
      if (!isNaN(n)) el.textContent = formatPrice(n);
    });
    // refresh cart totals if renderCart exists
    if (typeof renderCart === 'function') renderCart();
    // update picker button label
    updateBtn();
  }

  function updateBtn() {
    const btn = document.getElementById('currencyPickerBtn');
    if (!btn) return;
    const cur = CURRENCIES[current];
    btn.querySelector('.cp-symbol').textContent = cur.symbol;
    btn.querySelector('.cp-code').textContent   = current;
    document.querySelectorAll('.cp-option').forEach(o => {
      o.classList.toggle('active', o.dataset.code === current);
    });
  }

  function set(code) {
    if (!CURRENCIES[code]) return;
    current = code;
    localStorage.setItem('mb_currency', code);
    applyToAll();
    close();
  }

  function toggle() {
    const dd = document.getElementById('currencyDropdown');
    if (!dd) return;
    if (dd.classList.toggle('open')) {
      setTimeout(() => document.addEventListener('click', outsideClick), 0);
    } else {
      document.removeEventListener('click', outsideClick);
    }
  }

  function close() {
    const dd = document.getElementById('currencyDropdown');
    if (dd) dd.classList.remove('open');
    document.removeEventListener('click', outsideClick);
  }

  function outsideClick(e) {
    const picker = document.getElementById('currencyPicker');
    if (picker && !picker.contains(e.target)) close();
  }

  function inject() {
    const slot = document.getElementById('currencyPickerSlot');
    if (!slot) return;
    const cur = CURRENCIES[current];
    slot.innerHTML = `
      <div class="currency-picker" id="currencyPicker">
        <button class="cp-btn" id="currencyPickerBtn" onclick="window.MB_CURRENCY.toggle()">
          <span class="cp-symbol">${cur.symbol}</span>
          <span class="cp-code">${current}</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="cp-dropdown" id="currencyDropdown">
          ${Object.entries(CURRENCIES).map(([code, c]) => `
            <button class="cp-option${code === current ? ' active' : ''}" data-code="${code}" onclick="window.MB_CURRENCY.set('${code}')">
              <span class="cp-opt-symbol">${c.symbol}</span>
              <span class="cp-opt-code">${code}</span>
              <span class="cp-opt-name">${c.name}</span>
            </button>
          `).join('')}
        </div>
      </div>`;
  }

  async function init() {
    inject();       // show picker immediately with fallback rates
    applyToAll();
    await fetchRates(); // fetch live rates in background
    applyToAll();   // update prices with live rates
  }

  window.MB_CURRENCY = { init, set, toggle, formatPrice, get current() { return current; } };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
