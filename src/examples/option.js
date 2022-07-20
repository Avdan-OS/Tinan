const { EmbedBuilder, ApplicationCommandOptionType, Colors } = require('discord.js');

/**
 * @file This is an example of options.
 * @author AvdanOS
 */

module.exports = {
  name: 'option',
  description: 'this is an option example',
  options: [
    {
      name: 'option',
      description: 'option',
      type: ApplicationCommandOptionType.String,
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
    let embed = new EmbedBuilder()
    
    if (option == 'yes') {
      embed.setTitle('you like option')
      embed.setColor(Colors.Green)
    } else {
      embed.setTitle('you hate option :<')
      embed.setColor(Colors.Red)
    }
    interaction.reply({ embeds: [embed], ephemeral: true });
  }  
};
