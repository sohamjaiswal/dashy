import { IBotGuild, IError } from '@dashy/api-interfaces';
import { BACKEND_LOC } from '@dashy/secrets';
import axios from 'axios';
import { IGuild } from '@dashy/api-interfaces';

export class GuildsService {
    getGuild = async (guildId: string) => {
        const guild = await axios
            .get<IBotGuild | IError>(`${BACKEND_LOC}/guilds/${guildId}`)
            .catch((err) => err.response);
        return guild.data as IBotGuild;
    };
    registerGuild = async (guildId: string) => {
        const guild = await axios
            .post<IBotGuild | IError>(`${BACKEND_LOC}/guilds`, { guildId })
            .catch((err) => err.response);
        return guild.data as IBotGuild;
    };
    changeGuildPrefix = async (guildId: string, prefix: string) => {
        const guild = await axios
            .patch<IBotGuild | IError>(`${BACKEND_LOC}/guilds`, {
                guildId,
                prefix,
            })
            .catch((err) => err.response);
        return guild.data as IBotGuild;
    };
    setHelper = async (guildId: string, helper: Pick<IGuild, 'helper'>) => {
        const guild = await axios
            .patch<IBotGuild | IError>(`${BACKEND_LOC}/guilds/`, {
                guildId,
                ...helper,
            })
            .catch((err) => err.response);
        return guild.data as IBotGuild;
    };
}

export const guildsService = new GuildsService();
