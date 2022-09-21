import { BaseSlashCommandI } from '../../utils/BaseSlashCommand';
import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders';
const teamPlyer: BaseSlashCommandI = {
    name: "teamplayer",
    execute(client, interaction) {
        if (interaction.isChatInputCommand()) {
            const teamName = interaction.options.getString("team");
            const playerName = interaction.options.getString("player");
            interaction.reply({
                "content": `Fav team: ${teamName}, and player: ${playerName}`,
            });
        }
    },
    jsonData() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription("Select your favorite team and player")
            .addStringOption((option: SlashCommandStringOption) => {    // first string options
                return option.setName("team")   // option details
                    .setDescription("Select your favorite team")
                    .setRequired(true)
                    .setChoices(    // option choices
                        {
                            name: "Man UTD",
                            value: "Manchester United"
                        },
                        {
                            name: "Real Madrid",
                            value: "Real Madrid"
                        },
                        {
                            name: "Juve",
                            value: "Juventus"
                        },
                        {
                            name: "Spotring",
                            value: "Sporting Lisbon"
                        }
                    )
            })
            .addStringOption((option: SlashCommandStringOption) => {    // first string options
                return option.setName("player")   // option details
                    .setDescription("Select your favorite plater")
                    .setRequired(true)
                    .setChoices(    // option choices
                        {
                            name: "CR7",
                            value: "Cristiano Ronaldo"
                        },
                        {
                            name: "Messi",
                            value: "Lionel Messi"
                        },
                        {
                            name: "Neymar",
                            value: "Neymar Jr"
                        },
                        {
                            name: "Mbappe",
                            value: "Kylian Mbappe"
                        }
                    )
            })
            .toJSON()
    }
}

export default teamPlyer;