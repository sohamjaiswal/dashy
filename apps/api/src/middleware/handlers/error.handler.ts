import { NextFunction, Request, Response } from 'express';
import { Logger } from '../../util/logger/logger';

function extractNumbers(s: string) {
    return s.replace(/^\D+/g, '');
}

export const expressErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.message && err.message.split('::')[0];
    // if status code starts with 2xx convert it to a fucking status 500
    Logger.error(err);
    const errorMessage =
        err.message.split('::').length === 2
            ? err.message.split('::')[1]
            : err.message;
    res.status(
        statusCode.toString().startsWith('2') ||
            !Number(extractNumbers(statusCode))
            ? 500
            : Number(extractNumbers(statusCode))
    ).json({
        error: { status: res.statusCode, message: errorMessage },
    });
};
