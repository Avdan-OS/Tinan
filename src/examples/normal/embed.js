const { MessageEmbed } = require('discord.js');

/**
 * @file This is an example of embeds. Normal command edition.
 * @author Serge
 */

module.exports = {
  callback: (message) => {
    const embed = new MessageEmbed()
      .setTitle('example')
      .setDescription('this is an example')
      .addFields(
        { name: 'field example 1', value: 'field example 1' },
        { name: 'field example 2', value: 'field example 2' }
      )
      .setFooter({ text: 'footer example' })
      .setColor('BLUE')

    message.channel.send({ embeds: [embed] });
  }
};
