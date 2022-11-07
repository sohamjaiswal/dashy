import { Client, Message } from 'guilded.js';

export type CommandFunc = (
    client: Client,
    message: Message,
    args?: string[]
) => void | Promise<void>;
