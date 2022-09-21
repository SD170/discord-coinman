import { BaseSlashCommandI } from '../utils/BaseSlashCommand';
import { SlashCommandBuilder } from '@discordjs/builders';
const bestBuddy:BaseSlashCommandI = {
    name:"bestbuddy",
    execute(client, interaction) {
        if(interaction.isChatInputCommand()){
            interaction.reply({content:`your name is, ${interaction.user}`})
        }
    },
    jsonData() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription("your best friend!")
            .toJSON();
    },
}

export default bestBuddy;