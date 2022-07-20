const { EmbedBuilder, Colors } = require('discord.js');

/**
 * @file This is an example of an embed.
 * @author AvdanOS
 */

module.exports = {
  name: 'embed',
  description: 'this is an embed example',
  callback: (interaction) => {
    const embed = new EmbedBuilder()
      .setTitle('example')
      .setDescription('this is an example of an embed')
      .addFields([
        { name: 'field example 1', value: 'field example 1' },
        { name: 'field example 2', value: 'field example 2' },
      ])
      .setFooter({ text: 'footer example' })
      .setColor(Colors.Blue)
    
    interaction.reply({ embeds: [embed], ephemeral: true });
  }  
};
