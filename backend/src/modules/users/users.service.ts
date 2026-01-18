import { hashPassword, verifyPassword } from "../../utils/hash.js";
import { generateUuid } from "../../utils/uuid.js";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma.js";
import { Role } from "@prisma/client";

export const createUser = async (userData: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
}) => {
  return prisma.user.create({
    data: {
      ...userData,
    },
  });
};

export const updateUserRole = async (userId: string, role: Role) => {
  return prisma.user.update({
    where: { id: userId },
    data: { role },
  });
};

export async function getUsers() {
  return prisma.user.findMany();
}

export async function suspendUser(userId: string, suspended: boolean) {
  return prisma.user.update({
    where: { id: userId },
    data: { suspended },
  });
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const valid = await verifyPassword(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  return { token, user };
}
