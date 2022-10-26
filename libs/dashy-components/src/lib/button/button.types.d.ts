import { ITypographyProps } from './../typography/typography.types.d';

export interface IButtonProps {
    typography?: ITypographyProps;
    backgroundColor?: string;
    onClick: () => void;
}
