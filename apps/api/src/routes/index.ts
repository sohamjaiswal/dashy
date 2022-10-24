import { Router } from 'express';
import { default as users } from './users/users.routes';
import { default as linkGuilded } from './link-guilded/link-guilded.routes';

const router = Router();

router.use('/users', users);
router.use('/link-guilded', linkGuilded);

export default router;
