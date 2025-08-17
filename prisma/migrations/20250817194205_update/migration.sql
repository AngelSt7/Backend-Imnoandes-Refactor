/*
  Warnings:

  - Made the column `floor` on table `CommercialProperty` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hasTerrace` on table `ResidentialProperty` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."CommercialProperty" ALTER COLUMN "floor" SET NOT NULL,
ALTER COLUMN "floor" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "public"."ResidentialProperty" ALTER COLUMN "hasTerrace" SET NOT NULL;
