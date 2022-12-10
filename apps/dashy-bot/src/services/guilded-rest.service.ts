import {
    ChatMessagePayload,
    RESTPostChannelsBody,
} from '@guildedjs/guilded-api-typings';

import { Router } from '@guildedjs/rest';
import { Message } from 'guilded.js';

export class GuildedRestService {
    readonly router: Router;

    constructor(router: Router) {
        this.router = router;
    }
    deleteMessage(message: Message) {
        message.delete().catch((err) => {
            throw new Error(err);
        });
    }

    createChannel = (data: RESTPostChannelsBody) => {
        return this.router.createChannel(data);
    };

    getChannel = (channelId: string) => {
        return this.router.getChannel(channelId);
    };

    sendMessageToChannel = (
        channelId: string,
        content: Pick<
            ChatMessagePayload,
            'isPrivate' | 'replyMessageIds' | 'embeds' | 'isSilent'
        > & { content?: string }
    ) => {
        return this.router.createChannelMessage(channelId, content);
    };

    banMember = (serverId: string, userId: string) => {
        return this.router.banMember(serverId, userId);
    };

    unbanMember = (serverId: string, userId: string) => {
        return this.router.unbanMember(serverId, userId);
    };

    kickMember = (serverId: string, userId: string) => {
        return this.router.kickMember(serverId, userId);
    };
}
