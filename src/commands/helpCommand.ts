
import {SlashCommandBuilder} from "@discordjs/builders";
import {SlashCommand} from "../classes/SlashCommand";

export default new SlashCommand({
    builder: new SlashCommandBuilder().setName("help").setDescription("Help command used to display all commands."),
    permissions: "EVERYONE",
    run: async ({client, interaction}) => {
        // Reply with a list of all commands and their descriptions. (usages is: (command: <arg: type>)
        await interaction.reply( {...client.utilities.getEmbedOption( client.utilities.embedGenerators.custom(
            "Help",
            "RANDOM",
            `List of commands:` +
            `\n\`\`\`${client.commands.map( ( command ) => ` ${command.builder.name} - ${command.builder.description}` ).join( "\n" )}\`\`\``
            ) ) } );
    }
});