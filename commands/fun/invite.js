const { SlashCommandBuilder, Client } = require('discord.js');
// const client = require('../../index')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Link to add the bot to your own server'),
	async execute(interaction) {
		const { channel, client, options } = interaction;

		// const user = interaction.

		await interaction.reply({ content: 'Check your DM! :heart: If you don\'t receive any DM, please open your DM on this server at least the time to get the link', ephemeral: true });
		
		try {
			interaction.user.send('Here\'s the link to add me to your server, thanks for your support :heart: https://shorturl.at/zCFK6');
			// client.users.fetch(interaction.user.id).then(user => user.send());
		} catch (err) {
			console.log(err)
		}
	},
};