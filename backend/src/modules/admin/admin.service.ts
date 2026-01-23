// GET /api/admin/audit-logs : This controller fetches and returns audit logs for admin users

// Prisma client
import { prisma } from "../../lib/prisma.js";

// Get audit logs with pagination
export const getAuditLogs = async (
  page = 1,
  limit = 25
) => {
  // Calculate the number of records to skip
  const skip = (page - 1) * limit;
// Fetch logs and total count concurrently
  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: {
        actor: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    }),
    prisma.auditLog.count(), // Total count of audit logs
  ]);

// Return logs with pagination metadata
  return {
    data: logs,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
