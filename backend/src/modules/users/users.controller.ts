import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { Role } from "@prisma/client";
import { hashPassword } from "../../utils/hash.js";
import { logAudit } from "../admin/audit.service.js";

/**
 * POST /api/users
 */
export const createUserController = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password, role } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role: role as Role,
    },
  });

  return res.status(201).json(user);
};

/**
 * GET /api/users
 */
export const listUsersController = async (_req: Request, res: Response) => {
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

  return res.json(users);
};

/**
 * PATCH /api/users/:id/role
 */
export const updateRoleController = async (req: Request, res: Response) => {
  const { role } = req.body;
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role: role as Role },
  });

  return res.json(updatedUser);
};

/**
 * PATCH /api/users/:id/suspend
 */
export const suspendUserController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const adminId = (req as any).user?.id;

  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

  if (userId === adminId) {
    return res.status(400).json({ message: "Cannot suspend yourself" });
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { suspended: true },
  });

  await logAudit({
    actorId: adminId,
    action: "USER_SUSPENDED",
    targetId: userId,
  });

  return res.json(updatedUser);
};

/**
 * POST /api/users/login
 */
export const loginController = async (req: Request, res: Response) => {
  return res.status(501).json({ message: "Login not implemented here" });
};

export const getMe = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: (req as any).user.id },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  res.json(user);
};

export const updateMe = async (req: Request, res: Response) => {
  const { email } = req.body;

  const updated = await prisma.user.update({
    where: { id: (req as any).user.id },
    data: { email },
  });

  await logAudit({
    actorId: (req as any).user.id,
    action: "USER_UPDATED_SELF",
    targetId: (req as any).user.id,
  });

  res.json(updated);
};
