import { Document } from 'mongoose';

export function mongooseErrorHandler(
    err: Error,
    doc: Document,
    next: (err?: Error, doc?: Document) => void
) {
    switch (err.name) {
        case 'MongoServerError': {
            if (err.message.includes('duplicate')) {
                const dupKey = err.message.split('dup key: ')[1];
                throw new Error(`409::Duplicate key ${dupKey}`);
            }
            throw new Error(err.message);
        }
        case 'ValidationError': {
            throw new Error(
                `400::${err.message.split('validation failed: ')[1]}`
            );
        }
        default:
            next(err);
    }
}
