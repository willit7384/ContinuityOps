// This file contains controller functions for authentication

// Express types
import { Request, Response } from "express";
// Auth service functions
import { registerUser, loginUser } from "./auth.service.js";
// Prisma Role enum
import { Role } from "@prisma/client";

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
// Only allow ADMIN role if requester is admin (this check would typically be done in middleware)
    const user = await registerUser(
      email,
      password,
      firstName,
      lastName
    );
// Return created user
    res.status(201).json({ message: "User created", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};
