-- CreateEnum
CREATE TYPE "TelephonyServiceType" AS ENUM ('Vapi');

-- CreateTable
CREATE TABLE "ApplicationVersion" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "deployTag" TEXT NOT NULL,
    "deployedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApplicationVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelephoneCall" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "externalServiceType" "TelephonyServiceType" NOT NULL,
    "externalServiceId" TEXT NOT NULL,

    CONSTRAINT "TelephoneCall_pkey" PRIMARY KEY ("id")
);
