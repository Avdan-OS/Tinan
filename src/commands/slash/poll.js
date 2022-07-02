const { MessageEmbed, MessageActionRow, MessageButton, Constants, Permissions } = require('discord.js');

module.exports = {
  name: 'poll',
  description: 'Poll util management',
  options: [
    {
      type: 'SUB_COMMAND',
		  name: 'create',
		  description: 'Create a poll',
		  options: [
        {
          name: 'subject',
          description: 'Subject of the poll',
          required: true,
          type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
          name: 'time',
          description: 'Duration of the poll (in seconds)',
          required: true,
          type: Constants.ApplicationCommandOptionTypes.INTEGER
        },
        {
          name: '1',
          description: 'Choice 1',
          required: false,
          type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
          name: '2',
          description: 'Choice 2',
          required: false,
          type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
          name: '3',
          description: 'Choice 3',
          required: false,
          type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
          name: '4',
          description: 'Choice 4',
          required: false,
          type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
          name: '5',
          description: 'Choice 5',
          required: false,
          type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
          name: '6',
          description: 'Choice 6',
          required: false,
          type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
          name: '7',
          description: 'Choice 7',
          required: false,
          type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
          name: '8',
          description: 'Choice 8',
          required: false,
          type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
          name: '9',
          description: 'Choice 9',
          required: false,
          type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
          name: '10',
          description: 'Choice 10',
          required: false,
          type: Constants.ApplicationCommandOptionTypes.STRING
        },
        {
          name: 'mention',
          description: 'Mention everyone (default: False)',
          required: false,
          type: Constants.ApplicationCommandOptionTypes.BOOLEAN
        }
      ]
    },
    {
			type: 'SUB_COMMAND',
			name: 'end',
			description: 'End a poll',
      options: [
        {
          name: 'id',
          description: 'ID of the poll',
          required: true,
          type: Constants.ApplicationCommandOptionTypes.INTEGER
        },
        {
          name: 'reason',
          description: 'Reason for ending the poll',
          required: false,
          type: Constants.ApplicationCommandOptionTypes.STRING
        },
      ],
		},
  ],

  callback: (interaction) => {
    const pollId = Math.floor(Math.random() * 89999) + 10000;
    const timestamp = parseInt(Date.now().toString().substring(0,10)) + interaction.options.getInteger('time') + 1
    let embed = new MessageEmbed({
      title: `Poll: ${interaction.options.getString('subject')}`,
      description: `Poll ends <t:${timestamp}:R>`,
      color: 'BLUE',
    });
    if ( interaction.member.permissions.has(Permissions.FLAGS.MANAGE_EVENTS)) {
      if ( interaction.options._subcommand == "create" ) {
        embed.addFields([
          {
            name: 'Total votes',
            value: "0",
            inline: true,
          }
        ])
        embed.setAuthor({
          name: interaction.member.displayName,
          iconURL: interaction.member.displayAvatarURL()
        })
        embed.setFooter({ text: "Poll id: "+pollId.toString() })
        const getButton = (buttonID) => interaction.options.getString(buttonID);
        const row1 = new MessageActionRow();
        const row2 = new MessageActionRow();


        for (let i = 1; i < 6; i++) { 
          if (getButton(i.toString())) {
            row1.addComponents(
              new MessageButton()
                .setCustomId('poll_' + pollId.toString() + '_' + i.toString())
                .setLabel(getButton(i.toString()))
                .setStyle('SECONDARY')
            ) 
          }
        }

        for (let i = 6; i < 11; i++) { 
          if (getButton(i.toString())) {
            row2.addComponents(
              new MessageButton()
              .setCustomId('poll_' + pollId.toString() + '_' + i.toString())
              .setLabel(getButton(i.toString()))
              .setStyle('SECONDARY')
            )
          }
        }
        const rows = [];
        if (row1.components.length) rows.push(row1);
        if (row2.components.length) rows.push(row2);
        pollsList[pollId] = {};
        global.getLabel = function (pollID, buttonID) { if (pollID == pollId) return interaction.options.getString(buttonID) };
        let mention = ' ';
        if (interaction.options.getBoolean('mention')) mention = '@everyone';
        interaction.channel.send({ content: mention, embeds: [embed], components: rows }).then(message => {
          interaction.reply({ content: 'The poll has been created', ephemeral: true })
          const collector = interaction.channel.createMessageComponentCollector({ time: interaction.options.getInteger('time') * 1000 });
          collector.client.on('interactionCreate', (interact) => {
            if (interact.isCommand()) if (interact.commandName == "poll") if (interact.options._subcommand == "end") if (interact.options.getInteger("id") == pollId) collector.stop()
          })
          collector.on('collect', () => {
            embed.fields[0].value = Object.values(pollsList[pollId]).length.toString()
            message.edit({ embeds: [embed] })
          });
          collector.on('end', () => {
            if (pollsList[pollId]) {
              let winners = [];
              let maxLength = 1;
              for (let i = 1; i < 11; i++) {
                const currentLenght = Object.values(pollsList[pollId]).filter(x => x == 'poll_' + pollId.toString() + '_' + i.toString()).length;
                if (currentLenght >= maxLength) {
                  if (currentLenght > maxLength) {
                    maxLength = currentLenght;
                    winners.pop();
                  }
                  winners.push(interaction.options.getString(i.toString()));
                }
              }
              const totalVotes = embed.fields[0].value
              //embed.setTitle(`Poll ended: ${interaction.options.getString('subject')}`)
              embed.setDescription(`Poll ended <t:${timestamp}:R>`)
              embed.setFields([])
              if (winners.length == 1) embed.addFields([{ name: "Winner", value: `**${winners}** with **${maxLength}** votes`, inline: true }])
              else if (winners.length > 1) embed.addFields([{ name: "Winners", value: `**${winners}** with **${maxLength}** votes each`, inline: true }])
              else embed.setDescription(`There was no winner (no votes have been performed)`)
              embed.addFields([{ name: "Total votes", value: totalVotes, inline: true }])
              //embed.setFooter({ text: "" })
              message.edit({ embeds: [embed], components: [] });
              delete pollsList[pollId];
            }
          });
        });
      } else {
        embed.setTitle(`Poll \`${interaction.options.getInteger("id").toString()}\` was terminated by \`${interaction.member.user.tag}\``)
        if (interaction.options.getString("reason")) embed.addFields([{ name: "Reason",  value: interaction.options.getString("reason"), inline: true }]).setDescription("")
        else embed.setDescription("No reason specified")
        interaction.reply({ embeds: [embed] })
      }
    } else {
      embed.setTitle(`Error`)
      embed.setDescription(`You don't have sufficient permissions to execute that command`)
      embed.setColor('RED')
      interaction.reply({ embeds: [embed], ephemeral: true });
    }
    interaction.client.on('interactionCreate', (interact) => {
      if (interact.isButton()) {
        if (interact.customId.substring(0,4) == 'poll') {
          const pollId = interact.customId.substring(5, 10);
          let embed = new MessageEmbed()
          if (global.pollsList[pollId][interact.user.id]) embed.setTitle('You have already voted for this poll').setColor('RED');
          else {
            global.pollsList[pollId][interact.user.id] = interact.customId;
            embed.setTitle(`You successfully voted for **${getLabel(pollId, interact.customId.substring(11,13))}**`).setColor('GREEN');
          }
          return interact.reply({embeds: [embed], ephemeral: true });
        } else return;
      } else return;
    });
  }
};
