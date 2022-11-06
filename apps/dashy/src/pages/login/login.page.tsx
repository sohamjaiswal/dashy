import { Box, Typography } from '@dashy/dashy-components';
import React, { useState } from 'react';
import { LoginForm } from '../../forms/login';
import { ILoginPage } from './login.page.types';

import styles from './login.page.module.scss';
import { Link } from 'react-router-dom';
import { useGlobalStoreActions } from '../../store';

export const LoginPage = ({ form, register }: ILoginPage) => {
    const [loading, setLoading] = useState(true);
    useGlobalStoreActions((a) => a.setLoading(loading));
    const formStuff = {
        ...form,
        setLoading,
    };
    return (
        <Box className={styles['loginPageBox']}>
            <LoginForm className={styles['loginForm']} {...formStuff} />
            <p>
                <Typography label={register.preText} />
                <Link to={register.route}>
                    <Typography label={register.label} />
                </Link>
                <Typography label={register.postText} />
            </p>
        </Box>
    );
};
