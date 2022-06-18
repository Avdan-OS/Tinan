const { MessageEmbed } = require('discord.js');

module.exports = {
  callback: (message) => {
    const embed = new MessageEmbed()
      .setTitle('Help')
      .setDescription('There may be bugs, if you find them: ping goos#1337.')
      .addFields(
        { name: 'Prefix', value: process.env.PREFIX },
        { name: 'Test', value: 'repolist, prefix, poll' }
      )
      .setColor('BLUE')

    message.channel.send({ embeds: [embed] });
  }
};
