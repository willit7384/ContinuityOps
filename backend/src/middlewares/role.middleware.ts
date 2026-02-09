// Middleware to check user roles
//This middleware is used to restrict access to certain routes based on user roles
 
// Express types
import { Request, Response, NextFunction } from "express";

// Role-based access control middleware
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role;
// Check if user role is authorized
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }
// Proceed to next middleware
    next();
  };
};
