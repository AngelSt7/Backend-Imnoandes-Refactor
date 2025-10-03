/*
  Warnings:

  - You are about to drop the `Faker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `images_gallery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `images_main` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."IMAGE_TYPE" AS ENUM ('MAIN', 'GALLERY');

-- DropForeignKey
ALTER TABLE "public"."images_gallery" DROP CONSTRAINT "images_gallery_property_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."images_main" DROP CONSTRAINT "images_main_id_fkey";

-- DropTable
DROP TABLE "public"."Faker";

-- DropTable
DROP TABLE "public"."images_gallery";

-- DropTable
DROP TABLE "public"."images_main";

-- CreateTable
CREATE TABLE "public"."images" (
    "id" TEXT NOT NULL,
    "property_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "type" "public"."IMAGE_TYPE" NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."images" ADD CONSTRAINT "images_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
