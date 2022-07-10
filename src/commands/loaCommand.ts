
import {SlashCommandBuilder} from "@discordjs/builders";
import {SlashCommand} from "../classes/SlashCommand";
import {
    GuildMember,
    GuildMemberRoleManager,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Permissions, Role,
    User
} from "discord.js";

export default new SlashCommand({
    builder: new SlashCommandBuilder()
        .setName("loa")
        .setDescription("Apply or return LOA")
        .addSubcommand(command =>
            command
                .setName("apply")
                .setDescription("Apply LOA")
                .addStringOption( option => option.setName("reason").setDescription("Reason for your leave").setRequired( true ) )
                .addStringOption( option => option.setName("return").setDescription("Time of return from leave").setRequired( true ) )
        )
        .addSubcommand(command =>
            command
                .setName("return")
                .setDescription("Return LOA")
        ),
    permissions: "EVERYONE",
    run: async ({client, interaction}) => {
        const options = interaction.options;
        const memberRoles = (interaction.member?.roles as GuildMemberRoleManager);
        if (options.getSubcommand() === 'apply') {
            if (!memberRoles.cache.find((r) => r.name === "Developer")) {
                return interaction.reply({ content: 'You need the Developer role to apply for LOA', ephemeral: true });
            }

            if (memberRoles.cache.find((r) => r.name === "[LOA]")) {
                return interaction.reply({ content: 'You are already set to LOA', ephemeral: true });
            }

            const dev = interaction.member as GuildMember;

            const loaRole = interaction.guild?.roles.cache.find((r) => r.name === "[LOA]");
            const loaChannel = interaction.guild?.channels.cache.find((c) => c.id === client.configuration.loaReports);
            if (!loaRole || !loaChannel || !loaChannel.isText()) return;
            const embed = new MessageEmbed({
                title: `LOA pending`,
                color: '#0099ff',
                fields: [
                    {
                        name: 'Reason',
                        value: options.getString('reason') ?? 'No reason given',
                        inline: true,
                    },
                    {
                        name: 'Return',
                        value: options.getString('return') ?? 'No return given',
                        inline: true,
                    },
                ],
            }).setAuthor({
                name: (interaction.member?.user as User).tag,
                iconURL: (interaction.member as GuildMember).displayAvatarURL()
            });
            const buttons = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('accept')
                    .setLabel('Accept')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('deny')
                    .setLabel('Deny')
                    .setStyle('SECONDARY'),
            )
            const filter = (buttonInteraction: any) => { return (buttonInteraction.member?.permissions as Permissions)!.has(Permissions.FLAGS.ADMINISTRATOR); }

            loaChannel.send({ embeds: [embed], components: [buttons] }).then( message => {
                interaction.reply({ content: 'LOA asked successfully.', ephemeral: true });
                const collector = message.channel.createMessageComponentCollector({ filter, max: 1 });
                collector.on('end', (collection) => {
                    if (collection.first()?.customId == 'accept') {
                        dev?.setNickname(`[LOA] ${dev.displayName}`);
                        dev.roles.add(loaRole);
                        embed.setTitle(`LOA granted by \`${(collection.first()?.member?.user as User).tag}\``)
                        embed.setColor("GREEN")
                        message.edit({ embeds: [embed], components: [] });
                    } else {
                        embed.setTitle(`LOA denied by \`${(collection.first()?.member?.user as User).tag}\``)
                        embed.setColor("RED")
                        message.edit({ embeds: [embed], components: [] });
                    }
                })
            });
        } else if (options.getSubcommand() === 'return') {
            if (!memberRoles.cache.find((r) => r.name === "Developer")) {
                return interaction.reply({ content: 'You need the Developer role to return from LOA', ephemeral: true });
            }

            if (!memberRoles.cache.find((r) => r.name === "[LOA]")) {
                return interaction.reply({ content: 'You are not set to LOA', ephemeral: true });
            }

            const dev: GuildMember = interaction.member as GuildMember;
            const loaRole = interaction.guild?.roles.cache.find((r) => r.name === "[LOA]");
            const loaChannel = interaction.guild?.channels.cache.find((c) => c.id === client.configuration.loaReports);
            if (!loaRole || !loaChannel || !loaChannel.isText()) return;
            const embed = new MessageEmbed({
                title: `Returned from their LOA`,
                color: '#0099ff',
            }).setAuthor({
                name: (interaction.member?.user as User).tag,
                iconURL: (interaction.member as GuildMember).displayAvatarURL()
            });

            if (dev!.displayName.slice(0, 6) !== '[LOA] ') {
                await dev.roles.remove(loaRole as Role);
                await loaChannel.send({ embeds: [embed] });

                return interaction.reply({ content: 'Returned from LOA\nℹ It seems that your nickname was altered during your LOA, no actions will be executed on your nickname', ephemeral: true });
            }

            try {
                await dev.setNickname(dev.displayName.slice(6));
                await dev.roles.remove(loaRole);
                await loaChannel.send({ embeds: [embed] });

                await interaction.reply({content: 'Returned from LOA', ephemeral: true});
            } catch (err) {
                console.log(err);
                await interaction.reply({content: 'Something went wrong', ephemeral: true});
            }
        }
    }
});