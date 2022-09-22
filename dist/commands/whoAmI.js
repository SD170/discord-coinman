"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const whoAmI = {
    name: "whoami",
    execute(client, interaction) {
        if (interaction.isChatInputCommand()) {
            interaction.reply({ content: `your name is, ${interaction.user}` });
        }
    },
    jsonData() {
        return new builders_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription("Who the hell are you??")
            .toJSON();
    },
};
exports.default = whoAmI;
