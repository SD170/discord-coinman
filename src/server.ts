import { REST, Client, GatewayIntentBits, Routes, Interaction, BaseInteraction, channelLink, ChatInputCommandInteraction } from 'discord.js';
import dotenv from "dotenv";


//load env vars
dotenv.config({ path: __dirname + '/../.env' });
/**
 * Loading env vars
 */
// we need the BOT_TOKEN to login the bot
const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;


// this allows us to recieve Guilds and GuildMessages events.
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// starting/logging in the bot
if (!BOT_TOKEN) {
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

client.on("interactionCreate", (interaction: BaseInteraction) => {
    if (interaction.isChatInputCommand()) {
        // commandName is a member if ChatInputCommandInteraction
        // so check of type then inside that use .commandName
        if (interaction.commandName === "player") {
            // interaction.options.data; // res: [ { name: 'jersey', type: 3, value: '17' } ]
            // interaction.options.get("jersey")?.name; // pass: the arg/optn res: "jersey" 
            // interaction.options.get("jersey")?.value; // pass: the arg/optn res: the value of arg/optn 
            const jerseyNo = interaction.options.getString("jersey"); // pass: the arg/optn res: the value of arg/optn 
            interaction.reply({
                "content": `Your jersey no is ${jerseyNo}`,
            });
        } else {
            console.log("Interaction: Chat input command");
            interaction.reply({
                "content": "Hey there!!!",
            });
        }

    }
})


const main = async () => {
    const commands = [
        {
            name: "tester",
            description: "we test stuff, move away!!"
        },
        {
            name: "player",
            description: "create a player",
            options: [
                {
                    name: 'jersey',
                    description: "your jersey number",
                    type: 3,
                    required: true
                }
            ]
        }
    ]

    try {
        console.log("Adding new (/) commands.");
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID!, GUILD_ID!), {
            body: commands
        });
        console.log("Added!!");

    } catch (err) {
        console.log(err);
    }
}

main();