/*
  Warnings:

  - Added the required column `hasAccepted` to the `ParticipantsOnMeets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParticipantsOnMeets" ADD COLUMN     "hasAccepted" BOOLEAN NOT NULL,
ADD COLUMN     "schedule" TEXT;
