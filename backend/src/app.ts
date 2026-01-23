//  This file sets up the Express application with middleware and routes

// Express framework
import express from "express";
// CORS middleware
import cors from "cors";
// Route imports
import authRoutes from "./modules/auth/auth.routes.js"; // Authentication routes
import usersRoutes from "./modules/users/users.routes.js"; // User management routes
import adminRoutes from "./modules/admin/admin.routes.js"; // Admin routes
import admissionsRoutes from "./modules/admissions/admissions.routes.js"; // Admissions routes
import enrollmentRoutes from "./modules/enrollment/enrollment.routes.js"; // Enrollment routes
import adminAuthRoutes from "./modules/admin/admin.auth.routes.js"; // Admin authentication routes

// Create Express app instance
const app = express();

// Middleware setup
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// JSON body parser middleware
app.use(express.json());

// Route setup
app.use("/api/admin/auth", adminAuthRoutes); // Admin authentication routes
app.use("/api/auth", authRoutes); // General authentication routes
app.use("/api/users", usersRoutes); // User management routes
app.use("/api/admin", adminRoutes); // Admin routes
app.use("/api/admissions", admissionsRoutes); // Admissions routes
app.use("/api/enrollment", enrollmentRoutes); // Enrollment routes

// Export the configured app
export default app;
