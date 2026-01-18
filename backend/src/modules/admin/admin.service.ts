import { prisma } from "../../lib/prisma.js";
import { Role } from "@prisma/client";

export const updateUserRole = async (userId: string, role: Role) => {
  return prisma.user.update({
    where: { id: userId },
    data: { role },
  });
};
