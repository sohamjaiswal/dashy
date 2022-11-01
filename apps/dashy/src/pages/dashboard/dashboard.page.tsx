import { Button, Typography } from '@dashy/dashy-components';
import React from 'react';
import { logoutController } from '../../controllers/logout.controller';
import { IDashboardProps } from './dashboard.page.types';
import { usersService } from '../../services/user.service';

const DashboardPage = ({ logout, ...props }: IDashboardProps) => {
    console.log(usersService.getUser());
    const handleLogout = async () => {
        const res = await logoutController();
        console.log(res);
    };
    return (
        <div>
            <Typography label="Dashboard" weight={900} size={5} />
            <Button
                typography={{ label: logout, color: 'white' }}
                onClick={handleLogout}
                backgroundColor="red"
            />
        </div>
    );
};

export default DashboardPage;
