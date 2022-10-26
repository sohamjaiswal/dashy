import React from 'react';
import { IBigBoxProps } from './big-box.types';

import './big-box.scss';

export const BigBox = ({ children, ...props }: IBigBoxProps) => {
    return (
        <div {...props} className="bigBox">
            {children}
        </div>
    );
};
