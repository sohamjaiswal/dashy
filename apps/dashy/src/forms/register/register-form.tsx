import { IError, IUser } from '@dashy/api-interfaces';
import {
    Form,
    SubmitInput,
    TextInput,
    Typography,
} from '@dashy/dashy-components';
import { AxiosResponse } from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Toasts } from '../../helpers/toasts';
import { register } from '../../services/register.service';
import { IRegisterForm } from './register-form.types';
import { isError } from '../../helpers/error.identifier';

export const RegisterForm = ({
    heading,
    eMail,
    username,
    password,
    confPassword,
    submit,
    className,
    ...props
}: IRegisterForm) => {
    const classNames = ['registerForm', className].join(' ');

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [confPass, setConfPass] = useState('');

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (pass === confPass) {
            const res = await register(email, userName, password);
            if (isError(res.data)) {
                if ((res as AxiosResponse<IError>).data.error.status === 409) {
                    Toasts.error(
                        `😭 ${
                            (res as AxiosResponse<IError>).data.error.message
                        }`
                    );
                }
            } else if (res as AxiosResponse<Partial<IUser>>) {
                Toasts.info('🎉 Account creation successful');
            }
        } else {
            Toasts.warn('😕 Passwords do not match.');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className={classNames} {...props}>
            <Typography label={heading} weight={900} size={4} />
            <TextInput
                required
                placeholder={eMail}
                label={email}
                onChange={setEmail}
                maxLength={50}
            />
            <TextInput
                required
                placeholder={username}
                label={userName}
                onChange={setUserName}
                maxLength={50}
            />
            <TextInput
                required
                placeholder={password}
                label={pass}
                onChange={setPass}
                maxLength={50}
                type={'password'}
            />
            <TextInput
                required
                placeholder={confPassword}
                label={confPass}
                onChange={setConfPass}
                maxLength={50}
                type={'password'}
            />
            <SubmitInput
                button={{
                    typography: { label: submit, color: 'white' },
                    onClick: () => null,
                }}
            />
        </Form>
    );
};
