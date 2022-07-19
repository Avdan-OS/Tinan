const { EmbedBuilder, InteractionType, Colors } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

module.exports = async (client) => {
  global.pollsList = {};
  
  global.multiReact = async (msg, ...reactions) => {
    for (let i of reactions) {
      if (typeof i !== 'object') for (let reaction of i) { if (reaction !== ' ') {
        try { 
          await msg.react(reaction);
        } catch (A) {}
      }} else await msg.react(i);
    }
  }

  client.on('messageCreate', async (message) => {
    const goosStanding = await message.guild.emojis.fetch('993799647015481397').catch(() => { return '🦆' });

    const events = [
      [['bread'], async () => {
        await multiReact(message, '🍞🇧🇷🇪🇦🇩👍')
      }],
      [['honk'], async () => {
        await multiReact(message, goosStanding, '🇭🇴🇳🇰👍')
      }],
      [['akane', 'akane cat'], async () => {
        await multiReact(message, '🅰️ 🇰 🇦 🇳 🇪 🐱')
      }],
      [['pineapple'], () => message.react('🍍')],
      [['forgor'], () => message.react('💀')],
      [['cheese'], () => message.react('🧀')],
      [['oink'], () => message.react('🐷')],
      [['download avdan os', 'avdan os iso'], {
        embeds: [
          new EmbedBuilder()
            .setDescription('We have not finished developing AvdanOS, so there is not a download yet.\nWe are currently working on the **window manager**.\nSubscribe to [our Youtube channel](https://www.youtube.com/channel/UCHLCBj83J7bR82HwjhCJusA) for updates on our development.')
            .setColor(Colors.Blue)
        ]
      }],
    ]
    
    if (
      message.content.startsWith('this has been') &&
      message.content.endsWith('in 100 seconds') &&
      message.content != 'this has been in 100 seconds'
    ) message.channel.send('hit the like button and subscribe if you want to see more short videos like this thanks for watching and I will see you in the next one');

    if (!message.author.bot) {
      // Loop through the possible events, make them lowercase and check if the message contains it (if it does, execute the event)
      for (const [key, value] of events) {
        for (const i of key) {
          if (message.content.toLowerCase().includes(i)) {
            if (typeof value === 'function') value();
            else if (typeof value === 'object' || typeof value === 'string') {
              if (value.embeds) for (const embed of value.embeds) { message.reply({ embeds: [embed] }) };
            }
          }
        }
      }
    } else return;
  });

  const commands = [];
  const commandPath = './commands';

  for (const guildID of client.guilds.cache.keys()) {
    const guild = client.guilds.cache.get(guildID);
    await guild.commands.set(commands);
  }
  
  fs.readdirSync(path.join(process.cwd(), commandPath)).filter(file => file.endsWith('.js')).forEach(file => {
    let pull = require(path.join(process.cwd(), commandPath, file));
    commands.push(pull);
  });

  client.on('interactionCreate', async (interaction) => {
    if (interaction.type === InteractionType.ApplicationCommand) { 
      try {
        for (cmd of commands) {
          if (cmd.name == interaction.commandName) await cmd.callback(interaction), () => {};
        }
      } catch (error) {
        console.error(error);

        const embed = new EmbedBuilder()
          .setTitle('An error occured while executing that command.')
          .setColor(Colors.Red)
        interaction.reply({ embeds: [embed], ephemeral: true });
      } 
    }
  });
};
