import { toast } from 'react-toastify';

export class Toasts {
    static error = (message: string) => {
        return toast.error(message);
    };
    static info = (message: string) => {
        return toast.info(message);
    };
    static warn = (message: string) => {
        return toast.warn(message);
    };
    static default = (message: string) => {
        return toast(message);
    };
}
