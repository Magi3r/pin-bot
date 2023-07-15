import { ApplicationCommandOptionType, CommandInteraction, Message } from "discord.js";
import { Command } from "../types/Command";

const command: Command = {
    data: {
        name: "pin",
        description: 'Pins a message!',
        options: [
            {
                name: 'message_id',
                description: 'Message ID',
                required: true,
                type: ApplicationCommandOptionType.String
            }
        ]
    },
    // new SlashCommandBuilder()
    //     .setName('pin')
    //     .setDescription('Pins a message!')
    //     .addStringOption(
    //         option =>
    //             option
    //                 .setName('message_id')
    //                 .setDescription('Message ID')
    //                 .setRequired(true)

        // ),
    async execute(interaction: CommandInteraction) {
        let answer = "Placeholder text (this is not intended)";
        console.log("pin");
        const message_id: string = await interaction.options.get('message_id')?.value as string;
        console.log(message_id);
        interaction.channel?.messages.fetch(message_id).then(async (message: Message) => {
            if (!message.pinnable) {
                answer = "Message is not pinnable";
            }
            else {
                await message.pin(interaction.user.username);
                answer = "Message pinned!";
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