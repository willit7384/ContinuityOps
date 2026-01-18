// src/index.ts
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();   // <-- MUST run before importing env.ts
import "./config/env.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
