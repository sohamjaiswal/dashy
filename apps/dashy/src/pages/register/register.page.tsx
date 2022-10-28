import { Box, Typography } from '@dashy/dashy-components';
import React from 'react';
import { RegisterForm } from '../../forms/register';
import { IRegisterPage } from './register.page.types';

import styles from './register.page.module.scss';
import { Link } from 'react-router-dom';

export const RegisterPage = ({ form, login }: IRegisterPage) => {
    return (
        <Box className={styles['registerPageBox']}>
            <RegisterForm className={styles['registerForm']} {...form} />
            <p>
                <Typography label={login.preText} />
                <Link to={login.route}>
                    <Typography label={login.label} />
                </Link>
                <Typography label={login.postText} />
            </p>
        </Box>
    );
};
