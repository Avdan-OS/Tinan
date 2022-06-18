const { MessageEmbed, Constants, Permissions } = require('discord.js');

module.exports = {
  name: 'prefix',
  description: 'View or set the bot prefix.',
  options: [
    {
      name: 'prefix',
      description: 'Changes the bot prefix',
      required: false,
      type: Constants.ApplicationCommandOptionTypes.STRING
    }
  ],
  callback: (interaction) => {
    let temp = true;
    const embed = new MessageEmbed()
      .setTitle(`The current server prefix is ${process.env.PREFIX}`)
      .setColor('BLUE')
    if (interaction.options.getString('prefix')) {
      if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
        oldPrefix = process.env.PREFIX;
        process.env.PREFIX = interaction.options.getString('prefix');
        embed.setTitle(`Prefix changed from ${oldPrefix} to ${process.env.PREFIX}`)
        embed.setColor('GREEN')
        temp = false;
      } else {
        embed.setTitle(`Error`)
        embed.setDescription(`You don't have sufficient permissions to execute that command`)
        embed.setColor('RED')
      }
    }
    interaction.reply({ embeds: [embed] , ephemeral: temp });
  }
};
