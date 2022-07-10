
import {SlashCommandBuilder} from "@discordjs/builders";
import {SlashCommand} from "../classes/SlashCommand";
import {MessageEmbed} from "discord.js";
import { Octokit } from "octokit";

export default new SlashCommand({
    builder: new SlashCommandBuilder().setName("repolist").setDescription("List all repos (Simple command to test the bot)."),
    permissions: "EVERYONE",
    run: async ({client, interaction}) => {

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
                interaction.reply({ embeds: [embed], ephemeral: true });
            });
    }
});