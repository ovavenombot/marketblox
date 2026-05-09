// ================================
//   MARKETBLOX — AI CHAT WIDGET
// ================================

const MB_CHAT_URL = 'https://marketblox-production.up.railway.app/api/chat';

const MB_SYSTEM_PROMPT = `You are the MarketBlox Assistant — a helpful, friendly AI support bot for MarketBlox, a trusted Roblox items marketplace.

ABOUT MARKETBLOX:
- MarketBlox sells in-game items for popular Roblox games
- Instant delivery (1–5 minutes after payment)
- No password needed — we use a 100% safe trading method
- 24/7 live support available on Discord
- Website: marketblox.gg

GAMES & PRODUCTS WITH PRICES:

Steal A Brainrot (SAB):
- Los Mobilis — $3.67
- 67 — $3.99
- Celestial Pegasus — $29.99
- Tic Tac Sahur — $14.99
- Esok Sekolah — $4.99
- Hydra Dragon Cannelloni — $82.99
- Cursed Burguru & Fryuru — $149.99
- Money Money Puggy — $5.99
- Sigma Cat — $12.99

Blox Fruits:
- Permanent Dragon — $30.99
- Permanent Control — $25.00
- Permanent Kitsune — $24.00
- Permanent Yeti — $18.00
- Permanent Tiger — $17.00
- Permanent Dough — $15.00
- Permanent Mammoth — $13.75
- Permanent Spirit — $13.75
- Permanent Gas — $13.50
- Permanent Venom — $13.25
- Permanent T-Rex — $12.75
- Permanent Portal — $11.00
- Permanent Creation — $9.75
- Permanent Buddha — $8.50

Rivals:
- Legendary Key Bundle [x1.1k] — $33.67
- Ultra Key Bundle [x450] — $15.67
- Heavy Duty Bundle — $13.99
- Classic Bundle — $8.49
- +10 Season Pass Level — $7.49
- Pixel Bundle — $6.99
- Skin Case 1 [x3] — $5.89
- Skin Case 2 [x3] — $5.69
- Skin Case 3 [x3] — $5.69
- ExoGun Bundle — $4.99
- Prime Season Pass — $4.99 (was $6.99, 29% off)
- Medkit Bundle — $1.99
- RPG Bundle — $0.99

HOW TO ORDER:
1. Browse the shop and add items to cart
2. Complete secure checkout (card, PayPal, or crypto)
3. Join our Discord server after payment
4. Open a support ticket with your Roblox username + order ID
5. Receive your item in-game within minutes ⚡

PAYMENT METHODS: Visa, Mastercard, Amex, PayPal, Bitcoin (BTC), Ethereum (ETH), USDT, Solana (SOL), Google Pay

SUPPORT: Discord server — for any issues, refunds, or questions

REFUNDS: Refunds are handled on a case-by-case basis. Contact support on Discord within 24 hours.

PRODUCT LINKS (use these exact links — never make up URLs):

🧠 Steal A Brainrot:
- Los Mobilis $3.67 → product.html?id=los-mobilis
- 67 $3.99 → product.html?id=67
- Celestial Pegasus $29.99 → product.html?id=celestial-pegasus
- Tic Tac Sahur $14.99 → product.html?id=tic-tac-sahur
- Esok Sekolah $4.99 → product.html?id=esok-sekolah
- Hydra Dragon Cannelloni $82.99 → product.html?id=hydra-dragon
- Cursed Burguru & Fryuru $149.99 → product.html?id=cursed-burguru
- Money Money Puggy $5.99 → product.html?id=money-puggy
- Sigma Cat $12.99 → product.html?id=sigma-cat

🍎 Blox Fruits:
- Permanent Dragon $30.99 → product.html?id=bf-permanent-dragon
- Permanent Control $25.00 → product.html?id=bf-permanent-control
- Permanent Kitsune $24.00 → product.html?id=bf-permanent-kitsune
- Permanent Yeti $18.00 → product.html?id=bf-permanent-yeti
- Permanent Tiger $17.00 → product.html?id=bf-permanent-tiger
- Permanent Dough $15.00 → product.html?id=bf-permanent-dough
- Permanent Mammoth $13.75 → product.html?id=bf-permanent-mammoth
- Permanent Spirit $13.75 → product.html?id=bf-permanent-spirit
- Permanent Gas $13.50 → product.html?id=bf-permanent-gas
- Permanent Venom $13.25 → product.html?id=bf-permanent-venom
- Permanent T-Rex $12.75 → product.html?id=bf-permanent-t-rex
- Permanent Portal $11.00 → product.html?id=bf-permanent-portal
- Permanent Creation $9.75 → product.html?id=bf-permanent-creation
- Permanent Buddha $8.50 → product.html?id=bf-permanent-buddha

⚔️ Rivals:
- Legendary Key Bundle [x1.1k] $33.67 → product.html?id=rivals-legendary-key
- Ultra Key Bundle [x450] $15.67 → product.html?id=rivals-ultra-key
- Heavy Duty Bundle $13.99 → product.html?id=rivals-heavy-duty
- Classic Bundle $8.49 → product.html?id=rivals-classic-bundle
- +10 Season Pass Level $7.49 → product.html?id=rivals-season-pass-level
- Pixel Bundle $6.99 → product.html?id=rivals-pixel-bundle
- Skin Case 1 [x3] $5.89 → product.html?id=rivals-skin-case-1
- Skin Case 2 [x3] $5.69 → product.html?id=rivals-skin-case-2
- Skin Case 3 [x3] $5.69 → product.html?id=rivals-skin-case-3
- ExoGun Bundle $4.99 → product.html?id=rivals-exogun-bundle
- Prime Season Pass $4.99 → product.html?id=rivals-prime-season-pass
- Medkit Bundle $1.99 → product.html?id=rivals-medkit-bundle
- RPG Bundle $0.99 → product.html?id=rivals-rpg-bundle

STRICT RULES — NEVER BREAK:
- NEVER say an item was delivered, sent, or added to cart — you cannot do this, only the website can
- NEVER pretend to process a payment, order, or delivery
- NEVER make up URLs — only use the exact product.html links listed above
- NEVER link to any external site (no petmart.fun, shoplox.fun, or any other domain)
- If a user says they paid, tell them: "Join our Discord and open a support ticket with your Roblox username and order ID. We'll deliver within minutes! 💬"
- When listing products, always format as: "• Name — $X.XX → [Buy here](product.html?id=ID)"
- Be friendly, concise, use emojis occasionally
- Answer in the same language the user writes in
- Keep responses short (2-4 sentences unless listing products)`;

