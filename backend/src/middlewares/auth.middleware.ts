// Authentication middleware to verify JWT tokens because they are used for secure user authentication

// Express types
import { Request, Response, NextFunction } from "express"; 
// JWT library
import jwt, { JwtPayload } from "jsonwebtoken";

// Authenticated request type
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}
// Middleware to verify JWT token
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing token" });
// Extract token from "Bearer <token>" format
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Malformed token" });
// Validate token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
// Check decoded payload
    if (!decoded || typeof decoded !== "object") {
      return res.status(401).json({ error: "Invalid token payload" });
    }
// Attach user info to request
    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };
// Proceed to next middleware
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

