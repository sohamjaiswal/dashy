import { IError, IUser } from '@dashy/api-interfaces';
import { AxiosResponse } from 'axios';
import { isError } from '../helpers/error.identifier';
import { Toasts } from '../helpers/toasts';
import { ControllerResponse } from './controller.types';
import { usersService } from '../services/user.service';

export const registerController: (
    email: string,
    password: string,
    username: string
) => ControllerResponse = async (
    email: string,
    password: string,
    username: string
) => {
    const res = await usersService.register(email, username, password);
    if (isError(res.data)) {
        const error = (res as AxiosResponse<IError>).data.error;
        Toasts.error(`😭 ${error.message}`);
        return {
            success: false,
            message: error.message,
        };
    } else if (res as AxiosResponse<Partial<IUser>>) {
        Toasts.info('🎉 Account creation successful');
        return {
            success: true,
            message: 'SUCCESS',
        };
    }
    return {
        success: false,
        message: 'UNKNOWN ERR',
    };
};
