export class Cors {
    origin: string;
    credentials: boolean;
    methods: string[];
    allowedHeaders: string[];

    constructor(
        origin: string,
        credentials: boolean,
        methods: string[] = [
            'GET',
            'POST',
            'PUT',
            'PATCH',
            'DELETE',
            'OPTIONS',
        ],
        allowedHeaders: string[] = [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'token',
            'Authorization',
            'X-HTTP-Method-Override',
        ]
    ) {
        this.origin = origin;
        this.credentials = credentials;
        this.methods = methods;
        this.allowedHeaders = allowedHeaders;
    }

    getConfig = () => {
        return {
            origin: this.origin,
            credentials: this.credentials,
            methods: this.methods,
            allowedHeaders: this.allowedHeaders,
        };
    };
}
