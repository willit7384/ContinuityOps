// Auth controller
// Handles user registration and login

// Express types
import { Request, Response } from "express";
// Bcrypt for password hashing
import bcrypt from "bcryptjs";
// JWT for token generation
import jwt from "jsonwebtoken";
// Prisma client
import { PrismaClient } from "@prisma/client";

// Prisma client singleton
const prisma = new PrismaClient();


// Register controller
export const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, role } = req.body;
// Check if user already exists
  const hashedPassword = await bcrypt.hash(password, 10);
// Create user in the database
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
    },
  });
// Return user object
  return res.json({ user });
};


// Login controller
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
// Find user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
// Check password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Invalid credentials" });
// Generate JWT token
  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
// Return token
  return res.json({ token });
};
