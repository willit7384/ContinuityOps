import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";

export const blockSuspendedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // If no user attached, token middleware should handle it
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { suspended: true },
    });

    if (user?.suspended) {
      return res.status(403).json({
        error: "Account suspended. Contact admin.",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      error: "Suspension check failed",
    });
  }
};
