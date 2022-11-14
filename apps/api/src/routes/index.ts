import { Router } from 'express';
import { default as users } from './users/users.routes';
import { default as linkGuilded } from './link-guilded/link-guilded.routes';
import { default as guilds } from './guilds/guilds.routes';
import { default as dashy } from './dashy/dashy.routes';

const router = Router();

router.use('/users', users);
router.use('/link-guilded', linkGuilded);
router.use('/guilds', guilds);
router.use('/dashy', dashy);

export default router;
