import { Router, NextFunction, Request, Response } from 'express';
import passport = require('passport');
import {
    deleteUser,
    getCurrUser,
    logoutUser,
    signupUser,
    updateUser,
} from '../../controllers/users/users.controller';

import { isAuthenticated } from '../../middleware/auth/access-control.auth';
import { Logger } from '../../util/logger/logger';

const router = Router();

const log = (req: Request, res: Response, next: NextFunction) => {
    Logger.info(req);
    next();
};

router
    .route('/')
    .post(signupUser)
    .get(isAuthenticated, getCurrUser)
    .patch(isAuthenticated, updateUser)
    .delete(isAuthenticated, deleteUser);

router.route('/login').post(passport.authenticate('local'), log, getCurrUser);

router.route('/logout').post(isAuthenticated, logoutUser);

export default router;
