import { Client, Message } from 'guilded.js';
import { Commands } from '../router/command.router.types';

export type statusResponse = 200 | 300 | 400 | 500 | 9000;

export type ICommandRes = {
    status: statusResponse;
    data: string;
    private?: boolean;
};

export type CommandFunc = (
    client: Client,
    message: Message,
    args?: string[]
) => void | Promise<void> | ICommandRes | Promise<ICommandRes>;

export interface IHelpObj {
    commandName: string;
    aliases: string;
    help: string;
    reqPerms: string;
    usage: string;
}

export type CommandsToHelpObj = (commands: Commands) => IHelpObj[];
