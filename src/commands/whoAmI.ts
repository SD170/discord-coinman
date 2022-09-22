import { SlashCommandBuilder } from '@discordjs/builders';
const whoAmI: BaseSlashCommandI = {
    name: "whoami",
    execute(client, interaction) {
        if (interaction.isChatInputCommand()) {
            interaction.reply({ content: `your name is, ${interaction.user}` })
        }
    },
    jsonData() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription("Who the hell are you??")
            .toJSON();
    },
}

export default whoAmI;