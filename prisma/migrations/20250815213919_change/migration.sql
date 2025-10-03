/*
  Warnings:

  - Changed the type of `yearBuilt` on the `Property` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Property" DROP COLUMN "yearBuilt",
ADD COLUMN     "yearBuilt" INTEGER NOT NULL;
