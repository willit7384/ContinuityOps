// This file contains the authentication routes

// Express router
import { Router } from "express";
// Auth controllers
import { login, register } from "./auth.controller.js";

// Create router
const router = Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Export router
export default router;
