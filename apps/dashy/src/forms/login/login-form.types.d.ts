export interface ILoginForm {
    heading: string;
    eMail: string;
    password: string;
    submit: string;
    className?: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
