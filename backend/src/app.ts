//  This file sets up the Express application with middleware and routes

// Express framework is used to create the server and handle routing,
// modular architecture, controllers, middleware, services, utilities, etc.
import express from "express";
// CORS middleware is used to enable Cross-Origin Resource Sharing,
// meaning it allows your server to accept requests from different origins.
import cors from "cors";
// Route imports are used to modularize the application,
// meaning each module handles a specific set of related and protected routes.
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
  origin: "http://localhost:3000", // Allow requests from this origin, where the frontend runs, but in production this should be your actual domain
  credentials: true,
}));

// JSON body parser middleware is used to parse incoming request bodies in JSON format,
// meaning it makes the parsed data available under req.body.
app.use(express.json());

// Route setup is used to define the endpoints for different functionalities,
// meaning it connects URL paths to the corresponding route handlers.
app.use("/api/admin/auth", adminAuthRoutes); // Admin authentication routes
app.use("/api/auth", authRoutes); // General authentication routes
app.use("/api/users", usersRoutes); // User management routes
app.use("/api/admin", adminRoutes); // Admin routes
app.use("/api/admissions", admissionsRoutes); // Admissions routes
app.use("/api/enrollment", enrollmentRoutes); // Enrollment routes

// Export the configured app
export default app;
