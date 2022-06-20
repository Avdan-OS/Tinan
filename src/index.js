const { Client, Intents } = require('discord.js');
require('dotenv').config();
const events = require('./handlers/eventHandler');

const client = new Client({
	intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ]
});

events(client);
client.login(process.env.DISCORD_TOKEN);
