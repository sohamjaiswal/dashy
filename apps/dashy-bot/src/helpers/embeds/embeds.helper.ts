import { Embed } from 'guilded.js';
import {
    promptColor,
    errorColor,
    successColor,
} from '../common/colors.bindings';
import {
    imgErrorCross,
    footerText,
    imgPromptQuestionMark,
    imgSuccessTick,
} from '../common/helpers.common';
import { CommonEmbed } from './embeds.types';
import { EmbedPayload } from '@guildedjs/guilded-api-typings';

export class EmbedHelper {
    genericEmbed: CommonEmbed = async (client, message) => {
        let memberName = message.authorId;
        if (message.serverId) {
            const display = await client.members
                .fetch(message.serverId, message.authorId)
                .then((member) => member.displayName);
            const nick = await client.members
                .fetch(message.serverId, message.authorId)
                .then((member) => member.nickname);
            if (display) {
                memberName = display;
                if (nick) {
                    memberName = nick;
                }
            }
        }
        return new Embed()
            .setAuthor(memberName)
            .setFooter(footerText)
            .setTimestamp(new Date())
            .setColor(promptColor)
            .setTitle('Embed')
            .setDescription('Generic Embed');
    };

    convertEmbedToEmbedPayload = (embed: Embed) => {
        const embedPayload: EmbedPayload = {
            title: embed?.title,
            description: embed?.description,
            // url: embed?.url,
            timestamp: new Date(embed?.timestamp).toISOString(),
            color: embed?.color,
            footer: embed?.footer,
            image: {
                url: embed.image?.url,
            },
            thumbnail: embed?.thumbnail,
            author: {
                name: embed.author.name,
            },
            fields: embed?.fields,
        };
        return embedPayload;
    };

    convertEmbedPayloadToEmbed = (embedPayload: EmbedPayload) => {
        const embed = new Embed(embedPayload);
        return embed;
    };

    errorEmbed: CommonEmbed = async (client, message) => {
        const basicEmbed = await this.genericEmbed(client, message);
        const errorEmbed = basicEmbed
            .setColor(errorColor)
            .setTitle('Error!')
            .setDescription('Error!')
            .setThumbnail(imgErrorCross);
        return errorEmbed;
    };

    promptEmbed: CommonEmbed = async (client, message) => {
        const basicEmbed = await this.genericEmbed(client, message);
        const promptEmbed = basicEmbed
            .setColor(promptColor)
            .setTitle('Prompt!')
            .setDescription('Prompt!')
            .setThumbnail(imgPromptQuestionMark);
        return promptEmbed;
    };

    successEmbed: CommonEmbed = async (client, message) => {
        const basicEmbed = await this.genericEmbed(client, message);
        const successEmbed = basicEmbed
            .setColor(successColor)
            .setTitle('Success!')
            .setDescription('Success!')
            .setThumbnail(imgSuccessTick);
        return successEmbed;
    };
}

export const embedHelper = new EmbedHelper();
