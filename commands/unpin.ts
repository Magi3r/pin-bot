import { ApplicationCommandOptionType, CommandInteraction, Message } from "discord.js";
import { Command } from "../types/Command";
import { parseMessageID } from "../utils";
const command: Command = {
    data: {
        name: "unpin",
        description: 'Unpins a message!',
        options: [
            {
                name: 'message_id',
                description: 'Message ID',
                required: true,
                type: ApplicationCommandOptionType.String
            }
        ]
    },
    async execute(interaction: CommandInteraction) {        
        const input = await interaction.options.get('message_id')?.value as string;
        const message_id = parseMessageID(input);
        console.log(`/unpin invoced by '${interaction.user}' for message '${message_id}'`);
        if (!message_id) {
            console.log("Invalid Message");
            await interaction.followUp({ content: "Can't parse messageID from input", ephemeral: true });
            return;
        }

        interaction.channel?.messages.fetch(message_id).then(async (message: Message) => {
            if (!message.pinned) {
                const answer = "Message is not pinned";
                console.log(answer);
                await interaction.followUp({ content: answer, ephemeral: true });
            }
            else {
                await message.unpin(interaction.user.username);
                const answer = "Message unpinned!";
                console.log(answer);
                await interaction.followUp({ content: answer, ephemeral: true });
            }
        }
        ).catch(async () => {
            const answer = "Message not found";
            console.log(answer);
            
            await interaction.followUp({ content: answer, ephemeral: true });
        });
        
    },
};
export default command;