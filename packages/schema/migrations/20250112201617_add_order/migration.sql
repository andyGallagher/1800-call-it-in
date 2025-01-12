/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `TelephoneCall` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `TelephoneCall` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TelephoneCall" ADD COLUMN     "orderId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalCost" DOUBLE PRECISION,
    "pickupTime" TIMESTAMP(3),
    "restaurantName" TEXT NOT NULL,
    "restaurantPhone" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TelephoneCall_orderId_key" ON "TelephoneCall"("orderId");

-- AddForeignKey
ALTER TABLE "TelephoneCall" ADD CONSTRAINT "TelephoneCall_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
