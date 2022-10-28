import React from 'react';
import { IBoxProps } from './box.types';

import styles from './box.module.scss';

export const Box = ({ children, className, ...props }: IBoxProps) => {
    const classNames = [styles['box'], className].join(' ');
    return (
        <div {...props} className={classNames}>
            {children}
        </div>
    );
};
