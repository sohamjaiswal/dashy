import { ILink } from '@dashy/api-interfaces';
import { Request, Response } from 'express';
import asyncHandler = require('express-async-handler');
import mongoose from 'mongoose';
import { UsersService } from '../../services/base-model.service';

// TODO Create another unique identifier in this model that can be generated from the schema and used for verification
// GHAHAHHAHA WHEN WILL I DO THISSSS
export const linkGuilded = asyncHandler(async (req: Request, res: Response) => {
    const { guildedId, dashyId }: Partial<ILink> = req.body;
    const realDashyId = new mongoose.Types.ObjectId(dashyId);
    if (!(guildedId && dashyId)) {
        res.sendStatus(400);
        throw new Error('400::bad request data');
    }
    if (await UsersService.findById(realDashyId)) {
        if (
            (await UsersService.findOne({ guildedId })) ||
            !(await UsersService.findById(realDashyId)).guildedId
        ) {
            res.sendStatus(409);
            throw new Error(
                '409::account already linked to another dashy account...'
            );
        }
        const user = await UsersService.updateById(realDashyId, { guildedId });
        res.status(200).json(user);
    }
    res.sendStatus(404);
});
