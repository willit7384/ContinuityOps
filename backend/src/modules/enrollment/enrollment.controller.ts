// This file contains controller functions for managing enrollments

// Express types
import { Request, Response } from "express";
// Prisma client
import { prisma } from "../../lib/prisma.js";
// Audit logging service
import { logAudit } from "../admin/audit.service.js";

// Create a new enrollment
export const createEnrollment = async (req: Request, res: Response) => {
  try {
    const { userId, term } = req.body;

    const enrollment = await prisma.enrollment.create({
      data: { userId, term },
    });
// Audit log
    await logAudit({
      actorId: req.user!.id,
      action: "CREATE_ENROLLMENT",
      targetId: enrollment.id,
      metadata: { userId, term },
    });
// Return created enrollment
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ error: "Failed to create enrollment" });
  }
};
// Get enrollment by ID
export const getEnrollmentById = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "Missing id" });
// Fetch enrollment
  const enrollment = await prisma.enrollment.findUnique({ where: { id } });
  res.json(enrollment);
};

// Update enrollment status
export const updateEnrollmentStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { status } = req.body;
// Validation
  if (!id) return res.status(400).json({ error: "Missing id" });
// Update enrollment
  const enrollment = await prisma.enrollment.update({
    where: { id },
    data: { status },
  });
// Audit log
  await logAudit({
    actorId: req.user!.id,
    action: "UPDATE_ENROLLMENT_STATUS",
    targetId: id,
    metadata: { status },
  });
// Return updated enrollment
  res.json(enrollment);
};

// Get all enrollments
export const getEnrollments = async (_req: Request, res: Response) => {
  const enrollments = await prisma.enrollment.findMany();
  res.json(enrollments);
};
