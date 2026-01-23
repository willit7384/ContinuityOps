// This file contains route definitions for authentication-related endpoints

// Express router
import express from "express";
// Auth controllers
import { register, login } from "../controllers/authcontroller.js";

// Create router
const router = express.Router();

// Define routes
// Register route
router.post("/register", register);
// Login route
router.post("/login", login);

// Export router
export default router;
