const { EmbedBuilder, ApplicationCommandOptionType, Colors } = require('discord.js');

module.exports = {
  name: 'suggest',
  description: 'Sends your idea',
  options: [
    {
      name: 'title',
      description: 'Title of your suggestion',
      required: true,
      type: ApplicationCommandOptionType.String,
    }, 
    {
      name: 'description',
      description: 'Description of your suggestion',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],

  callback: async (interaction) => {
    const title = interaction.options.getString('title');
    const text = interaction.options.getString('description');

    const ideaEmbed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
      .setTitle(title)
      .setDescription(text)
      .setColor(Colors.Blue)

    const channel = interaction.guild.channels.cache.find(cnl => cnl.id === '993466949889703996');
    const msg = await channel.send({ embeds: [ideaEmbed] });
    
    msg.startThread({ name: title });

    const embed = new EmbedBuilder()
      .setTitle('Your suggestion was sent')
      .setColor(Colors.Blue)

    interaction.reply({ embeds: [embed], ephemeral: true })
  }
}
