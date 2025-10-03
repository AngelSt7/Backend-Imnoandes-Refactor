/*
  Warnings:

  - You are about to drop the column `department_id` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `district_id` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `province_id` on the `properties` table. All the data in the column will be lost.
  - Added the required column `address` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."properties" DROP CONSTRAINT "properties_department_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."properties" DROP CONSTRAINT "properties_district_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."properties" DROP CONSTRAINT "properties_province_id_fkey";

-- AlterTable
ALTER TABLE "public"."departments" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "public"."properties" DROP COLUMN "department_id",
DROP COLUMN "district_id",
DROP COLUMN "location",
DROP COLUMN "province_id",
ADD COLUMN     "address" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."location" (
    "id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "province_id" TEXT NOT NULL,
    "district_id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."location" ADD CONSTRAINT "location_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."location" ADD CONSTRAINT "location_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "public"."districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."location" ADD CONSTRAINT "location_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "public"."provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
