import { Router } from "express";
import { verifyToken } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";
import {
  createAdmission,
  getAdmissions,
  getAdmissionById,
  updateAdmissionStatus,
} from "./admissions.controller.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  requireRole(["ADMIN"]),
  createAdmission
);

router.get(
  "/",
  verifyToken,
  requireRole(["ADMIN"]),
  getAdmissions
);

router.get(
  "/:id",
  verifyToken,
  requireRole(["ADMIN"]),
  getAdmissionById
);

router.patch(
  "/:id/status",
  verifyToken,
  requireRole(["ADMIN"]),
  updateAdmissionStatus
);

export default router;
