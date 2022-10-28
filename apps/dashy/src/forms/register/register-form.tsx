import {
    Form,
    SubmitInput,
    TextInput,
    Typography,
} from '@dashy/dashy-components';
import React, { SyntheticEvent, useState } from 'react';
import { Toasts } from '../../helpers/toasts';
import { IRegisterForm } from './register-form.types';
import { useNavigate } from 'react-router-dom';
import { registerController } from '../../controllers/register.controller';

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

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [confPass, setConfPass] = useState('');

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (pass === confPass) {
            const res = await registerController(email, pass, userName);
            if (res.success) {
                setTimeout(() => navigate('/login'), 1500);
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
