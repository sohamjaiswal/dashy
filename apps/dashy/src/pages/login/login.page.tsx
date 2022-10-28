import { Box, Typography } from '@dashy/dashy-components';
import React from 'react';
import { LoginForm } from '../../forms/login';
import { ILoginPage } from './login.page.types';

import styles from './login.page.module.scss';
import { Link } from 'react-router-dom';

export const LoginPage = ({ form, register }: ILoginPage) => {
    return (
        <Box className={styles['loginPageBox']}>
            <LoginForm className={styles['loginForm']} {...form} />
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
