import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders';
const teamPlyer: BaseSlashCommandI = {
    name: "player",
    execute(client, interaction) {
        if (interaction.isChatInputCommand()) {
            // interaction.options.data; // res: [ { name: 'jersey', type: 3, value: '17' } ]
            // interaction.options.get("jersey")?.name; // pass: the arg/optn res: "jersey" 
            // interaction.options.get("jersey")?.value; // pass: the arg/optn res: the value of arg/optn 
            const jerseyNo = interaction.options.getString("jersey"); // pass: the arg/optn res: the value of arg/optn 
            const cleatName = interaction.options.getString("cleat"); // pass: the arg/optn res: the value of arg/optn 
            interaction.reply({
                "content": `Your jersey no is ${jerseyNo}, and yout boot cleat name is ${cleatName}`,
            });
        }
    },
    jsonData() {
        // command using json for discord api
        return {
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
        }
    }
}

export default teamPlyer;