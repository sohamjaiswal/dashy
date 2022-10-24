import { IUser } from '@dashy/api-interfaces';
import { IVerifyOptions, Strategy } from 'passport-local';
import { UsersService } from '../../services/base-model.service';
import Passport = require('passport');
import { Schema } from 'mongoose';
import { ErrorFormatter } from '../../constants/errors';

const authErrors = new ErrorFormatter('Passport Auth Error');

export const initPassport = (passport: typeof Passport) => {
    const authenticate = async (
        email: string,
        password: string,
        cb: (error: any, user?: any, options?: IVerifyOptions) => void
    ) => {
        const user = (await UsersService.findOne({ email }).catch((err) =>
            cb(new Error(err))
        )) as IUser;
        if (!user) return cb(new Error(authErrors.notFound()));
        const compareResult = await user.validateCredentials(password);
        if (compareResult) {
            return cb(null, user);
        } else {
            cb(new Error(authErrors.badRequest()));
        }
    };

    passport.use(new Strategy({ usernameField: 'email' }, authenticate));
    passport.serializeUser((user, cb) => cb(null, user._id));
    passport.deserializeUser(async (id: Schema.Types.ObjectId, cb) => {
        const user = await UsersService.findById(id).catch((err) =>
            cb(null, null)
        );
        if (!user) return cb(null, null);
        return cb(null, user);
    });
};
