import { Client, Message } from 'guilded.js';
import { CommandFunc } from '../commands/command.types';

export interface ICommand {
    alias: Set<string>;
    fn: CommandFunc;
}

export type Commands = Record<string, ICommand>;

export type CommandRunner = (
    command: string,
    args: string[],
    client: Client,
    message: Message
) => Promise<void>;
