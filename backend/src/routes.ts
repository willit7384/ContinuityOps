// This file defines the main API routes for the backend application

// Express router
import { Router } from "express";
// Import route modules
import authRoutes from "./modules/auth/auth.routes.js"; // Authentication routes
import userRoutes from "./modules/users/users.routes.js"; // User management routes

// Create main router
const router = Router();

// Use imported routes
router.use("/auth", authRoutes); // Authentication routes
router.use("/users", userRoutes); // User management routes

// Export the main router
export default router;
