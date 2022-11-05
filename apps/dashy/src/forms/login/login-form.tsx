import {
    Form,
    SubmitInput,
    TextInput,
    Typography,
} from '@dashy/dashy-components';
import React, { useState } from 'react';

import { ILoginForm } from './login-form.types';
import { SyntheticEvent } from 'react';

import { useNavigate } from 'react-router-dom';
import { loginController } from '../../controllers/login.controller';

export const LoginForm = ({
    heading,
    eMail,
    password,
    submit,
    className,
    ...props
}: ILoginForm) => {
    const navigate = useNavigate();
    const classNames = ['loginForm', className].join(' ');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const res = await loginController(email, pass);
        if (res.success) {
            setTimeout(() => navigate('/dashboard'), 1500);
            return;
        }
    };
    return (
        <Form onSubmit={handleSubmit} className={classNames} {...props}>
            <Typography label={heading} weight={900} size={4} />
            <TextInput
                required
                label={email}
                onChange={setEmail}
                placeholder={eMail}
                maxLength={50}
            />
            <TextInput
                required
                label={pass}
                onChange={setPass}
                placeholder={password}
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
