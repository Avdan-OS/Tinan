const { MessageEmbed } = require('discord.js');
const { Octokit } = require('octokit');
require('dotenv').config();

module.exports = {
  callback: async (message) => {
    const octokit = new Octokit({ auth: process.env.GITHUB_API_KEY });

    await octokit.request('GET /orgs/{org}/repos', {
      org: 'Avdan-OS'
    })
    .then((data) => {
      let embed = new MessageEmbed()
        .setTitle('Repository list')
        .setColor('BLUE')
        .setFooter({ text: 'Click on an arrow to open the corresponding repository' })

      data.data.forEach(dataChildren => {
        dataChildren.description = dataChildren.description || "N/A"
        embed.addFields(
          { name: `${dataChildren.name}`, value: `[>](https://github.com/Avdan-OS/${dataChildren.name}) ${dataChildren.description}`, inline: true }
        )
      })
      message.channel.send({ embeds: [embed] });
    });
  }
};