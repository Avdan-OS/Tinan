const { MessageEmbed, Permissions } = require('discord.js');
const getFiles = require('../utils/getFiles');
require('dotenv').config();
const config = require('../config.json');

module.exports = (client) => {
  const path = '\\commands';
  const commands = [];
  const commandFiles = getFiles(`${path}\\normal`, '.js');
  const extCommands = [
    ['bread', () => { for (const i of '🍞🇧 🇷 🇪 🇦 🇩👍') { if (i != ' ') message.react(i) }}],
    ['pineapple', () => message.react('🍍')],
    ['cheese', () => message.react('🧀')],
    ['forgor', () => message.react('💀')]
  ]
  const channelRegex = [
    ["964459799817363497", /\*\*Title:\*\* .+\n\*\*Information:\*\* .+/gm],
    ["988920473897279498", /\*\*Title:\*\* .+\n\*\*Information:\*\* .+/gm]
  ]

  for (const command of commandFiles) {
    const split = command.replace(/\\/g, '/').split('/');
    const commandName = split[split.length - 1].replace('.js', '');
    commands[commandName.toLowerCase()] = require(command);
  }
  client.on('messageCreate', (message) => {
    if (!message.author.bot) {
      if (!message.content.startsWith(process.env.PREFIX)) {
        for (const chann of channelRegex){
          if (chann[0] == message.channelId) {
            if (!message.content.match(chann[1])/* && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)*/) {
              message.delete()
              return message.author.send(`Your message was deleted in <#${chann[0]}> because you didn't respect the required format (check pinned messages of the channel)\n>>> ${message.content}`)
            }
          }
        }
        for (const msg of extCommands) {
          if (message.content.toLowerCase().includes(msg[0])) {
            if (typeof(msg[1]) != 'string') return msg[1]();
            else return message.channel.send(msg[1]);
          };
        };
        return;
      } else {
        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        try {
          commands[commandName].callback(message, args);
        } catch (error) {
          console.error(error);

          const embed = new MessageEmbed()
            .setTitle('An error occured while executing that command.')
            .setColor('RED');

          message.channel.send({ embeds: [embed] });
        }
      }
    } else return;
  });
  client.on('messageUpdate', (oldMessage, message) => {
    for (const chann of channelRegex){
      if (chann[0] == message.channelId) {
        if (!message.content.match(chann[1])/* && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)*/) {
          message.delete()
          return message.author.send(`Your message was deleted in <#${chann[0]}> because you didn't respect the required format (check pinned messages of the channel)\n>>> ${message.content}`)
        }
      }
    }
  });

  const slashCommands = [];
  const slashCommandFiles = getFiles(`${path}\\slash`, '.js');
  const guild = client.guilds.cache.get('986268144446341142');
  for (const slashCommand of slashCommandFiles) {
    let slashCommandFile = require(slashCommand);
    slashCommands[slashCommandFile.name.toLowerCase()] = slashCommandFile;
    slashCommands.push(slashCommandFile);
  };
  guild.commands.set(slashCommands);
  global.pollsList = {};
  client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) {
      if (interaction.isButton()) {
        if (interaction.customId.substring(0,4) == 'poll') {
          const pollId = interaction.customId.substring(5, 10);
          let embed = new MessageEmbed()
          if (global.pollsList[pollId][interaction.user.id]) embed.setTitle('You have already voted for this poll').setColor('RED');
          else {
            global.pollsList[pollId][interaction.user.id] = interaction.customId;
            embed.setTitle(`You successfully voted for **${getLabel(pollId, interaction.customId.substring(11,13))}**`).setColor('GREEN');
          }
          return interaction.reply({embeds: [embed], ephemeral: true });
        } else return;
      } else return;
    } else {
      try {
        slashCommands[interaction.commandName].callback(interaction);
      } catch (error) {
        console.error(error);

        const embed = new MessageEmbed()
          .setTitle('An error occured while executing that command.')
          .setColor('RED')
        interaction.reply({ embeds: [embed], ephemeral: true });
      }
    }
  });
};
