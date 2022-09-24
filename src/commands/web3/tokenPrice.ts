import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders';
import { tokenDetails } from '../../utils/tokenDetails';
import { moralisTokenPriceFetcher } from '../../api/tokenPriceFetcher';
import { fetchCachePrice, saveCachePrice } from '../../cache/redisServices';


const tokenPrice: BaseSlashCommandI = {
    name: "tokenprice",
    async execute(client, interaction) {
        if (interaction.isChatInputCommand()) {
            const tokenName = interaction.options.getString("tokenname");

            const tokenDetail = tokenDetails[tokenName!];
            // interaction.reply() has a 3 second window, in those cases use defer reply
            await interaction.deferReply();
            // check in chache
            let tokenPrice = await fetchCachePrice(tokenName!);

            if (!tokenPrice) {
                console.log("not found in cache");
                tokenPrice = await moralisTokenPriceFetcher(tokenDetail);
                // caching
                await saveCachePrice(tokenName!, tokenPrice);
            }



            console.log(tokenPrice);
            await interaction.editReply({
                "content": `Price of ${tokenName} right now is ${tokenPrice} USD !!`,
            });
        }
    },
    jsonData() {

        const tokenChoices = Object.values(tokenDetails).map((eachToken) => {
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