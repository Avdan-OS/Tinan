

import {PermissionResolvable} from "discord.js";
import {Event} from "../types/events";
import {SlashCommandType} from "../types/slashCommandType";

export default new Event( "interactionCreate", async ( client, interaction ) => {
    if ( interaction.isCommand( ) ) {
        const command: SlashCommandType = client.commands.get( interaction.commandName );


        if ( command ) {
            switch ( command.permissions ) {
                case "EVERYONE": await command.run( { client, interaction } ); break;
                case "AUTHOR":
                    if ( client.configuration.isAuthorized( interaction.user.id ) )
                        await command.run( { client, interaction } ); break;
                default:
                    if( interaction.memberPermissions!.has( command.permissions as PermissionResolvable ) ) await command.run( { client, interaction } );
                    else await interaction.reply( { embeds: [ client.utilities.embedGenerators.error("You do not have permission to use this command.") ], ephemeral: true } );
            }
        }
    }
} );