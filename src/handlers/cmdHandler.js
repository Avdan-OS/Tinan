const { MessageEmbed } = require('discord.js');
require('dotenv').config();
const fs = require("fs");
const path = require("path");

module.exports = async (client) => {
  global.pollsList = {};

  global.multiReact = async (msg, ...reactions) => {
    for (let i of reactions) {
      if (typeof i !== 'object') {
        for (let reaction of i) {
          if(reaction !== ' ') await msg.react(reaction);
        }
      } else await msg.react(i);
    }
  }
  
  client.on('messageCreate', async (message) => {
    const goosStanding = await message.guild.emojis.fetch('993799647015481397').catch(() => { return ':duck:' });

    const events = [
      [['bread'], () => {
        await multiReact(message, '🍞🇧🇷🇪🇦🇩👍')
      }],
      [['honk'], () => {
        await multiReact(message, goosStanding, `🇭🇴🇳🇰👍`)
      }],
      [['pineapple'], () => message.react('🍍')],
      [['forgor'], () => message.react('💀')],
      [['cheese'], () => message.react('🧀')],
      [['download avdan os', 'avdan os iso'], {
        embeds: [
          new MessageEmbed()
            .setDescription('We have not finished developing AvdanOS, so there is not a download yet.\nWe are currently working on the **window manager**.\nSubscribe to [our Youtube channel](https://www.youtube.com/channel/UCHLCBj83J7bR82HwjhCJusA) for updates on our development.')
            .setColor('BLUE')
        ]
      }],
    ]

    if (!message.author.bot) {
      // Loop through the possible events, make them lowercase and check if the message contains it (if it does, execute the event)
      for (const [key, value] of events) {
        for (const i of key) {
          if (message.content.toLowerCase().includes(i)) {
            if (typeof value === 'function') value();
            else if (typeof value === 'object' || typeof value === 'string') {
              if (value.embeds) for (const embed of value.embeds) {
                message.reply({embed})
              }
            }
          }
        }
      }
    } else return;
  });

  const commands = [];
  fs.readdirSync(path.join(process.cwd(), commandPath)).filter(file => file.endsWith(".js")).forEach(file => {
    let pull = require(path.join(process.cwd(), commandPath, file));
    commands[pull.name.toLowerCase()] = pull;
    commands.push(pull);
  });

  for (const guildID of client.guilds.cache.keys()) {
    const guild = client.guilds.cache.get(guildID);
    await guild.commands.set(commands);

    client.on('interactionCreate', (interaction) => {
      if (interaction.isCommand() && interaction.guildId === guildID) {
        try {
          commands[interaction.commandName].callback(interaction);
        } catch (error) {
          console.error(error);
          const embed = new MessageEmbed()
            .setTitle('An error occured while executing that command.')
            .setColor('RED')
          interaction.reply({ embeds: [embed], ephemeral: true });
        }
      }
    });
  }
};
