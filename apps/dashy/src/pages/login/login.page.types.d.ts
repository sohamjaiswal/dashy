import { ILoginForm } from '../../forms/login/login-form.types';

export interface ILoginPage {
    form: ILoginForm;
    register: {
        preText: string;
        label: string;
        route: string;
        postText: string;
    };
}
