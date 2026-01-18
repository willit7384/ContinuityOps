import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { logAudit } from "../admin/audit.service.js";

export const createAdmission = async (req: Request, res: Response) => {
  try {
    const { userId, program, term } = req.body;

    const admission = await prisma.admission.create({
      data: { userId, program, term },
    });

    await logAudit({
      actorId: req.user!.id,
      action: "CREATE_ADMISSION",
      targetId: admission.id,
      metadata: { userId, program, term },
    });

    res.status(201).json(admission);
  } catch (err) {
    res.status(500).json({ error: "Failed to create admission" });
  }
};

export const getAdmissionById = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "Missing id" });

  const admission = await prisma.admission.findUnique({ where: { id } });
  res.json(admission);
};

export const updateAdmissionStatus = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { status } = req.body;

  if (!id) return res.status(400).json({ error: "Missing id" });

  const admission = await prisma.admission.update({
    where: { id },
    data: { status },
  });

  await logAudit({
    actorId: req.user!.id,
    action: "UPDATE_ADMISSION_STATUS",
    targetId: id,
    metadata: { status },
  });

  res.json(admission);
};

export const getAdmissions = async (_req: Request, res: Response) => {
  const admissions = await prisma.admission.findMany();
  res.json(admissions);
};
