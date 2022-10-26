export interface ITextAreaInputProps {
    label: string;
    onChange: (string) => void;
    rows?: number;
    maxlength?: number;
    placeholder?: string;
    required?: boolean;
}
