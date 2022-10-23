import { Router } from 'express';
import { linkGuilded } from '../../controllers/link-guilded/link-guilded.controller';

const router = Router();

router.route('/').get(linkGuilded);

export default router;
