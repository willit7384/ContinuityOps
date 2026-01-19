import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import { getAllUsers, updateUserRole } from "./admin.controller.js";
import { blockSuspendedUser } from "../../middlewares/suspension.middleware.js";
import { listAuditLogs } from "./admin.controller.js";



const router = Router();

router.get("/users", verifyToken, blockSuspendedUser, requireRole(["ADMIN"]), getAllUsers);
router.get(
  "/audit-logs",
  verifyToken,
  requireRole(["ADMIN"]),
  listAuditLogs
);
router.patch(
  "/users/:id/role",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]),
  updateUserRole
);

export default router;
