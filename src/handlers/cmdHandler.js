const { MessageEmbed } = require('discord.js');
const getFiles = require('../utils/getFiles');
const cfg = require('../config.json');

module.exports = (client) => {
  const channelRegex = [
    ['964459799817363497', /\*\*Title:\*\* .+\n\*\*Information:\*\* .+/gm],
    ['988920473897279498', /\*\*Title:\*\* .+\n\*\*Information:\*\* .+/gm]
  ]

  global.pollsList = {};
  global.multiReact = (msg, reactions) => {
    for (const i of reactions) if (i != ' ') msg.react(i)
  }
  
  client.on('messageCreate', (message) => {
    const goosStanding = client.emojis.cache.get("993799647015481397");

    const events = [
      [['bread'], () => { multiReact(message, '🍞🇧 🇷 🇪 🇦 🇩👍') }],
      [['honk'], () => { multiReact(message, `${goosStanding} 🇭 🇴 🇳 🇰👍`) }],
      [['pineapple'], () => message.react('🍍')],
      [['forgor'], () => message.react('💀')],
      // [[/this has been (.+) in 100 seconds/], () => message.channel.send('hit the like button and subscribe if you want to see more short videos like this thanks for watching and i will see you in the next one')]
      [['cheese'], () => message.react('🧀')],

      [['download avdan os', 'avdan os iso'], { 
        embeds: [
          new MessageEmbed()
            .setDescription('We have not finished developing AvdanOS, so there is not a download yet.\nWe are currently working on the **window manager**.\nSubscribe to [our Youtube channel](https://www.youtube.com/channel/UCHLCBj83J7bR82HwjhCJusA) for updates on our development.')
            .setColor('BLUE')
        ]
      }],
    ]
    if (!message.author.bot) {
      for (const chann of channelRegex){
        if (chann[0] == message.channelId) {
          if (!message.content.match(chann[1])/* && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)*/) {
            message.delete()
            message.guild.channels.cache.find((c) => c.id === cfg.moderationChannel).send({ embeds: [new MessageEmbed()
              .setTitle(`Regex not matched`)
              .setDescription(`Message deleted in <#${message.channelId}> because it didn't match the following regex :\n\`${chann[1].toString()}\``)
              .setAuthor({
                name: message.member.displayName,
                iconURL: message.member.displayAvatarURL()
              })
              .addFields([
                {
                  name: 'Content',
                  value: `>>> ${message.content}`,
                  inline: true,
                }
              ])
            ]})
            return message.author.send(`Your message was deleted in <#${chann[0]}> because you didn't respect the required format (check pinned messages of the channel)\n>>> ${message.content}`)
          }
        }
      }
      for (const msg of events) {
        for (const msgEvent of msg[0]) { // If we need multiple triggers, that's why each element of extCommands have a list as first element
          let unmatch = false
          for (const word of msgEvent.split(' ')) { // Uses word by word detection instead of full trigger detection
            if (!message.content.toLowerCase().includes(word)) unmatch = true
          }
          if (!unmatch) {
            if (typeof(msg[1]) != 'string' && typeof(msg[1]) != 'object') return msg[1]();
            else return message.reply(msg[1]);
          }
        }
      };
      return;
    } else return;
  });

  client.on('messageUpdate', (message) => {
    for (const chann of channelRegex){
      if (chann[0] == message.channelId) {
        if (!message.content.match(chann[1])/* && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)*/) {
          message.delete()
          return message.author.send(`Your message was deleted in <#${chann[0]}> because you didn't respect the required format (check pinned messages of the channel)\n>>> ${message.content}`)
        }
      }
    }
  });

  const slashCommands = [];
  const slashCommandFiles = getFiles('/commands', '.js');
  for (const slashCommand of slashCommandFiles) {
    let slashCommandFile = require(slashCommand);
    slashCommands[slashCommandFile.name.toLowerCase()] = slashCommandFile;
    slashCommands.push(slashCommandFile);
  };

  for (const guildID of client.guilds.cache.keys()) {
    const guild = client.guilds.cache.get(guildID);
    guild.commands.set(slashCommands);

    client.on('interactionCreate', (interaction) => {
      if (interaction.isCommand() && interaction.guildId == guildID) {
        try {
          slashCommands[interaction.commandName].callback(interaction);
        } catch (error) {
          console.error(error);
          const embed = new MessageEmbed()
            .setTitle('An error occured while executing that command.')
            .setColor('RED')
          interaction.reply({ embeds: [embed], ephemeral: true });
        }
      }
    });
  }
};
