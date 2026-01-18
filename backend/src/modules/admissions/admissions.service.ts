import { prisma } from "../../lib/prisma.js";

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

export const listApplications = async (userId: string) => {
  return prisma.admission.findMany({
    where: { userId },
  });
};
