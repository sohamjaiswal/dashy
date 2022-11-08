import { IBotGuild, IError } from '@dashy/api-interfaces';
import { Client, Message } from 'guilded.js';
import { embedHelper } from '../helpers/embeds/embeds.helper';
import { isError } from '../helpers/errors/errors.identifier';
import { checkOwner } from '../helpers/utils/check-owner';
import { guildsService } from '../services/guilds.service';
import { CommandFunc } from './command.types';
export const prefixCommand: CommandFunc = async (
    client: Client,
    message: Message,
    args: string[]
) => {
    if (!(await checkOwner(message, client))) {
        const sendEmbed = await embedHelper.errorEmbed(client, message);
        sendEmbed
            .setTitle("Couldn't set prefix!")
            .setDescription('Only owner can run this command currently.');
        await message.reply(sendEmbed).catch((err) => console.log(err));
        return;
    }
    const newPrefix = args[0];
    const res: IBotGuild | IError = await guildsService.changeGuildPrefix(
        message.serverId,
        newPrefix
    );
    if (isError(res)) {
        const sendEmbed = await embedHelper.errorEmbed(client, message);
        sendEmbed
            .setTitle("Couldn't set prefix!")
            .setDescription(`${(res as IError).error.message}`);
        await message.reply(sendEmbed).catch((err) => console.log(err));
        return;
    }
    const sendEmbed = await embedHelper.successEmbed(client, message);
    sendEmbed
        .setTitle('Prefix set!')
        .setDescription(
            `Successfully updated server: ${
                (res as IBotGuild).guildId
            } \n Prefix changed to: ${(res as IBotGuild).prefix}`
        );
    await message.reply(sendEmbed).catch((err) => console.log(err));
    return;
};
