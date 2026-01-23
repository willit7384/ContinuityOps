// Log an audit event

// Prisma client
import { prisma } from "../../lib/prisma.js";

// Log audit event by creating an entry in the auditLog table
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
  return prisma.auditLog.create({ // <-- create audit log entry
    data: {
      actorId,
      action,
      targetId,
      metadata: metadata ?? undefined, // <-- use undefined not null because Prisma strongly types null vs undefined
    },
  });
};
