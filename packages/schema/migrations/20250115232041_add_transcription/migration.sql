/*
  Warnings:

  - The `externalServiceType` column on the `TelephoneCall` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TelephoneCall" ADD COLUMN     "transcription" TEXT,
DROP COLUMN "externalServiceType",
ADD COLUMN     "externalServiceType" TEXT NOT NULL DEFAULT 'Vapi';

-- DropEnum
DROP TYPE "TelephonyServiceType";
