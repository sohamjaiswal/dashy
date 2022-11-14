import { ILink } from '@dashy/api-interfaces';
import { Request, Response } from 'express';
import asyncHandler = require('express-async-handler');
import { UsersService } from '../../services/base-model.service';

export const linkGuilded = asyncHandler(async (req: Request, res: Response) => {
    const { guildedId, dashyId }: Partial<ILink> = req.body;
    if (!(guildedId && dashyId)) {
        res.sendStatus(400);
        throw new Error('400::bad request data');
    }
    if (await UsersService.findById) {
        if (
            (await UsersService.findOne({ guildedId })) ||
            !(await UsersService.findById(dashyId)).guildedId
        ) {
            res.sendStatus(409);
            throw new Error(
                '409::account already linked to another dashy account...'
            );
        }
        const user = await UsersService.updateById(dashyId, { guildedId });
        res.status(200).json(user);
    }
    res.sendStatus(404);
});
