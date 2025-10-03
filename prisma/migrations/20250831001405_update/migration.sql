/*
  Warnings:

  - You are about to drop the `MainImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."MainImage" DROP CONSTRAINT "MainImage_id_fkey";

-- DropTable
DROP TABLE "public"."MainImage";

-- CreateTable
CREATE TABLE "public"."ImageMain" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,

    CONSTRAINT "ImageMain_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ImageMain" ADD CONSTRAINT "ImageMain_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
