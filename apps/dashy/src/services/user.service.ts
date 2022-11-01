import { IError, IUser } from '@dashy/api-interfaces';
import { BACKEND_LOC } from '@dashy/secrets';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class UsersService {
    instance: AxiosInstance;

    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }

    login = async (email: string, password: string) => {
        const data = {
            email: email,
            password: password,
        };
        const res = await this.instance
            .post<IUser>(`${BACKEND_LOC}/users/login`, { data })
            .catch((err) => {
                return err.response;
            });
        return res;
    };

    logout = async () => {
        const data = {};
        const res = await this.instance
            .post<AxiosResponse<Record<string, never> | IError>>(
                `${BACKEND_LOC}/users/logout`,
                data
            )
            .catch((err) => {
                return err.response;
            });
        console.log(res);
        return res;
    };

    register: (
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
        const res = await this.instance
            .post<AxiosResponse<Partial<IUser> | IError>>(
                `${BACKEND_LOC}/users`,
                data
            )
            .catch((err) => {
                return err.response;
            });
        return res;
    };

    getUser = async () => {
        const res = await this.instance
            .get<AxiosResponse<Partial<IUser> | IError>>(`${BACKEND_LOC}/users`)
            .catch((err) => {
                return err.response;
            });
        return res;
    };
}

export const usersService = new UsersService(
    axios.create({
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    })
);
