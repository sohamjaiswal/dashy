export const errors = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
    500: 'Internal Error',
};

export class ErrorFormatter {
    context: string;

    constructor(context: string) {
        this.context = context;
    }

    badRequest() {
        return '400::' + this.context + ` ${errors[400]}`;
    }

    unauthorized() {
        return '401::' + this.context + ` ${errors[401]}`;
    }

    forbidden() {
        return '403::' + this.context + ` ${errors[403]}`;
    }

    notFound() {
        return '404::' + this.context + ` ${errors[404]}`;
    }

    conflict() {
        return '409::' + this.context + ` ${errors[409]}`;
    }

    internalError() {
        return '500::' + `${errors[500]}`;
    }
}
