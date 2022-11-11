import { Client, Message } from 'guilded.js';
import { Commands } from '../router/command.router.types';

export type CommandFunc = (
    client: Client,
    message: Message,
    args?: string[]
) => void | Promise<void>;

export interface IHelpObj {
    commandName: string;
    aliases: string;
    help: string;
    reqPerms: string;
}

export type CommandsToHelpObj = (commands: Commands) => IHelpObj[];
