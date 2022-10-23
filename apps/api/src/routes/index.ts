import { Router } from "express";
import { default as session } from "./session/session.routes";
import { default as register } from "./register/register.routes";
import { default as linkGuilded } from "./link-guilded/link-guilded.routes";

const router = Router()

router.use("/session", session);
router.use("/register", register);
router.use("/link-guilded", linkGuilded);

export default router