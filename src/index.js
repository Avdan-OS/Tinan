const { Client, Intents } = require('discord.js');
require('dotenv').config();
const commands = require('./commands/cmdHandler');
const client = new Client({
	intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ]
});
module.exports = client;

client.on('ready', () => {
  commands(client);
  console.log('Start completed.');
  client.user.setPresence({ activities: [{ name: 'discord.gg/avdanos', type: 'WATCHING' }] });
  const statusArray = [
    'discord.gg/avdanos, WATCHING','Some avdan videos, WATCHING','Visual Studio Code, PLAYING','twitter.com/avdan_os, WATCHING'
]
setInterval(() => {
    const random = statusArray[Math.floor(Math.random()* statusArray.length)].split(', ')
    const status = random[0]
    const mode = random[1]
    client.user.setActivity(status, {type: mode})
        }, 10000)
})
  //client.user.setPresence({ activities: [{ name: 'discord.gg/avdanos', type: 'WATCHING' }] });
client.login(process.env.DISCORD_TOKEN);


