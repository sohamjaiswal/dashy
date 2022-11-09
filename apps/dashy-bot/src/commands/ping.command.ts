import { Client, Message } from 'guilded.js';
import { embedHelper } from '../helpers/embeds/embeds.helper';
import { interactionResponseHandler } from '../helpers/handlers/interaction-response.handler';
import { CommandFunc } from './command.types';

export const pingCommand: CommandFunc = async (
    client: Client,
    message: Message
) => {
    const sendEmbed = await embedHelper.successEmbed(client, message);
    sendEmbed
        .setTitle('Pong!')
        .setDescription(
            `🏓 Latency is ${
                Date.now() - message._createdAt
            }ms. API Latency is ${Math.round(client.ws.ping)}ms`
        );
    interactionResponseHandler(message, sendEmbed).catch((err) => {
        throw new Error(err);
    });
    return;
};
