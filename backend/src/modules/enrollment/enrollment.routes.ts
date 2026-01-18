import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import {
  createEnrollment,
  getEnrollments,
  getEnrollmentById,
  updateEnrollmentStatus,
} from "./enrollment.controller.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  requireRole(["ADMIN"]),
  createEnrollment
);

router.get(
  "/",
  verifyToken,
  requireRole(["ADMIN"]),
  getEnrollments
);

router.get(
  "/:id",
  verifyToken,
  requireRole(["ADMIN"]),
  getEnrollmentById
);

router.patch(
  "/:id/status",
  verifyToken,
  requireRole(["ADMIN"]),
  updateEnrollmentStatus
);

export default router;
