// This file is the main entry point of the backend application

dotenv.config();   // <-- MUST run before importing env.ts

// Import environment variables
import dotenv from "dotenv";
// Express framework
import app from "./app.js";
// Load environment variables
import "./config/env.js";

// Start the server
const PORT = process.env.PORT || 5000;

// Listen on the specified port, meaning the server is ready to accept incoming requests.
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
