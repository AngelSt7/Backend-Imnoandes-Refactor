/*
  Warnings:

  - Added the required column `publicId` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."images" ADD COLUMN     "publicId" TEXT NOT NULL;
