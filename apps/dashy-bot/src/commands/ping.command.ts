import { Client, Message } from 'guilded.js';
import { embedHelper } from '../helpers/embeds/embeds.helper';
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
    await message.reply(sendEmbed).catch((err) => console.log(err));
    return;
};
