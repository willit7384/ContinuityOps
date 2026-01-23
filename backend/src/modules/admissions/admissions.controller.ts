// Admissions controller: Handles admissions-related operations

// Express types
import { Request, Response } from "express";
// Prisma client
import { prisma } from "../../lib/prisma.js";
// Audit logging service
import { logAudit } from "../admin/audit.service.js";

// Create a new admission
export const createAdmission = async (req: Request, res: Response) => {
  try {
    const { userId, program, term } = req.body;
// Input validation
    const admission = await prisma.admission.create({
      data: { userId, program, term },
    });
// Audit log for admission creation
    await logAudit({
      actorId: req.user!.id,
      action: "CREATE_ADMISSION",
      targetId: admission.id,
      metadata: { userId, program, term },
    });
// Return created admission
    res.status(201).json(admission);
  } catch (err) {
    res.status(500).json({ error: "Failed to create admission" });
  }
};
// Get admission by ID
export const getAdmissionById = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "Missing id" });
// Fetch admission
  const admission = await prisma.admission.findUnique({ where: { id } });
  res.json(admission);
};
// Update admission status
export const updateAdmissionStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { status } = req.body;
// Input validation
  if (!id) return res.status(400).json({ error: "Missing id" });
// Update admission status
  const admission = await prisma.admission.update({
    where: { id },
    data: { status },
  });
// Audit log for status update
  await logAudit({
    actorId: req.user!.id,
    action: "UPDATE_ADMISSION_STATUS",
    targetId: id,
    metadata: { status },
  });
// Return updated admission
  res.json(admission);
};
// Get all admissions
export const getAdmissions = async (_req: Request, res: Response) => {
  const admissions = await prisma.admission.findMany();
  res.json(admissions);
};
