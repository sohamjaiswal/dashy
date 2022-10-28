import { IError, IUser } from '@dashy/api-interfaces';
import { BACKEND_LOC } from '@dashy/secrets';
import axios, { AxiosResponse } from 'axios';

export const login = async (email: string, password: string) => {
    const data = {
        email: email,
        password: password,
    };
    const res = await axios
        .post<IUser>(`${BACKEND_LOC}/users/login`, data)
        .catch((err) => {
            return err.response;
        });
    console.log(res);
    return res;
};

export const logout = async () => {
    const res = await axios
        .post<AxiosResponse<Record<string, never> | IError>>(
            `${BACKEND_LOC}/users/logout`
        )
        .catch((err) => {
            return err.response;
        });
    return res;
};

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
        .post<AxiosResponse<Partial<IUser> | IError>>(
            `${BACKEND_LOC}/users`,
            data
        )
        .catch((err) => {
            return err.response;
        });
    return res;
};
