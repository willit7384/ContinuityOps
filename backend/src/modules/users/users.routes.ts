import express from "express";
import { createUserController, listUsersController, updateRoleController, suspendUserController, loginController } from "./users.controller.js";
import { verifyToken } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", createUserController);
router.post("/login", loginController);

router.use(verifyToken); // all routes below require auth
router.get("/", listUsersController);
router.patch("/:id/role", updateRoleController);
router.patch("/:id/suspend", suspendUserController);

export default router;
