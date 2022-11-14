import { usersService } from '../services/users.service';
import { statusResponse } from './command.types';
import { CommandInteractionConstructor } from './common/command.constructor';

export const legacyBanCommand = new CommandInteractionConstructor(
    'link',
    async (client, message, args) => {
        if (!args[0]) {
            return {
                status: 400,
                data: 'You must pass ID of user to link.',
            };
        }
        return usersService
            .linkAccount(message.authorId, args[0])
            .then((dashyUserData) => {
                return {
                    status: 200 as statusResponse,
                    data: `Successfully linked \n Dashy Account: ${dashyUserData.username} \n Guilded Account: ${dashyUserData.guildedId}`,
                };
            })
            .catch((err) => {
                console.log(err);
                console.log(err);
                return {
                    status: 9000,
                    data: 'Unrecognized error',
                };
            });
    }
);
