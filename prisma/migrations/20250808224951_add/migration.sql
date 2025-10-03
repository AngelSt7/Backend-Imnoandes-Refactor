/*
  Warnings:

  - A unique constraint covering the columns `[district]` on the table `District` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `District` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[province]` on the table `Province` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Province` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `District` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Province` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."District" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Province" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "District_district_key" ON "public"."District"("district");

-- CreateIndex
CREATE UNIQUE INDEX "District_slug_key" ON "public"."District"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Property_name_key" ON "public"."Property"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Province_province_key" ON "public"."Province"("province");

-- CreateIndex
CREATE UNIQUE INDEX "Province_slug_key" ON "public"."Province"("slug");
