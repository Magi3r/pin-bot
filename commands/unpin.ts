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
    // data: new SlashCommandBuilder()
    //     .setName('pin')
    //     .setDescription('Pins a message!')
    //     .addStringOption(
    //         new SlashCommandStringOption()
    //             .setName('message_id')
    //             .setDescription('Message ID')
    //             .setRequired(true)
    //     ),
    async execute(interaction: CommandInteraction) {
        let answer = "Placeholder text (this is not intended)";
        console.log("unpin");
        const message_id: string = await interaction.options.get('message_id')?.value as string;
        interaction.channel?.messages.fetch(message_id).then(async (message: Message) => {
            if (!message.pinned) {
                answer = "Message is not pinned";
            }
            else {
                await message.unpin(interaction.user.username);
                answer = "Message unpinned!";
            }
        }
        ).catch((message: Message) => {
            console.log(message);
            answer = "Message not found"
        });
        await interaction.followUp({ content: answer, ephemeral: true });
    },
};
export default command;