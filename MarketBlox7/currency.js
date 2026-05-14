// ================================
//   MARKETBLOX — CURRENCY MODULE
// ================================

(function () {
  const CURRENCIES = {
    USD: { symbol: '$',   flag: '🇺🇸', name: 'US Dollar'        },
    EUR: { symbol: '€',   flag: '🇪🇺', name: 'Euro'              },
    GBP: { symbol: '£',   flag: '🇬🇧', name: 'British Pound'     },
    CAD: { symbol: 'C$',  flag: '🇨🇦', name: 'Canadian Dollar'   },
    AUD: { symbol: 'A$',  flag: '🇦🇺', name: 'Australian Dollar' },
    BRL: { symbol: 'R$',  flag: '🇧🇷', name: 'Brazilian Real'    },
    MXN: { symbol: 'MX$', flag: '🇲🇽', name: 'Mexican Peso'      },
    INR: { symbol: '₹',   flag: '🇮🇳', name: 'Indian Rupee'      },
  };

  const FALLBACK = { USD:1, EUR:0.92, GBP:0.79, CAD:1.36, AUD:1.53, BRL:5.05, MXN:17.15, INR:83.5 };

  let rates   = { ...FALLBACK };
  let current = localStorage.getItem('mb_currency') || 'USD';

  const style = document.createElement('style');
  style.textContent = `
    @keyframes cpSlideDown {
      0%   { opacity:0; transform: translateY(-12px) scaleY(.92); }
      60%  { opacity:1; transform: translateY(3px)   scaleY(1.01); }
      100% { opacity:1; transform: translateY(0)     scaleY(1); }
    }
    @keyframes cpItemSlide {
      from { opacity:0; transform: translateX(-14px); }
      to   { opacity:1; transform: translateX(0); }
    }
    @keyframes cpArrowSpin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(180deg); }
    }
    @keyframes cpGlow {
      0%,100% { box-shadow: 0 2px 10px rgba(0,200,83,.15); }
      50%      { box-shadow: 0 4px 20px rgba(0,200,83,.35); }
    }

    .currency-picker { position: relative; }

    .cp-btn {
      display: flex; align-items: center; gap: 8px;
      background: linear-gradient(135deg, #00c853 0%, #00a846 100%);
      border: none;
      border-radius: 14px; padding: 10px 18px; cursor: pointer;
      color: #fff; font-family: inherit; font-size: .92rem; font-weight: 800;
      transition: transform .18s cubic-bezier(.34,1.56,.64,1), box-shadow .2s;
      white-space: nowrap; letter-spacing: .02em;
      box-shadow: 0 3px 12px rgba(0,200,83,.3);
      position: relative; overflow: hidden;
    }
    .cp-btn::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,.18) 0%, transparent 60%);
      pointer-events: none;
    }
    .cp-btn:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 6px 22px rgba(0,200,83,.45);
    }
    .cp-btn:active { transform: scale(.96); }

    .cp-flag   { font-size: 1rem; line-height: 1; }
    .cp-code   { color: #fff; font-weight: 900; letter-spacing: .04em; }
    .cp-arrow  {
      width: 14px; height: 14px; display: flex; align-items: center; justify-content: center;
      transition: transform .3s cubic-bezier(.34,1.56,.64,1);
      opacity: .85;
    }
    .cp-btn.open .cp-arrow { transform: rotate(180deg); }

    .cp-dropdown {
      position: absolute; top: calc(100% + 10px); right: 0;
      background: rgba(255,255,255,.97);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border: 1.5px solid rgba(0,200,83,.2);
      border-radius: 18px; padding: 6px; min-width: 240px;
      box-shadow:
        0 20px 60px rgba(0,0,0,.15),
        0 4px 12px rgba(0,200,83,.1),
        inset 0 1px 0 rgba(255,255,255,.9);
      display: none; z-index: 9999;
      transform-origin: top right;
    }
    .cp-dropdown.open {
      display: block;
      animation: cpSlideDown .28s cubic-bezier(.22,1,.36,1) both;
    }

    .cp-header {
      padding: 8px 12px 6px;
      font-size: .7rem; font-weight: 800; letter-spacing: .08em;
      color: #00a846; text-transform: uppercase;
    }
    .cp-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(0,200,83,.15), transparent);
      margin: 2px 8px 6px;
    }

    .cp-option {
      display: flex; align-items: center; gap: 10px;
      width: 100%; padding: 10px 12px; border-radius: 12px;
      background: none; border: none; cursor: pointer;
      font-family: inherit; font-size: .83rem; text-align: left;
      color: #1a3a20;
      transition: background .15s, transform .18s cubic-bezier(.34,1.56,.64,1);
      opacity: 0; position: relative; overflow: hidden;
    }
    .cp-dropdown.open .cp-option {
      animation: cpItemSlide .22s cubic-bezier(.22,1,.36,1) both;
    }
    .cp-option::before {
      content: '';
      position: absolute; inset: 0; border-radius: 12px;
      background: linear-gradient(90deg, rgba(0,200,83,.08), transparent);
      opacity: 0; transition: opacity .15s;
    }
    .cp-option:hover { transform: translateX(4px); }
    .cp-option:hover::before { opacity: 1; }

    .cp-option.active {
      background: linear-gradient(90deg, rgba(0,200,83,.13), rgba(0,200,83,.04));
    }
    .cp-option.active .cp-opt-code { color: #00a846; }

    .cp-opt-flag   { font-size: 1.15rem; line-height: 1; flex-shrink: 0; }
    .cp-opt-code   { font-weight: 900; min-width: 40px; color: #0a2e14; font-size: .84rem; }
    .cp-opt-name   { color: #7a9e82; font-size: .76rem; flex: 1; }
    .cp-opt-check  {
      width: 18px; height: 18px; border-radius: 50%;
      background: #00c853; color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-size: .65rem; font-weight: 900; flex-shrink: 0;
      box-shadow: 0 2px 6px rgba(0,200,83,.4);
    }

    /* ── Mobile currency picker ── */
    .cp-mob-btn {
      display: flex; align-items: center; justify-content: space-between;
      width: 100%; padding: .75rem 1rem;
      background: rgba(0,200,83,.07); border: 1.5px solid rgba(0,200,83,.2);
      border-radius: 12px; cursor: pointer; font-family: inherit;
      font-size: .9rem; font-weight: 700; color: #1a3a20;
      transition: background .15s;
    }
    .cp-mob-btn:hover { background: rgba(0,200,83,.13); }
    .cp-mob-btn-left  { display: flex; align-items: center; gap: .5rem; }
    .cp-mob-btn-right { display: flex; align-items: center; gap: .35rem; font-size: .75rem; font-weight: 600; color: #5a8a65; }
    .cp-mob-arrow { transition: transform .25s; font-size: .7rem; }
    .cp-mob-arrow.open { transform: rotate(180deg); }

    .cp-mob-grid {
      display: none; flex-wrap: wrap; gap: .4rem; padding: .6rem 0 .1rem;
    }
    .cp-mob-grid.open { display: flex; }
    .cp-mob-opt {
      display: flex; align-items: center; gap: .35rem;
      padding: .45rem .7rem; border-radius: 10px;
      border: 1.5px solid #e5eae8; background: #fff;
      cursor: pointer; font-family: inherit; font-size: .8rem; font-weight: 700;
      color: #1a3a20; flex: 1; min-width: 72px;
      transition: background .15s, border-color .15s, color .15s;
    }
    .cp-mob-opt:hover { border-color: #00c853; color: #00a846; }
    .cp-mob-opt.active { background: #00c853; border-color: #00c853; color: #fff; }
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
    if (typeof renderCart === 'function') renderCart();
    updateBtn();
  }

  function updateBtn() {
    const btn = document.getElementById('currencyPickerBtn');
    if (btn) {
      const cur = CURRENCIES[current];
      btn.querySelector('.cp-flag').textContent = cur.flag;
      btn.querySelector('.cp-code').textContent = current;
      document.querySelectorAll('.cp-option').forEach(o => {
        o.classList.toggle('active', o.dataset.code === current);
      });
    }
    // Update mobile picker
    const mobFlag = document.getElementById('cpMobFlag');
    const mobCode = document.getElementById('cpMobCode');
    if (mobFlag) mobFlag.textContent = CURRENCIES[current].flag;
    if (mobCode) mobCode.textContent = current;
    document.querySelectorAll('.cp-mob-opt').forEach(o => {
      o.classList.toggle('active', o.dataset.code === current);
    });
  }

  function toggleMobile() {
    const grid  = document.getElementById('cpMobGrid');
    const arrow = document.getElementById('cpMobArrow');
    if (!grid) return;
    grid.classList.toggle('open');
    if (arrow) arrow.classList.toggle('open', grid.classList.contains('open'));
  }

  function injectMobile() {
    const slot = document.getElementById('mobileCurrencySlot');
    if (!slot) return;
    const cur = CURRENCIES[current];
    slot.innerHTML = `
      <div>
        <button class="cp-mob-btn" onclick="window.MB_CURRENCY.toggleMobile()">
          <span class="cp-mob-btn-left">
            <span id="cpMobFlag">${cur.flag}</span>
            <span id="cpMobCode">${current}</span>
          </span>
          <span class="cp-mob-btn-right">
            Change currency
            <span class="cp-mob-arrow" id="cpMobArrow">▼</span>
          </span>
        </button>
        <div class="cp-mob-grid" id="cpMobGrid">
          ${Object.entries(CURRENCIES).map(([code, c]) => `
            <button class="cp-mob-opt${code === current ? ' active' : ''}" data-code="${code}"
              onclick="window.MB_CURRENCY.set('${code}');window.MB_CURRENCY.toggleMobile()">
              <span>${c.flag}</span><span>${code}</span>
            </button>
          `).join('')}
        </div>
      </div>`;
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
    const arrow = `<svg class="cp-arrow" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5l3.5 3.5 3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    slot.innerHTML = `
      <div class="currency-picker" id="currencyPicker">
        <button class="cp-btn" id="currencyPickerBtn" onclick="window.MB_CURRENCY.toggle()">
          <span class="cp-flag">${cur.flag}</span>
          <span class="cp-code">${current}</span>
          ${arrow}
        </button>
        <div class="cp-dropdown" id="currencyDropdown">
          <div class="cp-header">Select Currency</div>
          <div class="cp-divider"></div>
          ${Object.entries(CURRENCIES).map(([code, c], i) => `
            <button class="cp-option${code === current ? ' active' : ''}" data-code="${code}"
              onclick="window.MB_CURRENCY.set('${code}')"
              style="animation-delay:${i * 0.045}s">
              <span class="cp-opt-flag">${c.flag}</span>
              <span class="cp-opt-code">${code}</span>
              <span class="cp-opt-name">${c.name}</span>
              ${code === current ? '<span class="cp-opt-check">✓</span>' : ''}
            </button>
          `).join('')}
        </div>
      </div>`;
  }

  async function init() {
    inject();
    injectMobile();
    applyToAll();
    await fetchRates();
    applyToAll();
  }

  window.MB_CURRENCY = { init, set, toggle, toggleMobile, formatPrice, get current() { return current; } };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
