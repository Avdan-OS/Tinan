const { MessageEmbed } = require('discord.js');

module.exports = {
  callback: (message) => {
    const embed = new MessageEmbed()
      .setTitle('Help')
      .setDescription('There may be bugs, if you find them: ping goos#1337.')
      .addFields(
        { name: 'Prefix', value: process.env.PREFIX },
        { name: 'Example commands', value: 'button, embed, randomResponse' }
      )
      .setFooter({ text: "Examples won't work.\nThey are stored in an examples folder and the command handler doesn't access it." })
      .setColor('BLUE')

    message.channel.send({ embeds: [embed] });
  }
};
