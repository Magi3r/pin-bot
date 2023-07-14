import { CommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import { Command } from "../types/Command"

const command: Command = {
    data: new SlashCommandBuilder()
        .setName('pin')
        .setDescription('Pins a message!')
        .addStringOption(
            option =>
                option
                    .setName('message_id')
                    .setDescription('Message ID')
                    .setRequired(true)

        ),
    async execute(interaction: CommandInteraction) {
        let answer = "";
        console.log("pin");
        const message_id: string = await interaction.options.get('message_id')?.value as string;
        interaction.channel?.messages.fetch(message_id).then((message: Message) => {
            if (!message.pinnable) {
                answer = "Message is not pinnable";
            }
            else {
                message.pin(interaction.user.username);
                answer = "Message pinned!";
            }
        }
        ).catch(() => {
            answer = "Message not found"
        });

        await interaction.followUp({ content: answer, ephemeral: true });
    },
};
export default command;