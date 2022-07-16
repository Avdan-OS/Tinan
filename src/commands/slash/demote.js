const { MessageEmbed, Constants } = require('discord.js');

module.exports = {
  name: 'demote',
  description: 'Demotes a user. (manager only)',
  options: [
    {
      type: Constants.ApplicationCommandOptionTypes.USER,
      name: 'user',
      description: 'User that will be demoted',
      required: true
    },
    {
      type: Constants.ApplicationCommandOptionTypes.STRING,
      name: 'reason',
      description: 'Why you are demoting this user'
    }
  ],
  callback: async (interaction) => {
    if (interaction.member.roles.cache.some(role => ['993524668503949322', '986269171111297036'].includes(role.id))) {  //check if member has manager role
      const member = interaction.options.getMember('user')
      const reason = interaction.options.getString('reason')
      const rolesToRemove = [
        //main server
        '993537552625705000', //senior dev
        '993598471456178248', //design lead
        '993471541176184842', //designer
        '993514545165389834', //team avdan OS
        '993562782756782181', //senior designer
        '996010452561698897', //translator
        '993524490493493308', //tester
        '993471258371047455', //dev
        '993579333119656098', //dev lead
        '993529249128525878', //contributor

        //test server
        '986269779469926450', //dev lead
        '990841843497443349', //senior dev
        '986269396890697738', //dev
        '987642117813841960', //contributor
        '997778183267037234', //senior designer
        '986269279701831740', //designer
        '991332275205713950', //AvdanOS team
      ] 
      removedRoles = [] // roles that was removed
                       //this array contains only mentions (<@&ID>) 

      if (member.user.bot) {
        const embed = new MessageEmbed()
          .setTitle('No one can demote a bot')
          .setColor('RED')

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }

      if (member.roles.cache.some(role => ['993524668503949322', '986269171111297036'].includes(role.id))) {
        const embed = new MessageEmbed()
          .setTitle('No one can demote a manager')
          .setColor('RED')

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }

      rolesToRemove.forEach((id)=>{
        if (member.roles.cache.some(role => role.id == id)) {
          role = interaction.guild.roles.cache.get(id);
          member.roles.remove(role);
          removedRoles.push(`<@&${id}>`)
        }
      })

      const embed = new MessageEmbed()

      if (removedRoles.length > 0) {
         embed
          .setTitle(`${member.user.username}#${member.user.discriminator} was demoted`)
          .setDescription('Removed roles:\n\n'+removedRoles.join('\n'))
          .setColor('BLUE')
        try {
          const demotedNotify = new MessageEmbed()
            .setTitle(`You were demoted by ${interaction.user.username}#${interaction.user.discriminator}`)
            .setDescription(reason ? ('Reason: ' + reason) : 'No reason was provided')
            .setColor('RED')

          await member.send({ embeds: [demotedNotify] })
        } catch (err) {
          embed.setFooter({ text: 'P. S. Bot failed to send DM' })
        }
      } else {
        embed
          .setTitle(`${member.user.username}#${member.user.discriminator} can't be demoted`)
          .setDescription('This user has no team manager roles')
          .setColor('RED')
      }
      
      interaction.reply({ embeds: [embed], ephemeral: removedRoles.length == 0 });
    } else {
      const embed = new MessageEmbed()
        .setTitle('You are not allowed to use this command')
        .setColor('RED')

      interaction.reply({ embeds: [embed], ephemeral: true });
    }

  }
};
