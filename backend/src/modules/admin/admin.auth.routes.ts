// Admin authentication routes: Routes for admin login

import { Router } from "express";
// Admin login controller
import { adminLoginController } from "./admin.auth.controller.js";
// Create router
const router = Router();
// Admin login route
router.post("/login", adminLoginController);
// Export router
export default router;
