import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

export const getMe = async (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json(user);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
    },
  });

  res.json(users);
};
