import { CommandInteractionConstructor } from './common/command.constructor';
import { checkOwner } from '../helpers/utils/check-owner';
import { guildedRestService } from '../main';
export const legacyKickCommand = new CommandInteractionConstructor(
    'legacykick',
    async (client, message, args) => {
        if (!(await checkOwner(message, client))) {
            return {
                status: 500,
                data: 'Only owner is allowed to run this command.',
            };
        }
        if (!args[0]) {
            console.log('arg not found');
            return {
                status: 400,
                data: 'You must pass ID of user to kicked.',
            };
        }
        return guildedRestService
            .banMember(message.serverId, args[0])
            .then(() => {
                return { status: 200, data: `Successfully kicked: ${args[0]}` };
            })
            .catch((err) => {
                if (err.code === 400) {
                    return {
                        status: 400,
                        data: 'User not found!',
                    };
                }
                if (err.code === 403) {
                    return {
                        status: 300,
                        data: 'User role higher than bot!',
                    };
                }
                if (err.code === 500) {
                    return {
                        status: 500,
                        data: err,
                    };
                }
                console.log(err);
                return {
                    status: 9000,
                    data: 'Unrecognized error',
                };
            });
    }
);
