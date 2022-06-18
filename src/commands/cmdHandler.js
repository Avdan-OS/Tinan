const { MessageEmbed } = require('discord.js');
const getFiles = require('../utils/getFiles');
require('dotenv').config();

module.exports = (client) => {
  const path = '\\commands';
  const commands = [];
  const commandFiles = getFiles(`${path}\\normal`, '.js');
  
  for (const command of commandFiles) {
    if (command.default) command = command.default;

    const split = command.replace(/\\/g, '/').split('/');
    const commandName = split[split.length - 1].replace('.js', '');
    commands[commandName.toLowerCase()] = require(command);
  }
  client.on('messageCreate', (message) => {
    const multiReact = function (msg,reactions) {
      for (let i = 0; i < reactions.length; i++) { msg.react(reactions.substring(i,i+1)) }
    }
    const extCommands = [/*["bread","🍞 Bread👍"],*/["bread",() => { for (const i of "🍞🇧🇷🇪🇦🇩👍") { message.react(i) }}],["69","noice"],["420","noice"],["pineapple",() => message.react("🍍")],["cheese",() => message.react("🧀")]]
    if (!message.author.bot) {
      if (!message.content.startsWith(process.env.PREFIX)) {
        for (const msg of extCommands) {
          if (message.content.toLowerCase().includes(msg[0])) {
            if (typeof(msg[1])!="string") return msg[1]();
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
    } else return
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
  global.pollsList={}
  client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) {
      if (interaction.isButton()) {
        if (interaction.customId.substring(0,4)=="poll") {
          //console.log(interaction.message.components[0].components[0])
          const pollid = interaction.customId.substring(5,10)
          let embed = new MessageEmbed()
          if (global.pollsList[pollid][interaction.user.id]) embed.setTitle('You have already voted for this poll').setColor("RED")
          else {
            global.pollsList[pollid][interaction.user.id]=interaction.customId
            embed.setTitle(`You successfully voted for **${getLabel(pollid,interaction.customId.substring(11,13))}**`).setColor("GREEN")
          }
          return interaction.reply({embeds: [embed], ephemeral: true})
        } else return
      } else return
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
