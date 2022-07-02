const { Client, Intents } = require('discord.js');
require('dotenv').config();
const commands = require('./commands/cmdHandler');
const webhooks = require("./autoDevRecruitment/index")
const EventSource = require('eventsource')

const client = new Client({
	intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ]
});

events(client);
client.login(process.env.DISCORD_TOKEN);

const webhookProxyUrl = "https://smee.io/s4GOrijLPs24DYA";
const source = new EventSource(webhookProxyUrl);
source.onmessage = (event) => {
  const webhookEvent = JSON.parse(event.data);
  webhooks
    .verifyAndReceive({
      id: webhookEvent["x-request-id"],
      name: webhookEvent["x-github-event"],
      signature: webhookEvent["x-hub-signature"],
      payload: webhookEvent.body,
    })
    .catch(console.error);
};

//require("http").createServer(createNodeMiddleware(webhooks)).listen(3000);
