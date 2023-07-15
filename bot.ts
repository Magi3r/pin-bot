// Require the necessary discord.js classes
import { config } from "dotenv";
import { Client, CommandInteraction, Events, GatewayIntentBits, Interaction } from "discord.js";
import { parse } from "ts-command-line-args";
import { CommandLineArgs } from "./types/CommandLineArgs";

const cliArgs = parse<CommandLineArgs>({
    token: { type: String, optional: true, alias: "t", description: "The Bot token. This one will override a token passed as environment variable.", typeLabel: "<Bot-Token>" },
    updateCommands: { type: Boolean, optional: true, alias: "u", description: "Updates the registered commands. This is only nessesary if commands are added or deleted.", defaultValue: false }
});

// Load .env and parse bot-token
config();
const TOKEN: string = cliArgs.token || process.env.token || "";

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages] });
import commands from "./commands";

// handle Interactions Event
client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
        await interaction.deferReply({ephemeral: true});
        await handleSlashCommand(client, interaction);
    }
})

// handle commands
async function handleSlashCommand(client: Client, interaction: CommandInteraction) {
    const commandName = interaction.commandName;
    for (const command of commands) {
        if (command.data.name == commandName) {
            command.execute(interaction);
        }
    }
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, async c => {
    if (cliArgs.updateCommands) {
        await client.application?.commands.set(commands.map(c => c.data));
    }
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
if (TOKEN.length == 0) {
    console.error('No Bot-Token provided.');
    process.exitCode = 1;
} else {
    client.login(TOKEN);
}