const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require('discord.js');

/**
 * @file This is an example that includes creating and responding to buttons.
 * @author AvdanOS
 */

module.exports = {
  name: 'button',
  description: 'this is an example for buttons',
  callback: (interaction) => {
    let embed = new EmbedBuilder()
      .setTitle('example')
      .setDescription('this is an example for buttons')
      .setColor(Colors.Blue)

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('primary')
        .setLabel('example of a primary button')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('secondary')
        .setLabel('example of a secondary button')
        .setStyle(ButtonStyle.Secondary),
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
