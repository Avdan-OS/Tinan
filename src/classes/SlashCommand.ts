import {SlashCommandType} from "../types/slashCommandType";


export class SlashCommand {
    constructor( options: SlashCommandType ) {
        Object.assign(this, options );
    }
}