const mbConversation = [];

// ── Keyword fallback (used if no API key) ─────────────────────────────────
const MB_FALLBACK = [
  { words: ['deliver', 'how long', 'fast', 'quick', 'time', 'instant'], a: '⚡ Delivery is <strong>instant</strong>! Most orders are completed within 1–5 minutes after payment, 24/7.' },
  { words: ['receive', 'how do i get', 'get my', 'redeem', 'claim', 'steps', 'after pay'], a: '📦 After checkout: join our Discord, open a ticket with your Roblox username and order ID, and we\'ll deliver your item in-game within minutes. No password needed!' },
  { words: ['legit', 'safe', 'trust', 'scam', 'real', 'fake', 'reliable'], a: '✅ 100% legit and safe! We use encrypted payments, a no-password trade method, and have delivered to thousands of satisfied customers.' },
  { words: ['pay', 'payment', 'card', 'crypto', 'bitcoin', 'paypal', 'visa', 'method', 'accept'], a: '💳 We accept Visa, Mastercard, Amex, PayPal, Bitcoin, Ethereum, USDT, Solana, and Google Pay.' },
  { words: ['promo', 'discount', 'coupon', 'code', 'deal', 'sale', 'cheaper', 'offer'], a: '🎉 Join our Discord for exclusive promo codes and flash sales. Members get early access to deals!' },
  { words: ["didn't receive", 'not receive', "didn't get", 'no item', 'missing', 'problem', 'issue', 'wrong', 'help'], a: '😟 Sorry! Please click "Talk to a Live Agent" below and open a Discord ticket. Share your order ID and we\'ll fix it immediately — usually within minutes.' },
  { words: ['price', 'cost', 'how much', 'dragon', 'blox fruit', 'permanent'], a: '🍎 Blox Fruits prices range from $8.50 (Permanent Buddha) to $30.99 (Permanent Dragon). Check the shop page for all prices!' },
  { words: ['rivals', 'key', 'season pass', 'bundle'], a: '⚔️ Rivals items range from $0.99 (RPG Bundle) to $33.67 (Legendary Key Bundle x1.1k). Visit the Rivals shop for the full list!' },
  { words: ['brainrot', 'sab', 'mobilis', 'pegasus', 'burguru'], a: '🧠 Steal A Brainrot items range from $3.67 (Los Mobilis) to $149.99 (Cursed Burguru & Fryuru). Visit the SAB shop for all items!' },
  { words: ['refund', 'money back', 'return', 'cancel'], a: '💰 Refunds are handled case-by-case within 24 hours of purchase. Open a ticket on our Discord and our team will assist you.' },
  { words: ['discord', 'contact', 'support', 'agent', 'human', 'person'], a: '💬 Click "Talk to a Live Agent" below to reach our Discord support team. We\'re online 24/7!' },
  { words: ['password', 'account', 'login', 'roblox account'], a: '🔒 We <strong>never</strong> ask for your password! We use a 100% safe in-game trade method. Your account is always secure.' },
  { words: ['game', 'games', 'what game', 'which game', 'available'], a: '🎮 We currently support: Steal A Brainrot, Blox Fruits, and Rivals. More games coming soon!' },
];

