import { REST, RESTPutAPIApplicationCommandsResult, Routes } from "discord.js";
import { Command } from "./types/Command";

export default async function refreshCommands(commands:Command[], token: string, clientID: string) {
    const commandJSON = commands.map(({data})=> {
        data
    });
    const rest = new REST().setToken(token);
    try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);
    
            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationCommands(clientID),
                { body: [] },
            ) as RESTPutAPIApplicationCommandsResult;
            console.log(`Unregistered ${data.length} existing commands.`);
            await rest.post(Routes.applicationCommands(clientID),
            {body: commandJSON});
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
}