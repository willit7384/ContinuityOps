import { prisma } from "../../lib/prisma.js";
import { logAudit } from "../admin/audit.service.js";
import { $Enums } from "@prisma/client";

export async function approveAdmission(
  admissionId: string,
  adminId: string
) {
  return prisma.$transaction(async (tx) => {
    const admission = await tx.admission.findUnique({
      where: { id: admissionId },
    });

    if (!admission) {
      throw new Error("Admission not found");
    }

    // Guard transition
    if (admission.status !== $Enums.AdmissionStatus.UNDER_REVIEW) {
      throw new Error(
        `Cannot approve admission from status ${admission.status}`
      );
    }

    // 1️⃣ Update admission status
    const updatedAdmission = await tx.admission.update({
      where: { id: admissionId },
      data: {
        status: $Enums.AdmissionStatus.ACCEPTED,
      },
    });

// 2️⃣ Create enrollment (idempotent)
const existing = await tx.enrollment.findFirst({
  where: {
    userId: admission.userId,
    term: admission.term,
  },
});

if (!existing) {
  await tx.enrollment.create({
    data: {
      userId: admission.userId,
      term: admission.term,
    },
  });
}


// 3️⃣ Audit
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

return updatedAdmission;
});
}
