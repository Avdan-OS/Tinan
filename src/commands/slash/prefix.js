const { MessageEmbed } = require('discord.js');
const { Constants } = require('discord.js')

module.exports = {
  name: 'prefix',
  description: 'View or set the bot prefix',
  options: [
    {
      name: 'prefix',
      description :'Changes the bot prefix',
      required : false,
      type: Constants.ApplicationCommandOptionTypes.STRING
    }
  ],
  callback: (interaction, args) => {
    temp=true
    const embed = new MessageEmbed()
      .setTitle(`The current server prefix is ${process.env.PREFIX}`)
      .setColor('BLUE')
    if (interaction.options.getString('prefix')) { 
        oldprefix=process.env.PREFIX
        process.env.PREFIX=interaction.options.getString('prefix')
        embed.setTitle(`Prefix changed from ${oldprefix} to ${process.env.PREFIX}`)
        embed.setColor('GREEN')
        console.log("prefix changed")
        temp=false
    }
    interaction.reply({ embeds: [embed] , ephemeral: temp});
  }
};
