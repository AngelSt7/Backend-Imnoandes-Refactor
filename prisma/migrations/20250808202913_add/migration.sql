/*
  Warnings:

  - You are about to drop the column `imageId` on the `Property` table. All the data in the column will be lost.
  - Added the required column `name` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Property" DROP COLUMN "imageId",
ADD COLUMN     "name" TEXT NOT NULL;
