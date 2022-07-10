
import chalk from "chalk";
import {Routes} from "discord-api-types/v10";
import {REST} from "@discordjs/rest";
import {Event} from "../types/events";

export default new Event("ready", async (client) => {
    client.utilities.println(`Logged in as ${client.user?.tag}`, chalk.bgWhite.black`READY`);

    const rest = new REST({ version: "9" }).setToken(client.configuration.botConfig.token || "");

    try {
        client.utilities.println(`Refreshing slash commands...`, "SLASH");
        await rest.put(Routes.applicationCommands(client.user?.id || "0"), {
            body: client.commands.map((value) => value.builder.toJSON()),
        });

        client.utilities.println(chalk.green`Done!`, "SLASH");
    } catch(error) {
        client.utilities.println(chalk.red`Failed.`, "SLASH");
        console.error(error);
    }
});