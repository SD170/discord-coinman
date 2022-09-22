import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders';
import { tokenDetails } from '../../utils/tokenDetails';
import { moralisTokenPriceFetcher } from '../../api/tokenPriceFetcher';


const tokenPrice: BaseSlashCommandI = {
    name: "tokenprice",
    async execute (client, interaction) {
        if (interaction.isChatInputCommand()) {
            const tokenName= interaction.options.getString("tokenname");
            const tokenDetail = tokenDetails[tokenName!];
            const tokenPrice = await moralisTokenPriceFetcher(tokenDetail);
            interaction.reply({
                "content": `Price of ${tokenName} right now is ${tokenPrice} USD !!`,
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