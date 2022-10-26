import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import App from './app/app';
import { LoginForm } from './forms/login';
import { RegisterForm } from './forms/register';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/login',
        element: (
            <LoginForm
                heading="Login"
                eMail="e-Mail"
                password="Password"
                submit="Submit"
            />
        ),
    },
    {
        path: '/register',
        element: (
            <RegisterForm
                heading="Login"
                eMail="e-Mail"
                username='Username'
                password="Password"
                confPassword='Confirm Password'
                submit="Submit"
            />
        ),
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
