const { MessageEmbed } = require('discord.js');

/**
 * @file This is an example of random responses. Normal command edition.
 * @author AvdanOS
 */

module.exports = {
  callback: (message) => {
    const messages = [
      'example',
      'wow, this is another message?',
      'hello world'
    ];
    const title = messages[Math.floor(Math.random() * messages.length)];
    const embed = new MessageEmbed()
      .setTitle(title)
      .setColor('BLUE')

    message.channel.send({ embeds: [embed] });
  }
};
