import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { logAudit } from "../admin/audit.service.js";

export const createEnrollment = async (req: Request, res: Response) => {
  try {
    const { userId, term } = req.body;

    const enrollment = await prisma.enrollment.create({
      data: { userId, term },
    });

    await logAudit({
      actorId: req.user!.id,
      action: "CREATE_ENROLLMENT",
      targetId: enrollment.id,
      metadata: { userId, term },
    });

    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ error: "Failed to create enrollment" });
  }
};

export const getEnrollmentById = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "Missing id" });

  const enrollment = await prisma.enrollment.findUnique({ where: { id } });
  res.json(enrollment);
};

export const updateEnrollmentStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { status } = req.body;

  if (!id) return res.status(400).json({ error: "Missing id" });

  const enrollment = await prisma.enrollment.update({
    where: { id },
    data: { status },
  });

  await logAudit({
    actorId: req.user!.id,
    action: "UPDATE_ENROLLMENT_STATUS",
    targetId: id,
    metadata: { status },
  });

  res.json(enrollment);
};

export const getEnrollments = async (_req: Request, res: Response) => {
  const enrollments = await prisma.enrollment.findMany();
  res.json(enrollments);
};
