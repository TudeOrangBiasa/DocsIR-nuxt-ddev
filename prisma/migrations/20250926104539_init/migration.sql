-- CreateTable
CREATE TABLE "public"."Document" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "content_raw" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);
