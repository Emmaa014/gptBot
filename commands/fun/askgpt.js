const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const { apiKey } = require('../../config.json')
require('dotenv/config')

const configuration = new Configuration({
    apiKey: apiKey
})
const openai = new OpenAIApi(configuration)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('askgpt')
		.setDescription('Want to ask something to chat GPT? Use this command')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Write what you want to say or to ask to Chat GPT')
                .setRequired(true))
        // .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
	async execute(interaction) {
        await interaction.deferReply();

        let query = interaction.options.getString('query');
        let context = [{ role: 'system', content: 'You are a cool and fun Discord bot on a F1 Discord Community of over 60.000 people on it' }];
        
        context.push({
            role: 'user',
            content: query
        });

        const answer = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: context,
            max_tokens: 450
        });

		try {
            if(answer.data.choices[0].message.content.length > 2000) {
                console.log('CHECKPOINT ONE ✓');
                console.log('Length: ' + answer.data.choices[0].message.content.length);
                let answerSplitted1 = answer.data.choices[0].message.content.slice(0, 2000);
                let answerSplitted2 = answer.data.choices[0].message.content.slice(2000);

                if(answerSplitted2.length > 2000) {
                    console.log('CHECKPOINT TWO ✓')
                    let answerSplitted3 = answer.data.choices[0].message.content.slice(4000);
                    answerSplitted2 = answer.data.choices[0].message.content.slice(2000, 4000);
                    await interaction.editReply(answerSplitted1).then(
                        await interaction.channel.send(answerSplitted2).then(
                            await interaction.channel.send(answerSplitted3)
                        )
                    );
                } else {
                    await interaction.editReply(answerSplitted1).then(
                        await interaction.channel.send(answerSplitted2)
                    );
                }
            } else {
                await interaction.editReply(answer.data.choices[0].message);
            };
            
        } catch (err) {
            console.error(err)
            await interaction.reply({ content: 'Sorry, there was a problem, please try again later', ephemeral: true })
        }
	},
};