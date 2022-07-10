import {ColorResolvable, DMChannel, MessageEmbed, TextChannel, ThreadChannel} from "discord.js";
import chalk from "chalk";
import dayjs from "dayjs";
import {DiscordClient} from "./DiscordClient";

export default class Utility {
    private readonly client: DiscordClient;

    constructor(client: DiscordClient) {
        this.client = client;
    }

    /**
     * Stylized print
     * Result: [TITLE (default: LOG) @ TIME] CONTENT
     * @param content Text that will be printed
     * @param title OPTIONAL title that replaces "LOG"
     */
    println(content: string, title?: string) {
        console.log(`${chalk.white("[") + chalk.cyanBright(title || "LOG") + chalk.whiteBright(" @ ") + chalk.blue(dayjs().format("HH:mm")) + chalk.white("]")} ${content}`);
    }

    // Small utility function that just returns the default export of a file
    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    public embedGenerators = {
        error: (message: string) =>
            new MessageEmbed()
                .setTitle("Error")
                .setColor("RED")
                .setDescription(message),
        success: (message: string) =>
            new MessageEmbed()
                .setTitle("Success")
                .setColor("GREEN")
                .setDescription(message)
        ,
        info: (message: string) =>
            new MessageEmbed()
                .setTitle("Info")
                .setColor("BLUE")
                .setDescription(message),
        warning: (message: string) =>
            new MessageEmbed()
                .setTitle("Warning")
                .setColor("YELLOW")
                .setDescription(message),
        question: (message: string) =>
            new MessageEmbed()
                .setTitle("Question")
                .setColor("PURPLE")
                .setDescription(message),
        debug: (message: string) =>
            new MessageEmbed()
                .setTitle("Debug")
                .setColor("GOLD")
                .setDescription(message),
        custom: (title: string, color: ColorResolvable, message: string) =>
            new MessageEmbed()
                .setTitle(title)
                .setColor(color)
                .setDescription(message),
        fromJSON: (json: string) => new MessageEmbed({...JSON.parse(json)}),
        toJSON: (embed: MessageEmbed) => embed.toJSON() as string
    }

    public clientUtilities = {
        getClient: () => this.client,
        getClientUser: () => this.client.user,
        getClientGuilds: () => this.client.guilds.cache,
        getClientChannels: () => this.client.channels.cache,
        getClientUsers: () => this.client.users.cache,
        getClientEmojis: () => this.client.emojis.cache,
        getClientGuild: (id: string) => this.client.guilds.cache.get(id),
        getClientChannel: (id: string) => this.client.channels.cache.get(id),
        getClientEmoji: (id: string) => this.client.emojis.cache.get(id),
        getClientGuildsByName: (name: string) => this.client.guilds.cache.filter(guild => guild.name === name),
        getClientUsersByName: (name: string) => this.client.users.cache.filter(user => user.username === name),
        getClientEmojisByName: (name: string) => this.client.emojis.cache.filter(emoji => emoji.name === name),
    }

    public channelUtilities = {
        getChannel: (id: string) => this.client.channels.cache.get(id),
        getChannelByName: (name: string) => this.client.channels.cache.find(channel => {
            //@ts-ignore
            return channel.name === name;
        }),
        getChannelByType: (type: string) => this.client.channels.cache.filter(channel => channel.type === type),
    }

    public async createEmbedMessage(channel: TextChannel | DMChannel | ThreadChannel, embed: MessageEmbed) {
        return await channel.send({ embeds: [embed]});
    }

    public getEmbedOption(embed: MessageEmbed) { return { embeds: [ embed ] } };


}