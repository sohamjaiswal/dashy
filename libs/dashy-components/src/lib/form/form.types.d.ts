import { SyntheticEvent, HTMLAttributes } from 'react';
export interface IFormProps extends HTMLAttributes<HTMLFormElement> {
    children: JSX.Element | JSX.Element[];
    onSubmit: (e: SyntheticEvent) => void;
    className?: string;
}
