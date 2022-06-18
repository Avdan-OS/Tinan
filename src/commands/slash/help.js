const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Get help and information about the bot.',
  callback: (interaction) => {
    const embed = new MessageEmbed()
      .setTitle('Help')
      .setDescription('There may be bugs, if you find them: ping goos#1337.')
      .addFields(
        { name: 'Prefix', value: process.env.PREFIX },
        { name: 'Test', value: 'repolist, prefix, poll' }
      )
      .setColor('BLUE')

    interaction.reply({ embeds: [embed] , ephemeral: true });
  }
};
