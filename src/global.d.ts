import { Client } from 'discord.js';
import { BaseSlashCommandI } from './utils/BaseSlashCommand';
export {};

declare global {
    interface SuperClient extends Client {
        slashCommands?: Collection<string, BaseSlashCommandI>
    }
}