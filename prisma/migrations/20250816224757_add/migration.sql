/*
  Warnings:

  - The `parkingSpaces` column on the `CommercialProperty` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Made the column `furnished` on table `ResidentialProperty` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."CommercialProperty" ADD COLUMN     "hasParking" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "parkingSpaces",
ADD COLUMN     "parkingSpaces" INTEGER;

-- AlterTable
ALTER TABLE "public"."Property" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."ResidentialProperty" ALTER COLUMN "furnished" SET NOT NULL,
ALTER COLUMN "furnished" SET DEFAULT false,
ALTER COLUMN "hasTerrace" SET DEFAULT false;
