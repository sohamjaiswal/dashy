import { Request, Response, NextFunction } from 'express';
export const setCorsConfig = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', `http://127.0.0.1:4200`);
    res.header(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,UPDATE,DELETE,OPTIONS'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'X-Request-With,X-HTTP-Method-Override,Content-Type,Accept'
    );
    next();
};
