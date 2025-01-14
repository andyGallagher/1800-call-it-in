/*
  Warnings:

  - Added the required column `inputHash` to the `RawOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RawOrder" ADD COLUMN     "inputHash" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "RawOrder_inputHash_idx" ON "RawOrder"("inputHash");
