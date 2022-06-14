const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'apply',
  description: 'Join avdanOS devlopment',
  callback: (interaction) => {
    const embed = new MessageEmbed()
      .setTitle('Applications')
      .setDescription('Fill one of these forms')
      .addFields(
        { name: "field example 1", value: "field example 1" },
        { name: "field example 2", value: "field example 2" }
      )
      .setFooter({ text: "footer example" })
      .setColor('BLUE') // blue, blue and only blue!!

    interaction.reply({ embeds: [embed] });
  }
}; 
