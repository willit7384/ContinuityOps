// Admin controller: Handles admin functionalities like user management and audit logs

import { Request, Response } from "express";
// Prisma client
import { prisma } from "../../lib/prisma.js";
// Audit logging service
import { logAudit } from "./audit.service.js";
// Authenticated request type
import { AuthRequest } from "../../middlewares/auth.middleware.js";
// Admin service
import { getAuditLogs } from "./admin.service.js";

// GET /api/admin/users
export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
    },
  });
// Return users
  res.json(users);
};

// PUT /api/admin/users/:id/role
export const updateUserRole = async (req: AuthRequest, res: Response) => {
  const { role } = req.body;
// Validation
  if (!req.params.id) {
    return res.status(400).json({ message: "User ID is required" });
  }
// Check if role is provided
  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }

  const userId = req.params.id;
// Update user role
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  //  AUDIT LOG
  await logAudit({
    actorId: req.user!.id,  // <--- FIXED
    action: "USER_ROLE_UPDATED",
    targetId: userId,
    metadata: { newRole: role },
  });

// Return updated user
  res.json({
    message: "Role updated",
    user: {
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
    },
  });
};

// GET /api/admin/audit-logs
export const listAuditLogs = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 25;
// Get audit logs with pagination
  const result = await getAuditLogs(page, limit);
  res.json(result);
};