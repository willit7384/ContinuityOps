// Admin Protected Routes: Routes for admin functionalities like user management and audit logs

// Express router
import { Router } from "express";
// Authentication middleware
import { verifyToken } from "../../middlewares/auth.middleware.js";
// Role-based access control middleware
import { requireRole } from "../../middlewares/role.middleware.js";
// Admin controllers
import { getAllUsers, updateUserRole } from "./admin.controller.js";
// Suspension middleware
import { blockSuspendedUser } from "../../middlewares/suspension.middleware.js";
// Admin controllers
import { listAuditLogs } from "./admin.controller.js";


// Create router
const router = Router();
// Get all users
router.get("/users", verifyToken, blockSuspendedUser, requireRole(["ADMIN"]), getAllUsers);
// List audit logs
router.get(
  "/audit-logs",
  verifyToken,
  requireRole(["ADMIN"]),
  listAuditLogs
);
// Update user role
router.patch(
  "/users/:id/role",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]),
  updateUserRole
);
// Export router
export default router;
