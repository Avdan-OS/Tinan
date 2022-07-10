import {ClientEvents} from "discord.js";
import {DiscordClient} from "../classes/DiscordClient";

export class Event<Key extends keyof ClientEvents> {
    constructor(
        public event: Key,
        // Note: Every event first argument is ALWAYS the client.
        public run: (client: DiscordClient, ...args: ClientEvents[Key]) => any
    ) {}
}