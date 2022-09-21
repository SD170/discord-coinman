import { SlashCommandBuilder } from '@discordjs/builders';
const bestBuddy: BaseSlashCommandI = {
    name: "bestbuddy",
    execute(client, interaction) {
        if (interaction.isChatInputCommand()) {
            interaction.reply({ content: `your best friend is, ${interaction.options.get("bestbuddy")?.user}` })
        }
    },
    jsonData() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription("your best friend!")
            .addUserOption((option) => option.setName("bestbuddy")
                .setDescription("select your best friend")
                .setRequired(true))
            .toJSON();
    },
}

export default bestBuddy;