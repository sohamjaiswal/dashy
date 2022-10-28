import { IError, IUser } from '@dashy/api-interfaces';
import { AxiosResponse } from 'axios';
import { isError } from '../helpers/error.identifier';
import { Toasts } from '../helpers/toasts';
import { login, logout } from '../services/user.service';
import { ControllerResponse } from './controller.types';

export const loginController: (
    email: string,
    password: string
) => ControllerResponse = async (email: string, password: string) => {
    const logoutRes = await logout(); // ignore this shit's error like a sigma chad.
    if (logoutRes.data) {
        console.log('LOGGED OUT PREVIOUS USER');
    }
    const res = await login(email, password);
    if (isError(res.data)) {
        Toasts.error(`😭 ${(res as AxiosResponse<IError>).data.error.message}`);
        return {
            success: false,
            message: 'FAILED TO LOGIN',
        };
    } else if (res as AxiosResponse<Partial<IUser>>) {
        Toasts.info('🎉 Logged in!');
        return {
            success: true,
            message: 'LOGGED IN SUCCESSFULLY',
        };
    }
    return {
        success: false,
        message: 'UNKOWN ERR',
    };
};
