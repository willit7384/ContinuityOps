import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import usersRouter from "./modules/users/users.routes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

// 👉 Add this line:
app.use("/api/users", usersRouter);

export default app;
