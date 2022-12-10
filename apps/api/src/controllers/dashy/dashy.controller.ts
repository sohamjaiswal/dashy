import { ILink } from '@dashy/api-interfaces';
import { Request, Response } from 'express';
import asyncHandler = require('express-async-handler');
import { ErrorFormatter } from '../../constants/errors';
import { UsersService } from '../../services/base-model.service';

const linkageErrorFormatter = new ErrorFormatter('Guilded Link');

export const linkGuilded = asyncHandler(async (req: Request, res: Response) => {
    const { guildedId, dashyId }: Partial<ILink> = req.body;
    if (!(guildedId && dashyId)) {
        throw new Error(linkageErrorFormatter.badRequest());
    }
    if (await UsersService.findById(dashyId)) {
        if ((await UsersService.findById(dashyId)).guildedId) {
            throw new Error(linkageErrorFormatter.conflict());
        }
        const user = await UsersService.updateById(dashyId, { guildedId });
        res.status(200).json(user);
    }
    throw new Error(linkageErrorFormatter.notFound());
});

export const unlinkGuilded = asyncHandler(
    async (req: Request, res: Response) => {
        const { guildedId }: Partial<ILink> = req.body;
        if (!guildedId) {
            throw new Error(linkageErrorFormatter.badRequest());
        }
        const user = await UsersService.updateOne(
            { guildedId },
            { guildedId: undefined }
        );
        res.status(200).json(user);
    }
);
