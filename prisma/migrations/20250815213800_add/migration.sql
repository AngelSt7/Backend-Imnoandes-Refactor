/*
  Warnings:

  - Added the required column `yearBuilt` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasTerrace` to the `ResidentialProperty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Property" ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "yearBuilt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."ResidentialProperty" ADD COLUMN     "hasTerrace" BOOLEAN NOT NULL;
