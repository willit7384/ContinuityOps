// This file contains service functions for managing admissions

// Prisma client
import { prisma } from "../../lib/prisma.js";

// Create a new admission application
export const createAdmissionApplication = async (userId: string, program: string, term: string) => {
  return prisma.admission.create({
    data: {
      userId,
      program,
      term,
      status: "PENDING",
    },
  });
};

// List all applications for a specific user
export const listApplications = async (userId: string) => {
  return prisma.admission.findMany({
    where: { userId },
  });
};
