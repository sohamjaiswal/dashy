import { ILoginForm } from '../../forms/login/login-form.types';

export interface ILoginPage {
    form: Omit<ILoginForm, 'setLoading'>;
    register: {
        preText: string;
        label: string;
        route: string;
        postText: string;
    };
}
