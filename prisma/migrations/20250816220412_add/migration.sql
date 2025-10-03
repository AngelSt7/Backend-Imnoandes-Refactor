-- AlterTable
ALTER TABLE "public"."CommercialProperty" ALTER COLUMN "floor" DROP NOT NULL,
ALTER COLUMN "parkingSpaces" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Property" ADD COLUMN     "extraInfo" TEXT;

-- AlterTable
ALTER TABLE "public"."ResidentialProperty" ALTER COLUMN "bedrooms" DROP NOT NULL,
ALTER COLUMN "bathrooms" DROP NOT NULL,
ALTER COLUMN "furnished" DROP NOT NULL,
ALTER COLUMN "hasTerrace" DROP NOT NULL;
