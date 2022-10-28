import { IRegisterForm } from '../../forms/register/register-form.types';

export interface IRegisterPage {
    form: IRegisterForm;
    login: {
        preText: string;
        label: string;
        route: string;
        postText: string;
    };
}
