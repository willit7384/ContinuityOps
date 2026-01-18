import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { logAudit } from "./audit.service.js";
import { AuthRequest } from "../../middlewares/auth.middleware.js";

/**
 * GET /api/admin/users
 */
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

  res.json(users);
};

/**
 * PATCH /api/admin/users/:id/role
 */
export const updateUserRole = async (req: AuthRequest, res: Response) => {
  const { role } = req.body;

  if (!req.params.id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }

  const userId = req.params.id;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  // 🔥 AUDIT LOG
  await logAudit({
    actorId: req.user!.id,  // <--- FIXED
    action: "USER_ROLE_UPDATED",
    targetId: userId,
    metadata: { newRole: role },
  });

  res.json({
    message: "Role updated",
    user: {
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
    },
  });
};
