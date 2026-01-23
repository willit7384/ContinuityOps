// Prisma client singleton: This file ensures a single instance of PrismaClient is used throughout the app

// Prisma client
import { PrismaClient } from "@prisma/client";

// Prisma client singleton
export const prisma = new PrismaClient();
