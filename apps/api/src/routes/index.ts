import { Router } from "express";
import {default as session} from "./session/session.routes"
import {default as register} from "./register/register.routes"

const router = Router()

router.use('/session', session)
router.use('/register', register)

export default router