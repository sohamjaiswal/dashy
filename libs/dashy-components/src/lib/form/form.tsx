import React from 'react';
import { IFormProps } from './form.types';

export const Form = ({
    children,
    onSubmit,
    className,
    ...props
}: IFormProps) => {
    const classNames = ['form', className].join(' ');
    return (
        <form className={classNames} onSubmit={onSubmit}>
            {children}
        </form>
    );
};
