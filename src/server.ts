import { REST, Client, GatewayIntentBits, Routes } from "discord.js";
import dotenv from "dotenv";


//load env vars
dotenv.config({ path: __dirname + '/../.env' });
/**
 * Loading env vars
 */
// we need the BOT_TOKEN to login the bot
const {BOT_TOKEN, CLIENT_ID, GUILD_ID} = process.env;


// this allows us to recieve Guilds and GuildMessages events.
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// starting/logging in the bot
if(!BOT_TOKEN){
    console.log("Please provide the BOT_TOKEN as a env variable");
    process.exit(0);
}

// rest client for discord api calls
const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

// bot is live!!
client.login(BOT_TOKEN);


client.on("ready", () => {
    console.log(`${client.user?.tag} has logged in`);
})

client.on("messageCreate", (message) => {
    console.log(`Message from ${message.author.tag}`);
    // to see message.content we need GatewayIntentBits.MessageContent intent while instantiating the client
    // and also enable "MESSAGE CONTENT INTENT" from the bot menu 
})

const main = async () => {
    const commands = [
        {
            name:"tester",
            description: "we test stuff, move away!!"
        }
    ]

    try {
        console.log("Adding new (/) commands.");
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID!, GUILD_ID!), {
            body:commands
        });
        console.log("Added!!");

    } catch (err) {
        console.log(err);
    }
}

main();