import { IError } from '@dashy/api-interfaces';

export const isError = (data: IError | any): data is IError => {
    return (data as IError).error !== undefined;
};
