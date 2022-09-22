"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const teamPlyer = {
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
        return new builders_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription("Select your favorite team and player")
            .addStringOption((option) => {
            return option.setName("team") // option details
                .setDescription("Select your favorite team")
                .setRequired(true)
                .setChoices(// option choices
            {
                name: "Man UTD",
                value: "Manchester United"
            }, {
                name: "Real Madrid",
                value: "Real Madrid"
            }, {
                name: "Juve",
                value: "Juventus"
            }, {
                name: "Spotring",
                value: "Sporting Lisbon"
            });
        })
            .addStringOption((option) => {
            return option.setName("player") // option details
                .setDescription("Select your favorite plater")
                .setRequired(true)
                .setChoices(// option choices
            {
                name: "CR7",
                value: "Cristiano Ronaldo"
            }, {
                name: "Messi",
                value: "Lionel Messi"
            }, {
                name: "Neymar",
                value: "Neymar Jr"
            }, {
                name: "Mbappe",
                value: "Kylian Mbappe"
            });
        })
            .toJSON();
    }
};
exports.default = teamPlyer;
