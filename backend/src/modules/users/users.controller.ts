// This file contains user-related controllers

// Express types
import { Request, Response } from "express";
// Prisma client
import { prisma } from "../../lib/prisma.js";
// Prisma Role enum
import { Role } from "@prisma/client";
// Password hashing utility
import { hashPassword } from "../../utils/hash.js";
// Audit logging service
import { logAudit } from "../admin/audit.service.js";

// POST /api/users: Create a new user
export const createUserController = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password, role } = req.body;
// Validate input
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "Missing required fields" });
  }
// Hash password
  const hashedPassword = await hashPassword(password);
// Create user
  const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role: role as Role,
    },
  });
// Return created user
  return res.status(201).json(user);
};

// GET /api/users: List all users
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
// Return users
  return res.json(users);
};

// PATCH /api/users/:id/role: Update user role
export const updateRoleController = async (req: Request, res: Response) => {
  const { role } = req.body;
  const userId = req.params.id;
// Validate input
  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }
// Validate role
  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }
// Update user role
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role: role as Role },
  });
// Audit log
  return res.json(updatedUser);
};

// POST /api/users/:id/suspend: Suspend a user
export const suspendUserController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const adminId = (req as any).user?.id;
// Validate input
  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }
// Prevent self-suspension
  if (userId === adminId) {
    return res.status(400).json({ message: "Cannot suspend yourself" });
  }
// Suspend user
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { suspended: true },
  });
// Audit log
  await logAudit({
    actorId: adminId,
    action: "USER_SUSPENDED",
    targetId: userId,
  });
// Return updated user
  return res.json(updatedUser);
};

// POST /api/users/login: User login (placeholder)
export const loginController = async (req: Request, res: Response) => {
  return res.status(501).json({ message: "Login not implemented here" });
};

// GET /api/users/me: Get current user info
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
// Return user info
  res.json(user);
};

// PATCH /api/users/me: Update current user info
export const updateMe = async (req: Request, res: Response) => {
  const { email } = req.body; // New email
// Update user info
  const updated = await prisma.user.update({
    where: { id: (req as any).user.id },
    data: { email },
  });
// Audit log
  await logAudit({
    actorId: (req as any).user.id,
    action: "USER_UPDATED_SELF",
    targetId: (req as any).user.id,
  });
// Return updated user info
  res.json(updated);
};
