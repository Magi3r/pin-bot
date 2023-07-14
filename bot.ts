// Require the necessary discord.js classes
import { config } from "dotenv";
import { Client, CommandInteraction, Events, GatewayIntentBits, Interaction } from "discord.js";

// Load .env
config();
const TOKEN: string = process.env.token as string;


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
import commands from "./commands";

// handle Interactions Event
client.on("interactionCreate",async (interaction:Interaction) => {
    if(interaction.isCommand() || interaction.isContextMenuCommand()) {
        await handleSlashCommand(client, interaction);
    }
})

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
    client.application?.commands.set(commands.map(({data})=> data.toJSON()));
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN);

// handle commands
async function handleSlashCommand(client:Client, interaction: CommandInteraction) {
    const commandName = interaction.commandName;
    for (const command of commands) {
        if(command.data.name == commandName) {
            command.execute(interaction);
        }
    }
}