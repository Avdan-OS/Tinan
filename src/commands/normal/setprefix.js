const { MessageEmbed, Permissions } = require('discord.js');
const cfg = require('../../config.json');

module.exports = {
  callback: (message, args) => {
    const embed = new MessageEmbed()

    if (args[0]) { 
      if (message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
        oldPrefix = cfg.prefix;
        cfg.prefix = args[0];
        embed.setTitle(`Prefix changed from ${oldPrefix} to ${cfg.prefix}`)
        embed.setColor('GREEN')
      } else {
        embed.setTitle('Error')
        embed.setDescription("You don't have sufficient permissions to execute that command")
        embed.setColor('RED')
      }
    } else {
      embed.setTitle('Error')
      embed.setDescription('Specify the prefix!')
      embed.setColor('RED')
    }

    message.channel.send({ embeds: [embed] });
  }
};
