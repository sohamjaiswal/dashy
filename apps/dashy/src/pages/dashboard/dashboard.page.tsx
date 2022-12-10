import { Button, Typography } from '@dashy/dashy-components';
import React, { useEffect, useMemo, useState } from 'react';
import { logoutController } from '../../controllers/logout.controller';
import { IDashboardProps } from './dashboard.page.types';
import { usersService } from '../../services/user.service';
import { useNavigate } from 'react-router-dom';
import { useGlobalStoreActions } from '../../store';

import { IFrontUser } from '@dashy/api-interfaces';

import styles from './dashboard.page.module.scss';
import { mockDelay } from '../../helpers/mock-delay';

const DashboardPage = ({ logout, ...props }: IDashboardProps) => {
    const navigate = useNavigate();

    const [user, setUser] = useState<Partial<IFrontUser>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const userMemo = useMemo(() => {
        return user;
    }, [user]);

    useGlobalStoreActions((action) => action.setLoading(loading));

    const setupUserStuff = async () => {
        const res = await usersService.getUser().catch((err) => {
            setError(err);
        });
        const resUser = res.data;

        setUser(resUser);
        setLoading(false);
        return;
    };

    useEffect(() => {
        setLoading(true);
        setupUserStuff();
    }, []);

    const handleLogout = async () => {
        const res = await logoutController();
        setLoading(true);
        if (res.success) {
            setUser({});
            await mockDelay(() => navigate('/login'), 1500);
            setLoading(false);
            return;
        }
        setLoading(false);
        return;
    };
    return (
        <div className={styles['dashboard']}>
            <Typography label="Dashboard" weight={900} size={5} />
            <div>
                <Typography
                    label={`Hello, ${userMemo.username}-sama`}
                    weight={900}
                    size={5}
                />
            </div>
            <Button
                typography={{ label: logout, color: 'white' }}
                onClick={handleLogout}
                backgroundColor="red"
            />
        </div>
    );
};

export default DashboardPage;
