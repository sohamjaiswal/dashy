import { SyntheticEvent } from 'react';
export interface IFormProps {
    children: JSX.Element | JSX.Element[];
    onSubmit: (e: SyntheticEvent) => void;
}
