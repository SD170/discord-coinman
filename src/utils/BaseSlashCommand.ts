import { Client, BaseInteraction } from 'discord.js';

export interface BaseSlashCommandI {
    name:string,
    execute:(client:Client, interaction:BaseInteraction)=>any,
    jsonData:()=>any;
}