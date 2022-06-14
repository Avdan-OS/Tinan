const { MessageEmbed } = require('discord.js');
const getFiles = require('../utils/getFiles');

module.exports = (client) => {
  const path = '\\commands';
  const commands = [];
  const commandFiles = getFiles(`${path}\\normal`, '.js');
  const prefix = '!';

  for (const command of commandFiles) {
    if (command.default) command = command.default;

    const split = command.replace(/\\/g, '/').split('/');
    const commandName = split[split.length - 1].replace('.js', '');
    commands[commandName.toLowerCase()] = require(command);
  }

  client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
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
  });

  const slashCommands = [];
  const slashCommandFiles = getFiles(`${path}\\slash`, '.js');
  const guild = client.guilds.cache.get('938763995102470204');
  for (const slashCommand of slashCommandFiles) {
    let slashCommandFile = require(slashCommand);

    slashCommands[slashCommandFile.name.toLowerCase()] = slashCommandFile;
    slashCommands.push(slashCommandFile);
  };
  guild.commands.set(slashCommands);
  
  client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) return;

    try {
      slashCommands[interaction.commandName].callback(interaction);
    } catch (error) {
      console.error(error);

      const embed = new MessageEmbed()
        .setTitle('An error occured while executing that command.')
        .setColor('RED')
      interaction.reply({ embeds: [embed], ephemeral: true });
    }
  });
};
