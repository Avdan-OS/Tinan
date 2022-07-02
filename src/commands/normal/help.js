const { MessageEmbed } = require('discord.js');
const cfg = require('../../config.json');

module.exports = {
  callback: (message) => {
    const embed = new MessageEmbed()
      .setTitle('Help')
      .setDescription('There may be bugs.\nIf you find them, feel free to create an issue on our [GitHub repository](https://github.com/Avdan-OS/Tinan/issues).')
      .addFields(
        { name: 'Prefix', value: cfg.prefix },
        { name: 'Commands', value: 'loa, setprefix, poll, repolist' },
      )
      .setColor('BLUE')

    message.channel.send({ embeds: [embed] });
  }
};
