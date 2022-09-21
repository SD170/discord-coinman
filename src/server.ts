import { REST, Client, GatewayIntentBits, Routes, BaseInteraction, } from 'discord.js';

import { SlashCommandBuilder, SlashCommandStringOption } from "@discordjs/builders";

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
            const cleatName = interaction.options.getString("cleat"); // pass: the arg/optn res: the value of arg/optn 
            interaction.reply({
                "content": `Your jersey no is ${jerseyNo}, and yout boot cleat name is ${cleatName}`,
            });
        } else if (interaction.commandName === "selectgoat") {
            const goatName = interaction.options.getString("goat");
            const result = goatName === "cristiano ronaldo" ? "You're right!!" : "Dead wrong!!"
            interaction.reply({
                "content": result,
            });
        } else if (interaction.commandName === "teamplayer") {
            const teamName = interaction.options.getString("team");
            const playerName = interaction.options.getString("player");
            interaction.reply({
                "content": `Fav team: ${teamName}, and player: ${playerName}`,
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

    const favTeamPlayer = new SlashCommandBuilder()
        .setName("teamplayer")
        .setDescription("Select your favorite team and player")
        .addStringOption((option: SlashCommandStringOption) => {    // first string options
            return option.setName("team")   // option details
                .setDescription("Select your favorite team")
                .setRequired(true)
                .setChoices(    // option choices
                    {
                        name: "Man UTD",
                        value: "Manchester United"
                    },
                    {
                        name: "Real Madrid",
                        value: "Real Madrid"
                    },
                    {
                        name: "Juve",
                        value: "Juventus"
                    },
                    {
                        name: "Spotring",
                        value: "Sporting Lisbon"
                    }
                )
        })
        .addStringOption((option: SlashCommandStringOption) => {    // first string options
            return option.setName("player")   // option details
                .setDescription("Select your favorite plater")
                .setRequired(true)
                .setChoices(    // option choices
                    {
                        name: "CR7",
                        value: "Cristiano Ronaldo"
                    },
                    {
                        name: "Messi",
                        value: "Lionel Messi"
                    },
                    {
                        name: "Neymar",
                        value: "Neymar Jr"
                    },
                    {
                        name: "Mbappe",
                        value: "Kylian Mbappe"
                    }
                )
        })

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
                },
                {
                    name: 'cleat',
                    description: "your cleat name",
                    type: 3,
                    required: true
                }
            ]
        },
        {
            name: "selectgoat",
            description: "select the goat",
            options: [
                {
                    name: 'goat',
                    description: "name of the goat",
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: 'cr7', // placeholder
                            value: 'cristiano ronaldo' // actual value
                        },
                        {
                            name: 'messi',
                            value: 'lionel messi'
                        }
                    ]
                }
            ]
        },
        favTeamPlayer.toJSON() // the command in json: command body basically

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