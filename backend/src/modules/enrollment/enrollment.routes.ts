import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import {
  createEnrollment,
  getEnrollments,
  getEnrollmentById,
  updateEnrollmentStatus,
} from "./enrollment.controller.js";
import { blockSuspendedUser } from "../../middlewares/suspension.middleware.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]),
  createEnrollment
);

router.get(
  "/",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]),
  getEnrollments
);

router.get(
  "/:id",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]),
  getEnrollmentById
);

router.patch(
  "/:id/status",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]),
  updateEnrollmentStatus
);

export default router;
