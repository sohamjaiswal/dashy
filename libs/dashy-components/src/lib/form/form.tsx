import React from 'react';
import { IFormProps } from './form.types';

export const Form = ({ children, onSubmit }: IFormProps) => {
    return (
        <form className="form" onSubmit={onSubmit}>
            {children}
        </form>
    );
};
