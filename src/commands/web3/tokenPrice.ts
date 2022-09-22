import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders';
import { tokenDetails } from '../../utils/tokenDetails';
const tokenPrice: BaseSlashCommandI = {
    name: "tokenprice",
    execute(client, interaction) {
        if (interaction.isChatInputCommand()) {
            const tokenName= interaction.options.getString("tokenname");

            interaction.reply({
                "content": `token searching for ${tokenName} with address ${tokenDetails[tokenName!].address}`,
            });
        }
    },
    jsonData() {

        const tokenChoices = Object.values(tokenDetails).map((eachToken)=> {
            const choice = {
                name: eachToken.name,
                value: eachToken.value,
            }

            return choice;
        })

        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription("Know the current price of a token")
            .addStringOption((option: SlashCommandStringOption) => {    // first string options
                return option.setName("tokenname")   // option details
                    .setDescription("Select a token")
                    .setRequired(true)
                    .setChoices(...tokenChoices)
            })
            .toJSON()
    }
}

export default tokenPrice;