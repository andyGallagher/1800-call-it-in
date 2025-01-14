-- CreateTable
CREATE TABLE "RawOrder" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "inputData" JSONB NOT NULL,
    "outputData" JSONB NOT NULL,

    CONSTRAINT "RawOrder_pkey" PRIMARY KEY ("id")
);
