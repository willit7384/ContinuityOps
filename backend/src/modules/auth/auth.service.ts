// This file contains service functions for authentication

// Dependencies
import bcrypt from "bcrypt";
// JWT for token generation
import jwt from "jsonwebtoken";
// Prisma client
import { prisma } from "../../lib/prisma.js";
// Prisma Role enum
import { Role } from "@prisma/client";
// Environment variables
import { JWT_SECRET, JWT_EXPIRES_IN } from "../../config/env.js";

// Register a new user
export const registerUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already in use");
// Hash password
  const hashed = await bcrypt.hash(password, 10);
// Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      firstName,
      lastName,
      role: Role.STUDENT,
    },
  });
// Return created user
  return user;
};
// Login user
export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

// BLOCK SUSPENDED USERS
  if (user.suspended) {
    throw new Error("Account suspended. Contact admin.");
  }
// Check password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");
// Generate JWT token
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
// Return token and user
  return { token, user };
};
