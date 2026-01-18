import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided." });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid auth format." });
  }

  const token = parts[1]; // ✅ THIS WAS MISSING

  if (!token) {
    return res.status(401).json({ message: "Token missing." });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: "JWT_SECRET not defined." });
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = {
      userId: decoded.userId as string,
      role: decoded.role as string,
    };

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token." });
  }
};
