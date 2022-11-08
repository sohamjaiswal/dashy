import { IBotGuild, IError } from '@dashy/api-interfaces';
import { BACKEND_LOC } from '@dashy/secrets';
import axios from 'axios';

export class GuildsService {
    getGuild = async (guildId: string) => {
        const guild = await axios
            .get<IBotGuild | IError>(`${BACKEND_LOC}/guilds/${guildId}`)
            .catch((err) => err.response);
        return guild.data;
    };
    registerGuild = async (guildId: string) => {
        const guild = await axios
            .post<IBotGuild | IError>(`${BACKEND_LOC}/guilds`, { guildId })
            .catch((err) => err.response);
        return guild.data;
    };
    changeGuildPrefix = async (guildId: string, prefix: string) => {
        const guild = await axios
            .patch<IBotGuild | IError>(`${BACKEND_LOC}/guilds`, {
                guildId,
                prefix,
            })
            .catch((err) => err.response);
        return guild.data;
    };
}

export const guildsService = new GuildsService();
