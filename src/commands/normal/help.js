const { MessageEmbed } = require('discord.js');

module.exports = {
  callback: (message) => {
    const embed = new MessageEmbed()
      .setTitle('Help')
      .setDescription('There may be bugs, if you find them report on GitHub')
      .addFields(
        { name: 'Prefix', value: process.env.PREFIX },
        { name: 'Commands', value: 'repolist, prefix, poll' }
      )
      .setColor('BLUE')

    message.channel.send({ embeds: [embed] });
  }
};
