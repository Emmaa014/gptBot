const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const colors = require('../../couleurs.json');

const helpEmbed = new EmbedBuilder()
    .setColor(colors.noir)
	.setAuthor({ name: 'Chat GPT Bot', iconURL:'https://cdn.discordapp.com/attachments/418152690044895242/1136040479939625131/openai-avatar.png', url:'https://www.discord.gg/Cex3GgBZdu' })
	.setTitle('Some usefull informations:')
	.addFields(
		{ name: ':lock: Usage limit:', value: 'Each server using the free version of the bot is limited to 50 requests each day' },
		{ name: ':bar_chart: Manage permissions', value: 'If you only want to allow some people to use any command, please refer to this article: https://shorturl.at/BDIR2' },
		{ name: ':question: Need help?', value: 'If you need help at anytime or just want to know lastest news about the bot, it\'s here: https://www.discord.gg/Cex3GgBZdu' },
		{ name: ':sparkles: Upgrade to unlimited requests', value: 'If you want to unlock unlimited requests or just support me, you can join my Patreon from 1$/mo! https://shorturl.at/egANO' },
		{ name: ':airplane_arriving:  Add me to your server', value: 'Want to add this bot to your server? Just click here: https://shorturl.at/zCFK6' },
		{ name: ':globe_with_meridians: Open Source Project', value: 'This project is open source, if you wanna take a look at the code or submit any suggestion, that\'s here:  https://shorturl.at/yIOQ6'},
		{ name: ':heart: Thank you :heart:', value: 'This projects means a lot to me, even tought it\'s a small bot, I like to share my creations to everyone!' },
	)
	.setFooter({ text: 'Developped by emma014', iconURL: 'https://cdn.discordapp.com/avatars/275676354408611840/07a0e5e0fa70c1e8da97d7f45329afed.png' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('This command will explain you everything you need to know about this bot!'),
	async execute(interaction) {
		await interaction.reply({ embeds: [helpEmbed] });
	},
};