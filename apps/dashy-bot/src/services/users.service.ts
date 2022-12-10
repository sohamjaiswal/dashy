import { IUser } from '@dashy/api-interfaces';
import { BACKEND_LOC } from '@dashy/secrets';
import axios from 'axios';

export class UsersService {
    linkAccount = async (guildedId: string, dashyId: string) => {
        const data = { guildedId, dashyId };
        const user = await axios
            .post<IUser>(`${BACKEND_LOC}/dashy/link`, data)
            .catch((err) => {
                console.log();
                return err.response;
            });
        return user.data;
    };
}

export const usersService = new UsersService();
