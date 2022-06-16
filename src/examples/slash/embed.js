const { MessageEmbed } = require('discord.js');

/**
 * @file This is an example of embeds. Slash command edition.
 * @author Serge
 */

module.exports = {
  name: 'embed',
  description: 'this is an embed example',
  callback: (interaction) => {
    const embed = new MessageEmbed()
      .setTitle('example')
      .setDescription('this is an example of an embed')
      .addFields(
        { name: 'field example 1', value: 'field example 1' },
        { name: 'field example 2', value: 'field example 2' }
      )
      .setFooter({ text: 'footer example' })
      .setColor('BLUE')
    
    interaction.reply({ embeds: [embed], ephemeral: true });
  }  
};
