import { Router } from 'express';
import { linkGuilded } from '../../controllers/dashy/dashy.controller';

const router = Router();

router.route('/').get(linkGuilded);

export default router;
