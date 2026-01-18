// src/index.ts
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();   // <-- MUST run before importing env.ts
import "./config/env.js";
import admissionsRouter from "./modules/admissions/admissions.routes.js";
import enrollmentRouter from "./modules/enrollment/enrollment.routes.js";

app.use("/api/admissions", admissionsRouter);
app.use("/api/enrollments", enrollmentRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
