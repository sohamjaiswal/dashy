import { Client, Message, Embed } from 'guilded.js';
export type CommonEmbed = (
    client: Client,
    message: Message
) => Promise<Embed> | Embed;
