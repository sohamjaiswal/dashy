import { HTMLAttributes } from 'react';
export interface IRegisterForm {
    heading: string;
    eMail: string;
    username: string;
    password: string;
    confPassword: string;
    submit: string;
    className?: string;
}
