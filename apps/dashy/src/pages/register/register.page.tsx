import { Box } from '@dashy/dashy-components';
import React from 'react';
import { RegisterForm } from '../../forms/register';
import { IRegisterPage } from './register.page.types';

import styles from './register.page.module.scss';

export const RegisterPage = ({ form }: IRegisterPage) => {
    return (
        <Box className={styles['registerPageBox']}>
            <RegisterForm className={styles['registerForm']} {...form} />
        </Box>
    );
};
