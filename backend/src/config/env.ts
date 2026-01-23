// Load environment variables from .env file

// Dotenv library
import dotenv from "dotenv";

// Configure dotenv to load variables
dotenv.config();

// Export JWT secret and expiration settings
const jwtSecret = process.env.JWT_SECRET;

// Ensure JWT_SECRET is defined
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}

// Export constants
export const JWT_SECRET: string = jwtSecret;

// Default to 1 day if not specified
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
