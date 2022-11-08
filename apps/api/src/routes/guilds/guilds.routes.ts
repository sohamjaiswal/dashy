import { Router } from 'express';
import {
    getGuild,
    registerGuild,
    updateGuild,
    deleteGuild,
} from '../../controllers/guilds/guilds.controller';

const router = Router();

router.route('/').post(registerGuild).patch(updateGuild).delete(deleteGuild);

router.route('/:id').get(getGuild);

export default router;
