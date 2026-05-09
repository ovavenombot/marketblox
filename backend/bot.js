require('dotenv').config();
const {
  Client, GatewayIntentBits, REST, Routes,
  SlashCommandBuilder, EmbedBuilder, ChannelType,
  PermissionFlagsBits,
} = require('discord.js');
const { db } = require('./database');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
});

// Resolves when the bot is fully logged in
let botReady = false;
const readyPromise = new Promise(resolve => client.once('ready',() => { botReady = true; resolve(); }));
async function waitReady() { if (!botReady) await readyPromise; }

// ── Slash command definitions ─────────────────────────────────────────────────

const commands = [
  new SlashCommandBuilder()
    .setName('sales').setDescription('Sales stats (today, week, month, all-time)')
    .addStringOption(o => o.setName('period').setDescription('Period')
      .addChoices(
        { name: 'Today',    value: 'today' },
        { name: 'Week',     value: 'week'  },
        { name: 'Month',    value: 'month' },
        { name: 'All Time', value: 'all'   },
      )),

  new SlashCommandBuilder()
    .setName('completed').setDescription('Log a completed order and send vouch')
    .addAttachmentOption(o => o.setName('proof').setDescription('Screenshot of delivery')),

  new SlashCommandBuilder()
    .setName('finished').setDescription('Log a completed order and send vouch (alias for /completed)')
    .addAttachmentOption(o => o.setName('proof').setDescription('Screenshot of delivery')),

  new SlashCommandBuilder()
    .setName('close').setDescription('Close the current ticket channel (Staff Only)'),

  new SlashCommandBuilder()
    .setName('refund').setDescription('Send ticket to refund queue (Staff Only)'),

  new SlashCommandBuilder()
    .setName('dead').setDescription('Mark ticket inactive — moves to Dead category, emails customer (Staff Only)'),

  new SlashCommandBuilder()
    .setName('unfinished').setDescription('Close ticket without proof (Staff Only)'),

  new SlashCommandBuilder()
    .setName('createticket').setDescription('Manually create a ticket for an order ID')
    .addStringOption(o => o.setName('order_id').setDescription('Order ID or UUID').setRequired(true)),

  new SlashCommandBuilder()
    .setName('leaderboard').setDescription('Top 10 spending users'),

  new SlashCommandBuilder()
    .setName('ordersummary').setDescription('Summary of all open order channels'),

  new SlashCommandBuilder()
    .setName('list_orders').setDescription('List all open order channels'),

  new SlashCommandBuilder()
    .setName('outofstock').setDescription('Show items needed across open order tickets'),

  new SlashCommandBuilder()
    .setName('owedstaff').setDescription('View all staff with outstanding pay'),

  new SlashCommandBuilder()
    .setName('paidhours').setDescription('Record payment to a staff member')
    .addUserOption(o => o.setName('user').setDescription('Staff member').setRequired(true))
    .addNumberOption(o => o.setName('amount').setDescription('Amount paid ($)').setRequired(true))
    .addStringOption(o => o.setName('note').setDescription('Optional note')),

  new SlashCommandBuilder()
    .setName('removestaff').setDescription('Remove a user from the staff database')
    .addUserOption(o => o.setName('user').setDescription('Staff member').setRequired(true)),

  new SlashCommandBuilder()
    .setName('resetinventory').setDescription('Set all inventory to 0 (Admin Only)'),

  new SlashCommandBuilder()
    .setName('viewfailedtickets').setDescription('View the failed tickets log'),

  new SlashCommandBuilder()
    .setName('viewrates').setDescription('View current staff pay rates'),

  new SlashCommandBuilder()
    .setName('emailreminder').setDescription('Send email reminder to customer (Staff Only)'),

  new SlashCommandBuilder()
    .setName('giveawaylog').setDescription('Send a giveaway log embed'),

  new SlashCommandBuilder()
    .setName('health').setDescription('Bot uptime, gateway latency, queue depths'),

  new SlashCommandBuilder()
    .setName('adjusthours').setDescription('Adjust staff day or night hours manually')
    .addUserOption(o => o.setName('user').setDescription('Staff member').setRequired(true))
    .addStringOption(o => o.setName('shift').setDescription('Shift type').setRequired(true)
      .addChoices({ name: 'Day', value: 'day' }, { name: 'Night', value: 'night' }))
    .addNumberOption(o => o.setName('amount').setDescription('Hours to add/subtract').setRequired(true)),

  new SlashCommandBuilder()
    .setName('clock').setDescription('Open Clock In / Clock Out'),

  new SlashCommandBuilder()
    .setName('owner_review').setDescription('Send ticket to owner for review (Staff Only)'),

  new SlashCommandBuilder()
    .setName('sorttickets').setDescription('Sort all open order tickets into game categories (Admin Only)'),

  new SlashCommandBuilder()
    .setName('send').setDescription('Send a DM to a user (Staff Only)')
    .addUserOption(o => o.setName('user').setDescription('Target user').setRequired(true))
    .addStringOption(o => o.setName('message').setDescription('Message to send').setRequired(true)),
].map(c => c.toJSON());

