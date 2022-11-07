import { isError } from '../helpers/errors/errors.identifier';
import {
    registerGuild,
    getGuild,
    changeGuildPrefix,
} from '../services/guilds.service';
import { controllerFunc } from './controllers.types';

export const guildInstancer: controllerFunc = async (guildId: string) => {
    let guildData = await getGuild(guildId);

    if (isError(guildData)) {
        if (guildData.error.status === 404) {
            guildData = await registerGuild(guildId);
            const res = {
                success: true,
                title: 'Guild registered!',
                description: 'The guild has been registered with Dashy!',
                extra: guildData,
            };
            return res;
        }
        const res = {
            success: false,
            title: 'Guild could not be registered...',
            description: guildData.error.message,
            extra: null,
        };
        return res;
    }
    const res = {
        success: false,
        title: 'Got guild info!',
        description: 'Guild was already registered, got data successfully.',
        extra: guildData,
    };
    return res;
};

export const updateGuildPrefix = async (guildId: string, prefix: string) => {
    if (prefix !== '') {
        const guildData = await changeGuildPrefix(guildId, prefix);
        const res = {
            success: true,
            title: 'Prefix set.',
            description: `Prefix has been successfully set to "${prefix}"`,
            extra: guildData,
        };
        return res;
    }
    const res = {
        success: false,
        title: 'Invalid value.',
        description: `Value: "" can't be used as prefix.`,
        extra: null,
    };
    return res;
};
