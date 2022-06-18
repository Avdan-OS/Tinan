const { MessageEmbed, Permissions} = require('discord.js');

module.exports = {
  callback: (message, args) => {
    const embed = new MessageEmbed()
      .setTitle(`The current server prefix is ${process.env.PREFIX}`)
      .setColor('BLUE')
    
    if (args[0]) { 
      if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
        oldPrefix = process.env.PREFIX
        process.env.PREFIX = args[0]
        embed.setTitle(`Prefix changed from ${oldprefix} to ${process.env.PREFIX}`)
        embed.setColor('GREEN')
        temp = false;
      } else {
        embed.setTitle(`Error`)
        embed.setDescription(`You don't have sufficient permissions to execute that command`)
        embed.setColor('RED')
      }
    }
    message.channel.send({ embeds: [embed] });
  }
};
