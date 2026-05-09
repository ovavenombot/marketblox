const initSqlJs = require('sql.js');
const fs  = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'marketblox.db');
let _db = null;

async function initDb() {
  if (_db) return;
  const SQL = await initSqlJs();
  _db = fs.existsSync(DB_PATH)
    ? new SQL.Database(fs.readFileSync(DB_PATH))
    : new SQL.Database();

  _db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT UNIQUE NOT NULL,
      discord_id TEXT,
      discord_username TEXT,
      roblox_username TEXT NOT NULL,
      email TEXT NOT NULL,
      items TEXT NOT NULL,
      subtotal REAL NOT NULL,
      fee REAL NOT NULL,
      total REAL NOT NULL,
      payment_method TEXT DEFAULT 'stripe',
      stripe_session_id TEXT,
      status TEXT DEFAULT 'pending',
      ticket_channel_id TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS staff (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      discord_id TEXT UNIQUE NOT NULL,
      username TEXT NOT NULL,
      rate REAL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS staff_hours (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      discord_id TEXT NOT NULL,
      shift_type TEXT NOT NULL,
      hours REAL NOT NULL,
      date TEXT DEFAULT (date('now')),
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS staff_payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      discord_id TEXT NOT NULL,
      amount REAL NOT NULL,
      note TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS proofs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      items_text TEXT,
      image_url TEXT,
      delivered_by TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Auto-save every 30 seconds and on exit
  setInterval(save, 30000);
  process.on('exit', save);
  process.on('SIGINT',  () => { save(); process.exit(0); });
  process.on('SIGTERM', () => { save(); process.exit(0); });

  console.log('✅ Database ready');
}

function save() {
  if (!_db) return;
  fs.writeFileSync(DB_PATH, Buffer.from(_db.export()));
}

// ── Compatibility layer matching better-sqlite3's .prepare().run/get/all ─────

function prepare(sql) {
  return {
    run(...args) {
      _db.run(sql, args.flat().map(v => v ?? null));
      save();
      const r = _db.exec('SELECT last_insert_rowid()');
      return { lastInsertRowid: r[0]?.values[0][0] ?? null };
    },
    get(...args) {
      const stmt = _db.prepare(sql);
      try {
        stmt.bind(args.flat().map(v => v ?? null));
        return stmt.step() ? stmt.getAsObject() : undefined;
      } finally { stmt.free(); }
    },
    all(...args) {
      const stmt = _db.prepare(sql);
      const rows = [];
      try {
        stmt.bind(args.flat().map(v => v ?? null));
        while (stmt.step()) rows.push(stmt.getAsObject());
      } finally { stmt.free(); }
      return rows;
    },
  };
}

const db = {
  prepare,
  exec(sql) { _db.exec(sql); },
  pragma() {},
};

module.exports = { initDb, db };
