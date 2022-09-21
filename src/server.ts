import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";


//load env vars
dotenv.config({ path: __dirname + '/../.env' });


// this allows us to recieve Guilds and GuildMessages events.
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// we need the token to login the bot
const BOT_TOKEN = process.env.BOT_TOKEN;

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

