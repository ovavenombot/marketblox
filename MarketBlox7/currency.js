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
    @keyframes cpDropIn {
      from { opacity:0; transform: translateY(-8px) scale(.97); }
      to   { opacity:1; transform: translateY(0)    scale(1);   }
    }
    @keyframes cpItemIn {
      from { opacity:0; transform: translateX(-6px); }
      to   { opacity:1; transform: translateX(0);    }
    }

    .currency-picker { position: relative; }

    .cp-btn {
      display: flex; align-items: center; gap: 6px;
      background: linear-gradient(135deg, rgba(0,200,83,.12), rgba(0,200,83,.06));
      border: 1.5px solid rgba(0,200,83,.35);
      border-radius: 10px; padding: 6px 12px; cursor: pointer;
      color: #0a2e14; font-family: inherit; font-size: .82rem; font-weight: 800;
      transition: background .2s, border-color .2s, box-shadow .2s, transform .15s;
      white-space: nowrap; letter-spacing: .01em;
      box-shadow: 0 2px 8px rgba(0,200,83,.1);
    }
    .cp-btn:hover {
      background: linear-gradient(135deg, rgba(0,200,83,.2), rgba(0,200,83,.1));
      border-color: #00c853;
      box-shadow: 0 4px 16px rgba(0,200,83,.2);
      transform: translateY(-1px);
    }
    .cp-btn:active { transform: scale(.97); }

    .cp-btn svg { transition: transform .25s cubic-bezier(.34,1.56,.64,1); }
    .cp-btn.open svg { transform: rotate(180deg); }

    .cp-symbol { font-size: .9rem; color: #00a846; }
    .cp-code   { color: #0a2e14; }

    .cp-dropdown {
      position: absolute; top: calc(100% + 8px); right: 0;
      background: #fff;
      border: 1.5px solid rgba(0,200,83,.18);
      border-radius: 16px; padding: 8px; min-width: 225px;
      box-shadow: 0 16px 48px rgba(0,0,0,.13), 0 2px 8px rgba(0,200,83,.08);
      display: none; z-index: 9999;
      transform-origin: top right;
    }
    .cp-dropdown.open {
      display: block;
      animation: cpDropIn .22s cubic-bezier(.22,1,.36,1) both;
    }

    .cp-divider {
      height: 1px; background: #eef6f0; margin: 4px 6px 6px;
    }

    .cp-option {
      display: flex; align-items: center; gap: 10px;
      width: 100%; padding: 9px 12px; border-radius: 10px;
      background: none; border: none; cursor: pointer;
      font-family: inherit; font-size: .83rem; text-align: left;
      color: #1a3a20; transition: background .15s, transform .15s;
      opacity: 0;
    }
    .cp-dropdown.open .cp-option {
      animation: cpItemIn .18s ease both;
    }
    .cp-option:hover {
      background: #f0f9f2;
      transform: translateX(3px);
    }
    .cp-option.active {
      background: linear-gradient(90deg, rgba(0,200,83,.12), rgba(0,200,83,.04));
    }
    .cp-option.active .cp-opt-code { color: #00a846; }

    .cp-opt-symbol {
      width: 28px; font-weight: 900; color: #00c853; font-size: .95rem;
    }
    .cp-opt-code   { font-weight: 800; min-width: 38px; color: #0a2e14; }
    .cp-opt-name   { color: #7a9e82; font-size: .78rem; flex: 1; }
    .cp-opt-check  { color: #00c853; font-size: .85rem; margin-left: auto; }
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
    const dd  = document.getElementById('currencyDropdown');
    const btn = document.getElementById('currencyPickerBtn');
    if (!dd) return;
    const isOpen = dd.classList.toggle('open');
    if (btn) btn.classList.toggle('open', isOpen);
    if (isOpen) setTimeout(() => document.addEventListener('click', outsideClick), 0);
    else document.removeEventListener('click', outsideClick);
  }

  function close() {
    const dd  = document.getElementById('currencyDropdown');
    const btn = document.getElementById('currencyPickerBtn');
    if (dd)  dd.classList.remove('open');
    if (btn) btn.classList.remove('open');
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
    const chevron = `<svg width="11" height="11" viewBox="0 0 10 10" fill="none"><path d="M2 3.5l3 3 3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    slot.innerHTML = `
      <div class="currency-picker" id="currencyPicker">
        <button class="cp-btn" id="currencyPickerBtn" onclick="window.MB_CURRENCY.toggle()">
          <span class="cp-symbol">${cur.symbol}</span>
          <span class="cp-code">${current}</span>
          ${chevron}
        </button>
        <div class="cp-dropdown" id="currencyDropdown">
          <div class="cp-divider" style="margin-top:0"></div>
          ${Object.entries(CURRENCIES).map(([code, c], i) => `
            <button class="cp-option${code === current ? ' active' : ''}" data-code="${code}"
              onclick="window.MB_CURRENCY.set('${code}')"
              style="animation-delay:${i * 0.03}s">
              <span class="cp-opt-symbol">${c.symbol}</span>
              <span class="cp-opt-code">${code}</span>
              <span class="cp-opt-name">${c.name}</span>
              ${code === current ? '<span class="cp-opt-check">✓</span>' : ''}
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
