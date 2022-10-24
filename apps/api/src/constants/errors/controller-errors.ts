export class ControllerError {
    error: string;
    description: string;
    formatted: string;

    constructor(error: string, description: string) {
        this.error = error;
        this.description = description;
        this.formatted = ControllerError.formatted(
            this.error,
            this.description
        );
    }

    static formatted = (error: string, description: string) => {
        return `${error.toUpperCase()}: ${description}`;
    };
}
