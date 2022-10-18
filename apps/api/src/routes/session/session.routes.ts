import { Router } from "express";

const router = Router();

router.route("/").post().delete().patch();

export default router;
