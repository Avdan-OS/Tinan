const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Get help and infos about the bot',
  callback: (interaction) => {
    const embed = new MessageEmbed()
      .setTitle('Help')
      .setDescription('There may be bugs, if you find them: ping goos#1337.')
      .addFields(
        { name: 'Prefix', value: process.env.PREFIX },
        { name: 'Example commands', value: 'button, embed, randomResponse' }
      )
      .setFooter({ text: "Examples won't work.\nThey are stored in an examples folder and the command handler doesn't access it." })
      .setColor('BLUE')

    interaction.reply({ embeds: [embed] , ephemeral: true});
  }
};