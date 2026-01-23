// Middleware to handle errors in Express applications

// Express types
import { Request, Response, NextFunction } from "express";

// Error handling middleware
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
// Determine status code and message
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
// Send error response
  res.status(status).json({ error: message });
}
