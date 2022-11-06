import { IGuild } from '@dashy/api-interfaces';
import { Request, Response } from 'express';
import { ErrorFormatter } from '../../constants/errors';
import { GuildService } from '../../services/base-model.service';

import asyncHandler = require('express-async-handler');

const errors = new ErrorFormatter('Guild controller');

export const getGuild = asyncHandler(async (req: Request, res: Response) => {
    const guildId = req.params.id;
    if (!guildId) {
        res.sendStatus(400);
        throw new Error(errors.badRequest());
    }
    const guild = await GuildService.findOne({ guildId });
    res.status(200).json(guild);
});

export const registerGuild = asyncHandler(
    async (req: Request, res: Response) => {
        const { guildId }: Partial<IGuild> = req.body;
        if (!guildId) {
            res.sendStatus(400);
            throw new Error(errors.badRequest());
        }
        const guild = await GuildService.create({ guildId });
        res.status(201).json(guild);
    }
);

export const updateGuildPrefix = asyncHandler(
    async (req: Request, res: Response) => {
        const { guildId, prefix }: Partial<IGuild> = req.body;
        if (!(guildId && prefix)) {
            res.sendStatus(400);
            throw new Error(errors.badRequest());
        }
        const guild = await GuildService.findOne({ guildId });
        const realGuildId = guild._id;
        const updatedGuild = await GuildService.updateById(realGuildId, {
            prefix,
        });
        res.status(200).json(updatedGuild);
    }
);

export const deleteGuild = asyncHandler(async (req: Request, res: Response) => {
    const { guildId }: Partial<IGuild> = req.body;
    if (!guildId) {
        res.sendStatus(400);
        throw new Error(errors.badRequest());
    }
    const guild = await GuildService.findOne({ guildId });
    const realGuildId = guild._id;
    const deletedGuild = await GuildService.deleteById(realGuildId);
    res.status(200).json(deletedGuild);
});
