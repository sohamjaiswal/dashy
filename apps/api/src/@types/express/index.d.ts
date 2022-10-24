import { IUser } from '@dashy/api-interfaces';

declare global {
    namespace Express {
        interface Request {
            user: User;
        }

        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface User extends IUser {}
    }
}
