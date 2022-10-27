import { IError } from '@dashy/api-interfaces';
import {
    Form,
    SubmitInput,
    TextInput,
    Typography,
} from '@dashy/dashy-components';
import { AxiosResponse } from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { register } from '../../services/register.service';
import { IRegisterForm } from './register-form.types';

export const RegisterForm = ({
    heading,
    eMail,
    username,
    password,
    confPassword,
    submit,
}: IRegisterForm) => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [confPass, setConfPass] = useState('');

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (pass === confPass) {
            const res = await register(email, userName, password);
            if ((res as AxiosResponse<IError>).data.error.status === 409) {
                toast.error(
                    `${(res as AxiosResponse<IError>).data.error.message}`
                );
            }
        } else {
            toast.warn('Passwords do not match.');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
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
