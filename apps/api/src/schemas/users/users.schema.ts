import { IUser } from '@dashy/api-interfaces';
import { model, Schema } from 'mongoose';

import bcrypt = require('bcryptjs');
import { mongooseErrorHandler } from '../../util/db/error-handler';

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Enter an email.'],
        unique: [true, 'That email is already in use.'],
        validate: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
        type: String,
        required: [true, 'Enter a password.'],
        minLength: [4, 'Password should atleast be 4 characters.'],
    },
    username: {
        type: String,
        required: [true, 'Enter a username.'],
        unique: [true, 'That username is already in use.'],
    },
});

UserSchema.methods.validateCredentials = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.pre(
    /^save|updateOne|update|findOneAndUpdate/,
    { document: true, query: false },
    async function () {
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
);

UserSchema.post('save', mongooseErrorHandler);

export const User = model<IUser>('User', UserSchema);
