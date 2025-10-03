/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `images` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "images_publicId_key" ON "public"."images"("publicId");
