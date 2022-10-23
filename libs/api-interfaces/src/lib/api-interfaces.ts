import { Schema } from "mongoose";
export interface Message {
  message: string;
}

export interface IUser {
    _id: Schema.Types.ObjectId;
    email: string;
    username: string;
    password: string;
    validateCredentials: (password: string) => Promise<boolean>;
}
