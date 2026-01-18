import { Router } from "express";
import { adminLoginController } from "./admin.auth.controller.js";

const router = Router();

router.post("/login", adminLoginController);

export default router;
