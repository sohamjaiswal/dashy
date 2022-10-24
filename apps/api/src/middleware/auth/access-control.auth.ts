import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        throw new Error('401::Bad session/missing token');
    }
};
