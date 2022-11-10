import { Client, Message } from 'guilded.js';
import { CommandFunc } from '../commands/command.types';

export type Perms = 'open' | 'protected' | 'owner';

export interface ICommandMeta {
    perms?: Perms;
    help?: string;
}

export interface ICommand {
    alias?: Set<string>;
    fn: CommandFunc;
    meta?: ICommandMeta;
}

export interface ICommandRunnerCommand {
    func: CommandFunc;
    perms: Perms;
}

export type Commands = Record<string, ICommand>;

export type CommandRunner = (
    command: string,
    args: string[],
    client: Client,
    message: Message
) => Promise<void>;
