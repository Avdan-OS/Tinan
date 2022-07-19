const { EmbedBuilder, Colors } = require('discord.js');
const { Octokit } = require('octokit');
require('dotenv').config();

module.exports = {
  name: 'repolist',
  description: 'This is a test command that lists repositories in the Avdan-OS organisation.',
  callback: async (interaction) => {
    const octokit = new Octokit({ auth: process.env.GITHUB_API_KEY });

    await octokit.request('GET /orgs/{org}/repos', { org: 'Avdan-OS'})
    .then((data) => {
      let embed = new EmbedBuilder()
        .setTitle('Repository list')
        .setColor(Colors.Blue)
        .setFooter({ text: 'Click on an arrow to open the corresponding repository' })

      data.data.forEach(dataChildren => {
        dataChildren.description = dataChildren.description || "N/A";
        embed.addFields([
          { name: `${dataChildren.name}`, value: `[>](https://github.com/Avdan-OS/${dataChildren.name}) ${dataChildren.description}`, inline: true }
        ])
      })
      interaction.reply({ embeds: [embed], ephemeral: true });
    });
  }
};
