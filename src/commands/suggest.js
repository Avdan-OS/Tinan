const { MessageEmbed, Constants } = require('discord.js');

module.exports = {
  name: 'suggest',
  description: 'Sends your idea',
  options: [{
      name: 'title',
      description: 'Title of your suggestion',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.STRING
    }, {
      name: 'description',
      description: 'Description of your suggestion',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.STRING
    }],
  callback: async (interaction) => {
    title = interaction.options.getString('title')
    text = interaction.options.getString('description')

    ideaEmbed = new MessageEmbed()
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
      .setTitle(title)
      .setDescription(text)
      .setColor('BLUE')

    channel = interaction.guild.channels.cache.find(cnl => cnl.id == '993466949889703996')
    msg = await channel.send({embeds: [ideaEmbed]})
    
    msg.startThread({
      name: title,
    });

    embed = new MessageEmbed()
      .setTitle('Your suggestion was sent')
      .setColor('BLUE')

    interaction.reply({embeds: [embed], ephemeral: true})
  }
}
