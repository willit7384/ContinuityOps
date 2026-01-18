import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import { getMe, getAllUsers } from "./users.controller.js";

const router = Router();

router.get("/me", verifyToken, getMe);

// Admin-only
router.get("/", verifyToken, requireRole("ADMIN"), getAllUsers);

export default router;
