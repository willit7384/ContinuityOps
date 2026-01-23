// This file contains workflow functions for admissions

// Prisma client
import { prisma } from "../../lib/prisma.js";
// Audit logging service
import { logAudit } from "../admin/audit.service.js";
// Prisma Enums: for status values
import { $Enums } from "@prisma/client";
// Approve an admission application
export async function approveAdmission(
  admissionId: string,
  adminId: string
) {
  return prisma.$transaction(async (tx) => {
    const admission = await tx.admission.findUnique({
      where: { id: admissionId },
    });
// Validation
    if (!admission) {
      throw new Error("Admission not found");
    }

    // Guard transition
    if (admission.status !== $Enums.AdmissionStatus.UNDER_REVIEW) {
      throw new Error(
        `Cannot approve admission from status ${admission.status}`
      );
    }

    // Update admission status
    const updatedAdmission = await tx.admission.update({
      where: { id: admissionId },
      data: {
        status: $Enums.AdmissionStatus.ACCEPTED,
      },
    });

// Create enrollment (idempotent)
const existing = await tx.enrollment.findFirst({
  where: {
    userId: admission.userId,
    term: admission.term,
  },
});
// If no existing enrollment, create one
if (!existing) {
  await tx.enrollment.create({
    data: {
      userId: admission.userId,
      term: admission.term,
    },
  });
}


// Audit log for admission approval
await logAudit({
  actorId: adminId,
  action: "ADMISSION_ACCEPTED",
  targetId: admissionId,
  metadata: {
    userId: admission.userId,
    term: admission.term,
    enrollmentCreated: true,
  },
});
// Return updated admission
return updatedAdmission;
});
}
