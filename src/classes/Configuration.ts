import {DiscordClient} from "./DiscordClient";

export class Configuration {
    public client: DiscordClient;

    public constructor(client: DiscordClient) {
        this.client = client;
    }

    public botConfig = {
        token: process.env.BOT_TOKEN ?? "",
        version: process.env.BOT_VERSION ?? process.env.npm_package_version,
        authors: JSON.parse(process.env.BOT_AUTHORS ?? "[]"),
    }


    public loaReports = "989611315893010502"
    
    public isAuthorized = (user: string) => this.botConfig.authors.includes(user);
}