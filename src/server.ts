import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";


//load env vars
dotenv.config({path: __dirname+'/../.env'});


// this allows us to recieve Guilds and GuildMessages events.
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// we need the token to login the bot
const BOT_TOKEN = process.env.BOT_TOKEN;

// bot is live!!
client.login(BOT_TOKEN);

