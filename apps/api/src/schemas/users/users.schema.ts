import { IUser } from '@dashy/api-interfaces';
import { model, Schema } from 'mongoose';

import bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
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

export const User = model<IUser>('User', UserSchema);
