import { usersService } from '../services/users.service';
import { statusResponse } from './command.types';
import { CommandInteractionConstructor } from './common/command.constructor';
import { guildedRestService } from '../main';
import { isError } from '@dashy/utils';
import { Schema } from 'mongoose';

export const linkDashyCommand = new CommandInteractionConstructor(
    'link',
    async (client, message, args) => {
        guildedRestService.deleteMessage(message);
        if (!args[0]) {
            return {
                status: 400,
                data: 'You must pass ID of user to link.',
                private: true,
            };
        }
        const res = await usersService.linkAccount(message.authorId, args[0]);
        if (isError(res)) {
            console.log('here');
            if (res.error.status === 404) {
                return {
                    status: 400,
                    data: 'There is no Dashy account with that ID...',
                    private: true,
                };
            }
            if (res.error.status === 400) {
                return {
                    status: 400,
                    data: 'You must provide an ID!',
                    private: true,
                };
            }
            return {
                status: 9000,
                data: '',
            };
        }
        return {
            status: 200,
            data: `Successfully linked \n Guilded ID: ${res.guildedId} \n Dashy ID: ${res._id}`,
            private: true,
        };
    }
);
