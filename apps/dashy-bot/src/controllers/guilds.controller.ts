import { IControllerResponse } from '../helpers/common/controller-response.types';
import { isError } from '../helpers/errors/errors.identifier';
import {
    registerGuild,
    getGuild,
    changeGuildPrefix,
} from '../services/guilds.service';

export const guildInstancer = async (guildId: string) => {
    let guildData = await getGuild(guildId);
    if (isError(guildData)) {
        if (guildData.error.status === 404) {
            guildData = await registerGuild(guildId);
        }
    }
    return guildData;
};

export const updateGuildPrefix = async (guildId: string, prefix: string) => {
    let res: IControllerResponse = {};
    if (prefix !== '') {
        changeGuildPrefix(guildId, prefix);
        res = {
            success: true,
            title: 'Prefix set.',
            description: `Prefix has been successfully set to "${prefix}"`,
        };
    }
    res = {
        success: false,
        title: 'Invalid value.',
        description: `Value: "" can't be used as prefix.`,
    };
    return res;
};
