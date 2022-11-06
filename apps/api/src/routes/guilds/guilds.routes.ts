import { Router } from 'express';
import {
    getGuild,
    registerGuild,
    updateGuildPrefix,
    deleteGuild,
} from '../../controllers/guilds/guilds.controller';

const router = Router();

router
    .route('/')
    .post(registerGuild)
    .patch(updateGuildPrefix)
    .delete(deleteGuild);

router.route('/:id').get(getGuild);

export default router;
