import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.middleware.js";
import { getMe } from "./users.controller.js";

const router = Router();

router.get("/me", verifyToken, getMe);

export default router;
