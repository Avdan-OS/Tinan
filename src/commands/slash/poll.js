const { MessageEmbed, MessageActionRow, MessageButton, Constants, Permissions} = require('discord.js');

/**
 * @file This command is an example that includes creating and responding to buttons. Slash command edition.
 * @author Serge
 */

module.exports = {
  name: 'poll',
  description: 'Create a poll',
  options: [
    {
      name: 'subject',
      description :'Subject of the poll',
      required : true,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: 'time',
      description :'Duration of the poll (in seconds)',
      required : true,
      type: Constants.ApplicationCommandOptionTypes.INTEGER
    },
    {
      name: '1',
      description :'Choice 1',
      required : false,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: '2',
      description :'Choice 2',
      required : false,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: '3',
      description :'Choice 3',
      required : false,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: '4',
      description :'Choice 4',
      required : false,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: '5',
      description :'Choice 5',
      required : false,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: '6',
      description :'Choice 6',
      required : false,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: '7',
      description :'Choice 7',
      required : false,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: '8',
      description :'Choice 8',
      required : false,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: '9',
      description :'Choice 9',
      required : false,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: '10',
      description :'Choice 10',
      required : false,
      type: Constants.ApplicationCommandOptionTypes.STRING
    },
    {
      name: 'mention',
      description :'Mention everyone (default: False)',
      required : false,
      type: Constants.ApplicationCommandOptionTypes.BOOLEAN
    }
  ],
  callback: (interaction) => {
    let embed = new MessageEmbed()
      .setTitle(`Poll: ${interaction.options.getString("subject")}`)
      .setDescription(`Poll ends <t:${parseInt(Date.now().toString().substring(0,10)) + interaction.options.getInteger("time") + 1}:R>`)
      .setColor('BLUE')
    if(interaction.member.permissions.has(Permissions.FLAGS.MANAGE_EVENTS)) {
      embed.setAuthor({
        name: interaction.member.displayName,
        iconURL: interaction.member.displayAvatarURL()
      })
      //console.log(Date.now())
      const getbutton = (buttonid) => interaction.options.getString(buttonid);
      const row1 = new MessageActionRow()
      const row2 = new MessageActionRow()
      const pollid = Math.floor(Math.random() * 89999)+10000
      for (let i = 1; i < 6; i++) { if (getbutton(i.toString())) row1.addComponents(new MessageButton().setCustomId("poll_"+pollid.toString()+"_"+i.toString()).setLabel(getbutton(i.toString())).setStyle('SECONDARY')) }
      for (let i = 6; i < 11; i++) { if (getbutton(i.toString())) row2.addComponents(new MessageButton().setCustomId("poll_"+pollid.toString()+"_"+i.toString()).setLabel(getbutton(i.toString())).setStyle('SECONDARY')) }
      const rows = []
      if (row1.components.length) rows.push(row1)
      if (row2.components.length) rows.push(row2)
      pollsList[pollid]={}
      global.getLabel = function (pollID,buttonID) { if (pollID==pollid) return interaction.options.getString(buttonID) }
      mention=" "
      if (interaction.options.getBoolean("mention")) mention="@everyone"
      interaction.channel.send({content: mention, embeds: [embed], components: rows }).then(message => {

        //console.log(poll)
        interaction.reply({ content: "The poll has been created", ephemeral: true })

        const filter = (ButtonInteraction) => {
          return interaction.user.id != ButtonInteraction.user.id || interaction.user.id == ButtonInteraction.user.id;
        }
        const collector = interaction.channel.createMessageComponentCollector({ time: interaction.options.getInteger("time")*1000 });

        //collector.on('collect', (collection) => {
          /*
          if (collection.customId == '1') {
            embed.setTitle('you clicked a primary button')
            embed.setDescription('you clicked a primary button')
          } else {
            embed.setTitle('you clicked a secondary button')
            embed.setDescription('you clicked a secondary button')
          }
          */
        collector.on('end', collected => {
          if (pollsList[pollid]) {
            winners = []
            maxLength = 1
            for (let i = 1; i < 11; i++) {
              currentLenght = Object.values(pollsList[pollid]).filter(x => x=="poll_"+pollid.toString()+"_"+i.toString()).length
              //console.log(currentLenght)
              if (currentLenght >= maxLength) {
                if (currentLenght > maxLength) {
                  maxLength=currentLenght
                  winners.pop()
                }
                winners.push(interaction.options.getString(i.toString()))
              }
            }
            //console.log(winners)
            //for (let i = 0; i < winners.length; i++) { winners[i] = interaction.options.getString(winners[i].substring(11,13)); }
            embed.setTitle(`Poll ended: ${interaction.options.getString("subject")}`)
            if (winners.length==1) embed.setDescription(`The winner is **${winners[0]}** with **${maxLength}** votes`)
            else if (winners.length>1) embed.setDescription(`The winners are **${winners}** with **${maxLength}** votes each`)
            else embed.setDescription(`There was no winner (no votes have been performed)`)
            message.edit({ embeds: [embed], components: []})
            delete pollsList[pollid]
            //console.log(`Collected ${collected.size} interactions.`);
          }
        });
          //collection.deferUpdate()
          //interaction.reply({ embeds: [embed], ephemeral: true});
        //})
      });
    } else {
        embed.setTitle(`Error`)
        embed.setDescription(`You don't have sufficient permissions to execute that command`)
        embed.setColor('RED')
        interaction.reply({ embeds: [embed], ephemeral: true})
    }
  }
  
};
