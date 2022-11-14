import { Request, Response } from 'express';
import asyncHandler = require('express-async-handler');
import { Schema } from 'mongoose';
import { IUser } from '@dashy/api-interfaces';
import { UsersService } from '../../services/base-model.service';
import { sanitizeObject } from '../../util/helpers/sanitize';

/**
 * Sign up a user
 *
 * @path {POST /api/v0/users/}
 * @returns {IUser}
 */
export const signupUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, username }: Partial<IUser> = req.body;
    if (!(email && password && username)) {
        res.sendStatus(400);
        throw new Error('400::bad request data');
    }
    const user = await UsersService.create({ email, password, username });
    res.status(201).json(user);
});

/**
 * Get the currently signed in user which has the session
 *
 * @path {GET /api/v0/users}
 * @returns {IUser}
 */
export const getCurrUser = asyncHandler(async (req: Request, res: Response) => {
    res.json(req.user);
});

/**
 * Update the user who is signed in with the bullshit partial params they have
 *
 * @path {PATCH /api/v0/users}
 * @returns {IUser}
 */

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const {
        password,
        currPassword,
    }: Partial<IUser> & { currPassword: string } = req.body;
    const updateParams = sanitizeObject({ password });
    const _user = await UsersService.findById(
        req.user?._id as Schema.Types.ObjectId
    );
    // impressive witchcraft
    if (password && currPassword) {
        const result = await _user.validateCredentials(currPassword);
        if (!result) {
            throw new Error('400::Invalid credentials');
        }
    } else if (password || currPassword) {
        throw new Error('400::Specify both current password and new password');
    }
    const userId = req.user?._id as Schema.Types.ObjectId;
    const user = await UsersService.updateById(userId, updateParams);
    res.status(202).json(user);
});

/**
 * Delete the user who is signed in, this is a massive L
 *
 * @path {DELETE /api/v0/users}
 * @returns {IUser}
 */

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { password }: { password: string } = req.body;
    if (!password) {
        throw new Error('400::password is required');
    }
    const _user = await UsersService.findById(
        req.user?._id as Schema.Types.ObjectId
    );
    // impressive wizardcraft
    const result = await _user.validateCredentials(password);
    if (!result) {
        throw new Error('400::Invalid credentials');
    }
    const userId = req.user?._id as Schema.Types.ObjectId;
    const user = await UsersService.deleteById(userId);
    req.logout((err) => {
        if (err)
            throw new Error("500::Unable to logout, you're stuck with us UwU");
    });
    res.status(202).json(user);
});

/**
 * Logout the user because they hate us and want to move to DownCat instead ;_;
 *
 * @path {POST /api/v0/users/logout}
 * @returns {{}}
 */

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    req.logout((err) => {
        if (err)
            throw new Error("500::Unable to logout, you're stuck with us UwU");
    });
    res.json({});
});

export const getLinkId = asyncHandler(async (req: Request, res: Response) => {
    res.json(req.user._id);
});
