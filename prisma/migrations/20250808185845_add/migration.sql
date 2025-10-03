-- CreateEnum
CREATE TYPE "public"."PROPERTY_TYPE" AS ENUM ('SALE', 'RENT');

-- CreateEnum
CREATE TYPE "public"."CURRENCY" AS ENUM ('PEN', 'USD');

-- CreateTable
CREATE TABLE "public"."Departament" (
    "id" TEXT NOT NULL,
    "departament" TEXT NOT NULL,

    CONSTRAINT "Departament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Province" (
    "id" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "departamentId" TEXT NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."District" (
    "id" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "provinceId" TEXT NOT NULL,
    "departamentId" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Service" (
    "id" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServiceToProperty" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "ServiceToProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ImagesGallery" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImagesGallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MainImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "MainImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Property" (
    "id" TEXT NOT NULL,
    "property_type" "public"."PROPERTY_TYPE" NOT NULL,
    "currency" "public"."CURRENCY" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "provinceId" TEXT NOT NULL,
    "imageId" TEXT,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ResidentialProperty" (
    "id" TEXT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "furnished" BOOLEAN NOT NULL,

    CONSTRAINT "ResidentialProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommercialProperty" (
    "id" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "parkingSpaces" BOOLEAN NOT NULL,

    CONSTRAINT "CommercialProperty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Province" ADD CONSTRAINT "Province_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "public"."Departament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."District" ADD CONSTRAINT "District_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "public"."Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."District" ADD CONSTRAINT "District_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "public"."Departament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServiceToProperty" ADD CONSTRAINT "ServiceToProperty_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ServiceToProperty" ADD CONSTRAINT "ServiceToProperty_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ImagesGallery" ADD CONSTRAINT "ImagesGallery_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MainImage" ADD CONSTRAINT "MainImage_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Property" ADD CONSTRAINT "Property_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Property" ADD CONSTRAINT "Property_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "public"."District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Property" ADD CONSTRAINT "Property_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Departament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Property" ADD CONSTRAINT "Property_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "public"."Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResidentialProperty" ADD CONSTRAINT "ResidentialProperty_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommercialProperty" ADD CONSTRAINT "CommercialProperty_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
