import { Router } from 'express';
import {
    linkGuilded,
    unlinkGuilded,
} from '../../controllers/dashy/dashy.controller';

const router = Router();

router.route('/link').post(linkGuilded);
router.route('/unlink').post(unlinkGuilded);

export default router;
