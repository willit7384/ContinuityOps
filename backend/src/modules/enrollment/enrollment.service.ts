import { prisma } from "../../lib/prisma.js";

export async function enrollUser(
  userId: string,
  term: string
) {
  return prisma.enrollment.create({
    data: {
      userId,
      term,
    },
  });
}
