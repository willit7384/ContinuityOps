// This middleware checks if a user is suspended and blocks access if so
 
// Express types
import { Request, Response, NextFunction } from "express";
// Prisma client
import { prisma } from "../lib/prisma.js";

// Suspension check middleware
export const blockSuspendedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // If no user attached, token middleware should handle it
    const userId = (req as any).user?.id; // Get user ID from request
// If no user ID, unauthorized
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
// Check if user is suspended
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { suspended: true },
    });
// If suspended, block access
    if (user?.suspended) {
      return res.status(403).json({
        error: "Account suspended. Contact admin.",
      });
    }
// If not suspended, proceed to next middleware
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Suspension check failed",
    });
  }
};
