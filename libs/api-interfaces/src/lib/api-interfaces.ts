/* eslint-disable @typescript-eslint/no-empty-interface */
import { FilterQuery, Schema } from 'mongoose';
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

export interface IFrontUser extends Omit<IUser, 'validateCredentials'> {}

export interface IError {
    error: {
        status: number;
        message: string;
    };
}

export interface IDbModelService<T> {
    /**
     * Create a new instance of the model
     */
    create: (props: Partial<T>) => Promise<T>;

    /**
     * Delete an instance of the model
     */
    deleteById: (id: Schema.Types.ObjectId) => Promise<T>;

    /**
     * Get a single entity that matches the query
     */
    findOne: (query: FilterQuery<T>) => Promise<T>;

    /**
     * Get all entities that match the query
     */
    findMany: (query: FilterQuery<T>) => Promise<T[]>;

    /**
     * Find one by ID
     */
    findById: (id: Schema.Types.ObjectId) => Promise<T>;

    /**
     * Update one by id
     */
    updateById: (id: Schema.Types.ObjectId, props: Partial<T>) => Promise<T>;
}
