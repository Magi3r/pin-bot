import { CommandInteraction, Message, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { Command } from "../types/Command"
const command: Command = {
    data: new SlashCommandBuilder()
        .setName('pin')
        .setDescription('Pins a message!')
        .addStringOption(
            new SlashCommandStringOption()
                .setName('message_id')
                .setDescription('Message ID')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        let answer = "";
        console.log("unpin");
        const message_id: string = await interaction.options.get('message_id')?.value as string;
        interaction.channel?.messages.fetch(message_id).then((message: Message) => {
            if (!message.pinned) {
                answer = "Message is not pinned";
            }
            else {
                message.unpin(interaction.user.username);
                answer = "Message unpinned!";
            }
        }
        ).catch(() => {
            answer = "Message not found"
        });

        await interaction.followUp({ content: answer, ephemeral: true });
    },
};
export default command;