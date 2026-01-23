// This file contains route definitions for enrollment-related endpoints

// Express router
import { Router } from "express";
// Authentication middleware
import { verifyToken } from "../../middlewares/auth.middleware.js";
// Role-based access control middleware
import { requireRole } from "../../middlewares/role.middleware.js";
// Enrollment controllers
import {
  createEnrollment,
  getEnrollments,
  getEnrollmentById,
  updateEnrollmentStatus,
} from "./enrollment.controller.js";
// Suspension middleware
import { blockSuspendedUser } from "../../middlewares/suspension.middleware.js";

// Create router
const router = Router();

// Define routes
router.post(
  "/",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]), // Admin only: protected route
  createEnrollment
);

// Get all enrollments
router.get(
  "/",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]), // Admin only: protected route
  getEnrollments
);

// Get enrollment by ID
router.get(
  "/:id",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]), // Admin only: protected route
  getEnrollmentById
);

// Update enrollment status
router.patch(
  "/:id/status",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]), // Admin only: protected route
  updateEnrollmentStatus
);

// Export router
export default router;
