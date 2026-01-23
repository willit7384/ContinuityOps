// This file contains the user-related service functions

// Utility functions for password hashing and UUID generation
import { hashPassword, verifyPassword } from "../../utils/hash.js";
// UUID generator
import { generateUuid } from "../../utils/uuid.js";
// JWT for token generation
import jwt from "jsonwebtoken";
// Prisma client
import { prisma } from "../../lib/prisma.js";
// Prisma Role enum
import { Role } from "@prisma/client";

// Create a new user
export const createUser = async (userData: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
}) => {
  return prisma.user.create({ //<- create user entry
    data: {
      ...userData,
    },
  });
};

// Update user role
export const updateUserRole = async (userId: string, role: Role) => {
  return prisma.user.update({
    where: { id: userId },
    data: { role },
  });
};

// Get all users
export async function getUsers() {
  return prisma.user.findMany();
}

// Suspend or unsuspend a user
export async function suspendUser(userId: string, suspended: boolean) {
  return prisma.user.update({
    where: { id: userId },
    data: { suspended },
  });
}

// User login
export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");
// Check password
  const valid = await verifyPassword(password, user.password);
  if (!valid) throw new Error("Invalid credentials");
// Generate JWT token
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  return { token, user };
}
