import React from 'react';
import { ITypographyProps } from './typography.types';

import './typography.scss';

export const Typography = ({
    label,
    italic,
    weight = 400,
    color = 'black',
    size = 1,
    extraClassname,
    extraStyles,
    onClick,
    ...props
}: ITypographyProps) => {
    const modifiers = [
        italic ? 'italic' : null,
        onClick ? 'onClick' : null,
        extraClassname?.join(' '),
    ].join(' ');
    const modifiedClassName = ['typography', modifiers].join(' ');
    return (
        <span
            {...props}
            className={modifiedClassName}
            style={{
                fontWeight: weight,
                color: color,
                fontSize: `${size}rem`,
                ...extraStyles,
            }}
        >
            {label}
        </span>
    );
};