function mbFallbackReply(msg) {
  const lower = msg.toLowerCase();
  for (const { words, a } of MB_FALLBACK) {
    if (words.some(w => lower.includes(w))) return a;
  }
  return '🤔 I\'m not sure about that! Click <strong>"Talk to a Live Agent"</strong> below and our support team will help you right away on Discord. ⚡';
}

// ── AI call via Groq (free, fast, no restrictions) ───────────────────────
async function mbCallAI(userMessage) {
  mbConversation.push({ role: 'user', content: userMessage });

  const messages = [
    { role: 'system', content: MB_SYSTEM_PROMPT },
    ...mbConversation.slice(-8),
  ];

  const res = await fetch(MB_CHAT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || 'API error ' + res.status);
  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error('Empty reply');
  mbConversation.push({ role: 'assistant', content: reply });
  return reply;
}

// ── Widget HTML injection ─────────────────────────────────────────────────
(function injectChatWidget() {
  const html = `
    <button class="mb-chat-btn" id="mbChatBtn" aria-label="Open Chat">
      <svg class="icon-chat" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </svg>
      <svg class="icon-close" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
      <div class="mb-chat-notif" id="mbChatNotif">1</div>
    </button>

    <div class="mb-chat-widget" id="mbChatWidget">
      <div class="mb-chat-header">
        <div class="mb-chat-avatar">
          <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="8" fill="white" fill-opacity="0.2"/>
            <rect x="5" y="5" width="7" height="7" rx="2" fill="white"/>
            <rect x="16" y="5" width="7" height="7" rx="2" fill="white" opacity="0.6"/>
            <rect x="5" y="16" width="7" height="7" rx="2" fill="white" opacity="0.6"/>
            <rect x="16" y="16" width="7" height="7" rx="2" fill="white"/>
          </svg>
        </div>
        <div class="mb-chat-header-info">
          <div class="mb-chat-bot-name">MarketBlox Assistant</div>
          <div class="mb-chat-status"><span class="mb-chat-status-dot"></span> Online — 24/7</div>
        </div>
        <button class="mb-chat-close" onclick="toggleChat()">✕</button>
      </div>

      <div class="mb-chat-messages" id="mbChatMessages"></div>

      <div class="mb-quick-questions" id="mbQuickQuestions">
        <div class="mb-qq-label">POPULAR QUESTIONS</div>
        <button class="mb-qq-btn" onclick="mbAskQuestion('How long does delivery take?')">How long does delivery take?</button>
        <button class="mb-qq-btn" onclick="mbAskQuestion('How do I receive my order?')">How do I receive my order?</button>
        <button class="mb-qq-btn" onclick="mbAskQuestion('Is MarketBlox legit and safe?')">Is MarketBlox legit?</button>
        <button class="mb-qq-btn" onclick="mbAskQuestion('What payment methods do you accept?')">What payment methods do you accept?</button>
        <button class="mb-qq-btn" onclick="mbAskQuestion('Do you have any promo codes or discounts?')">Do you have promo codes?</button>
        <button class="mb-qq-btn" onclick="mbAskQuestion('I did not receive my order, what do I do?')">I didn't receive my order</button>
      </div>

      <div class="mb-chat-input-row">
        <input class="mb-chat-input" id="mbChatInput" type="text" placeholder="Type your message..." autocomplete="off"/>
        <button class="mb-chat-send" id="mbSendBtn" onclick="mbSendChat()">Send</button>
      </div>
      <button class="mb-live-agent" onclick="window.open('https://discord.gg/muHRWMqpr8','_blank')">
        <span class="mb-live-agent-dot"></span> Talk to a Live Agent
      </button>
    </div>
  `;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  document.getElementById('mbChatBtn').addEventListener('click', toggleChat);
  document.getElementById('mbChatInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') mbSendChat();
  });

  setTimeout(() => mbAddBotMessage('👋 Hi! I\'m the <strong>MarketBlox AI Assistant</strong>. Ask me anything about our products, delivery, payments, or how to order!'), 700);
})();

