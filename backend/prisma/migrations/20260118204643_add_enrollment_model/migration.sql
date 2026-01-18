/*
  Warnings:

  - You are about to drop the column `createdAt` on the `enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `enrollment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,term]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `enrollment` DROP COLUMN `createdAt`,
    DROP COLUMN `status`,
    DROP COLUMN `updatedAt`;

-- CreateIndex
CREATE UNIQUE INDEX `Enrollment_userId_term_key` ON `Enrollment`(`userId`, `term`);
