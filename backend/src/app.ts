import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes.js";
import usersRoutes from "./modules/users/users.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import admissionsRoutes from "./modules/admissions/admissions.routes.js";
import enrollmentRoutes from "./modules/enrollment/enrollment.routes.js";
import adminAuthRoutes from "./modules/admin/admin.auth.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admissions", admissionsRoutes);
app.use("/api/enrollment", enrollmentRoutes);

export default app;
