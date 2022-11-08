import { CommandFunc } from './command.types';

import { HELPER_COMMAND_DATA } from '@dashy/secrets';
import { RESTPostChannelsBody } from '@guildedjs/guilded-api-typings';
import { mainServerService } from '../main';
import { IBotGuild, IError } from '@dashy/api-interfaces';
import { guildsService } from '../services/guilds.service';
import { isError } from '../helpers/errors/errors.identifier';
import { embedHelper } from '../helpers/embeds/embeds.helper';

export const enableHelper: CommandFunc = async (client, message) => {
    const helperChannelData: RESTPostChannelsBody = {
        ...HELPER_COMMAND_DATA,
        name: message.serverId,
        topic: `Server-Side-Support ${message.serverId}`,
    };
    const currHelper = (await guildsService.getGuild(message.serverId)).helper;
    if (currHelper.isHelper) {
        const sendEmbed = await embedHelper.errorEmbed(client, message);
        sendEmbed
            .setTitle("Couldn't set helper!")
            .setDescription(`Already helper!`);
        await message.reply(sendEmbed).catch((err) => console.log(err));
        return;
    }
    if (currHelper.helperChannel === "''") {
        const channel = (
            await mainServerService.createChannel(helperChannelData)
        ).channel;
        const res: IBotGuild | IError = await guildsService.setHelper(
            channel.serverId,
            { helper: { isHelper: true, helperChannel: channel.id } }
        );
        if (isError(res)) {
            const sendEmbed = await embedHelper.errorEmbed(client, message);
            sendEmbed
                .setTitle("Couldn't set helper!")
                .setDescription(`${(res as IError).error.message}`);
            await message.reply(sendEmbed).catch((err) => console.log(err));
            return;
        }
        const sendEmbed = await embedHelper.successEmbed(client, message);
        sendEmbed
            .setTitle('Helper enabled!')
            .setDescription(
                `Successfully updated server: ${
                    (res as IBotGuild).guildId
                } \n Helper set to: ${(res as IBotGuild).helper.isHelper}`
            );
        await message.reply(sendEmbed).catch((err) => console.log(err));
        return;
    }
    const res: IBotGuild | IError = await guildsService.setHelper(
        message.serverId,
        { helper: { isHelper: true, helperChannel: currHelper.helperChannel } }
    );
    if (isError(res)) {
        const sendEmbed = await embedHelper.errorEmbed(client, message);
        sendEmbed
            .setTitle("Couldn't set helper!")
            .setDescription(`${(res as IError).error.message}`);
        await message.reply(sendEmbed).catch((err) => console.log(err));
        return;
    }
    const sendEmbed = await embedHelper.successEmbed(client, message);
    sendEmbed
        .setTitle('Helper enabled!')
        .setDescription(
            `Successfully updated server: ${
                (res as IBotGuild).guildId
            } \n Helper set to: ${(res as IBotGuild).helper.isHelper}`
        );
    await message.reply(sendEmbed).catch((err) => console.log(err));
    return;
};
export const disableHelper: CommandFunc = async (client, message) => {
    const guild: IBotGuild | IError = await guildsService.getGuild(
        message.serverId
    );
    if (isError(guild)) {
        const sendEmbed = await embedHelper.errorEmbed(client, message);
        sendEmbed
            .setTitle("Couldn't disable helper!")
            .setDescription(`${(guild as IError).error.message}`);
        await message.reply(sendEmbed).catch((err) => console.log(err));
        return;
    }
    const { helper } = guild;
    if (helper.helperChannel === "''") {
        const sendEmbed = await embedHelper.errorEmbed(client, message);
        sendEmbed
            .setTitle("Couldn't disable helper!")
            .setDescription(`Helper has not been setup!`);
        await message.reply(sendEmbed).catch((err) => console.log(err));
        return;
    }
    if (!helper.isHelper) {
        const sendEmbed = await embedHelper.errorEmbed(client, message);
        sendEmbed
            .setTitle("Couldn't set helper!")
            .setDescription(`Already disabled helper!`);
        await message.reply(sendEmbed).catch((err) => console.log(err));
        return;
    }
    const channel = (await mainServerService.getChannel(helper.helperChannel))
        .channel;
    const res: IBotGuild | IError = await guildsService.setHelper(
        channel.serverId,
        { helper: { isHelper: false, helperChannel: channel.id } }
    );
    if (isError(res)) {
        const sendEmbed = await embedHelper.errorEmbed(client, message);
        sendEmbed
            .setTitle("Couldn't disable helper!")
            .setDescription(`${(res as IError).error.message}`);
        await message.reply(sendEmbed).catch((err) => console.log(err));
        return;
    }
    const sendEmbed = await embedHelper.successEmbed(client, message);
    sendEmbed
        .setTitle('Helper disabled!')
        .setDescription(
            `Successfully updated server: ${
                (res as IBotGuild).guildId
            } \n Helper set to: ${(res as IBotGuild).helper.isHelper}`
        );
    await message.reply(sendEmbed).catch((err) => console.log(err));
    return;
};