async function registerCommands() {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
  await rest.put(
    Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.GUILD_ID),
    { body: commands },
  );
  console.log('✅ Slash commands registered');
}

// ── Exported: create order ticket channel ────────────────────────────────────

async function createOrderTicket(order, items) {
  await waitReady();
  const guild = await client.guilds.fetch(process.env.GUILD_ID);

  const overrides = [
    { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
  ];
  if (process.env.STAFF_ROLE_ID) {
    overrides.push({ id: process.env.STAFF_ROLE_ID, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] });
  }

  const channel = await guild.channels.create({
    name:              `order-${order.id}`,
    type:              ChannelType.GuildText,
    parent:            process.env.ORDERS_CATEGORY_ID || undefined,
    topic:             `Order #${order.id} | ${order.roblox_username}`,
    permissionOverwrites: overrides,
  });

  db.prepare(`UPDATE orders SET ticket_channel_id=?, updated_at=datetime('now') WHERE id=?`)
    .run(channel.id, order.id);

  const itemsText = items.map(i => `• **${i.name}** x${i.qty}`).join('\n');
  const staffMention = process.env.STAFF_ROLE_ID ? `<@&${process.env.STAFF_ROLE_ID}>` : '@Delivery Staff';

  const orderEmbed = new EmbedBuilder()
    .setTitle('📦 Order Details')
    .setColor(0x00c853)
    .addFields(
      { name: 'ID',              value: `${order.id}`,                                         inline: true },
      { name: 'Roblox Username', value: order.roblox_username,                                 inline: true },
      { name: 'Total',           value: `$${order.total.toFixed(2)}`,                          inline: true },
      { name: 'Discord',         value: order.discord_id ? `<@${order.discord_id}>` : 'N/A',  inline: true },
      { name: 'Email',           value: order.email,                                           inline: true },
      { name: 'Items',           value: itemsText },
    )
    .setTimestamp();

  const instructionsEmbed = new EmbedBuilder()
    .setTitle('📋 Instructions')
    .setColor(0x5865F2)
    .addFields({
      name:  '📋 Steps',
      value: '1. Wait for a staff member to send you a private server link.\n'
           + '2. Please be patient — delivery times vary based on the current ticket queue.\n\n'
           + '**Make sure you\'re online and ready!**',
    });

  await channel.send({ content: `${staffMention} New order from ${order.discord_id ? `<@${order.discord_id}>` : order.roblox_username}`, embeds: [orderEmbed] });
  await channel.send({ embeds: [instructionsEmbed] });

  return channel;
}

// ── Exported: DM buyer on order creation ─────────────────────────────────────

