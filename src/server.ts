import { REST, Client, GatewayIntentBits, Routes, BaseInteraction, Collection, ChannelType, } from 'discord.js';

import { SlashCommandBuilder, SlashCommandStringOption } from "@discordjs/builders";

import dotenv from "dotenv";
import { registerCommands } from './utils/registry';
import { connectRedis } from './cache/redisConfig';
import { runConsumer } from './kafka/runConsumer';


//load env vars
dotenv.config({ path: __dirname + '/../.env' });
/**
 * Loading env vars
 */
// we need the BOT_TOKEN to login the bot
const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

console.log(process.env.CONFLUENT_KEY);

// redis initialize
connectRedis();

// running kafka consumer before saving to redis
runConsumer();


// this allows us to recieve Guilds and GuildMessages events.
const client: SuperClient = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// starting/logging in the bot
if (!BOT_TOKEN) {
    console.log("Please provide the BOT_TOKEN as a env variable");
    process.exit(0);
}

// rest client for discord api calls
const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);





client.on("ready", () => {
    console.log(`${client.user?.tag} has logged in`);
})

//joined a server
client.on("guildCreate", guild => {
    // Create a new channel with permission overwrites
    // **NEED** "Manage Channels" permission from oath2 invite
    guild.channels.create({
        name: 'coin-man-hub',
        type: ChannelType.GuildText
    })
})


client.on("interactionCreate", async (interaction: BaseInteraction) => {
    if (interaction.isChatInputCommand()) {
        const { commandName } = interaction;
        const cmd: BaseSlashCommandI = client.slashCommands.get(commandName);
        if (cmd) {
            await cmd.execute(client, interaction);
        } else {
            interaction.reply({ content: "This command has no execute method :(" })
        }
    }
})

const main = async () => {

    try {
        console.log("Adding new (/) commands....");
        client.slashCommands = new Collection();
        await registerCommands(client, '../commands');
        // console.log(client.slashCommands);

        // formatting the commands as slashcommand json
        const slashCommandsJsonArr = client.slashCommands.map((cmd: BaseSlashCommandI) => cmd.jsonData())

        // adding the slashcommands to the discord guild
        // await rest.put(Routes.applicationCommands(CLIENT_ID!), {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID!, GUILD_ID!), {
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




    } catch (err) {
        console.log(err);
    }
}

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