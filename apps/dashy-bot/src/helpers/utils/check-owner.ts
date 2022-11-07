import { Client, Message } from 'guilded.js';

export const checkOwner = async (message: Message, client: Client) => {
    if (message.serverId) {
        return await client.members
            .fetch(message.serverId, message.authorId)
            .then(async (member) => {
                return member.isOwner;
            });
    } else {
        return false;
    }
};
