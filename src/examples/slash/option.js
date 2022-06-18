const { MessageEmbed, Constants } = require('discord.js');

/**
 * @file This is an example of options.
 * @author Serge
 */

module.exports = {
  name: 'option',
  description: 'this is an option example',
  options: [
    {
      name: 'option',
      description: 'option',
      type: Constants.ApplicationCommandOptionTypes.STRING,
      required: true, // or false
      choices: [
        {
          name: 'yes',
          value: 'yes'
        },
        {
          name: 'no',
          value: 'no'
        }
      ]
    }
  ],
  callback: (interaction) => {
    const option = interaction.options.getString('option');
    let embed = new MessageEmbed()
    
    if (option == 'yes') {
      embed.setTitle('you like option')
      embed.setColor('GREEN')
    } else {
      embed.setTitle('you hate option :<')
      embed.setColor('RED')
    }
    interaction.reply({ embeds: [embed], ephemeral: true });
  }  
};
