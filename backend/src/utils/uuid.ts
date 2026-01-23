// This file contains utility functions for generating UUIDs

// UUID library
import { v4 as uuidv4 } from "uuid";

// Generate a new UUID
export function generateUuid() {
  return uuidv4(); // Return a version 4 UUID
}
