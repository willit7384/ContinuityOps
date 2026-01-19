import express from "express";
import {
  createUserController,
  listUsersController,
  updateRoleController,
  suspendUserController,
  loginController,
  getMe,
  updateMe,
} from "./users.controller.js";

import { verifyToken } from "../../middlewares/auth.middleware.js";
import { blockSuspendedUser } from "../../middlewares/suspension.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post("/register", createUserController);
router.post("/login", loginController);

router.use(verifyToken, blockSuspendedUser); // all routes below require auth

router.get("/", requireRole(["ADMIN"]), listUsersController);
router.patch("/:id/role", requireRole(["ADMIN"]), updateRoleController);
router.patch("/:id/suspend", requireRole(["ADMIN"]), suspendUserController);

router.get("/me", getMe);
router.patch("/me", updateMe);

export default router;
