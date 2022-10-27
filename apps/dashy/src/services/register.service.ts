import { IError, IUser } from '@dashy/api-interfaces';
import { BACKEND_LOC } from '@dashy/secrets';
import axios from 'axios';
import { AxiosResponse } from 'axios';

export const register: (
    email: string,
    username: string,
    password: string
) => Promise<AxiosResponse<IUser | IError>> = async (
    email: string,
    username: string,
    password: string
) => {
    const data = {
        email,
        username,
        password,
    };
    const res = await axios
        .post<Partial<IUser | IError>>(`${BACKEND_LOC}/users`, data)
        .catch((err) => {
            return err.response;
        });
    return res;
};
