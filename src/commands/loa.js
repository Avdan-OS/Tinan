const cfg = require('../config.json');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, ButtonStyle, PermissionsBitField, Colors } = require('discord.js');

module.exports = {
	name: 'loa',
	description: 'Apply or Return LOA',
	options: [
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: 'apply',
			description: 'Apply for LOA',
			options: [
				{
					name: 'github',
					description: 'Your GitHub username.',
					type: ApplicationCommandOptionType.String,
					required: true,
				},
				{
					name: 'figma',
					description: 'Your Figma username.',
					type: ApplicationCommandOptionType.String,
					required: true,
				},
				{
					name: 'reason',
					description: 'The reason for your leave',
					type: ApplicationCommandOptionType.String,
					required: true,
				},
				{
					name: 'return',
					description: 'Time of return from leave',
					type: ApplicationCommandOptionType.String,
					required: true,
				},
			],
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: 'return',
			description: 'Return from LOA',
		},
	],

	callback: async (interaction) => {
		const options = interaction.options;

		if (options._subcommand === 'apply') {
			if (!interaction.member.roles.cache.find((r) => r.name === 'Developer' || 'Designer')) {
				const embed = new EmbedBuilder()
					.setTitle('You need the **Developer** or the **Designer** role to apply for LOA.')
					.setColor(Colors.Red)

				return interaction.reply({ embeds: [embed], ephemeral: true });
			}

			if (interaction.member.roles.cache.find((r) => r.name === '[LOA]')) {
				const embed = new EmbedBuilder()
					.setTitle('You are already set to LOA.')
					.setColor(Colors.Red)

				return interaction.reply({ embeds: [embed], ephemeral: true });
			}

			const dev = interaction.member;
			const loaRole = interaction.guild.roles.cache.find(r => r.name === '[LOA]');
			const loaChannel = interaction.guild.channels.cache.find(c => c.id === cfg.loaReports);

			const embed = new EmbedBuilder()
				.setTitle('LOA pending.')
				.setColor(Colors.Blue)
				.setFields([
					{ name: 'GitHub username', value: options.getString('github'), inline: true },
					{ name: 'Figma Username', value: options.getString('figma'), inline: true },
					{ name: 'Reason', value: options.getString('reason'), inline: true },
					{ name: 'Return', value: options.getString('return'), inline: true },
				])
				.setAuthor({ name: interaction.member.user.tag, iconURL: interaction.member.displayAvatarURL() });
			
			const buttons = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
				  .setCustomId('accept')
				  .setLabel('Accept')
				  .setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
				  .setCustomId('deny')
				  .setLabel('Deny')
				  .setStyle(ButtonStyle.Danger),
			)
			
			const filter = (ButtonInteraction) => { return ButtonInteraction.member.permissions.has(PermissionsBitField.Flags.Administrator); }
			loaChannel.send({ embeds: [embed], components: [buttons] }).then( message => {
				const embed = new EmbedBuilder()
					.setTitle('LOA asked successfully.')
					.setColor(Colors.Green)

				interaction.reply({ embeds: [embed], ephemeral: true });
				const collector = message.channel.createMessageComponentCollector({ filter, max: 1 });

				collector.on('end', (collection) => {
					if (collection.first().customId == 'accept') {
					  dev.setNickname(`[LOA] ${dev.displayName}`); 
					  dev.roles.add(loaRole);
					  embed.setTitle(`LOA granted by \`${collection.first().member.user.tag}\``)
					  embed.setColor(Colors.Green)

					  message.edit({ embeds: [embed], components: [] });
					} else {
					  embed.setTitle(`LOA denied by \`${collection.first().member.user.tag}\``)
					  embed.setColor(Colors.Red)

					  message.edit({ embeds: [embed], components: [] });
					}
				})
			});
		} else if (options._subcommand === 'return') {
			if (!interaction.member.roles.cache.find((r) => r.name === 'Developer' || 'Designer')) {
				const embed = new EmbedBuilder()
					.setTitle('You need the **Developer** or the **Designer** role to return from LOA.')
					.setColor(Colors.Red)
				
				return interaction.reply({ embeds: [embed], ephemeral: true });
			}

			if (!interaction.member.roles.cache.find((r) => r.name === '[LOA]')) {
				const embed = new EmbedBuilder()
					.setTitle('You are not set to LOA.')
					.setColor(Colors.Red)
				
				return interaction.reply({ embeds: [embed], ephemeral: true });
			}

			const dev = interaction.member;
			const loaRole = interaction.guild.roles.cache.find((r) => r.name === '[LOA]');
			const loaChannel = interaction.guild.channels.cache.find((c) => c.id === cfg.loaReports);

			const embed = new EmbedBuilder()
				.setTitle('Returned from their LOA.')
				.setColor(Colors.Blue)
				.setAuthor({ name: interaction.member.user.tag, iconURL: interaction.member.displayAvatarURL() });

			if (dev.displayName.slice(0, 6) !== '[LOA] ') {
				await dev.roles.remove(loaRole);
				await loaChannel.send({ embeds: [embed] });
				const embed = new EmbedBuilder()
					.setTitle('Returned from LOA.\nℹ It seems that your nickname was altered during your LOA, no actions will be executed on your nickname.')
					.setColor(Colors.Green);

				return interaction.reply({ embeds: [embed], ephemeral: true });
			}

			try {
				await dev.setNickname(dev.displayName.slice(6));
				await dev.roles.remove(loaRole);
				await loaChannel.send({ embeds: [embed] });
				const embed = new EmbedBuilder()
					.setTitle('Returned from LOA')
					.setColor(Colors.Green)
				
					interaction.reply({ embeds: [embed], ephemeral: true });
			} catch (err) {
				console.log(err);
				const embed = new EmbedBuilder()
					.setTitle('Something went wrong')
					.setColor(Colors.Red)
				
				interaction.reply({ embeds: [embed], ephemeral: true });
			}
		}
	},
};
