// This file defines the routes for admissions-related operations

// Express router
import { Router } from "express";
// Authentication middleware
import { verifyToken } from "../../middlewares/auth.middleware.js";
// Role-based access control middleware
import { requireRole } from "../../middlewares/role.middleware.js";
// Admissions controllers
import {
  createAdmission,
  getAdmissions,
  getAdmissionById,
  updateAdmissionStatus,
} from "./admissions.controller.js";
// Suspension middleware
import { blockSuspendedUser } from "../../middlewares/suspension.middleware.js";
// Create router
const router = Router();
// Create a new admission
router.post(
  "/",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]),
  createAdmission
);
// Get all admissions
router.get(
  "/",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]),
  getAdmissions
);
// Get admission by ID
router.get(
  "/:id",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]),
  getAdmissionById
);
// Update admission status
router.patch(
  "/:id/status",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]),
  updateAdmissionStatus
);
// Export router
export default router;
