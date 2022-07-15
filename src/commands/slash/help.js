const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Get help and information about the bot.',
  callback: (interaction) => {
    const embed = new MessageEmbed()
      .setTitle('Help')
      .setDescription('There may be bugs, if you find them: ping <@725985503177867295>.')
      .addFields(
        { name: 'Prefix', value: process.env.PREFIX },
        { name: 'Commands', value: 'LOA Apply, LOA Return, Poll Create, Poll End, Prefix, RepoList' }
      )
      .setColor('BLUE')

    interaction.reply({ embeds: [embed] , ephemeral: true });
  }
};
