// This file contains utility functions for hashing and verifying passwords

// Bcrypt library for hashing
import bcrypt from "bcrypt";

// Salt rounds for bcrypt
const SALT_ROUNDS = 12;

// Hash a password
export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Verify a password against a hash
export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
