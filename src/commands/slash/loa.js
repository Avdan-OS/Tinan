const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'loa',
	description: 'Apply or Return LOA',
	options: [
		{
			type: 'SUB_COMMAND',
			name: 'apply',
			description: 'Apply for LOA',
			options: [
				{
					name: 'reason',
					description: 'The reason for your leave',
					type: 'STRING',
					required: true,
				},
				{
					name: 'return',
					description: 'Time of return from leave',
					type: 'STRING',
					required: true,
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name: 'return',
			description: 'Return from LOA',
		},
	],
	callback: async (interaction) => {
		const options = interaction.options;
		if (options._subcommand === 'apply') {
			if (!interaction.member.roles.cache.some((r) => r.id === config.devRole)) {
				return interaction.reply({ content: 'You need the Developer role to apply for LOA', ephemeral: true });
			}

			if (interaction.member.roles.cache.some((r) => r.id === config.loaRole)) {
				return interaction.reply({ content: 'You are already set to LOA', ephemeral: true });
			}

			const dev = interaction.member;
			const loaRole = interaction.guild.roles.cache.find((r) => r.id === config.loaRole);
			const loaChannel = interaction.guild.channels.cache.find((c) => c.id === config.loaReports);

			const embed = new MessageEmbed({
				title: `\`${dev.user.tag}\` has set their status to LOA`,
				color: '#0099ff',
				fields: [
					{
						name: 'Reason',
						value: options.getString('reason'),
						inline: true,
					},
					{
						name: 'Return',
						value: options.getString('return'),
						inline: true,
					},
				],
			});

			try {
				await dev.setNickname(`[LOA] ${dev.displayName}`);
				await dev.roles.add(loaRole);
				await loaChannel.send({ embeds: [embed] });
				interaction.reply({ content: 'LOA applied successfully', ephemeral: true });
			} catch (err) {
				console.log(err);
				interaction.reply({ content: 'Something went wrong', ephemeral: true });
			}
		} else if (options._subcommand === 'return') {
			if (!interaction.member.roles.cache.some((r) => r.id === config.devRole)) {
				return interaction.reply({ content: 'You need the Developer role to return from LOA', ephemeral: true });
			}

			if (!interaction.member.roles.cache.some((r) => r.id === config.loaRole)) {
				return interaction.reply({ content: 'You are not set to LOA', ephemeral: true });
			}

			const dev = interaction.member;
			const loaRole = interaction.guild.roles.cache.find((r) => r.id === config.loaRole);
			const loaChannel = interaction.guild.channels.cache.find((c) => c.id === config.loaReports);

			const embed = new MessageEmbed({
				title: `\`${dev.user.tag}\` has returned from their LOA`,
				color: '#0099ff',
			});

			if (dev.displayName.slice(0, 6) !== '[LOA] ') {
				await dev.roles.remove(loaRole);
				await loaChannel.send({ embeds: [embed] });

				return interaction.reply({ content: 'It seems that your nickname was altered during your LOA\nNo actions will executed on your nickname', ephemeral: true });
			}

			try {
				await dev.setNickname(dev.displayName.slice(6));
				await dev.roles.remove(loaRole);
				await loaChannel.send({ embeds: [embed] });

				interaction.reply({ content: 'LOA returned successfully', ephemeral: true });
			} catch (err) {
				console.log(err);
				interaction.reply({ content: 'Something went wrong', ephemeral: true });
			}
		}
	},
};
