export interface ITextInputProps {
    required?: boolean;
    label: string;
    onChange: (string) => void;
    placeholder?: string;
    type?: 'text' | 'password';
    maxLength?: number;
}
