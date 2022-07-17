const { Client, Intents } = require('discord.js');
require('dotenv').config();
const commands = require('./handlers/cmdHandler');
const events = require('./handlers/eventHandler');

const client = new Client({
	intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ]
});
module.exports = client;

client.on('ready', () => {
  commands(client);
  events(client);

  // client.user.setPresence({ activities: [{ name: 'discord.gg/avdanos', type: 'WATCHING' }] });
	// console.log('Start completed.');
});
client.login(process.env.DISCORD_TOKEN);
