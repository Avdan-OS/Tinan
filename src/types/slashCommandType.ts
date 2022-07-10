
import {CommandInteraction, PermissionResolvable} from "discord.js";
import {SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder} from "@discordjs/builders";
import {DiscordClient} from "../classes/DiscordClient";

export interface RunOptions {
    client: DiscordClient;
    interaction: CommandInteraction;
}

type RunFunction = (options: RunOptions) => Promise<any>;

export type SlashCommandPermissions = PermissionResolvable & "EVERYONE" | "AUTHOR" | "NONE";

export type SlashCommandType = {
    builder: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
    permissions: PermissionResolvable | string;
    run: RunFunction;
};