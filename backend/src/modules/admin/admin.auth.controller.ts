// Admin authentication controller: This controller handles admin login functionality

import { Request, Response } from "express";
// Prisma client
import { prisma } from "../../lib/prisma.js";
// Bcrypt for password hashing
import bcrypt from "bcrypt";
// JWT for token generation
import jwt from "jsonwebtoken";
// Audit logging service
import { logAudit } from "./audit.service.js";


// Admin login controller
export const adminLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
// Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }
// Find admin by email
  const admin = await prisma.user.findUnique({ where: { email } });
// Check if admin exists and has ADMIN role
  if (!admin || admin.role !== "ADMIN") {
    return res.status(401).json({ message: "Invalid credentials" });
  }
// Check password
  const validPassword = await bcrypt.compare(password, admin.password);
// Invalid password
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
// Generate JWT token for authenticated admin
  const token = jwt.sign(
    { id: admin.id, role: admin.role },
    process.env.JWT_SECRET!,
    { expiresIn: "8h" }
  );
// Log audit entry for admin login
  await logAudit({
    actorId: admin.id,
    action: "ADMIN_LOGIN",
    targetId: admin.id,
    metadata: null,
  });
// Return JWT token
  res.json({ token });
};
