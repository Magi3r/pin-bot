import { ApplicationCommandOptionType, CommandInteraction, Message } from "discord.js";
import { Command } from "../types/Command";
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
        const message_id: string = await interaction.options.get('message_id')?.value as string;
        console.log(`/unpin invoced by '${interaction.user}' for message '${message_id}'`);
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