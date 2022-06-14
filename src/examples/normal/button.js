const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

/**
 * @file This command is an example that includes creating and responding to buttons. Normal command edition.
 * @author Serge
 */

module.exports = {
  callback: (message) => {
    let embed = new MessageEmbed()
      .setTitle('example')
      .setDescription('this is an example of buttons')
      .setColor('BLUE')

    const buttons = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('primary')
        .setLabel('example of a primary button')
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('secondary')
        .setLabel('example of a secondary button')
        .setStyle('SECONDARY')
    )

    message.channel.send({ embeds: [embed], components: [buttons] });

    const filter = (ButtonInteraction) => {
      return message.author.id != ButtonInteraction.user.id || message.author.id == ButtonInteraction.user.id;
    }
    const collector = message.channel.createMessageComponentCollector({ filter, max: 1, time: 30000 });

    collector.on('end', (collection) => {
      if (collection.first().customId == 'primary') {
        embed.setTitle('you clicked a primary button')
        embed.setDescription('you clicked a primary button')

        message.channel.send({ embeds: [embed] });
      } else {
        embed.setTitle('you clicked a secondary button')
        embed.setDescription('you clicked a secondary button')

        message.channel.send({ embeds: [embed] });
      }
    })
  }
};
