"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const tokenDetails_1 = require("../../utils/tokenDetails");
const tokenPriceFetcher_1 = require("../../api/tokenPriceFetcher");
const tokenPrice = {
    name: "tokenprice",
    async execute(client, interaction) {
        if (interaction.isChatInputCommand()) {
            const tokenName = interaction.options.getString("tokenname");
            console.log(tokenName);
            const tokenDetail = tokenDetails_1.tokenDetails[tokenName];
            // interaction.reply() has a 3 second window, in those cases use defer reply
            await interaction.deferReply();
            const tokenPrice = await (0, tokenPriceFetcher_1.moralisTokenPriceFetcher)(tokenDetail);
            console.log(tokenPrice);
            await interaction.editReply({
                "content": `Price of ${tokenName} right now is ${tokenPrice} USD !!`,
            });
        }
    },
    jsonData() {
        const tokenChoices = Object.values(tokenDetails_1.tokenDetails).map((eachToken) => {
            const choice = {
                name: eachToken.name,
                value: eachToken.value,
            };
            return choice;
        });
        return new builders_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription("Know the current price of a token")
            .addStringOption((option) => {
            return option.setName("tokenname") // option details
                .setDescription("Select a token")
                .setRequired(true)
                .setChoices(...tokenChoices);
        })
            .toJSON();
    }
};
exports.default = tokenPrice;
