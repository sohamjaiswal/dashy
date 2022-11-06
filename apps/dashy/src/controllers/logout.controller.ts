import { IError } from '@dashy/api-interfaces';
import { AxiosResponse } from 'axios';
import { isError } from '../helpers/error.identifier';
import { Toasts } from '../helpers/toasts';
import { isEmptyObj } from '../helpers/check-empty';
import { usersService } from '../services/user.service';

export const logoutController = async () => {
    const res = await usersService.logout();
    if (isError(res.data)) {
        Toasts.error(`😭 ${(res as AxiosResponse<IError>).data.error.message}`);
        return {
            success: false,
            message: 'FAILED TO LOGOUT',
        };
    } else if (isEmptyObj(res.data)) {
        Toasts.info('🎉 Logged out!');
        return {
            success: true,
            message: 'LOGGED OUT SUCCESSFULLY',
        };
    } else {
        Toasts.error(`😭 ${(res as AxiosResponse<IError>).data.error.message}`);
        return {
            success: false,
            message: 'UNKNWN ERR',
        };
    }
};
