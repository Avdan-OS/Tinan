const { MessageEmbed, Constants, Permissions } = require('discord.js');
const cfg = require('../../config.json');

module.exports = {
  name: 'setprefix',
  description: 'Sets the bot prefix.',
  options: [
    {
      name: 'prefix',
      description: 'Changes the bot prefix.',
      required: true,
      type: Constants.ApplicationCommandOptionTypes.STRING
    }
  ],
  callback: (interaction) => {
    const embed = new MessageEmbed()
    if (interaction.options.getString('prefix')) {
      if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
        oldPrefix = cfg.prefix;
        cfg.prefix = interaction.options.getString('prefix');
        embed.setTitle(`Prefix changed from ${oldPrefix} to ${cfg.prefix}`)
        embed.setColor('GREEN')
      } else {
        embed.setTitle(`Error`)
        embed.setDescription(`You don't have sufficient permissions to execute that command`)
        embed.setColor('RED')
      }
    }
    interaction.reply({ embeds: [embed] });
  }
};
