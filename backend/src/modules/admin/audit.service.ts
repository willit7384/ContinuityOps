import { prisma } from "../../lib/prisma.js";

export const logAudit = async ({
  actorId,
  action,
  targetId,
  metadata,
}: {
  actorId: string;
  action: string;
  targetId: string | null;
  metadata?: any; // <-- allow any JSON
}) => {
  return prisma.auditLog.create({
    data: {
      actorId,
      action,
      targetId,
      metadata: metadata ?? undefined, // <-- use undefined not null
    },
  });
};
