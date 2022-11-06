import React, { CSSProperties, useState } from 'react';
import { Outlet } from 'react-router-dom';
import PuffLoader from 'react-spinners/PuffLoader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGlobalStoreState } from '../store';

export const App = () => {
    const loaderStyles: CSSProperties = {
        position: 'absolute',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        visibility: `${
            useGlobalStoreState((state) => state.loading) ? 'visible' : 'hidden'
        }`,
    };
    return (
        <div className="dashy">
            <div style={loaderStyles}>
                <PuffLoader
                    color="black"
                    loading={useGlobalStoreState((state) => state.loading)}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
            <Outlet />
            <ToastContainer />
        </div>
    );
};
