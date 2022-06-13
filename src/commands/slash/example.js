const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'example',
  description: 'this is an example',
  callback: (interaction) => {
    const embed = new MessageEmbed()
      .setTitle('example')
      .setDescription('this is an example')
      .addFields(
        { name: "field example 1", value: "field example 1" },
        { name: "field example 2", value: "field example 2" }
      )
      .setFooter({ text: "footer example" })
      .setColor('BLUE') // blue, blue and only blue!!
    
    interaction.reply({ embeds: [embed] });
  }  
};