function toggleChat() {
  const btn = document.getElementById('mbChatBtn');
  const widget = document.getElementById('mbChatWidget');
  const notif = document.getElementById('mbChatNotif');
  btn.classList.toggle('open');
  widget.classList.toggle('open');
  if (notif) notif.style.display = 'none';
}

function mbFormatMessage(text) {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:#00c853;font-weight:700;text-decoration:underline;">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function mbAddBotMessage(text) {
  const msgs = document.getElementById('mbChatMessages');
  const div = document.createElement('div');
  div.className = 'mb-msg bot';
  div.innerHTML = `<div class="mb-msg-bubble">${mbFormatMessage(text)}</div><div class="mb-msg-label">MarketBlox Bot</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function mbAddUserMessage(text) {
  const msgs = document.getElementById('mbChatMessages');
  const div = document.createElement('div');
  div.className = 'mb-msg user';
  div.innerHTML = `<div class="mb-msg-bubble">${text}</div><div class="mb-msg-label">You</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function mbShowTyping() {
  const msgs = document.getElementById('mbChatMessages');
  const div = document.createElement('div');
  div.className = 'mb-msg bot mb-typing';
  div.id = 'mbTypingIndicator';
  div.innerHTML = `<div class="mb-msg-bubble"><div class="mb-typing-dot"></div><div class="mb-typing-dot"></div><div class="mb-typing-dot"></div></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function mbHideTyping() {
  const t = document.getElementById('mbTypingIndicator');
  if (t) t.remove();
}

function mbSetSending(state) {
  const btn = document.getElementById('mbSendBtn');
  const input = document.getElementById('mbChatInput');
  btn.disabled = state;
  input.disabled = state;
}

function mbHideQuickQuestions() {
  const qq = document.getElementById('mbQuickQuestions');
  if (qq) qq.style.display = 'none';
}

async function mbAskQuestion(question) {
  mbHideQuickQuestions();
  mbAddUserMessage(question);
  await mbGetReply(question);
}

async function mbSendChat() {
  const input = document.getElementById('mbChatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  mbHideQuickQuestions();
  mbAddUserMessage(text);
  await mbGetReply(text);
}

async function mbGetReply(message) {
  mbSetSending(true);
  mbShowTyping();

  try {
    const reply = await mbCallAI(message);
    mbHideTyping();
    mbAddBotMessage(reply);
  } catch (err) {
    console.error('MarketBlox AI error:', err);
    mbHideTyping();
    mbAddBotMessage(mbFallbackReply(message));
  }

  mbSetSending(false);
}
