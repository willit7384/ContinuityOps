// This file contains the user-related routes

// Express router
import express from "express";
// User controllers: CRUD and auth operations
import {
  createUserController,
  listUsersController,
  updateRoleController,
  suspendUserController,
  loginController,
  getMe,
  updateMe,
} from "./users.controller.js";
// Authentication middleware
import { verifyToken } from "../../middlewares/auth.middleware.js";
// Suspension middleware
import { blockSuspendedUser } from "../../middlewares/suspension.middleware.js";
// Role-based access control middleware
import { requireRole } from "../../middlewares/role.middleware.js";

// Create router
const router = express.Router();

// Public routes for users

// Registration route
router.post("/register", createUserController);

// Login route
router.post("/login", loginController);

// Protected routes
router.use(verifyToken, blockSuspendedUser); // all routes below require auth

// Admin routes
router.get("/", requireRole(["ADMIN"]), listUsersController); // List all users
router.patch("/:id/role", requireRole(["ADMIN"]), updateRoleController); // Update user role
router.patch("/:id/suspend", requireRole(["ADMIN"]), suspendUserController); // Suspend user

// User self-service routes
router.get("/me", getMe); // Get current user info
router.patch("/me", updateMe); // Update current user info

// Export router
export default router;
