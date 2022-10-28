import { HTMLAttributes } from 'react';

export interface IBoxProps extends HTMLAttributes<HTMLDivElement> {
    children: JSX.Element | JSX.Element[];
    className?: string;
}
