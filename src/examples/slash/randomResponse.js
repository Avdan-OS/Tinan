const { MessageEmbed } = require('discord.js');

/**
 * @file This is an example of random responses. Slash command edition.
 * @author Serge
 */

module.exports = {
  name: 'randomresponse',
  description: 'this is a random response example',
  callback: (interaction) => {
    const messages = [
      'example',
      'wow, this is another message?',
      'hello world'
    ];
    const title = messages[Math.floor(Math.random() * messages.length)];
    const embed = new MessageEmbed()
      .setTitle(`${title}`)
      .setColor('BLUE')

    interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
