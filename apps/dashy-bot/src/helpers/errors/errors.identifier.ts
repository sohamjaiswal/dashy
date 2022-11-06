import { IError } from '@dashy/api-interfaces';

export function isError(object: any): object is IError {
    return 'error' in object;
}
