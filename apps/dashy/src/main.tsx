import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './app';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';

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
                    />
                ),
            },
        ],
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
