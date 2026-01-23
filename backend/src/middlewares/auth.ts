// This file contains middleware functions for authentication and authorization using JWT

// Express types
import { Request, Response, NextFunction } from "express"; 
// JWT library
import jwt from "jsonwebtoken";

// Authenticated request type: What this does is to extend the Express Request object to include a user property that holds authenticated user information
export interface AuthRequest extends Request {
  user?: any;
}

// Middleware to authenticate user via JWT
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]; //
  if (!token) return res.status(401).json({ message: "Unauthorized" });
// Validate token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to authorize user based on roles
export const authorize =
  (...roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
