import { Router } from "express";
import {default as login} from "./login/login.routes"
import {default as logout} from "./logout/logout.routes"
import {default as register} from "./register/register.routes"

const router = Router()

router.use('/login', login)
router.use('/logout', logout)
router.use('/register', register)

export default router