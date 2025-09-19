/*
  Warnings:

  - Added the required column `type` to the `location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."LOCATION" AS ENUM ('DEPARTMENT', 'PROVINCE', 'DISTRICT');

-- DropForeignKey
ALTER TABLE "public"."location" DROP CONSTRAINT "location_department_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."location" DROP CONSTRAINT "location_district_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."location" DROP CONSTRAINT "location_province_id_fkey";

-- AlterTable
ALTER TABLE "public"."location" ADD COLUMN     "type" "public"."LOCATION" NOT NULL,
ALTER COLUMN "department_id" DROP NOT NULL,
ALTER COLUMN "province_id" DROP NOT NULL,
ALTER COLUMN "district_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."properties" ADD COLUMN     "locationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."properties" ADD CONSTRAINT "properties_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."location" ADD CONSTRAINT "location_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."location" ADD CONSTRAINT "location_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "public"."districts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."location" ADD CONSTRAINT "location_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "public"."provinces"("id") ON DELETE SET NULL ON UPDATE CASCADE;
