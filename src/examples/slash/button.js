const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

/**
 * @file This command is an example that includes creating and responding to buttons. Slash command edition.
 * @author Serge
 */

module.exports = {
  name: 'button',
  description: 'this is an example for buttons',
  callback: (interaction) => {
    let embed = new MessageEmbed()
      .setTitle('example')
      .setDescription('this is an example for buttons')
      .setColor('BLUE')

    const buttons = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('primary')
        .setLabel('example of a primary button')
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('secondary')
        .setLabel('example of a secondary button')
        .setStyle('SECONDARY'),
    )

    interaction.reply({ embeds: [embed], components: [buttons], ephemeral: true });

    const filter = (ButtonInteraction) => {
      return interaction.user.id != ButtonInteraction.user.id || interaction.user.id == ButtonInteraction.user.id;
    }
    const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1, time: 30000 });

    collector.on('end', (collection) => {
      if (collection.first().customId == 'primary') {
        embed.setTitle('you clicked a primary button')
        embed.setDescription('you clicked a primary button')

        interaction.channel.send({ embeds: [embed] });
      } else {
        embed.setTitle('you clicked a secondary button')
        embed.setDescription('you clicked a secondary button')

        interaction.channel.send({ embeds: [embed] });
      }
    })
  }
};
