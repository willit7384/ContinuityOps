// This file extends Express Request interface to include user payload

// Express types
import "express";

// Extend Express namespace
declare global {
  namespace Express {
    interface UserPayload {
      id: string;
      role: string;
    }
// Extend Request interface to include user property
    interface Request {
      user?: UserPayload;
    }
  }
}
// Empty export to convert this file into a module
export {};
