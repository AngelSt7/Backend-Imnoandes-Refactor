/*
  Warnings:

  - You are about to drop the column `departamentId` on the `District` table. All the data in the column will be lost.
  - You are about to drop the column `departamentId` on the `Province` table. All the data in the column will be lost.
  - You are about to drop the `Departament` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `departmentId` to the `District` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyCategory` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `Province` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."PROPERTY_CATEGORY" AS ENUM ('HOUSE', 'APARTMENT', 'LAND', 'COMMERCIAL', 'OFFICE', 'WAREHOUSE');

-- DropForeignKey
ALTER TABLE "public"."District" DROP CONSTRAINT "District_departamentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Property" DROP CONSTRAINT "Property_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Province" DROP CONSTRAINT "Province_departamentId_fkey";

-- AlterTable
ALTER TABLE "public"."District" DROP COLUMN "departamentId",
ADD COLUMN     "departmentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Property" ADD COLUMN     "propertyCategory" "public"."PROPERTY_CATEGORY" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Province" DROP COLUMN "departamentId",
ADD COLUMN     "departmentId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Departament";

-- CreateTable
CREATE TABLE "public"."Department" (
    "id" TEXT NOT NULL,
    "department" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Province" ADD CONSTRAINT "Province_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."District" ADD CONSTRAINT "District_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Property" ADD CONSTRAINT "Property_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
