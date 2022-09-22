import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders';
const tokenPrice: BaseSlashCommandI = {
    name: "tokenprice",
    execute(client, interaction) {
        if (interaction.isChatInputCommand()) {
            const tokenName = interaction.options.getString("tokenname");
            interaction.reply({
                "content": `token searching for ${tokenName}`,
            });
        }
    },
    jsonData() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription("Know the current price of a token")
            .addStringOption((option: SlashCommandStringOption) => {    // first string options
                return option.setName("tokenname")   // option details
                    .setDescription("Select a token")
                    .setRequired(true)
                    .setChoices(
                        {
                            name: "Ether (Ethereum)",
                            value: "ether"
                        },
                        {
                            name: "Matic (Polygon)",
                            value: "matic"
                        },
                        {
                            name: "Cronos (Crypto)",
                            value: "cronos"
                        },
                        {
                            name: "Fantom",
                            value: "fantom"
                        }
                    )
            })
            .toJSON()
    }
}

export default tokenPrice;