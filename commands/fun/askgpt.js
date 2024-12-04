const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { OpenAI } = require('openai');
const { apiKey } = require('../../config.json');

const openai = new OpenAI({
    apiKey: apiKey
})
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
        let context = [{ role: 'system', content: 'You are a cool and fun Discord bot. You are present on multiples servers' }];

        console.log(`Request sent: "${query}" on ${interaction.guild.name}`);
        
        context.push({
            role: 'user',
            content: query
        });

        const answer = await openai.chat.completions.create({
            messages: context,
            model: "gpt-3.5-turbo",
        });
        console.log(answer);
        console.log(answer.choices[0].message.content);

		try {
            if(answer.choices[0].message.content.length > 2000) {
                console.log('CHECKPOINT ONE ✓');
                console.log('Length: ' + answer.choices[0].message.content.length);
                let answerSplitted1 = answer.choices[0].message.content.slice(0, 2000);
                let answerSplitted2 = answer.choices[0].message.content.slice(2000);
                await interaction.editReply(answerSplitted1).then(
                    await interaction.channel.send(answerSplitted2)
                );

                if(answerSplitted2.length > 2000) {
                    console.log('CHECKPOINT TWO ✓')
                    let answerSplitted3 = answer.choices[0].message.content.slice(4000);
                    answerSplitted2 = answer.choices[0].message.content.slice(2000, 4000);
                    await interaction.editReply(answerSplitted1).then(
                        await interaction.channel.send(answerSplitted2).then(
                            await interaction.channel.send(answerSplitted3)
                        )
                    );
                }
            } else {
                await interaction.editReply(answer.choices[0].message.content);
            }
            
        } catch (err) {
            console.error(err)
            await interaction.editReply({ content: 'Sorry, there was a problem, please try again later', ephemeral: true })
        }
	},
};
