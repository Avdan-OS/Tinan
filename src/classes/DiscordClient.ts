import {Client, ClientEvents, ClientOptions, Collection} from "discord.js";
import klaw from "klaw"
import path from "path";
import chalk from "chalk";
import {SlashCommandType} from "../types/slashCommandType";
import {Event} from "../types/events";
import {Configuration} from "./Configuration";
import Utility from "./Utilities";

export class DiscordClient extends Client {
    public commands: Collection<string, any> = new Collection<string, SlashCommandType>( );
    public configuration: Configuration = new Configuration( this );
    public utilities: Utility = new Utility( this );

    public constructor( config: ClientOptions ) {
        super( config );
    }

    public async run( ) {


        /*
         *  _______   ___      ___ _______   ________   _________  ________
         * |\  ___ \ |\  \    /  /|\  ___ \ |\   ___  \|\___   ___\\   ____\
         * \ \   __/|\ \  \  /  / | \   __/|\ \  \\ \  \|___ \  \_\ \  \___|_
         *  \ \  \_|/_\ \  \/  / / \ \  \_|/_\ \  \\ \  \   \ \  \ \ \_____  \
         *   \ \  \_|\ \ \    / /   \ \  \_|\ \ \  \\ \  \   \ \  \ \|____|\  \
         *    \ \_______\ \__/ /     \ \_______\ \__\\ \__\   \ \__\  ____\_\  \
         *     \|_______|\|__|/       \|_______|\|__| \|__|    \|__| |\_________\
         *                                                           \|_________|
         */
        this.utilities.println( "Loading Events...", chalk.bgWhite.black`EVENTS`);
        await klaw(path.join(__dirname, "../events")).on("data", async (item) => {
            const eventFile = path.parse(item.path);
            if (!eventFile.ext || eventFile.ext !== ".ts") return;

            const event: Event<keyof ClientEvents> = await this.utilities.importFile(item.path);
            if (!event) return;
            this.on(event.event, (...args: any) => {
                event.run(this, ...args);
            });

            this.utilities.println(`Successfully bound event ${chalk.bgBlack.white`${eventFile.name}`} to ${chalk.bgBlack.white`${item.path}`}`, chalk.bgWhite.black`EVENT BIND`);
        });

        /**
         *  ________  ________  _____ ______   _____ ______   ________  ________   ________  ________
         * |\   ____\|\   __  \|\   _ \  _   \|\   _ \  _   \|\   __  \|\   ___  \|\   ___ \|\   ____\
         * \ \  \___|\ \  \|\  \ \  \\\__\ \  \ \  \\\__\ \  \ \  \|\  \ \  \\ \  \ \  \_|\ \ \  \___|_
         *  \ \  \    \ \  \\\  \ \  \\|__| \  \ \  \\|__| \  \ \   __  \ \  \\ \  \ \  \ \\ \ \_____  \
         *   \ \  \____\ \  \\\  \ \  \    \ \  \ \  \    \ \  \ \  \ \  \ \  \\ \  \ \  \_\\ \|____|\  \
         *    \ \_______\ \_______\ \__\    \ \__\ \__\    \ \__\ \__\ \__\ \__\\ \__\ \_______\____\_\  \
         *     \|_______|\|_______|\|__|     \|__|\|__|     \|__|\|__|\|__|\|__| \|__|\|_______|\_________\
         *                                                                                     \|_________|
         *
         */

        this.utilities.println( "Loading Commands...", chalk.bgWhite.black`COMMANDS`);
        await klaw(path.join(__dirname, "../commands")).on("data", async (item) => {
            const eventFile = path.parse(item.path);
            if (!eventFile.ext || eventFile.ext !== ".ts")
                return;

            const command: SlashCommandType = await this.utilities.importFile(item.path);
            if (!command)
                return;
            this.commands.set(command.builder.name, command);

            this.utilities.println(`Successfully loaded command ${chalk.bgBlack.white`${command.builder.name}`} in ${chalk.bgBlack.white`${item.path}`}`, chalk.bgWhite.black`EVENT BIND`);
        });
        await this.login(this.configuration.botConfig.token);
    }
}