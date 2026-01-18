import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import {
  createAdmission,
  getAdmissions,
  getAdmissionById,
  updateAdmissionStatus,
} from "./admissions.controller.js";
import { blockSuspendedUser } from "../../middlewares/suspension.middleware.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]),
  createAdmission
);

router.get(
  "/",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]),
  getAdmissions
);

router.get(
  "/:id",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]),
  getAdmissionById
);

router.patch(
  "/:id/status",
  verifyToken,
  blockSuspendedUser,
  requireRole(["ADMIN"]),
  updateAdmissionStatus
);

export default router;
