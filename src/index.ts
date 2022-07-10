import * as dotenv from 'dotenv';
import {DiscordClient} from "./classes/DiscordClient";

(async () => {
    dotenv.config();
    await new DiscordClient({
        intents: [
            'GUILDS',
            'GUILD_MEMBERS',
            'GUILD_MESSAGES',
            "GUILD_INVITES",
            'GUILD_MESSAGE_REACTIONS',
            'DIRECT_MESSAGES',
        ],
        partials: ['MESSAGE', 'REACTION', "GUILD_MEMBER", "CHANNEL", "USER"],
    }).run( ).catch(console.error);
})();