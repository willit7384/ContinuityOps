import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logAudit } from "./audit.service.js";

export const adminLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const admin = await prisma.user.findUnique({ where: { email } });

  if (!admin || admin.role !== "ADMIN") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const validPassword = await bcrypt.compare(password, admin.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin.id, role: admin.role },
    process.env.JWT_SECRET!,
    { expiresIn: "8h" }
  );

  await logAudit({
    actorId: admin.id,
    action: "ADMIN_LOGIN",
    targetId: admin.id,
    metadata: null,
  });

  res.json({ token });
};
