const { MessageEmbed } = require('discord.js');

module.exports = {
  callback: (message, args) => {
    const embed = new MessageEmbed()
      .setTitle(`The current server prefix is ${process.env.PREFIX}`)
      .setColor('BLUE')
    if (args[0]) { 
        oldprefix=process.env.PREFIX
        process.env.PREFIX=args[0]
        embed.setTitle(`Prefix changed from ${oldprefix} to ${process.env.PREFIX}`)
        embed.setColor('GREEN')
        console.log("prefix changed")
    }
    message.channel.send({ embeds: [embed] });
  }
};
