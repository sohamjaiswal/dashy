import { Box } from '@dashy/dashy-components';
import React from 'react';
import { LoginForm } from '../../forms/login';
import { ILoginPage } from './login.page.types';

import styles from './login.page.module.scss';

export const LoginPage = ({ form }: ILoginPage) => {
    return (
        <Box className={styles['loginPageBox']}>
            <LoginForm className={styles['loginForm']} {...form} />
        </Box>
    );
};
