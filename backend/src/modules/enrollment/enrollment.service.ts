// This file contains the enrollment service functions

// Prisma client
import { prisma } from "../../lib/prisma.js";

// Enroll a user in a term
export async function enrollUser(
  userId: string,
  term: string
) {
  return prisma.enrollment.create({ // <-- create enrollment entry
    data: {
      userId,
      term,
    },
  });
}