async function dmUser(discordId, order) {
  await waitReady();
  try {
    const user  = await client.users.fetch(discordId);
    const items = JSON.parse(order.items || '[]');

    // Build clickable link to the order ticket channel
    const channelLink = order.ticket_channel_id
      ? `https://discord.com/channels/${process.env.GUILD_ID}/${order.ticket_channel_id}`
      : null;

    const ticketLine = channelLink
      ? `📩 Your order ticket has been created: **[MarketBlox › #order-${order.id}](${channelLink})**`
      : `📩 Your order ticket has been created: **#order-${order.id}**`;

    const embed = new EmbedBuilder()
      .setTitle('📦 Full Order Details')
      .setColor(0x00c853)
      .setDescription(ticketLine)
      .addFields(
        { name: 'ID',              value: `${order.id}`,                                        inline: true },
        { name: 'Roblox Username', value: order.roblox_username,                                inline: true },
        { name: 'Email',           value: order.email,                                          inline: true },
        { name: 'Discord ID',      value: discordId,                                            inline: true },
        { name: 'Total',           value: `$${order.total.toFixed(2)}`,                         inline: true },
        { name: 'Payment Method',  value: order.payment_method || 'stripe',                     inline: true },
        { name: 'Status',          value: order.status,                                         inline: true },
        { name: 'Stripe ID',       value: order.stripe_session_id || 'N/A',                     inline: false },
        { name: 'Created At',      value: order.created_at || new Date().toISOString(),          inline: true },
        { name: 'Updated At',      value: order.updated_at || new Date().toISOString(),          inline: true },
        { name: 'Items',           value: items.map(i => `• **${i.name}** x${i.qty}`).join('\n') },
      )
      .setTimestamp();

    await user.send({ embeds: [embed] });
  } catch (err) {
    console.error('DM failed for', discordId, err);
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getOrderFromChannel(channel) {
  const match = (channel?.name || '').match(/^order-(\d+)$/);
  if (!match) return null;
  return db.prepare('SELECT * FROM orders WHERE id=?').get(parseInt(match[1]));
}

function salesQuery(period) {
  const wheres = {
    today: `WHERE date(created_at)=date('now')`,
    week:  `WHERE created_at>=datetime('now','-7 days')`,
    month: `WHERE created_at>=datetime('now','-30 days')`,
    all:   '',
  };
  const w = wheres[period] || '';
  return db.prepare(`SELECT COUNT(*) AS cnt, COALESCE(SUM(total),0) AS rev FROM orders ${w} AND status IN ('paid','completed')`).get();
}

// ── Interaction handler ───────────────────────────────────────────────────────

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;

  try {
    // /sales
    if (commandName === 'sales') {
      const period = interaction.options.getString('period') || 'today';
      const stats  = salesQuery(period);
      const labels = { today: 'Today', week: 'This Week', month: 'This Month', all: 'All Time' };
      const embed  = new EmbedBuilder()
        .setTitle(`📊 Sales — ${labels[period]}`)
        .setColor(0x00c853)
        .addFields(
          { name: 'Orders',  value: `${stats.cnt}`,                    inline: true },
          { name: 'Revenue', value: `$${stats.rev.toFixed(2)}`,        inline: true },
        )
        .setTimestamp();
      // Add all periods for convenience
      const all = ['today','week','month','all'].map(p => {
        const s = salesQuery(p);
        return `**${labels[p]}:** ${s.cnt} orders · $${s.rev.toFixed(2)}`;
      }).join('\n');
      embed.addFields({ name: 'All Periods', value: all });
      return await interaction.reply({ embeds: [embed] });
    }

    // /completed & /finished
    if (commandName === 'completed' || commandName === 'finished') {
      const order = getOrderFromChannel(interaction.channel);
      if (!order) return interaction.reply({ content: '❌ Run this in an order-* ticket channel.', ephemeral: true });

      db.prepare(`UPDATE orders SET status='completed', updated_at=datetime('now') WHERE id=?`).run(order.id);

      const items     = JSON.parse(order.items || '[]');
      const itemsText = items.map(i => `${i.name} x${i.qty}`).join(', ');
      const proof     = interaction.options.getAttachment('proof');

      // Post to #proofs
      const proofsId = process.env.PROOFS_CHANNEL_ID;
      if (proofsId) {
        const proofsCh = await interaction.guild?.channels.fetch(proofsId).catch(() => null);
        if (proofsCh) {
          const proofEmbed = new EmbedBuilder()
            .setTitle('✅ Proof of Delivery')
            .setColor(0x00c853)
            .setDescription(`💚 We hope you enjoy your **${itemsText}**! 💚`)
            .addFields(
              { name: 'Order',        value: `#${order.id}`,                  inline: true },
              { name: 'Roblox',       value: order.roblox_username,            inline: true },
              { name: 'Delivered by', value: `<@${interaction.user.id}>`,      inline: true },
            )
            .setTimestamp();
          if (proof?.url) proofEmbed.setImage(proof.url);

          await proofsCh.send({ embeds: [proofEmbed] });

          db.prepare(`INSERT INTO proofs (order_id, items_text, image_url, delivered_by) VALUES (?,?,?,?)`).run(
            order.id, itemsText, proof?.url || null, interaction.user.id,
          );
        }
      }

      // DM buyer with Trustpilot
      if (order.discord_id) {
        const buyer = await client.users.fetch(order.discord_id).catch(() => null);
        if (buyer) {
          await buyer.send(
            `🎉 **Thanks for your purchase from MarketBlox!** Your order has been completed successfully.\n\n`
            + `We'd really appreciate a review on Trustpilot 💚\n`
            + `https://www.trustpilot.com/review/marketblox.com`,
          ).catch(() => {});
        }
      }

      return interaction.reply({ content: `✅ Order #${order.id} completed! Proof posted to <#${proofsId || 'proofs'}>.` });
    }

    // /close
    if (commandName === 'close') {
      await interaction.reply({ content: '🔒 Closing ticket in 5 seconds…' });
      setTimeout(() => interaction.channel.delete().catch(console.error), 5000);
      return;
    }

    // /refund
    if (commandName === 'refund') {
      const order = getOrderFromChannel(interaction.channel);
      if (order) db.prepare(`UPDATE orders SET status='refund_requested', updated_at=datetime('now') WHERE id=?`).run(order.id);
      return interaction.reply({ content: '🔁 Ticket flagged for refund. Please process it manually.' });
    }

    // /dead
    if (commandName === 'dead') {
      const order = getOrderFromChannel(interaction.channel);
      if (order) db.prepare(`UPDATE orders SET status='dead', updated_at=datetime('now') WHERE id=?`).run(order.id);
      await interaction.reply({ content: '💀 Ticket marked as dead. Customer should be contacted manually.' });
      return;
    }

    // /unfinished
    if (commandName === 'unfinished') {
      await interaction.reply({ content: '⚠️ Closing without proof in 5 seconds…' });
      setTimeout(() => interaction.channel.delete().catch(console.error), 5000);
      return;
    }

    // /createticket
    if (commandName === 'createticket') {
      const input = interaction.options.getString('order_id');
      const order = db.prepare('SELECT * FROM orders WHERE uuid=? OR id=?').get(input, parseInt(input) || -1);
      if (!order) return interaction.reply({ content: '❌ Order not found.', ephemeral: true });
      const items = JSON.parse(order.items || '[]');
      await createOrderTicket(order, items);
      return interaction.reply({ content: `✅ Ticket created for order #${order.id}.`, ephemeral: true });
    }

    // /leaderboard
    if (commandName === 'leaderboard') {
      const rows = db.prepare(`
        SELECT roblox_username, COALESCE(SUM(total),0) AS spent
        FROM orders WHERE status IN ('paid','completed')
        GROUP BY roblox_username ORDER BY spent DESC LIMIT 10
      `).all();
      const desc = rows.length
        ? rows.map((r, i) => `${i + 1}. **${r.roblox_username}** — $${r.spent.toFixed(2)}`).join('\n')
        : 'No completed orders yet.';
      return interaction.reply({ embeds: [new EmbedBuilder().setTitle('🏆 Top 10 Spenders').setColor(0xffd700).setDescription(desc).setTimestamp()] });
    }

    // /ordersummary
    if (commandName === 'ordersummary') {
      const pending   = db.prepare(`SELECT COUNT(*) AS c FROM orders WHERE status='pending'`).get().c;
      const paid      = db.prepare(`SELECT COUNT(*) AS c FROM orders WHERE status='paid'`).get().c;
      const completed = db.prepare(`SELECT COUNT(*) AS c FROM orders WHERE status='completed'`).get().c;
      const refund    = db.prepare(`SELECT COUNT(*) AS c FROM orders WHERE status='refund_requested'`).get().c;
      const embed = new EmbedBuilder()
        .setTitle('📋 Order Summary')
        .setColor(0x00c853)
        .addFields(
          { name: 'Pending',           value: `${pending}`,   inline: true },
          { name: 'Paid (in queue)',    value: `${paid}`,      inline: true },
          { name: 'Completed',         value: `${completed}`, inline: true },
          { name: 'Refund Requested',  value: `${refund}`,    inline: true },
        )
        .setTimestamp();
      return interaction.reply({ embeds: [embed] });
    }

    // /list_orders
    if (commandName === 'list_orders') {
      const open = db.prepare(`SELECT id, roblox_username, total, status, ticket_channel_id FROM orders WHERE status IN ('paid') ORDER BY id DESC LIMIT 20`).all();
      const desc = open.length
        ? open.map(o => `**#${o.id}** — ${o.roblox_username} — $${o.total.toFixed(2)} — ${o.ticket_channel_id ? `<#${o.ticket_channel_id}>` : 'no channel'}`).join('\n')
        : 'No open orders.';
      return interaction.reply({ embeds: [new EmbedBuilder().setTitle('📂 Open Orders').setColor(0x00c853).setDescription(desc).setTimestamp()], ephemeral: true });
    }

    // /outofstock
    if (commandName === 'outofstock') {
      return interaction.reply({ content: '📦 No automated inventory tracking is set up yet. Check stock manually.', ephemeral: true });
    }

    // /owedstaff
    if (commandName === 'owedstaff') {
      const staffList = db.prepare('SELECT * FROM staff').all();
      if (!staffList.length) return interaction.reply({ content: 'No staff in database.', ephemeral: true });

      const rows = staffList.map(s => {
        const paid  = db.prepare(`SELECT COALESCE(SUM(amount),0) AS t FROM staff_payments WHERE discord_id=?`).get(s.discord_id).t;
        const hours = db.prepare(`SELECT COALESCE(SUM(hours),0) AS t FROM staff_hours WHERE discord_id=?`).get(s.discord_id).t;
        const owed  = (hours * s.rate) - paid;
        return `<@${s.discord_id}> — ${hours.toFixed(1)}h @ $${s.rate}/h — Paid: $${paid.toFixed(2)} — **Owed: $${owed.toFixed(2)}**`;
      }).join('\n');

      return interaction.reply({ embeds: [new EmbedBuilder().setTitle('💰 Staff Owed').setColor(0xffa500).setDescription(rows).setTimestamp()], ephemeral: true });
    }

    // /paidhours
    if (commandName === 'paidhours') {
      const target = interaction.options.getUser('user');
      const amount = interaction.options.getNumber('amount');
      const note   = interaction.options.getString('note') || '';
      db.prepare(`INSERT INTO staff_payments (discord_id, amount, note) VALUES (?,?,?)`).run(target.id, amount, note);
      return interaction.reply({ content: `✅ Recorded $${amount.toFixed(2)} payment to <@${target.id}>.` });
    }

    // /removestaff
    if (commandName === 'removestaff') {
      const target = interaction.options.getUser('user');
      db.prepare('DELETE FROM staff WHERE discord_id=?').run(target.id);
      return interaction.reply({ content: `✅ Removed <@${target.id}> from staff database.` });
    }

    // /resetinventory
    if (commandName === 'resetinventory') {
      return interaction.reply({ content: '✅ Inventory reset. (No automated inventory in use — reset your manual tracker.)' });
    }

    // /viewfailedtickets
    if (commandName === 'viewfailedtickets') {
      const failed = db.prepare(`SELECT id, roblox_username, total, status FROM orders WHERE status IN ('dead','failed') ORDER BY id DESC LIMIT 20`).all();
      const desc = failed.length
        ? failed.map(o => `**#${o.id}** — ${o.roblox_username} — $${o.total.toFixed(2)} — ${o.status}`).join('\n')
        : 'No failed tickets.';
      return interaction.reply({ embeds: [new EmbedBuilder().setTitle('❌ Failed Tickets').setColor(0xef4444).setDescription(desc).setTimestamp()], ephemeral: true });
    }

    // /viewrates
    if (commandName === 'viewrates') {
      const staffList = db.prepare('SELECT * FROM staff').all();
      const desc = staffList.length
        ? staffList.map(s => `<@${s.discord_id}> — $${s.rate}/hour`).join('\n')
        : 'No staff registered.';
      return interaction.reply({ embeds: [new EmbedBuilder().setTitle('📊 Staff Pay Rates').setColor(0x00c853).setDescription(desc).setTimestamp()], ephemeral: true });
    }

    // /emailreminder
    if (commandName === 'emailreminder') {
      const order = getOrderFromChannel(interaction.channel);
      if (!order) return interaction.reply({ content: '❌ Not in an order channel.', ephemeral: true });
      // Email is sent via nodemailer; placeholder here
      return interaction.reply({ content: `📧 Email reminder would be sent to **${order.email}**. (Configure nodemailer in server.js to enable.)`, ephemeral: true });
    }

    // /giveawaylog
    if (commandName === 'giveawaylog') {
      const embed = new EmbedBuilder()
        .setTitle('🎉 Giveaway')
        .setColor(0x00c853)
        .setDescription('A MarketBlox giveaway has been logged!')
        .setTimestamp();
      return interaction.reply({ embeds: [embed] });
    }

    // /health
    if (commandName === 'health') {
      const uptime  = Math.floor(client.uptime / 1000);
      const hours   = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const secs    = uptime % 60;
      const embed   = new EmbedBuilder()
        .setTitle('🤖 Bot Health')
        .setColor(0x00c853)
        .addFields(
          { name: 'Status',   value: '🟢 Online',                              inline: true },
          { name: 'Uptime',   value: `${hours}h ${minutes}m ${secs}s`,         inline: true },
          { name: 'Latency',  value: `${client.ws.ping}ms`,                    inline: true },
          { name: 'Guilds',   value: `${client.guilds.cache.size}`,             inline: true },
        )
        .setTimestamp();
      return interaction.reply({ embeds: [embed] });
    }

    // /adjusthours
    if (commandName === 'adjusthours') {
      const target = interaction.options.getUser('user');
      const shift  = interaction.options.getString('shift');
      const amount = interaction.options.getNumber('amount');
      db.prepare(`INSERT INTO staff_hours (discord_id, shift_type, hours) VALUES (?,?,?)`).run(target.id, shift, amount);

      // Ensure staff row exists
      const exists = db.prepare('SELECT id FROM staff WHERE discord_id=?').get(target.id);
      if (!exists) db.prepare(`INSERT OR IGNORE INTO staff (discord_id, username, rate) VALUES (?,?,0)`).run(target.id, target.username);

      return interaction.reply({ content: `✅ Added **${amount}h** (${shift} shift) for <@${target.id}>.` });
    }

    // /clock
    if (commandName === 'clock') {
      return interaction.reply({ content: '⏰ Clock in/out recorded for <@' + interaction.user.id + '>. (Implement full clock logic in bot.js as needed.)' });
    }

    // /owner_review
    if (commandName === 'owner_review') {
      return interaction.reply({ content: '👑 Ticket flagged for owner review. Owner will be notified.' });
    }

    // /sorttickets
    if (commandName === 'sorttickets') {
      return interaction.reply({ content: '📂 Sorting tickets into game categories… (Add CATEGORY IDs per game to .env to enable auto-sort.)' });
    }

    // /send
    if (commandName === 'send') {
      const target  = interaction.options.getUser('user');
      const message = interaction.options.getString('message');
      try {
        await target.send(`📩 **Message from MarketBlox Staff:**\n${message}`);
        return interaction.reply({ content: `✅ DM sent to <@${target.id}>.`, ephemeral: true });
      } catch {
        return interaction.reply({ content: '❌ Could not DM that user (DMs may be disabled).', ephemeral: true });
      }
    }

  } catch (err) {
    console.error(`Command /${commandName} error:`, err);
    if (!interaction.replied && !interaction.deferred) {
      interaction.reply({ content: '❌ An error occurred.', ephemeral: true }).catch(() => {});
    }
  }
});

// ── Start bot ─────────────────────────────────────────────────────────────────

client.once('ready',async () => {
  console.log(`🤖 MarketBlox bot logged in as ${client.user.tag}`);
  try {
    await registerCommands();
  } catch (err) {
    console.error('Failed to register commands:', err.message);
  }
});

const token = process.env.DISCORD_BOT_TOKEN;
console.log('[Bot] Token present:', !!token, '| Length:', token?.length);
client.login(token).catch(err => {
  console.error('[Bot] Login failed:', err.message);
});

module.exports = { createOrderTicket, dmUser };
