import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';

import { App } from './app';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { globalStore } from './store';
import DashboardPage from './pages/dashboard/dashboard.page';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'login',
                element: (
                    <LoginPage
                        form={{
                            heading: 'Login',
                            eMail: 'e-Mail',
                            password: 'Password',
                            submit: 'Submit',
                        }}
                        register={{
                            preText: 'Not signed up? ',
                            label: 'Register here!',
                            route: '/register',
                            postText: '',
                        }}
                    />
                ),
            },
            {
                path: 'register',
                element: (
                    <RegisterPage
                        form={{
                            heading: 'Register',
                            eMail: 'e-Mail',
                            username: 'Username',
                            password: 'Password',
                            confPassword: 'Confirm Password',
                            submit: 'Submit',
                        }}
                        login={{
                            preText: 'Already have an account? ',
                            label: 'Login here!',
                            route: '/login',
                            postText: '',
                        }}
                    />
                ),
            },
            {
                path: 'dashboard',
                element: <DashboardPage logout="Logout" />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <StrictMode>
        <StoreProvider store={globalStore}>
            <RouterProvider router={router} />
        </StoreProvider>
    </StrictMode>
);
