"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const bestBuddy = {
    name: "bestbuddy",
    execute(client, interaction) {
        if (interaction.isChatInputCommand()) {
            interaction.reply({ content: `your best friend is, ${interaction.options.get("bestbuddy")?.user}` });
        }
    },
    jsonData() {
        return new builders_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription("your best friend!")
            .addUserOption((option) => option.setName("bestbuddy")
            .setDescription("select your best friend")
            .setRequired(true))
            .toJSON();
    },
};
exports.default = bestBuddy;
