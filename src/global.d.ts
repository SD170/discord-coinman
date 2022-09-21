import { Client, BaseInteraction } from 'discord.js';
import { BaseSlashCommandI } from './utils/BaseSlashCommand';
export {};

declare global {
    interface SuperClient extends Client {
        slashCommands?: Collection<string, BaseSlashCommandI>
    }
    interface BaseSlashCommandI {
        name:string,
        execute:(client:Client, interaction:BaseInteraction)=>any,
        jsonData:()=>any;
    }
}