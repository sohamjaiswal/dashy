import { Router } from 'express';
import passport = require('passport');
import {
    deleteUser,
    getCurrUser,
    getLinkId,
    logoutUser,
    signupUser,
    updateUser,
} from '../../controllers/users/users.controller';

import { isAuthenticated } from '../../middleware/auth/access-control.auth';

const router = Router();

router
    .route('/')
    .post(signupUser)
    .get(isAuthenticated, getCurrUser)
    .patch(isAuthenticated, updateUser)
    .delete(isAuthenticated, deleteUser);

router.route('/login').post(passport.authenticate('local'), getCurrUser);

router.route('/logout').post(isAuthenticated, logoutUser);

router.route('/getlinkid').post(isAuthenticated, getLinkId);

export default router;
