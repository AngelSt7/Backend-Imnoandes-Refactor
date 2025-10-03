/*
  Warnings:

  - You are about to drop the `CommercialProperty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `District` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImageMain` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImagesGallery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Property` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Province` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResidentialProperty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceToProperty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CommercialProperty" DROP CONSTRAINT "CommercialProperty_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."District" DROP CONSTRAINT "District_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."District" DROP CONSTRAINT "District_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ImageMain" DROP CONSTRAINT "ImageMain_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ImagesGallery" DROP CONSTRAINT "ImagesGallery_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Property" DROP CONSTRAINT "Property_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Property" DROP CONSTRAINT "Property_districtId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Property" DROP CONSTRAINT "Property_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Property" DROP CONSTRAINT "Property_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Province" DROP CONSTRAINT "Province_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ResidentialProperty" DROP CONSTRAINT "ResidentialProperty_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ServiceToProperty" DROP CONSTRAINT "ServiceToProperty_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ServiceToProperty" DROP CONSTRAINT "ServiceToProperty_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Token" DROP CONSTRAINT "Token_userId_fkey";

-- DropTable
DROP TABLE "public"."CommercialProperty";

-- DropTable
DROP TABLE "public"."Department";

-- DropTable
DROP TABLE "public"."District";

-- DropTable
DROP TABLE "public"."ImageMain";

-- DropTable
DROP TABLE "public"."ImagesGallery";

-- DropTable
DROP TABLE "public"."Property";

-- DropTable
DROP TABLE "public"."Province";

-- DropTable
DROP TABLE "public"."ResidentialProperty";

-- DropTable
DROP TABLE "public"."Service";

-- DropTable
DROP TABLE "public"."ServiceToProperty";

-- DropTable
DROP TABLE "public"."Token";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "auth_provider" "public"."AUTH_PROVIDERS" NOT NULL DEFAULT 'LOCAL',
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "birth_date" TIMESTAMP(3),
    "password" TEXT,
    "phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" INTEGER NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."departments" (
    "id" TEXT NOT NULL,
    "department" TEXT NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."provinces" (
    "id" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,

    CONSTRAINT "provinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."districts" (
    "id" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "province_id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,

    CONSTRAINT "districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."services" (
    "id" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."services_to_properties" (
    "id" TEXT NOT NULL,
    "property_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "services_to_properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."images_gallery" (
    "id" TEXT NOT NULL,
    "property_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."images_main" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_main_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."properties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "property_type" "public"."PROPERTY_TYPE" NOT NULL,
    "currency" "public"."CURRENCY" NOT NULL,
    "property_category" "public"."PROPERTY_CATEGORY" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "user_id" TEXT NOT NULL,
    "district_id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "province_id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "year_built" INTEGER,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "extra_info" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."residential_properties" (
    "id" TEXT NOT NULL,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "area" DOUBLE PRECISION NOT NULL,
    "furnished" BOOLEAN NOT NULL DEFAULT false,
    "has_terrace" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "residential_properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."commercial_properties" (
    "id" TEXT NOT NULL,
    "floor" INTEGER NOT NULL DEFAULT 1,
    "has_parking" BOOLEAN NOT NULL DEFAULT false,
    "parking_spaces" INTEGER,

    CONSTRAINT "commercial_properties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "public"."users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_user_id_key" ON "public"."tokens"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_token_key" ON "public"."tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "provinces_province_key" ON "public"."provinces"("province");

-- CreateIndex
CREATE UNIQUE INDEX "provinces_slug_key" ON "public"."provinces"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "properties_name_key" ON "public"."properties"("name");

-- AddForeignKey
ALTER TABLE "public"."tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."provinces" ADD CONSTRAINT "provinces_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."districts" ADD CONSTRAINT "districts_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "public"."provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."districts" ADD CONSTRAINT "districts_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."services_to_properties" ADD CONSTRAINT "services_to_properties_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."services_to_properties" ADD CONSTRAINT "services_to_properties_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."images_gallery" ADD CONSTRAINT "images_gallery_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."images_main" ADD CONSTRAINT "images_main_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."properties" ADD CONSTRAINT "properties_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."properties" ADD CONSTRAINT "properties_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "public"."districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."properties" ADD CONSTRAINT "properties_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."properties" ADD CONSTRAINT "properties_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "public"."provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."residential_properties" ADD CONSTRAINT "residential_properties_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."commercial_properties" ADD CONSTRAINT "commercial_properties_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
