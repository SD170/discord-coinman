"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const registry_1 = require("./utils/registry");
const redisConfig_1 = require("./cache/redisConfig");
//load env vars
dotenv_1.default.config({ path: __dirname + '/../.env' });
/**
 * Loading env vars
 */
// we need the BOT_TOKEN to login the bot
const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
// redis initialize
(0, redisConfig_1.connectRedis)();
// this allows us to recieve Guilds and GuildMessages events.
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages]
});
// starting/logging in the bot
if (!BOT_TOKEN) {
    console.log("Please provide the BOT_TOKEN as a env variable");
    process.exit(0);
}
// rest client for discord api calls
const rest = new discord_js_1.REST({ version: '10' }).setToken(BOT_TOKEN);
client.on("ready", () => {
    console.log(`${client.user?.tag} has logged in`);
});
//joined a server
client.on("guildCreate", guild => {
    // Create a new channel with permission overwrites
    // **NEED** "Manage Channels" permission from oath2 invite
    guild.channels.create({
        name: 'coin-man-hub',
        type: discord_js_1.ChannelType.GuildText
    });
});
client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
        const { commandName } = interaction;
        const cmd = client.slashCommands.get(commandName);
        if (cmd) {
            await cmd.execute(client, interaction);
        }
        else {
            interaction.reply({ content: "This command has no execute method :(" });
        }
    }
});
const main = async () => {
    try {
        console.log("Adding new (/) commands....");
        client.slashCommands = new discord_js_1.Collection();
        await (0, registry_1.registerCommands)(client, '../commands');
        // console.log(client.slashCommands);
        // formatting the commands as slashcommand json
        const slashCommandsJsonArr = client.slashCommands.map((cmd) => cmd.jsonData());
        // adding the slashcommands to the discord guild
        // await rest.put(Routes.applicationGuildCommands(CLIENT_ID!, GUILD_ID!), {
        await rest.put(discord_js_1.Routes.applicationCommands(CLIENT_ID), {
            body: slashCommandsJsonArr
        });
        console.log("(/) commands added!!");
        // fetching slashcommand list
        // console.log("Fetching all registered commands!!");
        // const registeredSlashCommands = await rest.get(Routes.applicationGuildCommands(CLIENT_ID!, GUILD_ID!));
        // console.log(registeredSlashCommands);
        // console.log("All registered command fetched");
        console.log("Bot is going live....");
        // bot is live!!
        await client.login(BOT_TOKEN);
        console.log("Bot is live!!");
    }
    catch (err) {
        console.log(err);
    }
};
main();
// // removed from a server
// client.on("guildDelete", guild => {
//     // removed
// })
// client.on("messageCreate", (message) => {
//     console.log(`Message from ${message.author.tag}`);
//     // to see message.content we need GatewayIntentBits.MessageContent intent while instantiating the client
//     // and also enable "MESSAGE CONTENT INTENT" from the bot menu 
// })
